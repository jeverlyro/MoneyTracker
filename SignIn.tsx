import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import React, {useState} from 'react';
import Input from './components/Input';
import Button from './components/Button';
import Title from './components/Title';

const SignIn = () => {
  // let title = 'Welcome';
  const [title, setTitle] = useState('Welcome');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const handleClick = () => {
    // title = 'Selamat Datang';
    setTitle('Selamat Datang');
    const data = {
      userName: userName,
      password: password,
    };
    console.log(data);
  };
  const handleUserName = e => {
    setUserName(e);
  };
  const handlePassword = e => {
    setPassword(e);
  };
  return (
    <View style={styles.container}>
      <Title title={title} />
      <Input
        label="Username"
        placeholder="Masukan username anda"
        onChangeText={handleUserName}
      />
      <Input
        label="Password"
        placeholder="Masukan password anda"
        onChangeText={handlePassword}
        secureTextEntry={true}
      />
      {/* <Input label="Address" placeholder="Masukan alamat anda" /> */}
      <Button label="Sign In" onPress={handleClick} />
      <Button label="Register" color="green" />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    margin: 20,
  },
});
