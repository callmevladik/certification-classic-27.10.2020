// -----------------------------------------------------------------------------
// Deps
// -----------------------------------------------------------------------------

// global
import jQuery from 'js#/lib/jquery';
// styles
import 'sass#/style.scss';
//data
import data from 'js#/data/goods.json';
//vars
import globals from 'js#/globals/index'
// scripts
import { filter } from 'js#/modules/filter';
import { render } from 'js#/modules/render';
import { pagination} from "js#/modules/pagination";
import { chunkData} from "js#/modules/chunkData";

// -----------------------------------------------------------------------------
// Initialize
// -----------------------------------------------------------------------------
const { categoryChunkSize } = globals;

jQuery(function ($) {
	filter('.js-filter', data);
	render('#product-card', chunkData(data, categoryChunkSize)[0], '[data-insert]');
	pagination('#pagination', 5, '[data-insert]');
});
