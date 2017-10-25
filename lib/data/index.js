'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../utils');

var createData = function createData() {
  var data = {},
      error = {},
      listeners = {},
      validations = {},
      focused = {},
      //用于记录表跟内容是否focus过
  focusing = {},
      //用于记录此表单内容是否正在focus
  isShowErrors = {}; //用于记录是否全部显示某个表单的所有错误

  /**
   *
   * @param formId
   * @param value
   */
  function init(formId, value) {
    (0, _utils.requireArguments)(formId, value);
    (0, _utils.mustBeUnique)(data, formId);
    data[formId] = value;
    error[formId] = {};
    listeners[formId] = {};
    validations[formId] = {};
    focused[formId] = {};
    focusing[formId] = {};
    isShowErrors[formId] = false;
  }
  function asyncInitData(formId, value) {
    for (var i in value) {
      if (value.hasOwnProperty(i)) {
        (0, _utils.typeOf)(data[formId][i]) === 'undefined' && (data[formId][i] = value[i]);
        listeners[formId][i]();
      }
    }
  }
  function initValidations(formId, itemKey, validation) {
    (0, _utils.requireArguments)(formId, itemKey, validations);
    (0, _utils.mustBeUnique)(validations, formId, itemKey);
    if (!(0, _utils.isArray)(validation)) {
      throw new Error('the validations must be arrays');
    }
    validations[formId][itemKey] = validation;
  }

  function initFormItem(formId, itemKey, value) {
    !data[formId][itemKey] && (data[formId][itemKey] = value);
    focused[formId][itemKey] = false;
    focusing[formId][itemKey] = false;
  }

  /**
   *
   * @param formId 表格key
   * @param itemKey 表哥选项key
   * @param value 修改的值
   * @param isSynchVerifySub 是否需要验证此次修改的值。
   */
  function modify(formId, itemKey, value, isSynchVerifySub) {
    (0, _utils.requireArguments)(formId, itemKey);
    data[formId][itemKey] = value;
    isSynchVerifySub && handleValidation(formId, itemKey);
    listeners[formId][itemKey]();
  }

  function fetch(formId, itemKey) {
    (0, _utils.requireArguments)(formId);
    if (!data[formId]) {
      throw new Error('formId must exits');
    }
    if (formId && itemKey) {
      return {
        value: data[formId][itemKey],
        error: error[formId][itemKey],
        focused: focused[formId][itemKey],
        isShowErrors: isShowErrors[formId],
        focusing: focusing[formId][itemKey]
      };
    } else {
      return {
        data: data[formId],
        error: error[formId]
      };
    }
  }

  function subscribe(formId, itemKey, listener) {
    (0, _utils.mustBeUnique)(listener, formId, itemKey);
    listeners[formId][itemKey] = listener;
  }

  function handleValidation(formId, itemKey) {
    var result = '';
    validations[formId][itemKey].forEach(function (item) {
      !result && (result = item(data[formId][itemKey]));
    });
    error[formId][itemKey] = result;
    listeners[formId][itemKey]();
  }

  function changeFocusState(formId, itemKey) {
    (0, _utils.requireArguments)(formId, itemKey);
    focused[formId][itemKey] = true;
    focusing[formId][itemKey] = !focusing[formId][itemKey];
    listeners[formId][itemKey]();
  }
  function changeShowAllErrorsState(formId, itemKey) {
    var data = focused[formId];
    for (var i in data) {
      if (data.hasOwnProperty(i)) {
        data[i] = true;
        listeners[formId][i]();
      }
    }
  }
  return {
    init: init,
    fetch: fetch,
    modify: modify,
    subscribe: subscribe,
    initFormItem: initFormItem,
    asyncInitData: asyncInitData,
    initValidations: initValidations,
    changeFocusState: changeFocusState,
    handleValidation: handleValidation,
    changeShowAllErrorsState: changeShowAllErrorsState
  };
}; /**
    * init the data of the form
    */
exports.default = createData();