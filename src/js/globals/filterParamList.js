export const filterParamList = {
	page: {
		name: 'page',
		GET: 'page',
		type: 'number',
		multiple: false
	},
	year: {
		name: 'year',
		GET: 'year',
		type: 'number',
		multiple: false
	},
	priceFrom: {
		name: 'price-from',
		GET: 'price',
		type: 'number',
		multiple: false
	},
	priceTo: {
		name: 'price-to',
		GET: 'price',
		type: 'number',
		multiple: false
	},
	model: {
		name: 'filter-model',
		GET: 'model',
		type: 'string',
		multiple: false
	},
	manufacturer: {
		name: 'manufacturer',
		GET: 'manufacturer',
		type: 'string',
		multiple: false
	},
	brand: {
		name: 'brand',
		GET: 'brand',
		type: 'string',
		multiple: true
	},
	sort: {
		name: 'sort',
		GET: 'sort',
		type: 'string',
		multiple: false
	},
	perPage: {
		name: 'per_page',
		GET: 'per-page',
		type: 'number',
		multiple: false
	}
};
