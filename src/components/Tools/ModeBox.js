import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native';
import {
	Card
} from 'react-native-paper'

const marks = [
	{
		value: 0,
		label: 'Sad',
		mode: 'Locrian'
	},
	{
		value: 1,
		mode: 'Phrygian'
	},
	{
		value: 2,
		mode: 'Aeolian'
	},
	{
		value: 3,
		mode: 'Dorian'
	},
	{
		value: 4,
		mode: 'Myxolydian'
	},
	{
		value: 5,
		mode: 'Ionian'
	},
	{
		value: 6,
		label: 'Happy',
		mode: 'Lydian'
	}
]

export function ModeBox ({setOption, currOption, grabMode, status, switchStatus}){

	const[currMode, setMode] = useState('Ionian'); // lists options of modes
	const[modeState, modeSwitch] = useState(false); // enables option for mode

	// const handleOption = (event, val) => {

	// 	let temp = marks[val].mode;
	// 	setMode(temp);
	// 	grabMode(marks[val].value);
	// };

	// const handleCheck = () => {
	// 	modeSwitch(!modeState);
	// 	setOption(modeState);
	// 	setToSwitchVal();

	// }

	// const setToSwitchVal = () => {
	// 	if (!status) {
	// 		grabMode(5);
	// 		setMode(marks[5].mode);
	// 	}
	// 	else {
	// 		grabMode(2);
	// 		setMode(marks[2].mode);
	// 		switchStatus(status);
	// 	}	
	// }

	// function valueLabelFormat(value) {
	// 	return marks.findIndex((mark) => mark.value === value) + 1;
	//   }

	return(
		<View style={styles.divBox}>
			<Card style={styles.root}>
				{/* <section className={boxClasses.sectionBox}>
					<Card className={cardClasses.child}>
						<FormControlLabel
							value="Mode"
							control={
								<Typography 
									variant="body1"
									className={boxClasses.modeLabel}
								>
									{currMode}
								</Typography>
							}		
						/>
					</Card>

					<Slider
						className={boxClasses.slide}
						color="secondary"
						defaultValue={5}
						min={0}
						max={6}
						aria-labelledby="discrete-slider-restrict"
						step={null}
						marks={marks}
						valueLabelDisplay="auto"
						valueLabelFormat={valueLabelFormat}
						track='false'
						key={5}
						onChange={handleOption}
					/>
				</ section>  */}
			</Card>

			<Card style={styles.check}>
				 {/* <FormControlLabel
					className={boxClasses.advanced}
					value="ModeCheck"
					control={
						<Checkbox
							color="secondary"
							onChange={handleCheck}
							checked={modeState}
						/>
					}
					label="Mode"
					labelPlacement="end"
				/> */}
			</Card>
		</View>
	)
}

const styles = StyleSheet.create({
	sectionBox: {
		display: 'flex',
		height: 10,
	},

	divBox: {
		display: "flex",
		justifyContent: 'flex-end',
	},

	advanced: {
		justifyContent:"center",
		width: 50,
		height: 40,
		marginLeft: 20,
	},

	modeLabel: {
		height: 1,
		marginLeft: 25
	},

	slide: {
		display: 'flex',
		marginLeft: 10,
		marginTop: 15,
		width: 400,
	}
});