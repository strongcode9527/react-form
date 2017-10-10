import {fromJS} from 'immutable'
import PropTypes from 'prop-types'
import React, { Component } from 'react'


export default class CreateForm extends Component {
  constructor(props) {
    super(props)
    this.state = fromJS({
      error: {},
      ok: {},
      warning: {},
      isFocus: {},
      touched: {},
    })
    this.initField = this.initField.bind(this)
  }
  initField({name, warning}) {
    this.setState(
      this.state.mergeDeep({
        error: {[name]: false},
        ok: {[name]: false},
        warning: {[name]: warning},
        isFocus: {[name]: false},
        touched: {[name]: false},
      })
    )
  }
  render() {
    const Component = this.props.Component
    return (<div>
      <Component initField={this.initField} {...this.props}/>
    </div>)
  }
}
