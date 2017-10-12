/**
 * init the data of the form
 */
// import {fromJS} from 'immutable'

const createData = () => {

  const data = {
    
  }

  const listeners = {}

  function init(formId, value) {
    if(!formId || !value){
      throw new Error("有错误")
    }
    
    data[formId] = value
    listeners[formId] = {}
    // listeners[formId] && listeners[formId](data[formId])
  }
  
  function initFormItem(formId, itemKey) {
    data[formId][itemKey] = undefined
  }

  function modify(formId, dataKey, value) {
    if(!formId && !dataKey && !value){
      throw new Error("有错误")
    }
    data[formId][dataKey] = value
    listeners[formId][dataKey](value)
  }

  function fetch(formId, dataKey) {
    if( arguments.length === 0 ) {
      throw new Error('fetch must have least one arguments')
    }
    if(!data[formId]) {
      throw new Error('formId must exits')
    }
    if(formId && dataKey) {
      return data[formId][dataKey] 
    }else {
      return data[formId]
    }
  }

  function subscribe(formId, dataKey, listener) {
    if(listeners[formId][dataKey]) {
      console.warn('the listener already exists')
      return 0
    }
    console.log(formId, dataKey, listener)
    subscribe[formId] = {
      ...subscribe[formId],
      [dataKey]: listener,
    }
  }
  return {
    init,
    modify,
    fetch,
    subscribe,
    initFormItem,
  }
}

export default createData()