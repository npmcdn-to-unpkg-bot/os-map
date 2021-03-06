define(['Squire'], function(Squire) {
	QUnit.module('params', function() {
		QUnit.test('single param', function (assert) {
			runParamsTest(assert, Squire, "blah=stuff", function(params) {
				assert.equal(params('blah'), 'stuff');
			});
		});
		
		QUnit.test('many params', function (assert) {
			runParamsTest(assert, Squire, "blah=stuff&more=xyz", function(params) {
				assert.equal(params('blah'), 'stuff');
				assert.equal(params('more'), 'xyz');
				assert.equal(params('xyz'), null);
			});
		});
		
		QUnit.test('multi-value params', function (assert) {
			runParamsTest(assert, Squire, "blah=stuff,thing&more=xyz&more=abc", function(params) {
				assert.equal(params('blah'), 'stuff,thing');
				assert.equal(params('more'), 'abc');//if the param appears multiple times, we just use the last one - this is a known limitation
			});
		});
	});
	
	function runParamsTest(assert, Squire, getParams, callback) {
		var done = assert.async();
		var injector = new Squire();
		var mockWindow = {};
		mockWindow.location = {};
		mockWindow.location.search = '?' + getParams;
		injector.mock('global', mockWindow);
		injector.require(['params'], function(params) {
			callback(params);
			done();
		});
	}
});
