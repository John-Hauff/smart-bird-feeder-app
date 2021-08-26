import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { NOTE_TO_KEY } from './Constants';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { KeyHelper } from './KeyHelper';


export function Key(props) {
    
    const [sound, setSound] = useState();

    return (
        <View>
            <KeyHelper  
                key={props.index}
                note={props.note}
                pressedKeys={props.pressedKeys} 
                sound={sound} 
                setSound={setSound}
                octaveOne={props.octaveOne}
                triggerNote={props.triggerNote}
                flatCSS={props.flatCSS}
                naturalCSS={props.naturalCSS}
                specialNaturalCSS={props.specialNaturalCSS}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    keyText: {
        margin: 10,
        backgroundColor: 'white',
        height: 100,
        width: 27,
        borderColor: 'grey',
        borderWidth: 1.5,
        borderRadius: 0,
    },

    keyTextForC: {
        margin: 10,
        backgroundColor: 'white',
        height: 100,
        width: 27,
        borderColor: 'grey',
        borderWidth: 1.5,
        borderRadius: 0,
        marginLeft: -12
    },  

    keyPressed:{
        backgroundColor: '#00d8ff',
    },

    keyFlat: {
        backgroundColor: 'black',
        marginTop: 11,
        marginLeft: -18,
        marginRight: -18,
        height: 65,
        width: 15,
        zIndex: 2,
    }


})