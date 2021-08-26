import { Card, Button } from 'react-native-paper'
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
// import AudioPlayer from './AudioPlayer';
import Chordbox from './Chordbox';
import SwapInfo from './SwapInfo'
import getAllSuggestions from '../Script/Suggest'
import getAllDescriptions from '../Script/Suggest2';
import SuggestList from './SuggestList';

// TURN INTO STYLESHEET
// function getModalStyle() {
// 	const top = 50;
// 	const left = 50;

// 	return {
// 		top: `${top}%`,
// 		left: `${left}%`,
// 		transform: `translate(-${top}%, -${left}%)`,
// 	};
// }


// TURN INTO STYLESHEET
// const useStyles = makeStyles((theme) => ({
// 	paper: {
// 		position: 'absolute',
// 		width: 500,
// 		height: 500,
// 		backgroundColor: theme.palette.background.paper,
// 		boxShadow: theme.shadows[5],
// 		padding: theme.spacing(2, 4, 3),
// 	},
// }));

const ChordSelector = ({id, loopData, updateLoop, useKey, useMode, setVisibility }) => {

	// A state that controls a temp version of the progression we are creating/editing
	const [customLoop, setCustom] = useState(loopData.progression)

	// Holds the current list of suggestions for the currently selected chord
	const [suggestions, setSuggest] = useState([])

	// Holds description
	const [descriptions, setDescription] = useState([])

	// The index of the chord we are currently choosing to index.
	const [selectedIndex, setSelected] = useState(0)
	
	// Handles what position in the progression that we are working in
	const [toEdit, setEdit] = useState(0)

	const [title, setTitle] = useState(loopData.title || "")

	const [bpm, setBPM] = useState(loopData.bpm || "")

	const reset = loopData

	// This will trigger the suggestion function for this particular chord progression
	// If we swap out a chord, the present chord's current list of suggestions will be
	// inaccurate; reload its suggestion

	// useEffect(() => {
	// 		console.log('key before suggest'+useKey)
	// 		let res = getAllSuggestions(customLoop[0], customLoop[1], customLoop[2], customLoop[3], toEdit+1, useKey, useMode)
	// 		let res2 = getAllDescriptions(customLoop[0], customLoop[1], customLoop[2], customLoop[3], toEdit+1, useKey, useMode)
		
	// 		console.log('res1'+res)
	// 		console.log('res2'+res2)
	
	// 		setSuggest(res)
	// 		setDescription(res2)
	// 		setSelected(0)
			
	// }, [])

	useEffect(() => {
		
	// 	// Dillon's functions use 1-indexing, so bump this number up by 1
		let res = getAllSuggestions(customLoop[0], customLoop[1], customLoop[2], customLoop[3], toEdit+1, useKey, useMode)
		let res2 = getAllDescriptions(customLoop[0], customLoop[1], customLoop[2], customLoop[3], toEdit+1, useKey, useMode)
	
		console.log('res1'+res)
		console.log('res2'+res2)

		setSuggest(res)
		setDescription(res2)
		setSelected(0)
		
	}, [toEdit, customLoop])


	const handleListClick = (event, index) => {
	
		console.log("In handleListClick")
		console.log(index)
		setSelected(index);
	};

	// Takes a chord in the progression, and swaps it out with a selected chord from the
	// suggestions list
	const swapChords = () => {
		let temp = [...customLoop]
		temp[toEdit] = suggestions[selectedIndex]
		setCustom(temp)
	}

	const updateWrapper = () => {
		setVisibility(false)
		updateLoop(id, customLoop, title, setVisibility)
	}

	let t = suggestions[selectedIndex]

	return (
		<View>
			{/* We need to display all 4 chords */}

			{/* Make them selectable */}

			{/* Highlight the ones adjacent to it */}

			{/* Render out Dillon's function return */}
			
			<View style={{}} >

				<View style={{display: 'flex', flexDirection:'column'}}>

					{/* <View>
						<AudioPlayer progression={loopData.progression}/>
						<Button icon='play' />
					</View> */}

					<View style={{justifyContent: 'center', alignContent:'center' }}>
						<View style={{ justifyContent: 'center', alignContent:'center', display: 'flex', flexDirection:'row' }}>
							{
								loopData && customLoop.map((singleChord, position) => {
									return (
										<View key={position} style={{ width: 80, flex: 1 }}>
											<Card onPress={() => setEdit(position)} style={{ justifyContent: 'center', alignContent:'center', margin: 5}}> 
												<Text style={{ 
													height: 55, 
													display: 'flex',
													alignSelf: 'center',
													marginTop: '40%' 
													}}>
														
														{singleChord}
												</Text>
											</Card>
										</View>
									)
								})
							}

						</View>	
					</View>

					<View>
						<View style={{display: 'flex', flexDirection:'row'}}>
							<View>
								<SuggestList 
									suggestions={suggestions} 
									selectedIndex={selectedIndex} 
									handleListClick={handleListClick}
								/>
							</View>

							<View>
								{
									console.log(descriptions[0])
								}
								{
									<SwapInfo beforeChord={customLoop[toEdit]} afterChord={suggestions[selectedIndex]} description={descriptions[selectedIndex]} swapChords={swapChords}/>
									// <SwapInfo beforeChord={customLoop[toEdit]} suggestions={suggestions} swapChords={swapChords}/>

								}

							</View>
						</View>
					</View>

					<View style={{display:'flex', justify:"flex-end" }}>
						<Button onPress={() => updateWrapper()}>
							Save Loop Changes
						</Button>
					</View>

				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
    container: {

	},
})

export default ChordSelector
