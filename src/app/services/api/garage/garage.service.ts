import HttpClient from '@httpClient';
import {CarResponse} from '@services/api/garage/car.response';
import {CarProp} from '@services/api/garage/car.prop';

export class GarageService {
    http = HttpClient;
    url = '/user/garage';

    async garageList() {
        const { data } = await this.http.get<CarResponse[]>(`${this.url}`);
        return data;
    }
    async garageGetCar(carId: number) {
        const { data } = await this.http.get<CarResponse>(`${this.url}/car`,
            {
                params: {
                    carId
                }
            });
        return data;
    }
    async garageAddCar(car: CarProp) {
        const { data } = await this.http.post<CarResponse>(`${this.url}/add`, null,
            {
                params: {
                    ...car
                }
            });
        return data;
    }
    async garageUpdateCar(carId: number, car: CarProp) {
        const { data } = await this.http.post<CarResponse>(`${this.url}/update`, null,
            {
                params: {
                    carId,
                    ...car
                }
            });
        return data;
    }
    async garageDeleteCar(carId: number) {
        const { data } = await this.http.post<true>(`${this.url}/delete`, null,
            {
                params: {
                    carId
                }
            });
        return data;
    }
}
