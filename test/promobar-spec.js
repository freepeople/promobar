'use strict';

var test = require('tape');
var PromoBar = require('../src/modules/promobar');

test('PromoBar Test', function (t) {
	t.plan(2);
	
	// asynchronously retrieve json file and return a promise
	var promobar = new PromoBar();
	var promise = promobar.getData();
	promise	
		.then(function (response) {
			t.pass('Promise worked');
		})
		.catch(function (response) {
            t.fail('Promise failed');
        })
        .done(function (response) {
            //testRender(response);
        });
	
	// check for success
	function testRender(response) {
		promobar.render(response);
		t.pass('Rendered template');
	}
});