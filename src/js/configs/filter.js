import { paramList } from 'js#/configs/paramList';

export const categoryFilterCfg = (serializedArray) => {
    const { page, year, price, model, manufacturer, brand, sort, perPage } = paramList;

    const getValues = (paramListObj) => {
        const value = () => {
            if (paramListObj.multiple) {
                // console.log(paramListObj.name, typeof paramListObj.name)
                // paramListObj.name.forEach((el) => el === serializedArray.name)
                for (let key in paramListObj.name) {
                    if (paramListObj.name[key] === serializedArray.name) {
                        return serializedArray.name
                    }
                }
            } else if (paramListObj.parameter === serializedArray.name) {
                return serializedArray.name;
            }
        }

        console.log(value())
    }

    return {
        'params': {
            'brand': getValues(brand),
            'manufacturer': getValues(manufacturer),
            'model': getValues(model),
            'year': getValues(year),
            'price' : getValues(price)
        },
        'pagination': {
            'sort': getValues(sort),
            'per_page': getValues(perPage),
            // page: number
        }
    }
}