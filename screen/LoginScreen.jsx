import React from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';
import RootScreen from './RootScreen';
import UserScreen from './ProfileScreen';
import { userStore } from '../store/rootStore';


const LoginScreen = observer(() => {
  const isAuth = userStore.user

  return (
    <View>
      {isAuth ? (
        <UserScreen />
      ) : (
        <RootScreen />
      )}
    </View>
  );
});

export default LoginScreen;