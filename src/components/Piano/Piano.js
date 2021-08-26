import _ from 'lodash';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Key } from './Key';
import { NOTES, VALID_KEYS, KEY_TO_NOTE } from './Constants'


class Piano extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        pressedKeys: [],
      };
    }
    
  
    render() {
      let isOctaveOne = true;

      const keys = _.map(NOTES, (note, index) => {
        if (index > 11) {
          isOctaveOne = false;
        }
        return (
          <Key
            key={index}
            id={index+'id'}
            note={note}
            // pressedKeys={this.state.pressedKeys}
            octaveOne={isOctaveOne}
            triggerNote={this.props.triggerNote}
            flatCSS={this.props.flatCSS}
            naturalCSS={this.props.naturalCSS}
            specialNaturalCSS={this.props.specialNaturalCSS}
          />
        );
      });
  
      return (
        <View>
          <View style={styles.piano}>
            {keys}
          </View>
        </View>
      );
    }
  }
  
  export { Piano };









// export function Piano() {
//     return (
//         <View style={styles.piano}>
//             <Key note="c4"/>
//             <Key note="df4"/>
//             <Key note="d4"/>
//         </View>
//     );
// }

const styles = StyleSheet.create({
    piano: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 22.5,
    },
})