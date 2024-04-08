import HttpClient from '@httpClient';
import {UserProp} from '@services/api/user/user.prop';
import {NewUserResponse} from '@services/api/user/responses/user-new.response';
import {StatusResponse} from '@shared/responses/status.response';
import {UserResponse} from '@services/api/user/responses/user.response';
import {SuccessResponse} from '@shared/responses/success.response';

export class UserService {
    http = HttpClient;
    url = '/user';

    async userNew(user: UserProp) {
        const { data } = await this.http.post<NewUserResponse>(`${this.url}/new`, null,
            {
                params: {
                    ...user
                }
            });
        return data;
    }

    async userActivation(userCode: number, activationCode: string) {
        const { data } = await this.http.post<StatusResponse[]>(`${this.url}/activation`, null,
            {
                params: {
                    userCode,
                    activationCode
                }
            });
        return data;
    }
    async userAuth() {
        const { data } = await this.http.get<UserResponse>(`${this.url}/info`);
        return data;
    }

    /**
     * ## Механизм использования
     * ##### Восстановление пароля состоит из двух этапов:
     *
     * 1. **Запрос восстановления пароля с указанием номера телефона или email.
     *      В результате успешного завершения будет отправлено
     *      стандартное письмо со ссылкой восстановления пароля
     *      на указанный email или код в SMS на указанный номер телефона.**
     * 2. Сохранение нового пароля с указанием кода подтверждения из SMS.
     *      Данный этап актуален только для восстановления по номеру телефона,
     *      так как в случае с email, в письме придет ссылка на форму восстановления пароля на сайте,
     *      и второй этап будет выполнен в ней.
     */
    async userRestorePasswordFirstStage(emailOrMobile: string) {
        const { data } = await this.http.post<SuccessResponse>(`${this.url}/restore`, null,
            {
                params: {
                    emailOrMobile
                }
            });
        return data;
    }
    /**
     * ## Механизм использования
     * ##### Восстановление пароля состоит из двух этапов:
     *
     * 1. Запрос восстановления пароля с указанием номера телефона или email.
     *      В результате успешного завершения будет отправлено
     *      стандартное письмо со ссылкой восстановления пароля
     *      на указанный email или код в SMS на указанный номер телефона.
     * 2. **Сохранение нового пароля с указанием кода подтверждения из SMS.
     *      Данный этап актуален только для восстановления по номеру телефона,
     *      так как в случае с email, в письме придет ссылка на форму восстановления пароля на сайте,
     *      и второй этап будет выполнен в ней.**
     */
    async userRestorePasswordSecondStage(passwordNew: string, code: string) {
        const { data } = await this.http.post<SuccessResponse>(`${this.url}/restore`, null,
            {
                params: {
                    passwordNew,
                    code
                }
            });
        return data;
    }
}
