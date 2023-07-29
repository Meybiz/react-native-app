import { makeAutoObservable } from "mobx";
import AsyncStorage from '@react-native-async-storage/async-storage';

class UserStore {
    user = null;

    constructor() {
        makeAutoObservable(this)
        this.initializeUser()
    }

    setUser = async (user) => {
        this.user = user
        const usersSession = await AsyncStorage.getItem('userMobile')
        if(usersSession) {
            this.user = JSON.parse(usersSession)
        }
    }

    initializeUser = async () => {
        const userString = await AsyncStorage.getItem('userMobile');
        if (userString) {
            this.user = JSON.parse(userString); // Восстанавливаем пользователя из AsyncStorage, если есть сохраненное значение.
        }
    }
}


export default UserStore