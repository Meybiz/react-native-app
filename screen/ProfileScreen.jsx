import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, Modal, Pressable } from 'react-native';
import { userStore } from '../store/rootStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { observer } from 'mobx-react-lite';
import style from './../styles/styles';
import axios from 'axios';


const UserScreen = observer(() => {
  const [user, setUser] = React.useState(null);
  const [oldPassword, setOldPassword] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const name = userStore.user
  const [visible, setVisible] = React.useState(false)
// очищаем данные после выхода
  const handleLogout = () => {
    AsyncStorage.removeItem('userMobile')
    userStore.setUser(null)
  }
  const changePassword = async () => {
    
    try {
      if(password !== newPassword) {
        throw new Error({message: "Пароли не совпадают"})
      }
      const res = await axios.post('http://10.0.2.2:4000/api/update', {
        email: name?.user?.email,
        oldPassword,
        newPassword
      })
      console.log(res)
      if (res.status === 200) {
        alert('Пароль успешно Изменен')
        setOldPassword('')
        setPassword('')
        setNewPassword('')
        setVisible(false)
      } else {
        console.error('Ошибка обновление пароля:', res.data.error)
      }
    }
    catch (err) {
      console.error("Ошибка обновление пароля:", err.message)
    }
  }

  useEffect(() => {
    // Получите данные из сессионного хранилища при загрузке экрана
    const read = async () => {
      try {
      const userData = await AsyncStorage.getItem('userMobile');
      setUser(JSON.parse(userData));

    } catch (err) {
      console.error(err)
    }
    }
    read()
  }, []);

  return (
    <View style={{marginTop: 150, borderColor: 'red'}}>
      <TouchableOpacity onPress={handleLogout} style={{marginTop: 100}}>
          <Text style={{ marginRight: 10, color: 'red' }}>Выход</Text>
        </TouchableOpacity>
      {user ? (

        <View>
          <Text>HELLOOOOO</Text>
          <Text>Почта: {name?.user?.email}</Text>
          <Text>Имя: {name?.user?.fullName}</Text>
          <Text>Дата рождения: {name?.user?.date}</Text>
          <Text>Баллы: {name?.user?.coin}</Text>
          {/* <Button title='Сменить Пароль' /> */}
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
          <Pressable style={[style.button, style.buttonOpen]} onPress={() => setVisible(true)}>
            <Text>Сменить пароль</Text>
          </Pressable>
        </View>

      ) : (
        <Text>Загрузка....</Text>
      )}
      
    </View>
  );
});

export default UserScreen;