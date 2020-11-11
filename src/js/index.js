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
import globals from 'js#/globals/index';
// scripts
import { filter } from 'js#/modules/filter';
import { render } from 'js#/functions/render';
import { pagination } from 'js#/functions/pagination';
import { chunkData } from 'js#/functions/chunkData';

// -----------------------------------------------------------------------------
// Initialize
// -----------------------------------------------------------------------------
const { categoryChunkSize } = globals;
const currentChunkSize = categoryChunkSize[0].amount;

jQuery(function ($) {
	filter('.js-filter', data);
	render('#product-card', chunkData(data, currentChunkSize)[0], '[data-insert]');
	pagination('#pagination', 5, '[data-insert]');
});
