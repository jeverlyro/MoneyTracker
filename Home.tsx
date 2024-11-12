import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import Title from './components/Title';
import axios from 'axios';

const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get('https://reqres.in/api/users?page=2')
      .then(res => setUsers(res.data.data))
      .catch(error => console.log(error));
  }, []);
  return (
    <View style={styles.container}>
      <Title title="Home" />
      {users.map(({id, first_name}) => {
        return (
          <>
            <Text style={styles.text}> {`${id} ${first_name}`}</Text>
            <Image />
          </>
        );
      })}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontSize: 22,
  },
});
