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
    static displayName = `CreateForm(${WrapComponent || 'component'})`
    getChildContext() {
      return {
        isSynchVerify,
        store: createData,
        formName: formName,
        initData: initData || {}
      }
    }
    constructor(props) {
      super(props)
      createData.init(formName, initData || {}, isSynchVerify)
    }
    componentWillReceiveProps(nextProps) {
      if(nextProps.initData) {
        createData.asyncInitData(formName, nextProps.initData)
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
