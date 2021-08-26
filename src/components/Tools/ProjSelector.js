import _ from 'lodash';
import axios from 'axios';
import { View, Text, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Card, Menu, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function ProjSelector(props) {

	useEffect(() => {
		getData()
	}, [props.mainBPM]) 

	useEffect(() => {
		getData()
	}, []) 

	let inf = null;

	// Get User cookie info	
	const [projects, setProjects] = useState([]);
	const [project, setProject] = useState({});

	// Project Dropdown
	const [currProj, setProj] = useState('Projects');
	const [menuVis, setVis] = useState(false);
	const openMenu = () => setVis(true);
	const onlyCloseMenu = () => setVis(false); 
	const closeMenu = (projTitle, projId) => { 
		handleChange(projId)
		setProj(projTitle)
		setVis(false); 
	}

	async function getUID() {
		const value = await AsyncStorage.getItem('@user_id')
		if(value !== null) {
			console.log('uid es '+value)
			return value;
		}
		else
			console.log('error getting user id')
	}

    async function getData () {
        try {
          const value = await AsyncStorage.getItem('@user_id')
		  
          if(value !== null) {
            console.log("uid is "+value)
			let inf = value;

			axios.post(`https://chordeo-grapher.herokuapp.com/user/get-projects`,
			{
				id: inf
			})
			.then(function (response) {
				// console.log("api call in project selector");
				console.log('logging data '+response.data.projects);
			
				response.data.projects.sort(function(a, b) {
					var titleA = a.title.toUpperCase();
					var titleB = b.title.toUpperCase();
					if (titleA < titleB) {
						return -1;
					}
					if (titleA > titleB) {
						return 1;
					}
				
					return 0;
				});

				setProjects(response.data.projects);
			})
			.catch(function (error) {
				console.log("Error in api call in project selector.");
				console.log(error);
				console.log("inf is "+inf)
			})

            return value;
          }
        } catch(e) {
            console.log("No values captured " + e)
        }
	}

	async function handleChange ( newValue ) {
		
		console.log("handle change in project selector");
		console.log(newValue);
		// const value = await AsyncStorage.getItem('@user_id')
		// console.log('inf '+value)
		
		axios.post("https://chordeo-grapher.herokuapp.com/user/get-project",
		{
			pid: newValue,
		}
		)
		.then(async function (response) {
			await AsyncStorage.setItem('newPID', newValue);
			console.log("api call to get a specific project in project selector");
			console.log(response.data);

			props.loadProj()
		})
		.catch(function (error) {
			console.log("error in api call in project selector to get a specific project");
			console.log(error);
		})
	};

	// Dynamically create menu items from the API response
	const menuItems = _.map(projects, (projectTitle, index) => {
        return (
		  <Menu.Item key={index} onPress={() => closeMenu(projects[index].title, projects[index].pid)} title={projects[index].title} />
        );
      });


	const [text, setText] = useState('100');
	 
	function handleBPM(event, grabBPM) {
		setText(event)
		grabBPM(event)
		console.log(event);
		console.log('in this function')
	}

	return (
        <View style={{minWidth: '75%', display: 'flex', flexDirection: 'row', maxWidth: '75%'}}>
			<Card style={{		
					shadowColor: "#000",
					shadowOffset: {
						width: 0,
						height: 1,
					},
					shadowOpacity: 0.22,
					shadowRadius: 2.22,
					elevation: 3, }}>
				<Menu
					visible={menuVis}
					contentStyle={{justifyContent: 'flex-start', alignItems: 'flex-start'}}
					onDismiss={onlyCloseMenu}
					anchor={<Button style={{marginTop: 2.5, marginBottom: 2.5}} onPress={openMenu}>{currProj}</Button>}>
					
						<Menu.Item onPress={() => closeMenu('default')} title='default' />
						{menuItems}
				</Menu>
				{/* <Button onPress={getData} >Get Data</Button> */}
			
			</Card>

			<Card style={{marginLeft: 30}}>
				<Button >BPM: </Button>
			
			</Card>
			
			<Card style={{width: 50}}>
				<TextInput
					label='BPM' 
					value={text}
					style={{marginTop: 5}}
					onChangeText={ text => handleBPM(text, props.grabBPM)}
				/>
			</Card>
        </View>
	)
};