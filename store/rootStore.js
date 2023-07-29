import { injectStores } from '@mobx-devtools/tools';
import UserStore from './userStore';


const userStore = new UserStore();

injectStores({
    userStore
});

export {userStore}