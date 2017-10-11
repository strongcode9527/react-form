/**
 * init the data of the form
 */
import {fromJS} from 'immutable'

const createData = () => {

  const data = {
    
  }

  function init(formName, value) {
    if(!formName && !value){
      throw new Error("有错误")
    }
    data.formName = value
  }
  
  function modify(formName, formKey, formValue) {
    if(!formName && !formKey && !formValue){
      throw new Error("有错误")
    }
    data.formKey = formValue
  }

  function fetch(formName, formKey) {
    return data.formName.formKey
  }

  return {
    init,
    modify,
    fetch,
  }

}

export default createData