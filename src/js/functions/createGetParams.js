import { filterParamList } from 'js#/globals/filterParamList';
import { getValue } from 'js#/functions/getValue';

const filterParamListArray = Object.values(filterParamList);

export const createGetParams = (serializedArray) => {
	return filterParamListArray
		.map((paramObj) => {
			const returnValue = getValue(serializedArray, paramObj);
			return {
				name: paramObj.GET,
				value: returnValue
			};
		})
		.filter((el) => el);
};
