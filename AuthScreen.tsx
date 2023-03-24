import React from 'react';
import {Text, Button, StyleSheet, SafeAreaView} from 'react-native';
import Constants from 'expo-constants';
import {observer} from 'mobx-react';
import {Keypad} from './src/Keypad';
import {useLocalAuthentication} from './src/hooks/useLocalAuthentication';

export const styles = StyleSheet.create({
	paragraph: {
		margin: 24,
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		paddingTop: Constants.statusBarHeight,
		backgroundColor: '#ecf0f1',
		padding: 8,
	},
});

export function AuthScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<AuthSwitch />
		</SafeAreaView>
	);
}

export const AuthSwitch = observer(() => {
	const {authenticate, state} = useLocalAuthentication();
	switch (state) {
		case 'not-supported': {
			return <Keypad />;
		}

		case 'authenticating-failed': {
			return <Button title="Try again" onPress={authenticate} />;
		}

		default:
			return <Text style={styles.paragraph}>{`Status: ${state}`}</Text>;
	}
});
