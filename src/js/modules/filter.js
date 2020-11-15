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
	let currentData = initialData;
	let transformedSerializedArray;
	let chunkAmount = chunkData(data, currentChunkSize).length;

	const transformSerializedArray = () => {
		return $element.serializeArray();
	};

	const updateSerializedArray = () => {
		transformedSerializedArray = transformSerializedArray();
	}

	const updateParams = (serializedArray) => {
		updateSerializedArray();
		params = Object.assign(params, getFormData(serializedArray));
	}

	const updateChunkAmount = () => {
		updateParams(transformedSerializedArray);
		chunkAmount = chunkData(currentData, getChunkSize(params)).length;
		console.log('updated chunk amount =>', chunkAmount)
	}
	
	const updateSelectorItems = () => {
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

		currentData = newData;
		render('#product-card', chunkData(currentData, currentChunkSize)[0],cardsContainer,filterError);
		console.log('Произошла фильтрация =>', currentData);
		pagination(chunkAmount, paginationSize, paginationContainer, updateChunkAmount);
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

		currentData = sorted;

		if (currentData && currentData.length) { // не перерисовывать, если после фильтрации возвращается 0 результатов
			render('#product-card', chunkData(currentData, currentChunkSize)[0], cardsContainer);
		}

		console.log('Произошла сортировка =>', currentData);
	};

	const renderNewAmount = (data, params) => {
		const newChunkSize = getChunkSize(params);

		if (newChunkSize !== currentChunkSize) { // рендерить только новое количество
			render('#product-card', chunkData(currentData, newChunkSize)[0], cardsContainer);
		}
	}

	const onPaginationClick = () => {
		$('body')
			.on('click', '[data-pagination-item]', (e) => {
				const currentTarget = $(e.currentTarget);
				const input = currentTarget.parent().parent().find('input');
				if (input.length) {
					input.attr('value', currentTarget.attr('data-pagination-item'));
					input.trigger('change');
					const newChunkSize = input.attr('value');
					render('#product-card', chunkData(currentData, currentChunkSize)[newChunkSize], cardsContainer);
				}
			});
	};

	const init = () => {
		updateSerializedArray();
		updateParams(transformedSerializedArray);
		render('#product-card', chunkData(data, currentChunkSize)[0], cardsContainer);
		pagination(chunkAmount, paginationSize, paginationContainer);
		updateSelectorItems();
		onPaginationClick()

		$element.on('change', () => {
			console.log('change')
			updateSerializedArray();
			updateSelectorItems();
			updateParams(transformedSerializedArray);
			filterData(initialData, params);
			sortData(currentData, params);
			renderNewAmount(currentData, params); // рендерит новое кол-во карточек
			pushState(createGetParams(transformedSerializedArray));
			pagination(chunkAmount, paginationSize, paginationContainer); // обновленные значения chunkAmount
		});
	}

	init();
};
