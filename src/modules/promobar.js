'use strict';

var request = require('request');
var template = require('../templates/promobars.hbs');

/**
 * PromoBar Module
 */
var PromoBar = function () {
    if (!(this instanceof PromoBar)) {
        return new PromoBar(elem);
    }
    this.json = {};
    this.region = 'global';
    this.regionContent = [];
    this.element = '.wl-promo-area--3-count .clearfix';
    this.url = 'http://localhost/common-modules/dist/data/promos.json';
}

PromoBar.prototype = {
	constructor: PromoBar,
	/**
     * Retrieve promobar JSON data from the server
     * @memberof module:main/PromoBar
     * @public
     * @method
     */
    getData: function (callback) {
        if (this.url.length === 0) {
            throw new Error('Missing URL');
        }
        var self = this;
        function resolve(data) {
            console.log(data);
        }
        function reject(mes) {
            console.error(mes);
        }
        request(self.url, function (err, res, body) {
            if (err) {
                throw new Error(res.statusCode, err);
            }
            self.json = JSON.parse(body);
            self.getContent();
        });
    },
    /**
     * Check if promo is valid within default region
     * @memberof module:main/PromoBar
     * @public
     * @method
     */
    isValid: function (start, end) {
        var valid = false;
        
        return valid;
    },
    /**
     * Get data region
     * @memberof module:main/PromoBar
     * @public
     * @method
     */
    getRegion: function () {
        // get data region
        var dataRegion = document.querySelector('[data-defaultregion]');
        if (!dataRegion) {
            throw new Error('Missing data-region');
        }
        this.region = dataRegion.getAttribute('data-defaultregion').toLowerCase();
    },
    /**
     * Get data region content for each slot
     * @memberof module:main/PromoBar
     * @public
     * @method
     */
    getContent: function () {
        var self = this;
        // get data region
        self.getRegion();
        // loop through json records and return content
        self.json.promos.forEach(function (val) {
            var key = self.region;
            if (!val[self.region]) {
                key = 'global';
            }
            self.regionContent.push(val[key]);
        });
        this.render();
    },
    /**
     * Bind handlebars template to JSON data
     * @memberof module:main/PromoBar
     * @public
     * @method
     */
    render: function (data) {
        if (this.regionContent.length === 0) {
            return;
        }
        var targetElement = document.querySelector(this.element);
        if (!targetElement) {
            return;
        }
        var content = '';
        this.regionContent.forEach(function (val) {
            content += template({ promo: val });
        });
        console.log(content);
        targetElement.innerHTML = content;
    }
}
/**
 * @module main/PromoBar
 */
module.exports = PromoBar;
