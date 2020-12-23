import { filterRules } from "js#/globals/filterRules";
const { filterParamsRules } = filterRules;
const paginationInputName = filterParamsRules.page.inputName;

const createPaginationItemSelector = value => {
	return `data-pagination-item="${value}"`;
}

export const pagination = (chunkAmount, paginationSize, container, updateCallback) => {
	// console.log(chunkAmount, paginationSize);

	const paginationMarkup = (elements) => {
		return `
			<ul class="pagination">
				<input 
					type="hidden" 
					id="${paginationInputName}" 
					name="${paginationInputName}" 
					form="filter"
					data-filter-form-control="pagination"
					value="1"
				/>
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
				buttonsArray.push(paginationButtonMarkup(createPaginationItemSelector('first'), `&lt;&lt;`));
				buttonsArray.push(paginationButtonMarkup(createPaginationItemSelector('back'), `&lt;`));

				for (let i = 0; i < chunkAmount && i < paginationSize; i++) {
					buttonsArray.push(paginationButtonMarkup(createPaginationItemSelector(i), `${i + 1}`));
				}

				buttonsArray.push(paginationButtonMarkup(createPaginationItemSelector('forward'), `&gt;`));
				buttonsArray.push(paginationButtonMarkup(createPaginationItemSelector('last'), `&gt;&gt;`));
			} else {
				for (let i = 0; i < chunkAmount && i < paginationSize; i++) {
					buttonsArray.push(paginationButtonMarkup(createPaginationItemSelector(i), `${i + 1}`));
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
