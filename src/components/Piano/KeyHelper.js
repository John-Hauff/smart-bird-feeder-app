import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { NOTE_TO_KEY } from './Constants';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


class KeyHelper extends React.Component {

    constructor(props) {
        super(props);
    }

    // getPath = (note) => {

    // }
    
    noteIsFlat = (note) => {
        return note.length > 1;
    }
    
    keyIsPressed = (note, pressedKey) => {
        return _.includes(pressedKey, NOTE_TO_KEY[note]);
    }
    
    render () {

        function getPath(note) {
            switch (note) {
                case 'C3' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/C3.mp3');
                case 'Db3' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/Db3.mp3');
                case 'D3' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/D3.mp3');
                case 'Eb3' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/Eb3.mp3');
                case 'E3' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/E3.mp3');
                case 'F3' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/F3.mp3');
                case 'Gb3' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/Gb3.mp3');
                case 'G3' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/G3.mp3');
                case 'Ab3' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/Ab3.mp3');
                case 'A3' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/A3.mp3');
                case 'Bb3' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/Bb3.mp3');
                case 'B3' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/B3.mp3');   
                case 'C4' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/C4.mp3');
                case 'Db4' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/Db4.mp3');
                case 'D4' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/D4.mp3');
                case 'Eb4' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/Eb4.mp3');
                case 'E4' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/E4.mp3');
                case 'F4' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/F4.mp3');
                case 'Gb4' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/Gb4.mp3');
                case 'G4' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/G4.mp3');
                case 'Ab4' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/Ab4.mp3');
                case 'A4' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/A4.mp3');
                case 'Bb4' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/Bb4.mp3');
                case 'B4' : return require('../../../assets/sounds/acoustic_grand_piano-mp3/B4.mp3');
            }
        }
                
        async function testSound(setSounds, note) {

            console.log('Loading Sound');
            console.log(note);
            let soundPath = getPath(note);
            let properPath = Audio.Sound.createAsync(soundPath); 
                        
            const { sound } = await properPath;
            setSounds(sound);
    
            console.log('Playing Sound');
            await sound.playAsync(); 
 

        }
    


        let keyClassName = this.props.note;
        const noteIsFlat = this.noteIsFlat(this.props.note);
        const keyIsPressed = this.keyIsPressed(this.props.note, this.props.pressedKey)
    
        if (noteIsFlat) {
            keyClassName += "flat";
        }
    
        if (keyIsPressed) {
            keyClassName += "pressed";
        }
    
        let key;
        let note;
     

        // useEffect()
        // this.props.triggerNote{
        //     // change the CSS
        // }


        // Black Keys
        if (noteIsFlat) {
            if (this.props.octaveOne)
                note=this.props.note.toUpperCase() + '3';
            else
                note=this.props.note.toUpperCase() + '4';
            key = (
                <TouchableOpacity style={{ zIndex: 3 }} onPress={() => testSound(this.props.setSound, note)}>
                    <Text style={this.props.flatCSS}></Text>
                </TouchableOpacity>
            )
        }

        // White Keys
        else {
            // Ui adjustment if note is C or F
            if (this.props.note.includes('c') || this.props.note.includes('f')) {
                if (this.props.octaveOne)
                    note=this.props.note.toUpperCase() + '3';
                else
                    note=this.props.note.toUpperCase() + '4';
                key = (
                    <View>
                        <TouchableOpacity onPress={() => testSound(this.props.setSound, note)}>
                            <Text style={this.props.specialNaturalCSS}>
                            {/* {this.props.note} */}
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            }
            // No Ui adjustment needed
            else {
                if (this.props.octaveOne)
                    note=this.props.note.toUpperCase() + '3';
                else
                    note=this.props.note.toUpperCase() + '4';
                key = (
                    <View style={{marginLeft: -10, marginRight: -1}}>
                        <TouchableOpacity onPress={() => testSound(this.props.setSound, note)}>
                            <Text style={this.props.naturalCSS}>
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            }
        }

        return key;
    }
}

export { KeyHelper };

const styles = StyleSheet.create({
    keyTextNotActivated: {
        margin: 10,
        backgroundColor: 'white',
        height: 100,
        width: 27,
        borderColor: 'grey',
        borderWidth: 1.5,
        borderRadius: 0,
        marginLeft: -1,
        zIndex: 1,
    },

    keyTextActivated: {
        margin: 10,
        backgroundColor: 'lightblue',
        height: 100,
        width: 27,
        borderColor: 'grey',
        borderWidth: 1.5,
        borderRadius: 0,
        marginLeft: -1,
        zIndex: 1,
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
        marginRight: -19,
        height: 65,
        width: 15,
    }


})