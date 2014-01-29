var prominent = require('../index.js');
var element = require('tiny-element');
var dom = require('tiny-dom');
var trigger = require('tiny-trigger');
var test = require('tape');

test('returns a promise', function (t) {
  var clicked = prominent('.selector', 'click');
  t.ok(clicked.then, 'has then method');
  t.end();
});

test('executes function when promise is resolved', function (t) {
  element('body').appendChild(dom('<div class="selector"></div>'));
  
  var clicked = prominent('.selector', 'click');
  
  trigger('.selector', 'click');
  
  clicked.then(function () {
    t.ok(true, 'element clicked');
    t.end();
  });
});

test('rejects the promise if the element doesn not exist', function(t) {
  var clicked = prominent('.unavailable', 'click');
  
  clicked.then(function () {
    t.ok(false, 'should not be successful');
  }, function () {
    t.ok(true, 'element does not exists');
    t.end();
  });
});