import { filterParamList } from "js#/globals/filterParamList";

const paginationInputName = filterParamList.page.name;

export const pagination = (chunkAmount, paginationSize, container, updateCallback) => {
	// console.log(chunkAmount, paginationSize);

	const paginationMarkup = (elements) => {
		return `
				<ul class="pagination">
					<input type="hidden" id="${paginationInputName}" name="${paginationInputName}" form="filter" value="" class="js-filter"/>
					${elements}
				</ul>
			`
	};

	const paginationButtonMarkup = (attribute, text) => {
		return `
				<li class="pagination__item">
					<a class="pagination__link" ${attribute}>
						${text}
					</a>
				</li>
			`
	};

	const buttonsMarkup = () => {
		const buttonsArray = [];

		if (chunkAmount > 1) {
			if (chunkAmount > paginationSize) {
				buttonsArray.push(paginationButtonMarkup('data-pagination-item="first"', `&lt;&lt;`));
				buttonsArray.push(paginationButtonMarkup('data-pagination-item="back"', `&lt;`));
				for (let i = 0; i < chunkAmount; i++) {
					if (i === paginationSize) {
						break;
					}

					buttonsArray.push(paginationButtonMarkup(`data-pagination-item="${i}"`, `${i + 1}`));
				}
				buttonsArray.push(paginationButtonMarkup('data-pagination-item="last"', `&gt;&gt;`));
				buttonsArray.push(paginationButtonMarkup('data-pagination-item="forward"', `&gt;`));
			} else {
				for (let i = 0; i < chunkAmount; i++) {
					if (i === paginationSize) {
						break;
					}

					buttonsArray.push(paginationButtonMarkup(`data-pagination-item="${i}"`, `${i + 1}`));
				}
			}
		}

		return buttonsArray.reduce((accum, currElem) => accum += currElem,``)
	}

	const buildMarkup = () => {
		return paginationMarkup(buttonsMarkup());
	};

	const insertMarkup = (container) => {
		$(container).html(buildMarkup());
	};


	const init = () => {
		insertMarkup(container);
	};

	if (updateCallback) {
		updateCallback();
	}
	init();
};
