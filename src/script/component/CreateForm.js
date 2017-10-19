import createData from '../data'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {mustBeType, typeOf} from '../utils'

export default ({formName, initData ,isSynchVerify}) => {
  mustBeType(formName, 'string', 'formName')
  return (WrapComponent) => class Hoc extends Component {
    static childContextTypes = {
      store: PropTypes.object,
      initData: PropTypes.object,
      formName: PropTypes.string,
      isSynchVerify: PropTypes.bool,
    }
    static displayName = `Hoc`
    getChildContext() {
      createData.init(formName, initData || {}, isSynchVerify)
      return {
        isSynchVerify,
        store: createData,
        formName: formName,
        initData: initData || {}
      }
    }
    handleSubmit = (func) => () => {
      mustBeType(func, 'function', 'func')
      func(createData.fetch(formName).data)
      createData.changeShowAllErrorsState(formName)
    }
    render() {
      return <WrapComponent handleSubmit={this.handleSubmit}/>
    }
  }
}
