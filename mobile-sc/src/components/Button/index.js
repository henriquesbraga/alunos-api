import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {primaryColor} from '../../config/colors';

const Button = (props, {navigation}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.customClick}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: primaryColor,
    color: '#fff',
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 4,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default Button;
