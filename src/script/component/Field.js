import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {typeOf} from '../utils/index'
export default class Field extends Component {
  static contextTypes = {
    store: PropTypes.object,
    formName: PropTypes.string,
    isSynchVerify: PropTypes.bool,
  }
  constructor(props, {store,formName,isSynchVerify}) {
    super(props)
    const {fetch, subscribe, initFormItem, initValidations} = store
    this.store = store
    this.formName = formName
    this.isSynchVerify = isSynchVerify
    this.state = {
      ...(fetch(formName, props.name)) //form item value   
    }
    this.changeState = this.changeState.bind(this)
    this.handleChange = this.handleChange.bind(this)
    initFormItem(formName, props.name)
    subscribe(formName, props.name, this.changeState)
    props.validations && initValidations(formName, props.name, props.validations)
  }

  changeState() { 
    this.setState({
      ...(this.store.fetch(this.formName, this.props.name))
    })
  }
  handleChange(e) {
    const {modify} = this.store,
      {name, isSynchVerify} = this.props,
      isSynchVerifySub = typeOf(isSynchVerify, 'boolean') ? isSynchVerify : this.isSynchVerify
    //第三个参数支持某一个表格选项

    modify(this.formName, name, e.target.value, isSynchVerifySub)
  }
  render() {
    const {component: Component,} = this.props
    return <Component onChange={this.handleChange} value={this.state.value} error={this.state.error}/> 
  }
}