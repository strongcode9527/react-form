'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../utils/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Field = (_temp = _class = function (_Component) {
  _inherits(Field, _Component);

  function Field(props, _ref) {
    var store = _ref.store,
        formName = _ref.formName,
        isSynchVerify = _ref.isSynchVerify,
        initData = _ref.initData;

    _classCallCheck(this, Field);

    var _this = _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this, props));

    _initialiseProps.call(_this);

    var fetch = store.fetch,
        subscribe = store.subscribe,
        initFormItem = store.initFormItem,
        initValidations = store.initValidations;

    _this.store = store;
    _this.formName = formName;
    _this.formItemKey = props.name; //表单itemKey
    _this.isSynchVerify = isSynchVerify; //全局是否同步验证flag

    /*
      *state 包括如下属性:
        value: 表单的值
        error: 验证后是否存在错误
        focused: 此项表单是否focus过
        focusing: 此项表单是否正在focus
    */

    //先进行验证函数初始化，便于初始化数据时，对数据进行第一次验证
    subscribe(formName, props.name, _this.changeState);
    initValidations(formName, props.name, props.validations || []);
    initFormItem(formName, props.name);
    _this.state = fetch(formName, props.name);
    return _this;
  }
  /**
   * 改变表格中的值
   * @param e
   */

  /**
   * 修改focus状态，focus和blur事件公用函数
   */


  _createClass(Field, [{
    key: 'render',
    value: function render() {
      var event = {
        onChange: this.handleChange,
        onFocus: this.handleChangeFocus,
        onBlur: this.handleChangeFocus
      };

      var Component = this.props.component;

      return _react2.default.createElement(Component, { event: event, meta: this.state });
    }
  }]);

  return Field;
}(_react.Component), _class.contextTypes = {
  store: _propTypes2.default.object,
  initData: _propTypes2.default.object,
  formName: _propTypes2.default.string,
  isSynchVerify: _propTypes2.default.bool
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.changeState = function () {
    _this2.setState(_extends({}, _this2.store.fetch(_this2.formName, _this2.props.name)));
  };

  this.handleChange = function (e) {
    var modify = _this2.store.modify,
        isSynchVerify = _this2.props.isSynchVerify,
        isSynchVerifySub = (0, _index.typeOf)(isSynchVerify, 'boolean') ? isSynchVerify : _this2.isSynchVerify;
    //第三个参数支持某一个表格选项

    modify(_this2.formName, _this2.formItemKey, e.target.value, isSynchVerifySub);
  };

  this.handleChangeFocus = function (e) {
    _this2.store.changeFocusState(_this2.formName, _this2.formItemKey);
    if (e.type === 'blur') {
      console.log('inBlur');
      _this2.store.handleValidation(_this2.formName, _this2.formItemKey);
    }
  };
}, _temp);
exports.default = Field;