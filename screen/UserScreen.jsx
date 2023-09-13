import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, Modal, Pressable } from 'react-native';
import { userStore } from '../store/rootStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { observer } from 'mobx-react-lite';
import style from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const UserScreen = observer(() => {
  const [oldPassword, setOldPassword] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [visible, setVisible] = React.useState(false)
  const nav = useNavigation()

// очищаем данные после выхода
  const handleLogout = async () => {
    // await Keychain.resetGenericPassword();
    AsyncStorage.removeItem('userData')
    nav.navigate('Root')
  }
  
  const changePassword = async () => {
    // Костыльная проверка для смены пароля
    if ((oldPassword !== userStore.user.passwords && password !== newPassword) || (oldPassword === '' || newPassword ==='' || password === '')) alert("заполните все поля или введи правильные пароли")
    // Запрос к Бд для смены пароля
    try {
      const id = userStore.user.id
      const res = await axios.put(`http://10.0.2.2:8080/api/password/`, {
      id,
      newPassword,
      oldPassword
      })
      if (res.status === 200) {
        alert('Пароль успешно изменен');
        setVisible(false);
        setOldPassword('');
        setPassword('');
        setNewPassword('');
      } else {
        alert('Что-то пошло не так. Попробуйте позже.');
      }
    } 
    catch (err) {
      console.error('Ошибка смены пароля:', err)
    }
  
  }

  useEffect(() => {
    const restoreUserData = async () => {
      // достаем данные из хранилща для отображения нашего UI
      try {
        const userDataJson = await AsyncStorage.getItem('userData');
        const userDate = await AsyncStorage.getItem('birthday');
        if (userDataJson) {
         
          const userData = JSON.parse(userDataJson);
          userStore.userData(userData, userDate);
        }
      } catch (error) {
        console.error('Ошибка восстановления данных пользователя:', error);
      }
    };
    restoreUserData();
  }, []);
  console.log(userStore.birthday)

  return (
    <View style={{marginTop: 50, borderColor: 'red'}}>
      <TouchableOpacity onPress={handleLogout} style={{marginTop: 100}}>
          <Text style={{ marginRight: 10, color: 'red' }}>Выход</Text>
        </TouchableOpacity>
      {userStore.user ? (
        <View>
        <View style={{backgroundColor: 'green', height: 400, display: 'flex', justifyContent: 'space-around'}}>
          <Text>Добро пожаловать, {userStore?.user?.firstname}!</Text>
          <Text>Почта: {userStore?.user?.email}</Text>
          <Text>Имя: {userStore?.user?.firstname} {userStore?.user?.secondname}</Text>
          <Text>Дата рождения: {userStore?.user?.birthday}</Text>
          <Text>Баллы: {userStore?.user?.coin}</Text>
          <Pressable style={[style.button, style.buttonOpen]} onPress={() => setVisible(true)}>
            <Text>Сменить пароль</Text>
          </Pressable>
          {/* <Button title='Сменить Пароль' /> */}
          
        </View>
        <View>
        <Modal
          animationType='slide'
          transparent={true}
          visible={visible}
          onRequestClose={!visible}
          >
            <View style={style.centeredView}>
              <View style={style.modalView}>
                <TextInput placeholder='Old Password' value={oldPassword} onChangeText={(text) => setOldPassword(text)}/>
                <TextInput placeholder='Password' value={password} onChangeText={(text) => setPassword(text)}/>
                <TextInput placeholder='Confirm Password' value={newPassword} onChangeText={(text) => setNewPassword(text)}/>
                <Pressable style={[style.button]} onPress={() => setVisible(!visible)}>
                  <Text>Закрыть</Text>
                </Pressable>
                <Pressable style={[style.button, style.buttonClose]} onPress={changePassword}>
                  <Text>Подтвердить</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          </View>
          </View>
      ) : (
        <Text>Загрузка....</Text>
      )}
      
    </View>
  );
});

export default UserScreen;