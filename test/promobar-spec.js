'use strict';

var should = require('should');
var Zombie = require('zombie');

var browser = new Zombie({
    debug: true
});

setup(function(done) {
    browser.visit('http://localhost/promobar/dist/').then(done);
    browser.on('error', function(err) {
        console.dir(err);
    });
});

test('promos display on page load', function() {
	setTimeout(function () {
		var promos = browser.query('.wl-promo-area--3-count');
		promos.innerHTML.length.should.be.greaterThan(0);
	}, 1000);
});	
