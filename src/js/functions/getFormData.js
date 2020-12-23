import { getValue } from 'js#/functions/getValue';
import { filterRules } from "js#/globals/filterRules";
const { filterParamsRules } = filterRules;

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
} = filterParamsRules;

export const getFormData = (serializedArray) => {
	return {
		params: {
			brand: getValue(serializedArray, brand),
			manufacturer: getValue(serializedArray, manufacturer),
			model: getValue(serializedArray, model),
			year: getValue(serializedArray, year),
			price: [
				getValue(serializedArray, priceFrom),
				getValue(serializedArray, priceTo)
			]
		},
		pagination: {
			sort: getValue(serializedArray, sort),
			perPage: getValue(serializedArray, perPage),
			page: getValue(serializedArray, page)
		}
	};
};
