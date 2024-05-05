import {setHttpClientUserAuthData} from '@httpClient';
import * as SecureStore from 'expo-secure-store';

import appStore from '@store/app.store';
import {InitActions} from '@store/init/init.store';
import {SecureStoreConstants} from '@shared/consts';
import {UserActions} from "@store/user/user.store";
import {userApi} from "@store/query/user/user.api";
import {UserState} from "@store/user/user-state.model";

export default async function InitApp() {
    const {login, pass} = await getUserAuthDataFromSecureStore();

    if (login && pass) {
        setHttpClientUserAuthData(login, pass);
        console.log('[Init] InitApp: HttpClient initialized  ');

        const response: {
            data?: UserState,
            error?: unknown
        } = await appStore.dispatch(userApi.endpoints.auth.initiate());
        if (response.data) appStore.dispatch(UserActions.setUser(response.data));
    }

    appStore.dispatch(InitActions.setInitializedAction());
}

/**
 * init login and password from Storage
 */
async function getUserAuthDataFromSecureStore() {
    const login = await SecureStore.getItemAsync(SecureStoreConstants.userLogin);
    const pass = await SecureStore.getItemAsync(SecureStoreConstants.userPassword);

    console.log('[Init] getUserAuthDataFromSecureStore: got {login, pass} from SecureStore');

    return {
        login,
        pass
    };
}
