import HttpClient from '@httpClient';
import {IdentifyNamedModel} from '@shared/models/identify-named.model';
import {CarModelsResponse} from '@services/api/car-tree/car-models.response';
import {CarModificationResponse} from '@services/api/car-tree/car-modification.response';

export class CarTreeService {
    http = HttpClient;
    url = '/cartree';

    async carTreeYears(manufacturerId?: number) {
        const { data } = await this.http.get<number[]>(`${this.url}/years`,
            {
                params: {
                    manufacturerId
                }
            });
        return data;
    }
    async carTreeManufacturers(year?: number) {
        const { data } = await this.http.get<IdentifyNamedModel>(`${this.url}/manufacturers`,
            {
                params: {
                    year
                }
            });
        return data;
    }
    async carTreeModels(manufacturerId: number, year?: number) {
        const { data } = await this.http.get<CarModelsResponse>(`${this.url}/models`,
            {
                params: {
                    manufacturerId,
                    year
                }
            });
        return data;
    }

    async carTreeModifications(manufacturerId: number, modelId: number, year?: number) {
        const { data } = await this.http.get<CarModificationResponse>(`${this.url}/modifications`,
            {
                params: {
                    manufacturerId,
                    modelId,
                    year
                }
            });
        return data;
    }
}
