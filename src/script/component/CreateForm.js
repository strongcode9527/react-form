import createData from '../data'
import PropTypes from 'prop-types'
import React, { Component } from 'react'


export default function CreateForm({formName, initData}) {
  return (WrapComponent) => class extends Component {
    static childContextTypes = {
      store: PropTypes.object,
      formName: PropTypes.string,
    }
    getChildContext() {
      return {
        formName: formName,
        store: createData.init(formName, initData || {})
      }
    }
    render() {
      return (
        <WrapComponent />
      )
    }
  }
}