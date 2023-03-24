import React from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	Image,
	type ViewStyle,
	type ImageSourcePropType,
	type TextStyle,
} from 'react-native';

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		marginTop: 15,
	},
	number: {
		fontSize: 25,
		textAlign: 'center',
	},
	backspace: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: 'black',
	},
	cell: {
		flex: 1,
		justifyContent: 'center',
		padding: 10,
		borderWidth: 1,
		borderColor: 'black',
	},
});

export const Cell = (
	({onPress, disabled,
		style,
		textStyle,
		color,
		text,
	}: {
		text: string; 
		onPress: () => void; disabled?: boolean;
		rowStyle?: ViewStyle;
		style?: ViewStyle;
		textStyle?: TextStyle;
		color?: string;
	}) => {
		return (
			<TouchableOpacity
				style={[styles.cell, style]}
				accessibilityLabel={text}
				onPress={onPress}
				disabled={disabled}
			>
				<Text style={[styles.number, textStyle, {color}]}>{text}</Text>
			</TouchableOpacity>
		);
	});


export const Backspace =
	({handleBackspace, handleClear, backspaceImg, clearOnLongPress, color, applyBackspaceTint, disabled}: {
		handleBackspace: () => void;
		handleClear: () => void;
		backspaceImg: ImageSourcePropType;
		applyBackspaceTint?: boolean;
		clearOnLongPress?: boolean;
		color?: string;
		disabled?: boolean;
	}) => {
		return (
			<TouchableOpacity
				disabled={disabled}
				accessibilityLabel="backspace"
				style={styles.backspace}
				onPress={() => {
					handleBackspace();
				}}
				onLongPress={() => {
					if (clearOnLongPress) {
						handleClear();
					}
				}}
			>
				{backspaceImg && (
					<Image
						source={backspaceImg}
						resizeMode="contain"
						style={applyBackspaceTint && {tintColor: color}}
					/>
				)}
			</TouchableOpacity>
		);
	};

