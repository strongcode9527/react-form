/**
 * init the data of the form
 */
import {fromJS} from 'immutable'

const createData = () => {

  const data = {
    
  }

  const listeners = {}

  function init(formId, value) {
    if(!formId && !value){
      throw new Error("有错误")
    }
    data[formId] = value
  }
  
  function modify(formId, formKey, formValue) {
    if(!formId && !formKey && !formValue){
      throw new Error("有错误")
    }
    data[formKey] = formValue
  }

  function fetch(formId, formKey) {
    return data[formId][formKey]
  }

  function subscribe(listener, formId) {
    if(listeners[formId]) {
      console.warn('the listener already exists')
      return 0
    }
    listeners[formId] = listener
  }
  return {
    init,
    modify,
    fetch,
    subscribe,
  }
}

export default createData