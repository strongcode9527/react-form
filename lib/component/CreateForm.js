'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _data = require('../data');

var _data2 = _interopRequireDefault(_data);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (_ref) {
  var formName = _ref.formName,
      initData = _ref.initData,
      isSynchVerify = _ref.isSynchVerify;

  (0, _utils.mustBeType)(formName, 'string', 'formName');
  return function (WrapComponent) {
    var _class, _temp;

    return _temp = _class = function (_Component) {
      _inherits(Hoc, _Component);

      _createClass(Hoc, [{
        key: 'getChildContext',
        value: function getChildContext() {
          return {
            isSynchVerify: isSynchVerify,
            store: _data2.default,
            formName: formName,
            initData: initData || {}
          };
        }
      }]);

      function Hoc(props) {
        _classCallCheck(this, Hoc);

        var _this = _possibleConstructorReturn(this, (Hoc.__proto__ || Object.getPrototypeOf(Hoc)).call(this, props));

        _this.handleSubmit = function (func) {
          return function () {
            (0, _utils.mustBeType)(func, 'function', 'func');
            func(_data2.default.fetch(formName).data);
            _data2.default.changeShowAllErrorsState(formName);
          };
        };

        _data2.default.init(formName, initData || {}, isSynchVerify);
        return _this;
      }

      _createClass(Hoc, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          if (nextProps.initData) {
            _data2.default.asyncInitData(formName, nextProps.initData);
          }
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrapComponent, { handleSubmit: this.handleSubmit });
        }
      }]);

      return Hoc;
    }(_react.Component), _class.childContextTypes = {
      store: _propTypes2.default.object,
      initData: _propTypes2.default.object,
      formName: _propTypes2.default.string,
      isSynchVerify: _propTypes2.default.bool
    }, _class.displayName = 'CreateForm(' + (WrapComponent || 'component') + ')', _temp;
  };
};