import { filter } from 'js#/modules/filter';

export const pagination = (template, paginationSize, container) => {

    const buildMarkup = (maxSize) => {
        const $template = $($(template)[0].content.children);
        const newTemplateInstance = $template.clone(true);
        let markup = '';
        newTemplateInstance.find('[data-page-back-twice').html('&lt;&lt;');
        newTemplateInstance.find('[data-page-back').html('&lt;');
        newTemplateInstance.find('[data-page-forward').html('&gt;');
        newTemplateInstance.find('[data-page-forward-twice').html('&gt;&gt;');
        markup += newTemplateInstance[0].outerHTML;
        return markup;
    };

    const insertMarkup = (container) => {
        $(container).append(buildMarkup(paginationSize));
    };

    const onPageClick = (container) => {
        $(container).find('[data-page]').on('click', () => {
            console.log(filter.data)
        })
    }

    const init = () => {
        insertMarkup(container);
        onPageClick(container);
    };

    init();
};
