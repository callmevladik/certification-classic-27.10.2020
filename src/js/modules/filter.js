import { createGetParams } from 'js#/modules/createGetParams';
import { getFormData } from 'js#/modules/getFormData';
import { chunkData} from "js#/modules/chunkData";
import globals from "js#/globals";



export const filter = (selector, data) => {
	const $elements = $(selector);
	const { categoryChunkSize } = globals;
	let params = filter.params = {};
	let productData = filter.productData = data;
	let filteredData = filter.filteredData = {};

	const transformSerializedArray = () => {
		return $elements.serializeArray();
	};

	const pushState = (state) => {
		const url = `?${$.param(state)}`;
		history.pushState('', '', url);
	};

	const filterData = (data, params) => {
		console.log(data, params)
		const { brand, manufacturer, model, year, price } = params.params;
		let newData = data;

		if (brand) {
			newData = newData.filter((el) => {
				if (brand.length > 1) {
					brand.forEach((item) => el.brand.id.toString() === item ? el.brand.id : null)
				}
				return el.brand.id.toString() === brand ? el.brand.id : null;
			});
		}

		if (manufacturer) {
			newData = newData.filter((el) => el.manufacturer.id.toString() === manufacturer);
		}

		if (model) {
			newData = newData.filter((el) => el.model.id.toString() === model);
		}

		if (year) {
			newData = newData.filter((el) => el.year.toString() === year);
		}

		if (price) {
			newData = newData.filter((el) => el.price.value.toString() > price[0] && el.price.value.toString() < price[1]);
		}

		filteredData = newData;
	}

	const sortData = (data, params) => {

	}

	$elements.on('change', () => {
		const transformedSerializedArray = transformSerializedArray();
		params = Object.assign(params, getFormData(transformedSerializedArray));
		filterData(productData, params);
		console.log(productData);
		console.log(filteredData);
		// console.log(params, productData);
		// console.log(getFormData(transformedSerializedArray));
		pushState(createGetParams(transformedSerializedArray));
	});
};
