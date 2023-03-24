/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import {createContext} from 'react';
import {
	type ImageSourcePropType,
	type ViewStyle,
	type TextStyle,
} from 'react-native';
import {type VirtualKeyboardModel} from './virtual-keyboard-model';

export type VirtualKeyboardProps = {
	model: VirtualKeyboardModel;
	color?: string;
	backspaceImg?: ImageSourcePropType;
	applyBackspaceTint?: boolean;
	rowStyle?: ViewStyle;
	cellStyle?: ViewStyle;
	textStyle?: TextStyle;
	clearOnLongPress?: boolean;
	decimal?: boolean;
};

export const VirtualKeyboardContext = createContext<VirtualKeyboardProps>({} as VirtualKeyboardProps);
export const VirtualKeyboardProvider = VirtualKeyboardContext.Provider;
