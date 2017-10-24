/**
 * init the data of the form
 */
import {requireArguments, mustBeUnique, isArray, typeOf} from '../utils'

const createData = () => {
  let data = {},
    error = {},
    listeners = {},
    validations = {},
    focused = {},//用于记录表跟内容是否focus过
    focusing = {}, //用于记录此表单内容是否正在focus
    isShowErrors = {} //用于记录是否全部显示某个表单的所有错误

  /**
   *
   * @param formId
   * @param value
   */
  function init(formId, value) {
    requireArguments(formId, value)
    mustBeUnique(data, formId)
    data[formId] = value
    error[formId] = {}
    listeners[formId] = {}
    validations[formId] = {}
    focused[formId] = {}
    focusing[formId] = {}
    isShowErrors[formId] = false
  }
  function asyncInitData(formId, value) {
    for(let i in value) {
      if( value.hasOwnProperty( i ) ) {
        typeOf(data[formId][i]) === 'undefined' && (data[formId][i] = value[i])
        listeners[formId][i]()
      }
    }
  }
  function initValidations(formId, itemKey, validation) {
    requireArguments(formId, itemKey, validations)
    mustBeUnique(validations, formId, itemKey)
    if(!isArray(validation)) {
      throw new Error('the validations must be arrays')
    }
    validations[formId][itemKey] = validation
  }

  function initFormItem(formId, itemKey, value) {
    // requireArguments(formId, itemKey)
    // mustBeUnique(data, formId, itemKey)
    !data[formId][itemKey] && (data[formId][itemKey] = value)
    // error[formId][itemKey] =  handleValidation(formId, itemKey)
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
    requireArguments(formId, itemKey)
    data[formId][itemKey] = value;
    isSynchVerifySub && handleValidation(formId, itemKey)
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
        focused: focused[formId][itemKey],
        isShowErrors: isShowErrors[formId],
        focusing: focusing[formId][itemKey],
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

  function handleValidation(formId ,itemKey) {
    let result = ''
    console.log(formId, itemKey,validations[formId][itemKey])
    validations[formId][itemKey].forEach( item => {
      !result && (result = item(data[formId][itemKey]))
    })
    error[formId][itemKey] = result
    listeners[formId][itemKey]()
  }



  function changeFocusState(formId, itemKey) {
    requireArguments(formId, itemKey)
    focused[formId][itemKey] = true
    focusing[formId][itemKey] = !focusing[formId][itemKey]
    listeners[formId][itemKey]()
  }
  function changeShowAllErrorsState(formId, itemKey) {
    const data = focused[formId]
    for(let i in data) {
      if( data.hasOwnProperty( i ) ) {
        data[i] = true
        listeners[formId][i]()
      }
    }
  }
  return {
    init,
    fetch,
    modify,
    subscribe,
    initFormItem,
    asyncInitData,
    initValidations,
    changeFocusState,
    handleValidation,
    changeShowAllErrorsState,
  }
}

export default createData()