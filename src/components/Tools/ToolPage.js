import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native';
import { KeyBox } from './KeyBox'
import { ProjSelector } from './ProjSelector'

export function ToolPage(props) {
    const [currOption, setOption] = useState(true);
    const[status, switchStatus] = useState(false);

    return(
        <View style={styles.container}>

            <View style={styles.keyBox}>
                <KeyBox 
                    currOption={!currOption} 
                    useKey={props.useKey}
                    useMode={props.useMode}
                    grabKey={props.grabKey} 
                    grabMode={props.grabMode} 
                    status={status} switchStatus={switchStatus}/>
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },

    keyBox: {
        display: 'flex',
        flexDirection: 'row',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
})