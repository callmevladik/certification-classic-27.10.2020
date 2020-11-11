import globals from 'js#/globals';
const { error } = globals;

export const render = (template, data, container, errorMessage = error) => {
	const buildMarkup = (data) => {
		const $template = $($(template)[0].content.children);
		let markup = '';

		data.forEach((item) => {
			const newTemplateInstance = $template.clone(true);
			newTemplateInstance.find('[data-brand]').text(item.brand.name);
			newTemplateInstance
				.find('[data-image]')
				.attr('src', item.image.sizes['card-preview'])
				.attr('alt', item.image.alt);
			newTemplateInstance.find('[data-manufacturer]').text(item.manufacturer.name);
			newTemplateInstance.find('[data-year]').text(item.year);
			newTemplateInstance.find('[data-model]').text(item.model.name);
			newTemplateInstance
				.find('[data-price]')
				.text(`${item.price.currency.symbol}${item.price.value}`);

			markup += newTemplateInstance[0].outerHTML;
		});

		return markup;
	};

	const insertMarkup = (place) => {
		$(place).html(buildMarkup(data));
	};

	const leaveErrorMessage = (place) => {
		$(place).html(errorMessage);
	};

	const init = () => {
		if (data) {
			insertMarkup(container);
		} else {
			leaveErrorMessage(container);
		}
	};

	init();
};
