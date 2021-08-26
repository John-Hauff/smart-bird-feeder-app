import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Chordbox } from './Chordbox'
import { Audio } from 'expo-av';
import { Card, Button, Portal, Modal } from 'react-native-paper';
import getChordNotes from '../Script/ChordToNote';
import ChordSelector from './ChordSelector';

import getAllSuggestions from '../Script/Suggest'
import CustomModal from './CustomModal';

function getPath(note) {
	switch (note) {
		case 'C3' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/C3.mp3');
		case 'Cs3' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/Db3.mp3');
		case 'D3' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/D3.mp3');
		case 'Ds3' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/Eb3.mp3');
		case 'E3' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/E3.mp3');
		case 'F3' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/F3.mp3');
		case 'Fs3' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/Gb3.mp3');
		case 'G3' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/G3.mp3');
		case 'Gs3' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/Ab3.mp3');
		case 'A3' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/A3.mp3');
		case 'As3' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/Bb3.mp3');
		case 'B3' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/B3.mp3');   
		case 'C4' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/C4.mp3');
		case 'Cs4' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/Db4.mp3');
		case 'D4' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/D4.mp3');
		case 'Ds4' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/Eb4.mp3');
		case 'E4' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/E4.mp3');
		case 'F4' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/F4.mp3');
		case 'Fs4' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/Gb4.mp3');
		case 'G4' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/G4.mp3');
		case 'Gs4' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/Ab4.mp3');
		case 'A4' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/A4.mp3');
		case 'As4' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/Bb4.mp3');
		case 'B4' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/B4.mp3');
	}
}
		
function triggerPianoKey(note, triggerNote) {
	triggerNote(note)
	return
}

async function triggerNoteAudio(note, setSound, mainBPM) {
	// console.log('Loading Sound');
	if(note.includes('sharp')) {
		note = note[0] + 's' + '3'
		console.log('Hello!')
	}
	const beatsPerMinute = (60 * 1000 ) / mainBPM
	console.log('bpm : '+mainBPM);
	
	let soundPath = getPath(note);
	let properPath = Audio.Sound.createAsync(soundPath); 
	const { sound } = await properPath;
	setSound(sound);

	console.log('Playing Sound');
	await sound.playAsync();

	// change notes color temporarily
	// triggerPianoKey(note);

	await new Promise(resolve => setTimeout(resolve, beatsPerMinute));
	sound.unloadAsync(); 
}

async function playLoopAudio(data, setSound, mainBPM) {
	let i = 0
	let j = 0
	const beatsPerMinute = (60 * 1000 ) / mainBPM


	for(i = 0; i < 4; i++) {
		// Break the chord into notes
		let chordNotes = getChordNotes(data.progression[i]);

		// Loop over the chord notes and 
		for(j = 0; j < chordNotes.length; j++) {
			chordNotes[j] = chordNotes[j] + '3'
		}

		for(j = 0; j < chordNotes.length; j++)
			triggerNoteAudio(chordNotes[j], setSound, mainBPM);

		await new Promise(resolve => setTimeout(resolve, beatsPerMinute));
	}
}

export function ProgLoop (props) {
	const containerStyle = {
        backgroundColor: 'white', 
        paddingTop: 5, 
        paddingBottom: 5, 
        marginLeft: '1.5%', 
        width: '97%',

        shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.44,
		shadowRadius: 6.62,
		elevation: 8,
    }

	// Formula for BPM
	// let bpm = (60 * 1000 / 4) / tempo;
	const [bpm, setBPM] = useState();
	const [sound, setSound] = useState();
	const [visible, setVisibility] = useState(false);
	
	function showEditModal () { 
		setVisibility(true)
	}
	
	function hideEditModal () { 
		setVisibility(false)
	}

	function showSuggestions(chord) {
		let suggestions = getAllSuggestions(chord, null, null, null, 1, 'C', 1)
		console.log(suggestions)
	}

	return (
		<View style={{ display: 'flex', width: '100%', flex: 1 }}>
			<Portal>
                <Modal visible={visible} onDismiss={hideEditModal} contentContainerStyle={containerStyle}>
                    {/* <View style={{display: 'flex', flexDirection: 'row'}}>  
          			{
						props.loopData.chords.map(singleChord =>
							{
								return (
									<TouchableOpacity style={styles.chordBox} onPress={() => showSuggestions(singleChord)}>
										<Text style={styles.chord}>{singleChord}</Text>
									</TouchableOpacity>
								)
							}
						)
					}
                    </View> */}
					<ChordSelector id={props.id} loopData={props.loopData} updateLoop={props.updateLoop} useKey={props.useKey} useMode={props.useMode} setVisibility={setVisibility}/>

					<Button onPress={() => props.deleteLoop(props.id)} style={styles.editButton}>Delete</Button>
                </Modal>
				<CustomModal/>
            </Portal>
			<View style={styles.chordContainer}>
				{
					props.loopData.progression.map( (singleChord, index) =>
						{
							return (
								<Card key={index} style={styles.chordBox}> 
									<Text style={styles.chord}>{singleChord}</Text>
								</Card>
							)
						}
					)
				}
				<View style={styles.buttons}>
					<Button onPress={() => playLoopAudio(props.loopData, setSound, props.mainBPM)} style={styles.editButton} icon='play'></Button>
					<Button onPress={() => showEditModal()} style={styles.editButton} icon='pencil'></Button>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
    chordContainer: {
		display: 'flex',
		flexDirection: 'row',
		flex: 0.5,
		width: '95%',
		backgroundColor: 'white',
		borderRadius: 10,
		marginTop: 3,
		marginBottom: -75,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
    },

	chordBox: {
		display: 'flex',
		flex: 1,
		marginTop: '4%',
		height: '70%',
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 5,
		marginRight: 0,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 2,
	},

	chord: {
		display: 'flex',
		flex: 1,
		textAlignVertical: 'center',
	},

	buttons: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: -10,
	},

	editButton: {
		marginBottom: -5,
		marginTop: -5,
		marginRight: -10
	},
})