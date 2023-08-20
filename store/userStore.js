import { makeAutoObservable } from "mobx";
import AsyncStorage from '@react-native-async-storage/async-storage';

class UserStore {
    user = {};

    constructor() {
        makeAutoObservable(this)
    }

    userData(data) {
        this.user = data
        console.log(data.passwords)
    }
}


export default UserStore