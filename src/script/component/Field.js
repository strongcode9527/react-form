import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Field extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const {initField, name, warning} = this.props //将此项表单返还给form组件进行初始化。
    initField({name, warning})
  }
  render() {
    const {
      component: Component,
      error,
      warning,
      name,
      handleChange
    } = this.props
    console.log('component', Component)
    return (<div>
      <Component name={name} error={error} warning={error} handleChange={handleChange} />
    </div>)
  }
}