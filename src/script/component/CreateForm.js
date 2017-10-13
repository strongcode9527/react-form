import createData from '../data'
import PropTypes from 'prop-types'
import React, { Component } from 'react'


export default ({formName, initData}) => (WrapComponent) => class Hoc extends Component {
    static childContextTypes = {
      store: PropTypes.object,
      formName: PropTypes.string,
    }
    constructor(props) {
      super(props)
    }
    getChildContext() {
      createData.init(formName, initData || {})
      return {
        formName: formName,
        store: createData,
      }
    }
    render() {
         
      return (
        <div>
          <WrapComponent /> 
        </div>
      )
    }
  }
