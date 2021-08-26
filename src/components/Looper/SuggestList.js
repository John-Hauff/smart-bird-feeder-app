import React from 'react'
import { Text, View } from 'react-native'
import { List, Button } from 'react-native-paper'

// TURN INTO STYLESHEET
// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		float: 'left',
// 		maxWidth: "50%",
// 		backgroundColor: theme.palette.background.paper,
// 	},
// }));

const SuggestList = ({suggestions, selectedIndex, handleListClick}) => {
	// const classes = useStyles();

	return (
		<View>
			<List.Subheader>Suggestions</List.Subheader>
				{
					suggestions.map((element, index) => {
						return (
							// <List.Item
							// 	key={index}
							// 	style={{width: "fit-content"}}
							// 	value={element}
							// 	onPress={(event) => handleListClick(event, index)}
							// >
							// 	<Text>{element}</Text>
							// </List.Item>
							<Button 
								title={element}
								onPress={(event) => handleListClick(event, index)}
							>
								{element}
							</Button>
						)
					})
				}
		</View>
	)
}

export default SuggestList
