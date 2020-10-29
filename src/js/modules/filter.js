import $ from 'js#/lib/jquery';
import { categoryFilterCfg } from 'js#/configs/filter';
import { paramList } from 'js#/configs/paramList';

export const filter = (selector) => {
	const $elements = $(selector);

	const getParams = (config) => {
		const serializedArray = $elements.serializeArray();
		return config(serializedArray);
	};

	const makeGetParams = (paramObject) => {
		const flattedParamObject = Object.assign(
			paramObject.pagination,
			paramObject.params
		);
		const state = [];

		paramList.forEach((param) => {
			if (flattedParamObject[param]) {
				state.push({
					name: [param],
					value: flattedParamObject[param]
				});
			}
		});

		console.log(state);

		return state;
	};

	const pushState = (state) => {
		const url = $.param(state);
		history.pushState('', '', url);
	};

	$elements.on('change', () => {
		pushState(makeGetParams(getParams(categoryFilterCfg)));
	});
};
