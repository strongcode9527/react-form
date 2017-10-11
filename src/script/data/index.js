/**
 * init the data of the form
 */
import {fromJS} from 'immutable'

const createData = () => {

  const data = {
    
  }

  function init(formName, formKey, formValue) {
    if(!formName && !formKey && !formValue){
      throw new Error("有错误")
    }
    data.formKey = formValue
  }

  function modify(formName, formKey, formValue) {
    if(!formName && !formKey && !formValue){
      throw new Error("有错误")
    }
    data.formKey = formValue
  }

  function fetch() {
    
  }

  return {
    init,
    modify,
    fetch,
  }

}

export default createData