import globals from 'js#/globals';

// functions
import { createGetParams } from 'js#/functions/createGetParams';
import { getFormData } from 'js#/functions/getFormData';
import { chunkData } from 'js#/functions/chunkData';
import { renderCard } from 'js#/functions/renderCard';
import { pagination } from "js#/functions/pagination";
// filter rules
import { filterRules } from "js#/globals/filterRules";

// some vars
const {
	pagination: { initialPaginationSize },
	translates: { filterError },
 } = globals;

// filter rules
const {
	sortRules,
	chunkRules
} = filterRules;

export const filter = (controlElementSelector, data) => {
	let $anyFilterControlElement = $(controlElementSelector);
	let $filterControlElement = $anyFilterControlElement.filter((i, el) => $(el).data('filter-form-control') === 'filter');
	let $sortControlElement = $anyFilterControlElement.filter((i, el) => $(el).data('filter-form-control') === 'sort');
	let $paginationControlElement = $anyFilterControlElement.filter((i, el) => $(el).data('filter-form-control') === 'pagination');
	let params = {};
	let initialData = data;
	let currentData = initialData;
	let transformedSerializedArray;
	const currentChunkSize = chunkRules[0].amount;
	let chunkAmount = chunkData(data, currentChunkSize).length;

	const transformSerializedArray = () => {
		return $anyFilterControlElement.serializeArray();
	};

	const updateSerializedArray = () => {
		transformedSerializedArray = transformSerializedArray();
	}

	const updateParams = (serializedArray) => {
		updateSerializedArray();
		console.log(getFormData(serializedArray));
		params = Object.assign(params, getFormData(serializedArray));
	}

	const updateChunkAmount = () => {
		updateParams(transformedSerializedArray);
		chunkAmount = chunkData(currentData, getChunkSize(params)).length;
		console.log('получено кол-во чанков =>', chunkAmount)
	}

	const updateSelectorItems = () => {
		$anyFilterControlElement = $(controlElementSelector);
		$filterControlElement = $anyFilterControlElement.filter((i, el) => $(el).data('filter-form-control') === 'filter');
		$sortControlElement = $anyFilterControlElement.filter((i, el) => $(el).data('filter-form-control') === 'sort');
		$paginationControlElement = $anyFilterControlElement.filter((i, el) => $(el).data('filter-form-control') === 'pagination');
	}

	const getChunkSize = (params) => {
		const { perPage } = params.pagination;
		return chunkRules.filter((el) => el.value === perPage)[0].amount
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
		renderCard('#product-card', chunkData(currentData, currentChunkSize)[0], '[data-insert="cards"]', filterError);
		console.log('Произошла фильтрация =>', currentData);
		pagination(chunkAmount, initialPaginationSize, '[data-insert="pagination"]', updateChunkAmount);
	};

	const sortData = (data, params) => {
		const currentSortValue = params.pagination.sort;
		console.log(currentSortValue)
		const properSortRule = sortRules.filter((rule) => rule.value === currentSortValue)[0];
		console.log(properSortRule)

		currentData = data.sort((a, b) => {
			return properSortRule.initSort(a, b);
		});

		if (currentData && currentData.length) { // не перерисовывать, если после фильтрации возвращается 0 результатов
			renderCard('#product-card', chunkData(currentData, currentChunkSize)[0], '[data-insert="cards"]');
		}

		console.log('Произошла сортировка =>', currentData);
	};

	const renderNewCards = (data, params) => {
		const newChunkSize = getChunkSize(params);

		if (newChunkSize !== currentChunkSize) { // рендерить только новое количество
			renderCard('#product-card', chunkData(currentData, newChunkSize)[0], '[data-insert="cards"]');
		}
	}

	const onPaginationClick = () => {
		$('body')
			.on('click', '[data-pagination-item]', (e) => {
				const currentTarget = $(e.currentTarget);
				const hiddenValueInput = currentTarget.parent().siblings('input');
				if (hiddenValueInput.length) {
					hiddenValueInput.attr('value', currentTarget.attr('[data-pagination-item]'));
					hiddenValueInput.trigger('change');
					const newChunkValue = hiddenValueInput.attr('value');
					renderCard('#product-card', chunkData(currentData, currentChunkSize)[newChunkValue], '[data-insert="cards"]');
				}
			});
	};

	(() => {
		updateSerializedArray();
		updateParams(transformedSerializedArray);
		renderCard('#product-card', chunkData(data, currentChunkSize)[0], '[data-insert="cards"]');
		pagination(chunkAmount, initialPaginationSize, '[data-insert="pagination"]');
		updateSelectorItems();
		onPaginationClick();

		$anyFilterControlElement.on('change', () => {
			console.log('change');
			updateSerializedArray();
			updateSelectorItems();
			updateParams(transformedSerializedArray);
			pushState(createGetParams(transformedSerializedArray));
			pagination(chunkAmount, initialPaginationSize, '[data-insert="pagination"]'); // обновленные значения chunkAmount
		});

		$filterControlElement.on('change', () => {
			filterData(initialData, params);
			renderNewCards(currentData, params); // рендерит новое кол-во карточек
		});

		$sortControlElement.on('change', () => {
			sortData(currentData, params);
			renderNewCards(currentData, params);
		})
	})();
};
