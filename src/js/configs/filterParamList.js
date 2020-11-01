export const filterParamList = {
	page: {
		name: 'page',
		GET: 'page',
		order: 1
	},
	year: {
		name: 'year',
		GET: 'year',
		order: 2
	},
	priceFrom: {
		name: 'price-from',
		GET: 'price',
		order: 3
	},
	priceTo: {
		name: 'price-to',
		GET: 'price',
		order: 4
	},
	model: {
		name: 'filter-model',
		GET: 'model',
		order: 5
	},
	manufacturer: {
		name: 'manufacturer',
		GET: 'manufacturer',
		order: 6
	},
	brand: {
		name: 'brand',
		GET: 'brand',
		order: 7,
		multiple: true
	},
	sort: {
		name: 'sort',
		GET: 'sort',
		order: 8
	},
	perPage: {
		name: 'per_page',
		GET: 'per-page',
		order: 9
	}
};
