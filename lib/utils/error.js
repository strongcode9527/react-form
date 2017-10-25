'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function requireArguments() {
  var array = [].concat(Array.prototype.slice.call(arguments));
  array.forEach(function (item) {
    if (!item) {
      throw new Error('require ' + array.length + ' arguments');
    }
  });
  return true;
}

var mustBeUnique = function mustBeUnique(object) {
  for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keys[_key - 1] = arguments[_key];
  }

  var index = 0;
  while (object[keys[index]]) {
    object = object[keys[index]];
    index++;
  }
  if (index === keys.length) {
    throw new Error('the value is exists, can not init twice');
  } else {
    return true;
  }
};

function mustBeType(value, type, key) {
  if (arguments.length === 0) {
    throw new Error('mustBeType function must have least one argument');
  } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== type) {
    throw new Error('the type of ' + key + ' must be ' + type);
  }
}

exports.mustBeType = mustBeType;
exports.mustBeUnique = mustBeUnique;
exports.requireArguments = requireArguments;