import React from 'react';
import { LoggedInDisplay } from '../components/Login/LoggedInDisplay'
import { StyleSheet, Text, View } from 'react-native';


export class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <LoggedInDisplay/>
                <Text>{this.props.color}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});