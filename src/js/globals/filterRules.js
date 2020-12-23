export const filterRules = {
	sortRules: [
		{
			value: '1',
			initSort: (a, b) => {
				return a.price.value > b.price.value ? 1 : -1;
			}
		},
		{
			value: '2',
			initSort: (a, b) => {
				return a.price.value < b.price.value ? 1 : -1;
			}
		},
		{
			value: '3',
			initSort: (a, b) => {
				return a.year < b.year ? -1 : 1;
			}
		},
		{
			value: '4',
			initSort: (a, b) => {
				return a.year > b.year ? -1 : 1;
			}
		}
	],
	chunkRules : [
		{
			value: 1,
			amount: 6
		},
		{
			value: 2,
			amount: 12
		},
		{
			value: 3,
			amount: 24
		},
		{
			value: 4,
			amount: 60
		}
	],
	filterParamsRules : {
		page: {
			inputName: 'page',
			getParamsName: 'page',
			type: 'number',
			hasMultipleValues: false
		},
		year: {
			inputName: 'year',
			getParamsName: 'year',
			type: 'number',
			hasMultipleValues: false
		},
		priceFrom: {
			inputName: 'price-from',
			getParamsName: 'price',
			type: 'number',
			hasMultipleValues: false
		},
		priceTo: {
			inputName: 'price-to',
			getParamsName: 'price',
			type: 'number',
			hasMultipleValues: false
		},
		model: {
			inputName: 'filter-model',
			getParamsName: 'model',
			type: 'string',
			hasMultipleValues: false
		},
		manufacturer: {
			inputName: 'manufacturer',
			getParamsName: 'manufacturer',
			type: 'string',
			hasMultipleValues: false
		},
		brand: {
			inputName: 'brand',
			getParamsName: 'brand',
			type: 'string',
			hasMultipleValues: true
		},
		sort: {
			inputName: 'sort',
			getParamsName: 'sort',
			type: 'string',
			hasMultipleValues: false
		},
		perPage: {
			inputName: 'per_page',
			getParamsName: 'per-page',
			type: 'number',
			hasMultipleValues: false
		}
	},
}