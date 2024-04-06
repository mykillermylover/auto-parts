export type ArticlesResponse = Article[];

export type Article = {
    // Дополнительная цена в валюте сайта
    additionalPrice: number;
    // Наличие детали на складе, -1,-2,-3 = +, ++, +++; -10 = 'Под заказ'
    availability: number;
    // Имя производителя
    brand: string;
    // Замена срока поставки (используется вместо срока поставки, если не заполнен максимальный срок поставки)
    deadlineReplace: string;
    // Срок поставки (в часах)
    deliveryPeriod: number;
    // Максимальный срок поставки (в часах)
    deliveryPeriodMax: number;
    // Вероятность поставки товара поставщика
    deliveryProbability: number;
    // Описание детали
    description: string;
    // Идентификатор поставщика
    distributorId: number;
    /* Код позиции. Необходим для добавления товара в корзину.
    <strong>Не является уникальным идентификатором!</strong>
    Обязателен для передачи заказа онлайн-поставщику
     */
    itemKey: string;
    // Время последнего обновления
    lastUpdateTime: string;
    // Флаг "Без возврата"
    noReturn: boolean;
    // Код детали
    number: string;
    // "Очищенный" код детали
    numberFix: string;
    // Мин. Партия для заказа (кратность)
    packing: number;
    // Цена в валюте сайта
    price: number;
    // Код поставки. Необходим для добавления товара в корзину
    supplierCode: number;
    // Цвет поставщика
    supplierColor?: string;
    // Описание поставщика
    supplierDescription: string;
}
