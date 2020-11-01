export const render = (template, data, container) => {
	const buildMarkup = (data, maxSize) => {
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
		$(place).append(buildMarkup(data));
	};

	const init = () => {
		insertMarkup(container);
	};

	init();
};
