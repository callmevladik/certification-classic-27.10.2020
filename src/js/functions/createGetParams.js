import { getValue } from 'js#/functions/getValue';
import { filterRules } from "js#/globals/filterRules";
const { filterParamsRules } = filterRules;
const filterParamsRulesArray = Object.values(filterParamsRules);

export const createGetParams = (serializedArray) => {
	return filterParamsRulesArray
		.map((paramRule) => {
			const returnValue = getValue(serializedArray, paramRule);
			return {
				name: paramRule.getParamsName,
				value: returnValue
			};
		})
		.filter((el) => el);
};
