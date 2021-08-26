import React, { useState } from 'react';
import { View } from 'react-native';
import { Modal, Button } from 'react-native-paper';
import ChordSelector from './ChordSelector';


// TURN INTO STYLESHEET
// const useStyles = makeStyles((theme) => ({
// 	paper: {
// 		position: 'absolute',
// 		width: 500,
// 		backgroundColor: theme.palette.background.paper,
// 		border: '2px solid #000',
// 		boxShadow: theme.shadows[5],
// 		padding: theme.spacing(2, 4, 3),
// 	},
// }));

export default function CustomModal({id, loopData, pProject, setcProject, updateLoop, hideCustomModal, visible}) {
	// const classes = useStyles();
	return (
		<View>
			<View>
				<Modal
					visible={visible}
					onDismiss={hideCustomModal}
				>
					{/* <ChordSelector id={id} loopData={loopData} pProject={pProject} setcProject={setcProject} updateLoop={updateLoop}/> */}
				</Modal>
			</View>
		</View>
	);
}
