import {setHttpClientUserAuthData} from '@httpClient';
import * as SecureStore from 'expo-secure-store';
import appStore from '@store/app.store';
import {InitActions} from '@store/init/init.store';

export default async function InitApp() {
    const {login, pass} = await getUserAuthDataFromSecureStore();

    setHttpClientUserAuthData(login, pass);
    console.log('[Init] InitApp: HttpClient initialized  ');

    appStore.dispatch(InitActions.setInitializedAction());
}

/**
 * init login and password from Storage
 * ### TODO: in prod build DELETE `.ENV ADMIN DATA`
 */
async function getUserAuthDataFromSecureStore() {
    const login = await SecureStore.getItemAsync('userLogin') ?? process.env['EXPO_PUBLIC_ADMIN_LOGIN'] ?? '';
    const pass = await SecureStore.getItemAsync('userPassword') ?? process.env['EXPO_PUBLIC_ADMIN_PASSWORD'] ?? '';

    console.log('[Init] getUserAuthDataFromSecureStore: got {login, pass} from SecureStore');

    return {
        login,
        pass
    };
}
