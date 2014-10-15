'use strict';

var PromoBar = require('./modules/promobar');
var template = require('../dist/templates/promobars.hbs');

var promobar = new PromoBar();
var targetElement = document.querySelector(promobar.element);
if (!targetElement) {
    return;
}

promobar.getData(function () {
	var content = '';
	promobar.regionContent.forEach(function (val) {
    	content += template({ promo: val });
	});
	targetElement.innerHTML = content;
});
