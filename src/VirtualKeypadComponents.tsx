import {observer} from 'mobx-react-lite';
import React from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	type ViewStyle,
	type TextStyle,
	type TouchableOpacityProps,
} from 'react-native';
import {type KeyboardKeyModel} from './models/virtual-keyboard-model';

const styles = StyleSheet.create({
	number: {
		fontSize: 25,
		textAlign: 'center',
	},
	backspace: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	cell: {
		flex: 1,
		justifyContent: 'center',
		padding: 10,
	},
});

export const Cell = observer(
	({
		style,
		textStyle,
		model,
		...rest
	}: {
		style?: ViewStyle;
		textStyle?: TextStyle;
		model: KeyboardKeyModel;
	} & TouchableOpacityProps) => {
		return (
			<TouchableOpacity
				className='flex-1 justify-center p-2'
				accessibilityLabel={model.accessibilityLabel}
				disabled={model.disabled}
				onLongPress={model.handleLongPress}
				onPress={model.handlePress}
				{...rest}
			>
				<Text
					className={`text-2xl text-center ${
						model.disabled ? 'text-red-600' : 'text-black'
					}`}
				>
					{model.symbol}
				</Text>
				
			</TouchableOpacity>
		);
	},
);
