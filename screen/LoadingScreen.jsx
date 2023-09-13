import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingScreen = () => {
  const nav = useNavigation()
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
    
  })
  useEffect(() => {
    const checkAuth = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        console.log(userData)
        nav.navigate('User')
      } else {
        nav.navigate('Root')
      }
    };

    checkAuth();
  }, []);
  return (
    <View style={styles.container}>
      {/* <ActivityIndicator size="large" color="red"/> */}
      <Text>Загрузка.......</Text>
    </View>
  )
}

export default LoadingScreen;