import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '@store/query/axios.query';
import axios, {AxiosError} from 'axios';
import * as SecureStore from 'expo-secure-store';

import {NetworkError} from '@shared/errors/network.error';
import {UserState} from '@store/user/user-state.model';
import {SecureStoreConstants} from '@shared/consts';
import {ItemModel} from '@shared/models/item.model';
import {localHttpClient} from "@httpClient";
import {FormattedArticleResponse} from "@shared/types/formatted-article.response";

export const localApi = createApi({
    reducerPath: 'localApi',
    baseQuery: axiosBaseQuery({baseUrl: `api/`, axiosInstance: localHttpClient}),
    endpoints(build) {
        return {
            articleInfo: build.query<FormattedArticleResponse[], ItemModel>({
                query: ({brand, number}) => ({
                    url: 'search/articles',
                    params: {
                        login: SecureStore.getItem(SecureStoreConstants.userLogin),
                        password: SecureStore.getItem(SecureStoreConstants.userPassword),
                        brand,
                        number
                    }
                })
            }),
            checkAuth: build.mutation<UserState, {login: string, password: string}>({
                queryFn: async ({login, password}) => {
                    try {
                        const response = await axios.get<UserState>(`${process.env.EXPO_PUBLIC_API_URL}/user/info`,
                            {
                                params: {
                                    userlogin: login,
                                    userpsw: password
                                }
                            });
                        return {
                            data: response.data
                        };
                    } catch (error) {
                        const err = error as AxiosError;
                        return {
                            error: {
                                status: err.response?.status || err?.code || err?.status,
                                data: err.response?.data || err.message,
                            } as NetworkError
                        };
                    }

                }
            })
        };
    }
});

export const {
    useArticleInfoQuery,
    useCheckAuthMutation,
} = localApi;
