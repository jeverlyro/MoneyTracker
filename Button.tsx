import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = () => {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.5} style={styles.button}>
        <Text style={styles.textButton}>Click Me</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'orange',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  textButton: {
    color: 'white',
    fontSize: 22,
  },
});
