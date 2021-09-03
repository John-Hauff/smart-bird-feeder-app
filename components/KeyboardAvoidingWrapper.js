import React from "react";

import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

// Takes in children property as a parameter
const KeyboardAvoidingWrapper = ({ children }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 2 }}>
      {/* Use ScrollView to ensure that we can still scroll to see
      some content when content is hidden by keyboard */}
      <ScrollView>
        {/* Use TouchableWithoutFeedback to ensure that the keyboard
        will auto-close when the user selects outside of the input field
        or the keyboard */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;
