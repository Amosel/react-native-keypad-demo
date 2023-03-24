/* eslint-disable @typescript-eslint/naming-convention */
import {makeAutoObservable} from 'mobx';

export type PressMode = 'string' | 'char';

export class VirtualKeyboardModel {
	passPhraseLength: number;
	clearOnLongPress?: boolean;
	text: string;
	constructor({
		passPhraseLength = 6,
	}: {
		passPhraseLength: number;
	}) {
		this.passPhraseLength = passPhraseLength;
		this.text = '';
		makeAutoObservable(this);
	}

	handleBackspace = () => {
		if (this.text.length > 0) {
			this.text = this.text.slice(0, -1);
		}
	};

	handleClear = () => {
		this.text = '';
	};

	handlePress = (val: string) => {
		if (!isNaN(Number(val))) {
			this.text += val;
		}
	};

	get isDisabled() {
		return this.text.length >= this.passPhraseLength;
	}

	get password() {
		return [...new Array<string>(this.passPhraseLength)]
			.map((_, index) => (this.text.length > index ? '●' : ' '))
			.join('');
	}

	get disabled() {
		return this.text.length >= this.passPhraseLength;
	}
}
