import * as LocalAuthentication from 'expo-local-authentication';
import {makeAutoObservable, when} from 'mobx';
import {fromPromise, type IPromiseBasedObservable} from 'mobx-utils';


export type AuthenticateResult = Awaited<
ReturnType<typeof LocalAuthentication.authenticateAsync>
>;

export class LocalAuthenticationModel {
	isEnrolledPromise = fromPromise<boolean>(
		LocalAuthentication.isEnrolledAsync(),
	);

	authenticatePromise?: IPromiseBasedObservable<AuthenticateResult>;

	constructor() {
		makeAutoObservable(this);
		const x = when(
			() => this.isEnrolled && this.authenticateIsIdle,
			() => {
				this.authenticate();
			},
		);
	}

	authenticate = () => {
		this.authenticatePromise = fromPromise(
			LocalAuthentication.authenticateAsync(),
		);
	};

	get isEnrolled() {
		return this.isEnrolledPromise.value === true;
	}

	get authenticateIsIdle() {
		return (
			this.authenticatePromise === undefined ||
			this.authenticatePromise.state !== 'pending'
		);
	}

	get shouldAuthenticate() {
		return (
			this.isEnrolledPromise.value &&
			(this.authenticatePromise === undefined ||
				this.authenticatePromise.state !== 'pending')
		);
	}

	get state() {
		const {isEnrolledPromise, authenticatePromise} = this;
		switch (isEnrolledPromise.state) {
			case 'pending':
				return 'booting';
			case 'rejected':
				return 'booting-failed';
			case 'fulfilled': {
				if (!isEnrolledPromise.value) {
					return 'not-supported';
				} else if (authenticatePromise === undefined) {
					return 'waiting-for-authentication-call';
				} else {
					switch (authenticatePromise.state) {
						case 'pending':
							return 'authenticating';
						case 'rejected':
							return 'authenticating-failed';
						case 'fulfilled': {
							return authenticatePromise.value.success
								? 'authenticated'
								: 'authenticating-failed';
						}

						default:
							return 'unknown';
					}
				}
			}

			default:
				return 'unknown';
		}
	}
}
