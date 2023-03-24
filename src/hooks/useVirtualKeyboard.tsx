import {useLocalObservable} from 'mobx-react';
import {VirtualKeyboardModel} from '../models/virtual-keyboard-model';

export const useVirtualKeyboard = (passPhraseLength: number) => {
	const model = useLocalObservable(
		() =>
			new VirtualKeyboardModel({
				passPhraseLength,
			}),
	);
	return model;
};
