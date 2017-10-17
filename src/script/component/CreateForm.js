import createData from '../data'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {mustBeType, typeOf} from '../utils'
export default ({formName, initData ,isSynchVerify}) => {
  mustBeType(formName, 'string', 'formName')
  !typeOf(isSynchVerify, 'boolean') && mustBeType(isSynchVerify, 'boolean', 'isSynchVerify')
  return (WrapComponent) => class Hoc extends Component {
    static childContextTypes = {
      store: PropTypes.object,
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
      }
    }
    render() {
      return (
        <WrapComponent />
      )
    }
  }
}
