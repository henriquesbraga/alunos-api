import React from 'react';
import {View, TextInput} from 'react-native';

const InputText = (props) => {
  return (
    <View
      style={{
        marginLeft: 0,
        marginRight: 0,
        marginTop: 10,
        borderColor: '#2D2E32',
        borderWidth: 0.5,
        borderRadius: 5,
        height: 40,
      }}>
      <TextInput
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        placeholderTextColor="#757593"
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        returnKeyType={props.returnKeyType}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        onSubmitEditing={props.onSubmitEditing}
        style={props.style}
        blurOnSubmit={false}
        value={props.value}
        autoCapitalize={props.autoCapitalize}
      />
    </View>
  );
};

export default InputText;
