import React from 'react'
import { View, Text } from 'react-native'
import {
	Button,
	Card,
	Typography
} from 'react-native-paper'

// MAKE STYLESHEET
// const useStyles = makeStyles({
// 	root: {
// 		width: "65%",
// 		position: 'absolute'
// 	}
// });

export default function SwapInfo(props) {
	// const classes = useStyles()

	return (
		<View style={{width: '78%', position: 'relative'}}>
			<Card>

				<Card.Content>
					<Text >
						Swap Out Chord
					</Text>

					<View style={{flexDirection: 'row', marginBottom: 15, marginTop: 15}}>
						<Text >
							{props.beforeChord}
						</Text>
						<Text icon='arrow'>
							{' => '}
						</Text>
						<Text >
							{props.afterChord}
						</Text>
					</View>

					<Text >
						{props.description}
					</Text>
				</Card.Content>

				<Card.Actions>
					<Button onPress={props.swapChords}>
						Swap Chords!
					</Button>
				</Card.Actions>

			</Card>
		</View>
	);
}
