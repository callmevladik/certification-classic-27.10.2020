import { createGetParams } from 'js#/functions/createGetParams';
import { getFormData } from 'js#/functions/getFormData';
import { chunkData } from 'js#/functions/chunkData';
import { render } from 'js#/functions/render';
import globals from 'js#/globals';
import data from 'js#/data/goods.json';

export const filter = (selector, data) => {
	const $elements = $(selector);
	const { categoryChunkSize, filterError } = globals;
	const currentChunkSize = categoryChunkSize[0].amount;
	let params = {};
	let initialData = data;
	let dataForFiltering = {};
	let dataForSorting = () => (dataForFiltering.length ? dataForFiltering : initialData);

	const transformSerializedArray = () => {
		return $elements.serializeArray();
	};

	const pushState = (state) => {
		const url = `?${$.param(state)}`;
		history.pushState('', '', url);
	};

	const filterData = (data, params) => {
		const { brand, manufacturer, model, year, price } = params.params;
		let newData = data;

		if (brand && brand.length) {
			let tempArray = [];
			brand.forEach((item) => {
				tempArray = [
					...tempArray,
					...newData.filter((el) => el.brand.id.toString() === item)
				];
			});
			newData = tempArray;
		}

		if (manufacturer) {
			newData = newData.filter(
				(el) => el.manufacturer.id.toString() === manufacturer.toString()
			);
		}

		if (model) {
			newData = newData.filter((el) => el.model.id.toString() === model.toString());
		}

		if (year) {
			newData = newData.filter((el) => el.year === year);
		}

		if (price) {
			newData = newData.filter(
				(el) => el.price.value > price[0] && el.price.value < price[1]
			);
		}

		dataForFiltering = newData;
		render(
			'#product-card',
			chunkData(dataForFiltering, currentChunkSize)[0],
			'[data-insert]',
			filterError
		);
	};

	const sortData = (data, params) => {
		const sorted = data.sort((a, b) => {
			switch (params.pagination.sort) {
				case '1':
					return a.price.value > b.price.value ? 1 : -1;
				case '2':
					return a.price.value < b.price.value ? 1 : -1;
				case '3':
					return a.year < b.year ? -1 : 1;
				case '4':
					return a.year > b.year ? -1 : 1;
			}
		});

		render(
			'#product-card',
			chunkData(sorted, currentChunkSize)[0],
			'[data-insert]',
			filterError
		);
	};

	$elements.on('change', () => {
		const transformedSerializedArray = transformSerializedArray();
		params = Object.assign(params, getFormData(transformedSerializedArray));
		filterData(initialData, params);
		sortData(dataForSorting(), params);
		pushState(createGetParams(transformedSerializedArray));
	});
};
