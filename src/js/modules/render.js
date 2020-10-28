export const render = (template, data, place, config) => {
    const $template = $($(template)[0].content);
    console.log($template)
    const buildMarkup = (maxSize) => {
        const markup = '';

        data.forEach((item) => {
            let newTemplateInstance = $template.clone();
            newTemplateInstance.find('.card__brand').text(data.brand.name);
        })

    }

    buildMarkup()
}