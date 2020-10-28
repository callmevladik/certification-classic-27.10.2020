import { paramList } from 'js#/configs/paramList';

export const categoryFilterCfg = (serializedArray) => {
    const [ page, year, priceFrom, priceTo, model, manufacturer, brand, sort, perPage] = paramList;
    const selectInitialValue = 'Выбрать';

    const getValues = (paramObjectName) => {
        const value = serializedArray.filter((paramObject) => paramObject.name === paramObjectName).map((paramObject) => paramObject.value);

        if (value.length === 1 && value.toString() === selectInitialValue) {
            return '';
        } else if (value.length === 1) {
            return value.toString();
        }

        return value;
    }

    return {
        'params': {
            'brand': getValues(brand),
            'manufacturer': getValues(manufacturer),
            'model': getValues(model),
            'year': getValues(year),
            'price-from' : getValues(priceFrom),
            'price-to' : getValues(priceTo)
        },
        'pagination': {
            'sort': getValues(sort),
            'per_page': getValues(perPage),
            // page: number
        }
    }
}