import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Field extends Component {
  static contextTypes = {
    store: PropTypes.object,
  }
  constructor(props, context) {
    super(props)
    const {store:{fetch, subscribe, initFormItem}, formName} = context

    this.state = {
      value: fetch(context.formName, props.name) //form item value
    }
    
    this.changeState = this.changeState.bind(this)
    
    initFormItem(formName)
    subscribe(this.changeState)
  }

  
  componentDidMount() {
    const {initField, name, warning} = this.props //将此项表单返还给form组件进行初始化。
    initField({name, warning})
  }

  changeState(value) {
    this.setState({
      value,
    })
  }
  render() {
    const {
      component: Component,
      error,
      warning,
      name,
      handleChange
    } = this.props
    return (<div>
      <Component name={name} error={error} warning={error} handleChange={handleChange} />
    </div>)
  }
}