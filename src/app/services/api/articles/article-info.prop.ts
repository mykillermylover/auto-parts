import {ItemModel} from '@shared/models/item.model';

export type ArticleInfoProp = ItemModel & {
    /**
     * ###### Формат ответа.
     * Допустимые значения:
     * [b][n][p][c][h][m][t][i] - формат вывода информации
     * + b - бренд,
     * + n - номер,
     * + p - свойства,
     * + c - кроссы,
     * + h - свойства с учетом локали,
     * + m - информация о модели,
     * + t - вывод типа кроссов с учетом направления,
     * + i - изображения запчасти
     */
    format: string;
    /**
     * При передаче
     * ```typescript
     * cross_image=1
     * ```
     * и *[i]* в параметре *format* в ответе операции будут выводиться изображения кроссов.
     */
    cross_image?: 1;
    /**
     * #### Источник кроссов.
     * ###### Необязательный параметр.
     * Через него передается массив со списком источников, в которых нужно искать кроссы.
     * - **standard** - Кроссы с достоверностью 99.9 % ;
     * - **common**- Кроссы с достоверностью 95%;
     * - **common_cat** - Кроссы нескольких неоригинальных каталогов.
     * > Если параметр не передается, то в ответе выводятся все источники, подключенные в ПУ >
     * **Пример:** `&source[]=standard&source[]=common`
     */
    source?: CrossSource[];
    /**
     * #### Признак кроссирования через оригинал.
     * ###### Необязательный параметр.
     * Через него передается массив со списком источников,
     * в которых используется кроссирование через оригинал.
     * Работает данный параметр только при ручном указании источников кроссов (source).
     *
     * Если его не передавать, то в ответе нет кроссов через оригинал по указанным источникам.
     *
     * Если указать данный параметр без указания конкретных источников - в ответе получаем текст
     * ***"Для получения аналогов через оригинал обязательно указывайте источники кроссов".***
     *
     * **пример:** <br>
     * `&with_original[]=standard&with_original[]=common`
     */
    with_original?: CrossSource[];
    /**
     * Локаль. Задается в формате <br>
     * `language[_territory]`, например, *ru_RU*.
     * Это же значение используется по умолчанию.
     */
    locale?: string;
}

type CrossSource = 'standard' | 'common' | 'common_cat';
