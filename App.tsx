/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';
import Constants from 'expo-constants';
import {Keypad} from './src/Keypad';


export default function App() {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.paragraph}>
				Change code in the editor and watch it change on your phone! Save to get
				a shareable url.
			</Text>
			<Keypad />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		paddingTop: Constants.statusBarHeight,
		backgroundColor: '#ecf0f1',
		padding: 8,
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
