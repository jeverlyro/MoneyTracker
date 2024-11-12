import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Button, Gap} from '../../components/atoms';
import {DummyPhoto} from '../../assets/icon';
import {getDatabase, ref, onValue} from 'firebase/database';
import Rupiah from '../../utils/Rupiah';

const Home = ({navigation, route}) => {
  const {uid} = route.params;
  const [fullName, setFullName] = useState('');
  const [cashInBank, setCashInBank] = useState(0);
  const [cashInHand, setCashInHand] = useState(0);
  const [total, setTotal] = useState(0);
  const [photo, setPhoto] = useState(DummyPhoto);

  useEffect(() => {
    const db = getDatabase();
    const userRef = ref(db, 'users/' + uid);
    onValue(userRef, snapshot => {
      const data = snapshot.val();
      setPhoto({uri: data.photo});
      setFullName(data.fullName);
      setCashInBank(data.balance.cashInBank);
      setCashInHand(data.balance.cashInHand);
      setTotal(data.balance.total);
    });
  }, []);

  return (
    <View style={styles.pageContainer}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.appTitle}>{`Hi, ${fullName}`}</Text>
          <Text style={styles.appSubTitle}>
            Have you track your money today?
          </Text>
        </View>
        <Image source={photo} style={styles.photo} />
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.subTitle}>Your Balance</Text>
        <Text style={styles.totalBalance}>{Rupiah(total)}</Text>
        <View style={styles.line} />
        <View style={styles.subTotalWrapper}>
          <Text style={styles.subTotal}>Cash On Hand</Text>
          <Text style={styles.subTotal}>{Rupiah(cashInHand)}</Text>
        </View>
        <View style={styles.subTotalWrapper}>
          <Text style={styles.subTotal}>Cash On Bank</Text>
          <Text style={styles.subTotal}>{Rupiah(cashInBank)}</Text>
        </View>
        <Text style={styles.subTitle}>Add Transaction</Text>
        <Button
          text="Cash On Hand"
          onPress={() =>
            navigation.navigate('AddTransaction', {
              title: 'Cash On Hand',
              uid: uid,
            })
          }
        />
        <Gap height={10} />
        <Button
          text="Cash On Bank"
          onPress={() =>
            navigation.navigate('AddTransaction', {
              title: 'Cash On Bank',
              uid: uid,
            })
          }
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  contentWrapper: {
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    flex: 1,
  },
  subTitle: {
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    fontSize: 16,
    marginVertical: 12,
  },
  totalBalance: {
    fontFamily: 'Poppins-SemiBold',
    color: '#000000',
    fontSize: 24,
    textAlign: 'center',
  },
  line: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    marginVertical: 18,
  },
  subTotalWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subTotal: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#000000',
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 37,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
    color: '#020202',
  },
  appSubTitle: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    color: '#8D92A3',
  },
  photo: {
    height: 70,
    width: 70,
    borderRadius: 10,
  },
});
