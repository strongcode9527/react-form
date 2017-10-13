/**
 * init the data of the form
 */
import {requireArguments, mustBeUnique, isArray} from '../utils'

const createData = () => {

  const data = {},
    error = {},
    listeners = {},
    validations = {}

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

  function modify(formId, itemKey, value) {
    requireArguments(formId, itemKey)
    data[formId][itemKey] = value
    error[formId][itemKey] = handleValidation(value, validations[formId][itemKey])
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

  return {
    init,
    fetch,
    modify,
    subscribe,
    initFormItem,
    initValidations,
  }
}

export default createData()