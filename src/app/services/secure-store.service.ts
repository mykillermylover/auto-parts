import * as SecureStore from 'expo-secure-store';
import {AdminDataResponse} from '@shared/responses/admin-data.response';
import {SecureStoreConstants} from '@shared/consts';
import isAnyItemNull from '@shared/features/isAnyItemNull.function';

export class SecureStoreService {

    public static async setAdminData({abcp, laximo}: AdminDataResponse) {
        await Promise.all([
            SecureStore.setItemAsync(SecureStoreConstants.abcpLogin, abcp.login),
            SecureStore.setItemAsync(SecureStoreConstants.abcpPassword, abcp.password),
            SecureStore.setItemAsync(SecureStoreConstants.laximoLogin, laximo.login),
            SecureStore.setItemAsync(SecureStoreConstants.laximoPassword, laximo.password)
        ]);

        console.log('[SecureStoreService] setAdminData: admin data set');
    }

    public static async setUserData(login: string, passwordHash: string) {
        await Promise.all([
            SecureStore.setItemAsync(SecureStoreConstants.userLogin, login),
            SecureStore.setItemAsync(SecureStoreConstants.userPassword, passwordHash)
        ]);

        console.log('[SecureStoreService] setUserData: user data set');
    }

    public static async getAdminData() {
        const [
            abcpLogin,
            abcpPassword,
            laximoLogin,
            laximoPassword
        ] = await Promise.all([
            SecureStore.getItemAsync(SecureStoreConstants.abcpLogin),
            SecureStore.getItemAsync(SecureStoreConstants.abcpPassword),
            SecureStore.getItemAsync(SecureStoreConstants.laximoLogin),
            SecureStore.getItemAsync(SecureStoreConstants.laximoPassword)
        ]);

        if (isAnyItemNull(abcpLogin, abcpPassword, laximoLogin, laximoPassword)) {
            throw new Error('[SecureStoreService] getAdminData: Необходимые данные не инициализированы!');
        }

        const result: AdminDataResponse = {
            abcp: {
                password: abcpPassword!,
                login: abcpLogin!
            },
            laximo: {
                password: laximoPassword!,
                login: laximoLogin!
            }
        };
        return result;
    }

    public static async clearStore() {
        await Promise.all([
            this.clearAdminData(),
            this.clearUserData()
        ]);

        console.log('[SecureStoreService] clearStore: store cleared');
    }

    public static async clearUserData() {
        await Promise.all([
            SecureStore.deleteItemAsync(SecureStoreConstants.userLogin),
            SecureStore.deleteItemAsync(SecureStoreConstants.userPassword)
        ]);

        console.log('[SecureStoreService] clearUserData: userData cleared');
    }

    public static async clearAdminData() {
        await Promise.all([
            SecureStore.deleteItemAsync(SecureStoreConstants.abcpLogin),
            SecureStore.deleteItemAsync(SecureStoreConstants.abcpPassword),
            SecureStore.deleteItemAsync(SecureStoreConstants.laximoLogin),
            SecureStore.deleteItemAsync(SecureStoreConstants.laximoPassword)
        ]);

        console.log('[SecureStoreService] clearAdminData: adminData cleared');
    }
}
