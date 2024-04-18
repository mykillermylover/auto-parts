import {AbcpError} from '@shared/errors/abcp.error';
import {NetworkError} from '@shared/errors/network.error';

export class ResponseService {
    public static getErrorMessage(error: NetworkError) {
        const data = error.data;
        if(typeof data === 'string') {
            return data;
        }
        const {errorMessage} = data as AbcpError;
        const code = error.status;

        if(errorMessage) {
            return errorMessage;
        } else if (code === 403) {
            return 'Ошибка авторизации';
        } else {
            return 'Неизвестная ошибка';
        }

    }
}
