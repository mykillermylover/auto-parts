import {CarResponse} from '@services/api/garage/car.response';

export type CarProp = Omit<CarResponse, 'id' | 'manufacturer' | 'model' | 'modification'>;
