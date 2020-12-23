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

// -----------------------------------------------------------------------------
// Initialize
// -----------------------------------------------------------------------------

jQuery(function ($) {
	filter('[data-filter-form-control]', data);
});
