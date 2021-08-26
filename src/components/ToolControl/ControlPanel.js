import React, { useEffect, useState } from 'react'
import { LoopBox } from '../Looper/LoopBox'
import { ToolPage } from '../Tools/ToolPage'
import { View, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-paper' 
import { Piano } from '../Piano/Piano'

const styles = StyleSheet.create({
  
    pianoContainer:
    {
      flex: 0.15,
      backgroundColor: 'grey',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '93.5%',
      margin: 10,
      marginBottom: -20,

      shadowColor: "#000",
		  shadowOffset: {
			  width: 0,
			  height: 5,
		  },
		  shadowOpacity: 0.22,
		  shadowRadius: 2.22,
		  elevation: 10,
    },

    loopContainer: {
      display: 'flex',
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      width: '95%',
      margin: 10,
      maxHeight: '100%',
      minHeight: '0%',
      marginBottom: -90,
    //   position: 'relative',
    },

    toolPageContainer: {
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      width: '95%',
      shadowColor: "#000",
      marginTop: 50,
      marginBottom: -100,
		  shadowOffset: {
			  width: 0,
			  height: 1,
		  },
		  shadowOpacity: 0.22,
		  shadowRadius: 2.22,
		  elevation: 3,
    },
})

const naturalNotActivated = StyleSheet.flatten([
    styles.keyTextNotActivated, {
        margin: 10,
        backgroundColor: 'white',
        height: 100,
        width: 27,
        borderColor: 'grey',
        borderWidth: 1.5,
        borderRadius: 0,
        marginLeft: -1,
        zIndex: 1,
    }

])

const naturalIsActivated = StyleSheet.flatten([
    styles.keyTextActivated, {
        margin: 10,
        backgroundColor: 'lightblue',
        height: 100,
        width: 27,
        borderColor: 'grey',
        borderWidth: 1.5,
        borderRadius: 0,
        marginLeft: -1,
        zIndex: 1,
    }

])

const flatNotActivated = StyleSheet.flatten([
    styles.keyFlatNotActivated, {
        backgroundColor: 'black',
        marginTop: 11,
        marginLeft: -18,
        marginRight: -19,
        height: 65,
        width: 15,
    }

])

const flatIsActivated = StyleSheet.flatten([
    styles.keyFlatActivated, {
        backgroundColor: 'blue',
        marginTop: 11,
        marginLeft: -18,
        marginRight: -19,
        height: 65,
        width: 15,
    }

])

const specialNotActivated =  StyleSheet.flatten([
    styles.specialKeysNotActivated, {
        margin: 10,
        backgroundColor: 'white',
        height: 100,
        width: 27,
        borderColor: 'grey',
        borderWidth: 1.5,
        borderRadius: 0,
        marginLeft: -12
    }
])

const specialIsActivated = StyleSheet.flatten([
    styles.specialKeysActivated, {
        margin: 10,
        backgroundColor: 'lightblue',
        height: 100,
        width: 27,
        borderColor: 'grey',
        borderWidth: 1.5,
        borderRadius: 0,
        marginLeft: -12
    }
])


export default function ControlPanel() {

    const [useKey, grabKey] = useState('C')
    const [useMode, grabMode] = useState(1)
    const [mainBPM, grabBPM] = useState(100)

    const [noteToPress, triggerNote] = useState('')
    const [flatCSS, changeFlatState] = useState(flatNotActivated)
    const [naturalCSS, changeNaturalState] = useState(naturalNotActivated)
    const [specialNaturalCSS, changeSpecialState] = useState(specialNotActivated)

    useEffect(() => {
        if(noteToPress != '')
            changeFlatState(flatIsActivated)
        else
            changeFlatState(flatNotActivated)
        return () => { null };
    }, [noteToPress]);

    return (
        <View style={{display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', width: '100%'}}>
            <View style={styles.pianoContainer}>
                <Piano 
                    flatCSS={flatCSS} 
                    naturalCSS={naturalCSS} 
                    specialNaturalCSS={specialNaturalCSS}
                />
            </View>
            <View style={styles.loopContainer}>
                <View style={{width: '95%',
                            marginTop: 30,
                            marginBottom: -90,
                     }}>
                    <ToolPage 
                        useKey={useKey}
                        useMode={useMode}
                        grabKey={grabKey} 
                        grabMode={grabMode}
                        />
                </View>
                <LoopBox 
                    useKey={useKey} 
                    useMode={useMode} 
                    mainBPM={mainBPM}
                    grabBPM={grabBPM}
                    grabKey={grabKey}
                    grabMode={grabMode}
                    triggerNote={triggerNote}
                />
            </View>
        </View>
    )
}
