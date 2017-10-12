import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Field extends Component {
  static contextTypes = {
    store: PropTypes.object,
    formName: PropTypes.string,
  }
  constructor(props, {store,formName}) {
    super(props)
    console.log(store, formName)
    const {fetch, subscribe, initFormItem} = store
    
    this.state = {
      value: fetch(formName, props.name) //form item value
    }
    
    this.changeState = this.changeState.bind(this)
    
    initFormItem(formName)
    subscribe(formName, props.name, this.changeState)
  }

  
  componentDidMount() {
    // const {initField, name, warning} = this.props //将此项表单返还给form组件进行初始化。
    // initField({name, warning})
  }

  changeState(value) { 
    this.setState({
      value,
    })
  }
  render() {
    const {
      component: Component,
    } = this.props
    console.log('como', Component)
    return (
      <div>
        <Component />
      </div>
    )
  }
}