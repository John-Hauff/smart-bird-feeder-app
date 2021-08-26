import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Button, Portal, Modal, HelperText, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function LoggedInDisplay(){
    const data = {
        email: '',
        password: '',
    };

    const containerStyle = {
        backgroundColor: 'white', 
        paddingTop: 5, 
        paddingBottom: 5, 
        marginLeft: '5%', 
        width: '90%',

        shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.44,
		shadowRadius: 6.62,
		elevation: 8,
    }
    
    // Open/Close Sign Up Panel
    function showModal () { 
        setVisibility(true)
    }
    
    function hideModal () { 
        setVisibility(false)
    }
    
    // LOGIN
    const [emailText, setEmailText] = useState('@');
    const onEmailChange = emailText => setEmailText(emailText);

    const [passwordText, setPasswordText] = useState('');
    const onPasswordChange = passwordText => setPasswordText(passwordText);

    // SIGNUP
    const [nicknameText, setNicknameText] = useState('@');
    const onNicknameChange = nicknameText => setNicknameText(nicknameText);

    const [signupEmailText, setSignupEmailText] = useState('@');
    const onSignupEmailChange = signupEmailText => setSignupEmailText(signupEmailText);

    const [signupPassText, setSignupPassText] = useState('!');
    const onSignupPassChange = signupPassText => setSignupPassText(signupPassText);

    const [verifyPassText, setVerifyPassText] = useState('');
    const onVerifyPassChange = verifyPassText => setVerifyPassText(verifyPassText);

    // Display users nickname when Logged in
    const [user, setUser] = useState("You are not signed in");
    const [visible, setVisibility] = useState(false);

    // Helper functions
    function emailRequirements(){
        return !emailText.includes('@');
    }

    function hasValidationErrors(){
        if(signupPassText != verifyPassText)
            return true

        return false;
    }

    function isValidPass(){
        if (!signupPassText.includes('!'))
            return true

        return false
    }

    const storeData = async (value) => {
        try {
            // const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@user_id', value)
        } 

        catch (e) {
            console.log('Couldnt store local data')
        }
    }

    // const getData = async () => {
    //     try {
    //       const value = await AsyncStorage.getItem('@storage_Key')
    //       if(value !== null) {
    //         console.log(value)
    //       }
    //     } 
        
    //     catch(e) {
    //       // error reading value
    //     }
    // }

    async function doLogin(){
        const tempUser =
        {
            email: emailText,
            password: passwordText,
        }

        console.log(emailText)
        console.log(passwordText)

        if(user != "You are not signed in") {
            try {
                // const jsonValue = JSON.stringify(value)
            } 
    
            catch (e) {
                console.log('Couldnt store local data')
            }
            setUser("You are not signed in")
            setSigninButton(0)
            setSignupButton('Sign In')
            return
        }
        // Hide text boxes
        // Change Sign in to Log Out
        // Hide sign up button

        axios.post("https://chordeo-grapher.herokuapp.com/user/signin", tempUser)
        .then( async function (response) {
            if (response.data.hasOwnProperty('message'))
            {
                console.log("Something went wrong")
                Alert.alert('invalid credentials')
                setSigninButton(0)
                setSignupButton('Sign In')
            }
            else
            {
                // console.log(response)
                console.log(response.data.nickname)
                setSigninButton(500)
                setSignupButton('Log Out')
                console.log(response.data.id)
                storeData(response.data.id)
                setUser("Welcome " + response.data.nickname)
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    async function setUserToNull() {
        await AsyncStorage.setItem('@user_id', 'one')
    }

	useEffect(() => {
        if(user == "You are not signed in") {
            try {
                // const jsonValue = JSON.stringify(value)
                console.log('in here')
                setUserToNull()
            } 
    
            catch (e) {
                console.log('Couldnt store local data')
            }
        }
    }, [])

    function doSignUp(){
        const tempUser =
        {
            nickname: nicknameText,
            email: signupEmailText,
            password: signupPassText,
        }

        axios.post("https://chordeo-grapher.herokuapp.com/user/signup", tempUser)
        .then( response =>
            {
                if(response.data.hasOwnProperty('message'))
                {
                    if (response.data.message.length == 43)
                    {
                        handleClose();
                        return;
                    }
                    setErr(response.data.message);
                }
                else
                {
                    handleClose();
                }
                
            }
        )
        .catch( err => console.log("somethings wrong mate"))

        hideModal();
    }

    const [hideSignUp, setSigninButton] = useState(0)
    const [signUpButtonText, setSignupButton] = useState('Sign In')

	const notLoggedIn = () =>
	{
		return (
			<>
			<TextInput 
                    label="Email"
                    placeholder="Email@domain.com"
                    underlineColor="#009dff"
                    onChangeText={onEmailChange}
                    style={styles.inputField}
                />
                <HelperText style={{marginBottom: 20}} type="error" visible={emailRequirements()}>
                    Email address in invalid
                </HelperText>

                <TextInput 
                    label="Password"
                    placeholder="Password"
                    underlineColor="#009dff"
                    secureTextEntry
                    right={<TextInput.Icon name="eye"/>}
                    onChangeText={onPasswordChange}
                    style={styles.inputField}
                />
                <HelperText style={{marginBottom: 20}}>
                    
                </HelperText>
			</>
		);
	}

    return(
        <View style={styles.container}>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <View>  
                        <TextInput 
                            style={styles.nicknameInput}
                            label="Nickname"
                            selectionColor="blue"
                            placeholder="ex. MusicalDude2"
                            underlineColor="#651fff"
                            onChangeText={onNicknameChange}
                        />

                        <TextInput 
                            style={styles.modalInput}
                            label="Email"
                            selectionColor="blue"
                            placeholder="Email@domain.com"
                            underlineColor="#651fff"
                            onChangeText={onSignupEmailChange}
                        />
                        <HelperText style={styles.helperInput} type="error" visible={emailRequirements()}>
                            Email address in invalid
                        </HelperText>

                        <TextInput 
                            style={styles.modalInput}
                            label="Password"
                            placeholder="Password"
                            underlineColor="#651fff"
                            // secureTextEntry
                            // right={<TextInput.Icon name="eye"/>}
                            onChangeText={onSignupPassChange}
                        />
                        <HelperText style={styles.helperInput} type="error" visible={isValidPass()}>
                            Your passwords must contain -- ! --
                        </HelperText>

                        <TextInput 
                            style={styles.modalInput}
                            label="Password"
                            placeholder="Password"
                            underlineColor="#651fff"
                            // secureTextEntry
                            // right={<TextInput.Icon name="eye"/>}
                            onChangeText={onVerifyPassChange}
                        />
                        <HelperText style={styles.helperInput} type="error" visible={hasValidationErrors()}>
                            Your passwords must match!
                        </HelperText>

                        <Button onPress={() => {doSignUp()}}>
                            Sign Up
                        </Button>

                    </View>
                </Modal>
            </Portal>
            <Text style={styles.nicknameDisplay}>{user}</Text>
            <View style={styles.loginInput}>
                {
					user.char
				}

				{user.charAt(0) === 'Y'?
					notLoggedIn():
					null
				}
                <Button style={styles.button1} icon="login" mode="contained" onPress={() => {doLogin()}}>
                    {signUpButtonText}
                </Button>
				
                </View>
                <Button visible={false} style={styles.button2, {marginLeft: hideSignUp}} onPress={showModal}>
                    Don't have an account? Create one here!
                </Button>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    button1: {
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 100,
        marginRight: 100,
        alignItems: 'center',
    },

    button2: {
        marginTop: 15,
    },

    nicknameDisplay: {
        marginBottom: 20,
    },

    loginInput: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
    },  

    inputField: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f5fcff',
        width: 300,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },

    modalInput: {
        marginRight: '10%',
        marginLeft: '10%',
        backgroundColor: '#f5fcff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },

    nicknameInput: {
        marginRight: '10%',
        marginLeft: '10%',
        marginBottom: '10%',
        marginTop: '5%',
        backgroundColor: '#f5fcff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },

    helperInput: {
        marginRight: '10%',
        marginLeft: '10%',
        marginBottom: '5%',
    }

});