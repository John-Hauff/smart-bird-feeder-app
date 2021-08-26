import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card, Avatar, Button, Grid, Provider } from 'react-native-paper';
import { ProgLoop } from './ProgLoop';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProjSelector } from '../Tools/ProjSelector';
import { getUnloadedStatus } from 'expo-av/build/AV';
import axios from 'axios';


const loopTemp = [
	{
		placement: 0,
		name: "Verse",
		chords: ["A_min", "C_maj", "B_maj", "F_maj"]
	},
	{
		placement: 1,
		name: "Chorus",
		chords: ["G_min", "C_dom_7", "B_min", "F_sharp_min"]
	},
	{
		placement: 2,
		name: "Bridge",
		chords: ["A_min", "C_maj", "C_sharp_maj", "F_min"]
	},
]

export function LoopBox(props){

	const curr_progression = null;

	function addNewLoop() {
		let temp = [...pProject.loops]
		let len = temp.length
		temp.push(
			{
				progression: ["A_maj", "C_maj", "A_sharp_maj", "F_min"],
				name: "1",
				placement: len,
			},
		)
		let t = {...pProject};
		t.loops = temp;
		console.log(t)
		// localStorage.setItem('curr', JSON.stringify(t));
		// console.log(localStorage.getItem('curr'))
		setcProject(t);
	}

	function deleteLoop (index) {
		console.log("In delete loop, index: "+ { index })
		let temp = {...pProject}

		if (index === -1)
			return
			
		temp.loops.splice(index, 1)
		setcProject(temp)
	}

	// NEW CODE BELOW

	async function loadProj () {
		// get object from storage
		// let t = JSON.parse(AsyncStorage.getItem('curr'));
		
		// console.log(AsyncStorage.getItem('newPID'));
		// initLoop(AsyncStorage.getItem('newPID'));
		let firstPID = await AsyncStorage.getItem('newPID')

		try
		{
			let inf = null
			
			let temp_proj = JSON.stringify(pProject)
			await AsyncStorage.setItem('curr', temp_proj)
			
			inf = await AsyncStorage.getItem('@user_id')

			let temp = await AsyncStorage.getItem('curr')
			const proj = JSON.parse(temp)

			if (inf != null)
			{	// save data in a. Wait for response to continue
				const a = await axios.post("https://chordeo-grapher.herokuapp.com/user/get-project", {pid: firstPID})
				let t = {
					pid: firstPID,
					title: a.data.title,
					loops: a.data.loops,
					dateMade: a.data.dateCreated,
					key: a.data.key,
					mode: a.data.mode,
				};
				
				// Set global Key and mode
				//  

				// update loops and current info
				props.grabKey(a.data.key)
				// props.grabMode(a.data.mode)
				setcProject(t);
			}
		}
		catch (err)
		{
			console.log("warning, error" + err);
		}
	}

	const updateLoop = (indexToUpdate, updatedProg, title) => {
		let temp = {...pProject}
		console.log(temp.loops)
		let temp1 = temp.loops[indexToUpdate].progression = updatedProg
		let temp2 = temp.loops[indexToUpdate].title = title;

		setcProject(temp)
	}

	const save = (e) =>
	{
		e.preventDefault();

		// copy over references of loops
		let t = {
			pid: pProject.pid,
			title:pProject.title,
			loops: pProject.loops,
			key: pProject.key,
			mode: pProject.mode
		}

		// post change to server
		axios.patch("https://chordeo-grapher.herokuapp.com/user/update-project", t)
		.catch(function (err) {console.log(err)} )
	}

	const [pProject, setcProject] = useState({
		pid: 0,
		title: "Unsaved Project",
		loops: [],
		dateMade: "July 1, 1990",
		key: "C",
		mode: 1
	})

	useEffect(() => {
		console.log(pProject)
		try {
            async function anon () {
				let temp_proj = JSON.stringify(pProject)
				await AsyncStorage.setItem('curr', temp_proj)
			}
        } 

        catch (e) {
            console.log('Couldnt store local data')
        }
	}, [pProject])

    return(
		<View style={styles.container}>
			<Card style={styles.loopBoxContainer}>
				<Card style={{position: 'relative', flex: 0.45, maxWidth: '75%', marginTop: 10, maxHeight: 42.5, shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 1,
						},
						shadowOpacity: 0.22,
						shadowRadius: 2.22,
						elevation: 6,
						}}>
					<ProjSelector 
						grabMode={props.grabMode} 
						grabKey={props.grabKey} 
						mainBPM={props.mainBPM}
						grabBPM={props.grabBPM}
						loadProj={loadProj}
						/>
				</Card>
				{
				pProject.loops.map((loop, index) => {
					// console.log(loop)
					return (
						<ProgLoop 
							id={index} 
							key={index}
							loopData={loop} 
							useKey={props.useKey}
							useMode={props.useMode}
							mainBPM={props.mainBPM}
							deleteLoop={deleteLoop} 
							updateLoop={updateLoop}
							setcProject={setcProject}
							// triggerNote={props.triggerNote}
							/>
						)
					})
				}
			<View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
				<Button onPress={addNewLoop}> New Loop</Button>	
				<Button onPress={save}>Save Progression</Button>	
			</View>
			</Card> 
		</View>
    );
}


const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		flex: 100,
		width: '100%',
		margin: 100,
	},

    loopBoxContainer: {
		backgroundColor: 'white',
		flex: 10,
      	alignItems: 'center',
      	justifyContent: 'center',
	  	borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
    },
})