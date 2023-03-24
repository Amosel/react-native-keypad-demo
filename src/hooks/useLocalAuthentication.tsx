import {useLocalObservable} from 'mobx-react';
import {LocalAuthenticationModel} from '../models/local-authentication-model';

export const useLocalAuthentication = () => {
	const model = useLocalObservable(
		() => new LocalAuthenticationModel(),
	);
	// console.log('status', {state, shouldAuthenticate});

	return model;
};
