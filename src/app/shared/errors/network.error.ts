import {AbcpError} from '@shared/errors/abcp.error';

export class NetworkError {
    status: number | undefined;
    data: unknown | string | AbcpError;
    constructor(error: AbcpError | string, code?: number) {
        if(typeof error === 'string') {
            this.data = {
                errorMessage: error,
                errorCode: null
            };
            this.status = code;
        }
        else this.data = error;
    }
}
