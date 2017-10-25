'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArray = exports.shallowEqual = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.typeOf = typeOf;

var _error = require('./error');

Object.keys(_error).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _error[key];
    }
  });
});
var shallowEqual = exports.shallowEqual = function shallowEqual(a, b) {
  (0, _error.requireArguments)(a, b);
  return a === b;
};

var isArray = exports.isArray = function isArray(a) {
  (0, _error.requireArguments)(a);
  return Array.isArray(a);
};

function typeOf(value, type) {
  if (arguments.length < 2) {
    return typeof value === 'undefined' ? 'undefined' : _typeof(value);
  } else {
    if (typeof type !== 'string') {
      throw new Error('the type argument must be string');
    }
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === type;
  }
}