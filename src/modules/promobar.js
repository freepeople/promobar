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
    this.promoDataKey = 'promobar';
    this.promoExpiresKey = 'promobarExpires';
    this.json = {};
    this.defaultRegion = 'global';
    this.regionContent = [];
    this.element = '.wl-promo-area--3-count';
    this.url = 'http://localhost/promobar/dist/data/promos.json';
}

PromoBar.prototype = {
	constructor: PromoBar,
    /**
     * Retrieve promobar JSON data from the server
     * @memberof module:main/PromoBar
     * @public
     * @method
     */
    getData: function () {
        var self = this;
        var expireTime = localStorage.getItem(self.promoExpiresKey);
        var currentTime = new Date();
        // check local storage
        if (localStorage.getItem(self.promoDataKey) && self.isValid(expireTime, currentTime)) {
            self.json = localStorage.getItem(self.promoDataKey);
            self.getContent();
        } else {
            // make ajax request for data
            if (this.url.length === 0) {
                throw new Error('Missing URL');
            }
            request(self.url, function (err, res, body) {
                if (err) {
                    throw new Error(res.statusCode, err);
                }
                self.json = JSON.parse(body);
                self.getContent();
                localStorage.setItem(self.promoDataKey, self.json);
            });
        }
    },
    /**
     * Check if promo is valid
     * @memberof module:main/PromoBar
     * @public
     * @method
     */
    isValid: function (expireTime, currentTime) {
        return Date.parse(expireTime) < Date.parse(currentTime);
    },
    /**
     * Set promobar expiration date
     * @memberof module:main/PromoBar
     * @public
     * @method
     */
    setExpiration: function (expirationTimes) {
        var currentTime = new Date();
        var smallestTime = expirationTimes.filter(function (time) {
            return Date.parse(time.end) < Date.parse(currentTime);
        });
        localStorage.setItem(self.promoExpiresKey, smallestTime);    
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
        return dataRegion.getAttribute('data-defaultregion').toLowerCase();
    },
    /**
     * Get data region content for each slot
     * @memberof module:main/PromoBar
     * @public
     * @method
     */
    getContent: function () {
        var self = this;
        var expirationTimes = [];
        var region = self.getRegion();
        // loop through json records and retrieve region content
        self.json.promos.forEach(function (val) {
            if (!val[region]) {
                region = self.defaultRegion;
            }
            var content = val[region];
            if (Object.prototype.toString.call(content) === '[object Array]') {
                content = content[0];
            }
            expirationTimes.push(content.end);
            self.regionContent.push(content);
        });
        // filter out soonest expiration time
        self.setExpiration(expirationTimes);
        // render html for promos
        self.render();
    },
    /**
     * Bind handlebars template to JSON data
     * @memberof module:main/PromoBar
     * @public
     * @method
     */
    render: function () {
        var targetElement = document.querySelector(this.element);
        if (!targetElement) {
            return;
        }
        var content = '';
        this.regionContent.forEach(function (val) {
            content += template({ promo: val });
        });
        console.log(targetElement);
        targetElement.innerHTML = content;
    }
}
/**
 * @module main/PromoBar
 */
module.exports = PromoBar;
