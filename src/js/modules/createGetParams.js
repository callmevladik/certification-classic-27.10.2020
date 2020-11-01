import { filterParamList } from 'js#/configs/filterParamList';

const filterParamListArray = Object.values(filterParamList);

export const createGetParams = (serializedArray) => {
	return filterParamListArray
		.map((paramObj) => {
			const value = () => {
				return serializedArray
					.filter((el) => paramObj.name === el.name)
					.map((el) => el.value);
			};
			if (value().toString()) {
				return {
					name: paramObj.GET,
					value: value().length > 1 ? value() : value().toString()
				};
			}
		})
		.filter((el) => el);
};
