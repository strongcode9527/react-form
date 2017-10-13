import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Field extends Component {
  static contextTypes = {
    store: PropTypes.object,
    formName: PropTypes.string,
  }
  constructor(props, {store,formName}) {
    super(props)
    const {fetch, subscribe, initFormItem, initValidations} = store
    this.store = store
    this.formName = formName
    this.state = {
      ...(fetch(formName, props.name)) //form item value   
    }
    this.changeState = this.changeState.bind(this)
    this.handleChange = this.handleChange.bind(this)
    initFormItem(formName, props.name)
    subscribe(formName, props.name, this.changeState)
    initValidations(formName, props.name, props.validations)
  }

  
  componentDidMount() {
    // const {initField, name, warning} = this.props //将此项表单返还给form组件进行初始化。
    // initField({name, warning})
  }

  changeState() { 
    this.setState({
      ...(this.store.fetch(this.formName, this.props.name))
    })
  }
  handleChange(e) {
    const {modify} = this.store,
      {name} = this.props
    modify(this.formName, name, e.target.value)
  }
  render() {
    const {
      component: Component,
    } = this.props
    return (
      <div>
        <Component onChange={this.handleChange} value={this.state.value} error={this.state.error}/>
      </div>
    )
  }
}