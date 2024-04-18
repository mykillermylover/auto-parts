import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '@store/query/axios.query';
import axios, {AxiosError} from 'axios';
import {AdminDataResponse} from '@shared/responses/admin-data.response';
import {NetworkError} from '@shared/errors/network.error';
import {UserState} from '@store/user/user-state.model';

export const localApi = createApi({
    reducerPath: 'localApi',
    baseQuery: axiosBaseQuery({baseUrl: `${process.env.EXPO_PUBLIC_LOCAL_API_URL}/`, axiosInstance: axios}),
    endpoints(build) {
        return {
            getAdminData: build.mutation<AdminDataResponse, {login: string, password: string}>({
                query: ({login, password}) => ({
                    url: 'getAdminData',
                    params: {
                        login,
                        password
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
    useGetAdminDataMutation,
    useCheckAuthMutation,
} = localApi;
