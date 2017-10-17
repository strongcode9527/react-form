/**
 * init the data of the form
 */
import {requireArguments, mustBeUnique, isArray, typeOf} from '../utils'

const createData = () => {

  let data = {},
    error = {},
    listeners = {},
    validations = {},
    touched = {},//用于记录表跟内容是否focus过
    isSynchVerify = false //用于记录所有表哥选项是否同步验证，默认不需要。

  /**
   *
   * @param formId
   * @param value
   */
  function init(formId, value) {
    requireArguments(formId, value)
    mustBeUnique(data, formId)
    mustBeUnique(error, formId)
    mustBeUnique(listeners, formId)
    mustBeUnique(validations, formId)
    data[formId] = value
    error[formId] = {}
    listeners[formId] = {}
    validations[formId] = {}
    touched[formId] = {}
  }

  function initValidations(formId, itemKey, validation) {
    requireArguments(formId, itemKey, validations)
    mustBeUnique(validations, formId, itemKey)
    if(!isArray(validation)) {
      throw new Error('the validations must be arrays')
    }
    validations[formId][itemKey] = validation
  }

  function initFormItem(formId, itemKey) {
    requireArguments(formId, itemKey)
    mustBeUnique(data, formId, itemKey)
    data[formId][itemKey] = undefined
    error[formId][itemKey] = undefined
  }

  /**
   *
   * @param formId 表格key
   * @param itemKey 表哥选项key
   * @param value 修改的值
   * @param isSynchVerifySub 是否需要验证此次修改的值。
   */
  function modify(formId, itemKey, value, isSynchVerifySub) {
    console.log('sdf', isSynchVerifySub)
    requireArguments(formId, itemKey)
    data[formId][itemKey] = value;
    isSynchVerifySub && (error[formId][itemKey] = handleValidation(value, validations[formId][itemKey]))
    listeners[formId][itemKey]()
  }

  function fetch(formId, itemKey) {
    requireArguments(formId)
    if(!data[formId]) {
      throw new Error('formId must exits')
    }
    if(formId && itemKey) {
      return {
        value: data[formId][itemKey],
        error: error[formId][itemKey],
      }
    }else {
      return {
        data: data[formId],
        error: error[formId],
      }
    }
  }

  function subscribe(formId, itemKey, listener) {
    mustBeUnique(listener, formId, itemKey)
    listeners[formId][itemKey] = listener
  }

  function handleValidation(value ,validation) {
    let result = ''
    validation.forEach( item => {
      !result && (result = item(value))
    })
    return result
  }

  function focus() {

  }
  function validate() {

  }
  return {
    init,
    fetch,
    focus,
    modify,
    validate,
    subscribe,
    initFormItem,
    initValidations,
  }
}

export default createData()