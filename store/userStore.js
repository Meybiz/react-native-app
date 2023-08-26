import { makeAutoObservable } from "mobx";

class UserStore {
    user = {};
    phone;
    birthday = ''
    constructor() {
        makeAutoObservable(this)
    }

    userData(data, birthday) {
        this.user = data
        this.birthday = birthday
    }
    handlePhone(phone)  {
        this.phone = phone
    }
}


export default UserStore