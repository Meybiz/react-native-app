import axios from 'axios';
import React from 'react';
import { View, TextInput, Button, Platform, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { userStore } from '../store/rootStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const RegistrationScreen = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const [fullName, setNames] = React.useState('');
    const [date, setDate] = React.useState(new Date())
    const [show, setShow] = React.useState(false)
    const nav = useNavigation()
    const handleDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
  };
    const showIos = () => {
      setShow(true)
    }
    const handleRegistration = async() => {
      if (password !== passwordConfirm) {
        alert('Пароли не совпадают');
        return;
      }
      try { 
        const res = await axios.post('http://10.0.2.2:4000/api/signup', {
        email,
        password,
        fullName,
        date,
        coin: 0
      });
      AsyncStorage.setItem('userMobile', JSON.stringify(res.data));
      if (res.data) {
        userStore.setUser(res.data);
      }
      nav.navigate('User');
    } catch (err) {
      console.error('Произошла ошибка: ' + err.message);
    }

    }
    return (
        <View>
          <TextInput placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          value={passwordConfirm}
          onChangeText={(text) => setPasswordConfirm(text)}
          />
          <TextInput
          placeholder="Name"
          value={fullName}
          onChangeText={(text) => setNames(text)}
          />
          <Text style={{width: 200}}>{date.toLocaleDateString()}</Text>
          <Button title='Выбрать дату' onPress={showIos}/>
          {
            show && (
              <DateTimePicker 
              mode='date'
              value={date}
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
              />
            )
          }
          <Button title="Зарегистрироваться" onPress={handleRegistration} />
        </View>
      );
}

export default RegistrationScreen;