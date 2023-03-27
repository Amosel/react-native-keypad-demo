/* eslint-disable @typescript-eslint/naming-convention */
import {makeAutoObservable} from 'mobx';

export const keypadLayout = [
	['1', '2', '3'],
	['4', '5', '6'],
	['7', '8', '9'],
	[' ', '0', '<'],
];

export type KeyboardValue = typeof keypadLayout[number][number];

export class KeyboardKeyModel {
	value: KeyboardValue;
	private readonly model: VirtualKeyboardModel;
	
	constructor(value: KeyboardValue, model: VirtualKeyboardModel) {
		makeAutoObservable(this);
		this.value = value;
		this.model = model;
	}

	get symbol() {
		return this.value;
	}

	get accessibilityLabel() {
		return this.value;
	}

	get disabled(): boolean {
		return this.model.isDisabled && this.value !== '<';
	}
	
	handlePress = () => {
		this.model.handlePress(this.value); 
	};

	handleLongPress = () => {
		this.model.handleLongPress(this.value);
	};
}

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

	handleNumber = (val: KeyboardValue) => {
		if (this.text.length < this.passPhraseLength) {
			this.text += val;
		}
	};

	handleLongPress = (val: KeyboardValue) => {
		if (val === '<' && this.clearOnLongPress) {
			this.handleClear();
		}
	};

	handlePress = (val: KeyboardValue) => {
		switch (val) {
			case ' ':
				return;
			case '<': {
				this.handleBackspace();
				return;
			}

			default: {
				this.handleNumber(val);
				return;
			}
		}
	};

	private readonly handleBackspace = () => {
		if (this.text.length > 0) {
			this.text = this.text.slice(0, -1);
		}
	};

	private readonly handleClear = () => {
		this.text = '';
	};

	get isDisabled() {
		return this.text.length >= this.passPhraseLength;
	}

	get password() {
		return [...new Array<string>(this.passPhraseLength)].map((_, index) =>
			this.text.length > index ? true : false,
		);
	}

	get disabled() {
		return this.text.length >= this.passPhraseLength;
	}
}
