'use strict';

/**
 * PromoBar Module
 */
var PromoBar = function () {
    if (!(this instanceof PromoBar)) {
        return new PromoBar(elem);
    }
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
    getData: function (callback) {
        var self = this;
        // make ajax request for data
        if (self.url.length === 0) {
            throw new Error('Missing URL');
        }
        var r = new XMLHttpRequest(); 
        r.open('GET', self.url, true);
        r.onreadystatechange = function () {
            if (r.readyState != 4 || r.status != 200) {
                return;
            } 
            var json = JSON.parse(r.responseText);
            self.getContent(json);
            callback();
        };   
        r.send(null);        
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
    getContent: function (json) {
        var self = this;
        var region = self.getRegion();
        // loop through json records and retrieve region content
        json.promos.forEach(function (val) {
            if (!val[region]) {
                region = self.defaultRegion;
            }
            var content = val[region];
            if (Object.prototype.toString.call(content) === '[object Array]') {
                content = content[0];
            }
            self.regionContent.push(content);
        });
    }
}
/**
 * @module main/PromoBar
 */
module.exports = PromoBar;
