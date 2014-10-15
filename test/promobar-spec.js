'use strict';

var should = require('should');
var Zombie = require('zombie');
//var PromoBar = require('../src/modules/promobar');

var browser = new Zombie({
    debug: true
});

setup(function(done) {
    browser.visit('http://localhost/promobar/dist/').then(done);
    browser.on('error', function(err) {
        console.dir(err);
    });
});
