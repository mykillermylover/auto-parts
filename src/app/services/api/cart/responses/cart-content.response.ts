import {Position} from './positions.response';

export type CartContentResponse = Position & {
    description: string;
    price: number;
    priceRate: number;
    priceInSiteCurrency: number;
    deadline: number;
    deadlineMax: number;
    comment: string;
    positionId: number;
    packing: number;
}
