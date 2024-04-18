import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '@store/query/axios.query';
import {CarModelsResponse} from '@store/query/car-tree/car-models.response';
import {CarModificationResponse} from '@store/query/car-tree/car-modification.response';

export const carTreeApi = createApi({
    reducerPath: 'carTreeApi',
    baseQuery: axiosBaseQuery({baseUrl: 'cartree/'}),
    endpoints(build) {
        return {
            years: build.query<number[], number>({
                query: (manufacturerId) => ({
                    url: 'years',
                    params: {
                        manufacturerId
                    }
                })
            }),
            manufacturers: build.query<CarModelsResponse, number | void>({
                query: (year) => ({
                    url: 'years',
                    params: {
                        year
                    }
                })
            }),
            models: build.query<CarModelsResponse,{manufacturerId: number, year?: number}>({
                query: ({manufacturerId, year}) => ({
                    url: 'years',
                    params: {
                        manufacturerId,
                        year
                    }
                })
            }),
            modifications: build.query<CarModificationResponse, {manufacturerId: number, modelId: number, year?: number}>({
                query: ({manufacturerId, modelId, year}) => ({
                    url: 'years',
                    params: {
                        manufacturerId,
                        modelId,
                        year
                    }
                })
            }),
        };
    }
});

export const {
    useYearsQuery,
    useManufacturersQuery,
    useModelsQuery,
    useModificationsQuery
} = carTreeApi;
