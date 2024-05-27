import { setHttpClientUserAuthData } from '@httpClient'
import appStore from '@store/app.store'
import { InitActions } from '@store/init/init.store'
import { UserActions } from '@store/user/user.store'
import { userApi } from '@store/query/user/user.api'
import { UserState } from '@store/user/user-state.model'
import { registerTranslation, ru } from 'react-native-paper-dates';
import { SecureStoreService } from '@services/secure-store.service';

export default async function InitApp() {
    const { login, pass } = await SecureStoreService.getUserAuthData()

    if (login && pass) {
        setHttpClientUserAuthData(login, pass)
        console.log('[Init] InitApp: HttpClient initialized  ')

        const response: {
            data?: UserState
            error?: unknown
        } = await appStore.dispatch(userApi.endpoints.auth.initiate())

        if (response.data) appStore.dispatch(UserActions.setUser(response.data))
    }

    registerTranslation('ru', ru);

    appStore.dispatch(InitActions.setInitializedAction())
}

