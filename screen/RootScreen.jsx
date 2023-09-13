import axios from 'axios';
import React, {useState} from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import {  useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { userStore } from '../store/rootStore';
import { StatusBar } from 'expo-status-bar';
import SvgScreen from './SvgScreen';

const RootScreen = observer(() => {
  const [phone, setPhone] = useState('');
  const nav = useNavigation()
  const styles = StyleSheet.create({
    btn: {
      backgroundColor: '#d2691e',
      width: '40%',
      height: '25%',
      marginHorizontal: '28%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    text: {
      color: 'whitesmoke',
      fontSize: 18,
      fontStyle: 'normal',
      fontWeight: 'bold'
    },
    input: {
      marginHorizontal: '21%',
      backgroundColor: 'whitesmoke',
      marginVertical: 20,
      borderWidth: 1,
      height: 50,
      width: '55%',
      textAlign: 'center',
      borderColor: '#d2691e'
    }
    
  })

  const handleSubmit = async () => {   
    // Проверка на наличие телефона в БД 
    try {
      const res = await axios.post('http://10.0.2.2:8080/api/check', {phone});
      const userData = res.data
    if(userData.id) {
      userStore.handlePhone(phone)
      nav.navigate('Login')
    } else {
      alert('Такого телефона нет в базе')
    }
    }
    catch (err){
      console.error('Ошибка авторизации:', err)
    }
    
  }

  return (
    <SafeAreaView>
    <ScrollView style={{backgroundColor: '#f5f5dc', height: '100%'}}>
    <View >
      <View style={{height: 320, display: 'block', textAlign: 'center', margin: 'auto'}}>
        <SvgScreen stroke="whitesmoke" />
      </View>
    <View style={{marginTop: 10, height: 300}}>
      
      <TextInput style={styles.input} placeholder="Номер телефона" value={phone} onChangeText={text => setPhone(text)} />
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.text}>Вход</Text>
      </TouchableOpacity>
    </View>
    <StatusBar></StatusBar>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
});

export default RootScreen;