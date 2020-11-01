// -----------------------------------------------------------------------------
// Deps
// -----------------------------------------------------------------------------

// global
import jQuery from 'js#/lib/jquery';
// styles
import 'sass#/style.scss';
// scripts
import { filter } from 'js#/modules/filter';
import { render } from 'js#/modules/render';
import data from 'js#/data/goods.json';

// -----------------------------------------------------------------------------
// Initialize
// -----------------------------------------------------------------------------

jQuery(function ($) {
	filter('.js-filter');
	render('#product-card', data, '[data-insert]');
});
