import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Header, Loading, TextInput} from '../../components/molecules';
import {Button, Gap} from '../../components/atoms';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {showMessage} from 'react-native-flash-message';

const SignIn = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const onSubmit = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        // console.log(user);
        setLoading(false);
        showMessage({
          message: 'Login Berhasil',
          type: 'success',
        });
        navigation.navigate('Home', {uid: user.uid});
      })
      .catch(error => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        showMessage({
          message: error.message,
          type: 'danger',
        });
      });
  };
  return (
    <>
      <View style={styles.container}>
        <Header text="Sign In" />
        <View style={styles.contentWrapper}>
          <TextInput
            label="Email Addres"
            placeholder="Type your email address"
            onChangeText={value => setEmail(value)}
          />
          <Gap height={16} />
          <TextInput
            label="Password"
            placeholder="Type your password"
            onChangeText={value => setPassword(value)}
            secureTextEntry={true}
          />
          <Gap height={24} />
          <Button text="Sign In" onPress={onSubmit} />
          <Gap height={12} />
          <Button
            text="Create New Account"
            color="#8D92A3"
            textColor="#FFFFFF"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    marginTop: 24,
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 25,
  },
});
export default SignIn;
