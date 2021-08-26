import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Divider } from 'react-native-paper'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 20
    },
    divider: {
        marginBottom: 40
    },
});

export class HowToScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{width: '95%'}} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
                    {/* First view needs marginTop so it doesnt mess with phones notification bar*/}
                    <View style={{marginTop: 50}}>
                    <Text style={styles.titleText}>Getting Started with Chordeographer!</Text>
                    </View>

                    <Divider style={styles.divider}/>

                    <View style={{marginTop: 50}}>
                    
                        <Text style={styles.titleText}>Explaination the key and mode:</Text>
                        <Text style={styles.titleText}>Key</Text>
                        <Text>A key is a group of pitches in your music.</Text>
                        <Text>The choosen key of a song marks the most stable sound of the song, which will be considered the "Home note".</Text>

                        <Divider style={styles.divider}/>

                        <Text style={styles.titleText}>Mode</Text>
                        <Text >A mode is the scale of your music.</Text>
                        <Text>Modes are a way to reorganize the pitches of a scale so that the focal point of the scale changes.</Text>
                       
                        <Divider style={styles.divider}/>

                        <Text style={styles.titleText}>Mode Explanation:</Text>

                        <Text style={styles.titleText}>Major</Text>
                        <Text style={{marginBottom: 15}}>Generally, songs in major sound happier and more exiting.</Text>
                        <Text style={styles.titleText}>Minor</Text>
                        <Text>Generally, songs with in minor sound more morose and final.</Text>
                        
                    </View>
                    
                    <View style={{marginTop: 50}}>
                    
                        <Text style={styles.titleText}>Step 1: Selecting a key and mode</Text>
                        <Text style={{marginBottom: 15}}>To select a key, click the current key and choose from the dropdown menu</Text>
                        <Image 
                            style={{width: 300, height: 595, marginLeft: 30}}
                            source={require('../../assets/image/key.png')}
                        />
                        <Text style={{marginBottom: 15}}>To select a mode, adjust the slider from Major and Minor.</Text>
                        <Image 
                            style={{width: 300, height: 595, marginLeft: 30}}
                            source={require('../../assets/image/mode.png')}
                        />
                        <Text style={{marginBottom: 15}}>For more advanced users, select the "Advanced mode" checkbox, which will provide a dropdown of all 7 modes.</Text>
                        <Image 
                            style={{width: 300, height: 595, marginLeft: 30}}
                            source={require('../../assets/image/advanced.png')}
                        />
                    </View>

                    
                    

                    <Divider style={styles.divider}/>

                    <View style={{marginTop: 50}}>
                    
                        <Text style={styles.titleText}>Step 2: Playing and changing chords</Text>
                        <Text style={{marginBottom: 15}}>To edit a chord in your current loop, select the "Edit" button. </Text>
                        <Image 
                            style={{width: 300, height: 595, marginLeft: 30}}
                            source={require('../../assets/image/editButton.png')}
                        />
                        <Text style={{marginBottom: 15}}>Then click the chord you want to change, and select the new chord from the dropdown menu.</Text>
                        <Image 
                            style={{width: 300, height: 595, marginLeft: 30}}
                            source={require('../../assets/image/editChord.png')}
                        />
                        <Text style={{marginBottom: 15}}>To play the chords from a loop, select the "Play" button.</Text>
                        <Image 
                            style={{width: 300, height: 595, marginLeft: 30}}
                            source={require('../../assets/image/play.png')}
                        />
                        <Text style={{marginBottom: 15}}>To save the chord changes, click "Save loop changes".</Text>
                        <Image 
                            style={{width: 300, height: 595, marginLeft: 30}}
                            source={require('../../assets/image/saveLoop.png')}
                        />
                    </View>

                    <Divider style={styles.divider}/>

                    <View style={{marginTop: 50}}>
                    
                        <Text style={styles.titleText}>Step 3: Managing Progressions</Text>
                        <Text style={{marginBottom: 15}}>To add a loop to a current progression select the "New Loop" button. </Text>
                        <Image 
                            style={{width: 300, height: 595, marginLeft: 30}}
                            source={require('../../assets/image/newLoop.png')}
                        />
                        <Text style={{marginBottom: 15}}>To delete a loop from a current progression, access the "Edit" menu of the loop, and select "Delete".</Text>
                        <Image 
                            style={{width: 300, height: 595, marginLeft: 30}}
                            source={require('../../assets/image/delete.png')}
                        />
                    </View>

                    <Divider style={styles.divider}/>

                    <View style={{marginTop: 50}}>
                    
                    <Text style={styles.titleText}>Advanced Features: Saving Projects</Text>
                    <Text style={{marginBottom: 15}}>To use advanced features, sign in to the application by using the "Settings" page </Text>
                    <Image 
                        style={{width: 300, height: 595, marginLeft: 30}}
                        source={require('../../assets/image/signUp.png')}
                    />
                    <Text style={{marginBottom: 15}}>To save the current progression as a project, select "Save Progression"</Text>
                    <Image 
                        style={{width: 300, height: 595, marginLeft: 30}}
                        source={require('../../assets/image/saveProg.png')}
                    />
                    <Text style={{marginBottom: 15}}>To select a previously created project, click the current project dropdown.</Text>
                    <Image 
                        style={{width: 300, height: 595, marginLeft: 30}}
                        source={require('../../assets/image/project.png')}
                    />
                </View>

                    <Divider style={styles.divider}/>

                    {/* Last view needs marginBottom so it doesnt merge into the bottom of the phone screen*/}
                    <View style={{marginBottom: 50}}>
                    <Text style={styles.titleText}>Enjoy using Chordeographer!</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}