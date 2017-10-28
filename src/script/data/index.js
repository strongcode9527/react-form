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
    isOk = {} //用于记录表单是否有错误,只在提交表单时使用。
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
    isOk[formId] = true  
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
    !data[formId][itemKey] && (data[formId][itemKey] = value)
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
        focusing: focusing[formId][itemKey],
      }
    }else {
      return {
        data: data[formId],
        isOk: isOk[formId],
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
    validations[formId][itemKey].forEach( item => {
      const error = item(data[formId][itemKey])
      console.log(formId, itemKey, 'error',error)
      if(!result && error) {
        result = error
        isOk[formId] = false
      }
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
  //当表单提交时，再次校验所有表单数据，并改变所有表单状态。
  function changeShowAllErrorsState(formId) {
    const data = focused[formId]
    for(let i in data) {
      if( data.hasOwnProperty( i ) ) {
        data[i] = true
        handleValidation(formId ,i)
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