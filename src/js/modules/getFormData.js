import { filterParamList } from 'js#/configs/filterParamList';

const {
	page,
	year,
	priceFrom,
	priceTo,
	model,
	manufacturer,
	brand,
	sort,
	perPage
} = filterParamList;

export const getFormData = (serializedArray) => {
	const getValue = (paramObject) => {
		const value = serializedArray
			.filter((param) => param.name === paramObject.name)
			.map((param) => param.value);

		if (value.toString()) {
			return value.length > 1 ? value : value.toString()
		} else {
			return '';
		}
	};

	return {
		params: {
			brand: getValue(brand),
			manufacturer: getValue(manufacturer),
			model: getValue(model),
			year: getValue(year),
			price: [getValue(priceFrom), getValue(priceTo)]
		},
		pagination: {
			sort: getValue(sort),
			perPage: getValue(perPage),
			page: getValue(page)
		}
	};
};
