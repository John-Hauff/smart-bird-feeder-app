import React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import { Card, Provider } from 'react-native-paper';

export function Chordbox({chord}){
    return(
		<Card style={styles.chordBox}>
			<Text>{chord}</Text>
		</Card>      
    );
}

const styles = StyleSheet.create({
	chordBox: {
		flex: 1,
		display: 'flex',
		backgroundColor: 'orange',
		margin: 2,
		// shadowColor: "#000",
		// shadowOffset: {
		// 	width: 0,
		// 	height: 2,
		// },
		// shadowOpacity: 0.23,
		// shadowRadius: 2.62,
		// elevation: 4,
	}
})