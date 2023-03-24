import * as React from 'react';
import {
	type ImageSourcePropType,
	StyleSheet,
	Text,
	View,
	type ViewStyle,
	type TextStyle,
} from 'react-native';
import {Backspace, Cell} from './VirtualKeypadComponents';
import {Observer, useLocalObservable} from 'mobx-react';
import {VirtualKeyboardModel} from './models/virtual-keyboard-model';

export const Keypad = ({
	passPhraseLength = 6,
	rowStyle,
	textStyle,
	cellStyle,
}: {
	passPhraseLength?: number;
	decimal?: boolean;
	rowStyle?: ViewStyle;
	cellStyle?: ViewStyle;
	textStyle?: TextStyle;
}) => {
	const model = useLocalObservable(
		() =>
			new VirtualKeyboardModel({
				passPhraseLength,
			}),
	);

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
			}}
		>
			<Observer>
				{() => (
					<Text
						style={{
							justifyContent: 'center',
							textAlign: 'center',
							fontSize: 21,
							color: 'black',
						}}
					>
						{model.password}
					</Text>
				)}
			</Observer>
			<View style={[styles.container]}>
				{[
					[1, 2, 3],
					[4, 5, 6],
					[7, 8, 9],
					[10, 11, 12],
				].map((row) => (
					<View style={[styles.row, rowStyle]} key={row.join('.')}>
						{row.map((buttonValue) => {
							switch (buttonValue) {
								case 10: return (<View style={{flex: 1}} key={buttonValue.toString()} />);
								case 12: return (
									<Observer key={buttonValue.toString()}>
										{() => (
											<Backspace
												applyBackspaceTint
												handleBackspace={model.handleBackspace}
												handleClear={model.handleClear}
												backspaceImg={
													// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
													require('./backspace.png') as unknown as ImageSourcePropType
												}
											/>
										)}
									</Observer>
								);
								default: return (
									<Observer key={buttonValue.toString()}>
										{() => (
											<Cell
												text={buttonValue === 11 ? '0' : buttonValue.toString()}
												onPress={() => {
													model.handlePress(buttonValue.toString());
												}}
												disabled={model.disabled}
												color={model.disabled ? 'red' : 'black'}
												textStyle={textStyle}
												style={cellStyle}
											/>
										)}
									</Observer>
								);
							}
						},
						)}
					</View>
				))}

			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		marginHorizontal: 30,
		alignItems: 'flex-start',
	},
	row: {
		flexDirection: 'row',
		marginTop: 15,
	},
});
