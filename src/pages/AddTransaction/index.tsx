import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Button, Gap} from '../../components/atoms';
import {Header, TransactionCard, TextInput} from '../../components/molecules';
import {getDatabase, ref, push, set} from 'firebase/database';
import moment from 'moment';
import {showMessage} from 'react-native-flash-message';

const AddTransaction = ({navigation, route}) => {
  const {title, uid} = route.params;

  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');

  const onSave = () => {
    const db = getDatabase();
    const transactionRef = ref(db, `transactions/${uid}`);
    const newTransactionRef = push(transactionRef);
    set(newTransactionRef, {
      date: moment().format('LLL'),
      description: description,
      type: type,
      amount: amount,
      category: title,
    });

    showMessage({
      message: 'Transaksi berhasil disimpan',
      type: 'success',
    });

    navigation.navigate('Home', {uid: uid});
  };
  return (
    <ScrollView
      style={styles.pageContainer}
      showsVerticalScrollIndicator={false}>
      <Header text={title} backButton onPress={() => navigation.goBack()} />
      <View style={styles.contentWrapper}>
        <TextInput
          label="Description"
          placeholder="Add the description"
          onChangeText={value => setDescription(value)}
        />
        <Gap height={17} />
        <TextInput
          label="Type"
          placeholder="Expense / Income"
          onChangeText={value => setType(value)}
        />
        <Gap height={17} />
        <TextInput
          label="Amount"
          placeholder="Amount"
          onChangeText={value => setAmount(value)}
        />
        <Gap height={17} />
        <Button text="Save" onPress={onSave} />
        <Gap height={17} />
        <Text style={styles.subTitle}>Last 3 Transactions</Text>
        <TransactionCard
          date="17 April 2024"
          desc="Water, Food"
          price="-Rp. 400.000"
          type="debit"
        />
        <TransactionCard
          date="17 April 2024"
          desc="Office supplies"
          price="-Rp. 400.000"
          type="debit"
        />
        <TransactionCard
          date="17 April 2024"
          desc="Top Up"
          price="Rp. 400.000"
          type="credit"
        />
      </View>
    </ScrollView>
  );
};

export default AddTransaction;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  subTitle: {
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    fontSize: 16,
    marginVertical: 12,
  },
});
