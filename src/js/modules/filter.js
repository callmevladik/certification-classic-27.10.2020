import globals from 'js#/globals';

import { createGetParams } from 'js#/functions/createGetParams';
import { getFormData } from 'js#/functions/getFormData';
import { chunkData } from 'js#/functions/chunkData';
import { render } from 'js#/functions/render';
import { pagination } from "js#/functions/pagination";

export const filter = (selector, data) => {
	let $element = $(selector);
	const { categoryChunkSize, filterError, cardsContainer, paginationContainer, paginationSize } = globals;
	const currentChunkSize = categoryChunkSize[0].amount;
	let params = {};
	let initialData = data;
	let filteredData = {};
	let transformedSerializedArray;
	let chunkAmount = chunkData(data, currentChunkSize).length;

	const transformSerializedArray = () => {
		return $element.serializeArray();
	};

	const updateSerializedArray = () => {
		transformedSerializedArray = transformSerializedArray();
		console.log(transformedSerializedArray, params)
	}

	const updateParams = (serializedArray) => {
		params = Object.assign(params, getFormData(serializedArray));
	}

	const updateChunkAmount = () => {
		updateParams(transformedSerializedArray);
		chunkAmount = chunkData(data, getChunkSize(params)).length;
	}

	const updateElement = () => {
		$element = $(selector);
	}

	const getChunkSize = (params) => {
		const { perPage } = params.pagination;
		return categoryChunkSize.filter((el) => el.value === perPage)[0].amount
	}

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

		filteredData = newData;

		render('#product-card', chunkData(filteredData, currentChunkSize)[0],cardsContainer,filterError);
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

		filteredData = sorted;

		if (filteredData && filteredData.length) { // не перерисовывать, если после фильтрации возвращается 0 результатов
			render('#product-card', chunkData(filteredData, currentChunkSize)[0], cardsContainer);
		}
	};

	const renderNewAmount = (data, params) => {
		const newChunkSize = getChunkSize(params);

		if (newChunkSize !== currentChunkSize) { // рендерить только новое количество
			render('#product-card', chunkData(filteredData, newChunkSize)[0], cardsContainer);
		}
	}

	const onPageClick = (container) => {
		$(container)
			.find('[data-pagination-item]')
			.on('click', (e) => {
				const currentTarget = $(e.currentTarget);
				const input = currentTarget.parent().parent().find('input');
				if (input.length) {
					input.attr('value', currentTarget.attr('data-pagination-item'));
					input.change();
				}
			});
	};

	const loadPage = (data, params) => {

	}

	const init = () => {
		updateSerializedArray();
		updateParams(transformedSerializedArray);
		render('#product-card', chunkData(data, currentChunkSize)[0], cardsContainer);
		pagination(chunkAmount, paginationSize, paginationContainer);
		updateElement();
		onPageClick(paginationContainer)

		$element.on('change', () => {
			updateSerializedArray();
			updateChunkAmount();
			updateParams(transformedSerializedArray);
			filterData(initialData, params);
			sortData(filteredData, params);
			renderNewAmount(filteredData, params);
			pushState(createGetParams(transformedSerializedArray));
			pagination(chunkAmount, paginationSize, paginationContainer); // обновленные значения chunkAmount
		});
	}

	init();
};
