import * as React from 'react';
import {
	StyleSheet,
	View,
	type ViewStyle,
	type TextStyle,
} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {Cell} from './VirtualKeypadComponents';
import {Observer, useLocalObservable} from 'mobx-react';
import {KeyboardKeyModel, keypadLayout, VirtualKeyboardModel} from './models/virtual-keyboard-model';

const stroke = 1;
const radius = 10;
const circle = (stroke + radius) * 2;
const widthAt = (index: number, horizontalSpacing = 20) => stroke + ((index + stroke) * ((radius + stroke) + horizontalSpacing));
const getCircleX = (index: number) => widthAt(index) - radius - stroke;

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
		<View className='flex justify-center'>
			<Observer>
				{() => (
					<View className='transparent justify-center items-center'>
						{
							<Svg height={circle} width={widthAt(model.password.length - 1)} className='transparent justify-center'>
								{model.password.map((value, index) => (
									<Circle
										key={`${index}`}
										cx={getCircleX(index)}
										cy={`${radius + stroke}`}
										r={radius}
										stroke={'black'}
										strokeWidth={stroke}
										fill={value ? 'black' : 'transparent'}
									/>
								))}
							</Svg>
							// ))
						}
					</View>
				)}
			</Observer>
			<View style={[styles.container]}>
				{keypadLayout.map((row) => (
					<View style={[styles.row, rowStyle]} key={row.join('.')}>
						{row.map((value) => (
							<Cell model={new KeyboardKeyModel(value, model)}
								key={value}
								textStyle={textStyle}
								style={cellStyle}
							/>
						))
						}
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
