import axios from 'axios';
import React from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { userStore } from '../store/rootStore';
import AsyncStorage from '@react-native-async-storage/async-storage';


const RootScreen = observer(() => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  // const [user, setUser] = React.useState(null)

    const nav = useNavigation()
  const handleSubmit = async () => {
    if (email === '' || password === '') {
      alert('Заполните поля')
      return
    }
    try {
      const res = await axios.post("http://10.0.2.2:4000/api/signin", { email, password });
      if(res.data) {
        console.log(res.data)
        userStore.setUser(JSON.parse(JSON.stringify(res.data)))
        await AsyncStorage.setItem('userMobile', JSON.stringify(res.data))
      }
    } catch (error) {
      console.error("Error occurred: " + error.message);
    }
  }

  const handleReg = () => {
    return nav.navigate('Reg')
  }
  return (
    <View>
      
      <TextInput placeholder="Email" value={email} onChangeText={text => setEmail(text)} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Login" onPress={handleSubmit} />
      <Text>Нет аккаунта?<Button title='Регистрация' onPress={handleReg}/></Text> 
    </View>
  );
});

export default RootScreen;