import Toast from 'react-native-toast-message';
import {MD3Theme} from 'react-native-paper/lib/typescript/types';

export class ToastService {
    static theme: MD3Theme;

    public static showErrorToast(message = 'Неизвестная ошибка', header = 'Ошибка!') {
        Toast.show({
            visibilityTime: 2000,
            type: 'error',
            text1: header,
            text2: message,
            text2Style: {
                color: this.theme.colors.error,
            }
        });
    }
}
