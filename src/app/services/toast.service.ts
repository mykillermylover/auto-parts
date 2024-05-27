import Toast from 'react-native-toast-message';
import {MD3Theme} from 'react-native-paper/lib/typescript/types';

export class ToastService {
    static theme: MD3Theme;

    public static error(message = 'Неизвестная ошибка', header = 'Ошибка!') {
        Toast.show({
            visibilityTime: 2000,
            type: 'error',
            text1: header,
            text2: message,
        });
    }
    public static success(message: string, header = 'Успешно!') {
        Toast.show({
            visibilityTime: 4000,
            type: 'success',
            text1: header,
            text2: message,
        })
    }

    static info(message: string, header = 'Информация') {
        Toast.show({
            visibilityTime: 4000,
            type: 'info',
            text1: header,
            text2: message,
        })
    }

    static errorCallback = (err: Error) => {
        ToastService.error(err.message);
        return null;
    }
}
