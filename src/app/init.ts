import {setHttpClientUserAuthData} from '@httpClient';
import * as SecureStore from 'expo-secure-store';

import appStore from '@store/app.store';
import {InitActions} from '@store/init/init.store';
import {SecureStoreConstants} from '@shared/consts';

export default async function InitApp() {
    const secureStoreData = await getUserAuthDataFromSecureStore();
    const {login, pass} = secureStoreData;

    if(login && pass) {
        setHttpClientUserAuthData(login, pass);
        console.log('[Init] InitApp: HttpClient initialized  ');
    }

    appStore.dispatch(InitActions.setInitializedAction());
}

/**
 * init login and password from Storage
 * ### TODO: in prod build DELETE `.ENV ADMIN DATA`
 */
async function getUserAuthDataFromSecureStore() {
    const login = await SecureStore.getItemAsync(SecureStoreConstants.userLogin);// ?? process.env['EXPO_PUBLIC_ADMIN_LOGIN'];
    const pass = await SecureStore.getItemAsync(SecureStoreConstants.userPassword);// ?? process.env['EXPO_PUBLIC_ADMIN_PASSWORD'];
    const abcpLogin = await SecureStore.getItemAsync(SecureStoreConstants.abcpLogin);
    const abcpPassword = await SecureStore.getItemAsync(SecureStoreConstants.abcpPassword);
    const laximoLogin = await SecureStore.getItemAsync(SecureStoreConstants.laximoLogin);
    const laximoPassword = await SecureStore.getItemAsync(SecureStoreConstants.laximoPassword);

    console.log('[Init] getUserAuthDataFromSecureStore: got {login, pass} from SecureStore');

    return {
        login,
        pass,
        abcpLogin,
        abcpPassword,
        laximoLogin,
        laximoPassword
    };
}
