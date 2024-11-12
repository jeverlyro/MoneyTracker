import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Header, TextInput} from '../../components/molecules';
import {Button, Gap} from '../../components/atoms';
import {NullPhoto} from '../../assets/icon';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, ref, set} from 'firebase/database';

const SignUp = ({navigation}) => {
  const [photo, setPhoto] = useState(NullPhoto);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photoBased64, setPhotoBased64] = useState('');

  const getImage = async () => {
    const result = await launchImageLibrary({
      maxWidth: 100,
      maxHeight: 100,
      quality: 0.5,
      includeBase64: true,
    });
    if (result.didCancel) {
      showMessage({
        message: 'Pilih foto dibatalkan',
        type: 'danger',
      });
      setPhoto(NullPhoto);
    } else {
      const assets = result.assets[0];
      const base64 = `data:${assets.type};base64, ${assets.base64}`;
      setPhotoBased64(base64);
      setPhoto({uri: base64});
    }
  };

  const createUser = () => {
    const auth = getAuth();
    const db = getDatabase();

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed up
        const user = userCredential.user;
        // console.log(user);
        set(ref(db, 'users/' + user.uid), {
          fullName: fullName,
          email: email,
          photo: photoBased64,
        });
        navigation.navigate('SignIn');
      })
      .catch(error => {
        showMessage({
          message: error.message,
          type: 'danger',
        });
        // ..
      });
  };

  return (
    <View style={styles.container}>
      <Header
        text="Sign Up"
        backButton={true}
        onPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.contentWrapper}
        showsVerticalScrollIndicator={false}>
        <View style={styles.profileContainer}>
          <View style={styles.profileBorder}>
            <TouchableOpacity onPress={getImage}>
              <Image source={photo} style={styles.photo} />
            </TouchableOpacity>
          </View>
        </View>
        <TextInput
          label="Full Name"
          placeholder="Type your full name"
          onChangeText={value => setFullName(value)}
        />
        <Gap height={15} />
        <TextInput
          label="Email Address"
          placeholder="Type your email address"
          onChangeText={value => setEmail(value)}
        />
        <Gap height={15} />
        <TextInput
          label="Password"
          placeholder="Type your password"
          onChangeText={value => setPassword(value)}
        />
        <Gap height={24} />
        <Button text="Continue" onPress={createUser} />
      </ScrollView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  profileBorder: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#8D92A3',
    height: 110,
    width: 110,
    borderRadius: 110 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingHorizontal: 24,
  },
  photo: {
    height: 90,
    width: 90,
    borderRadius: 90 / 2,
  },
});
