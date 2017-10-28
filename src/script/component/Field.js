import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {typeOf} from '../utils/index'
export default class Field extends Component {
  static contextTypes = {
    store: PropTypes.object,
    initData: PropTypes.object,
    formName: PropTypes.string,
    isSynchVerify: PropTypes.bool,
  }
  constructor(props, {store,formName,isSynchVerify, initData}) {
    super(props)
    const {fetch, subscribe, initFormItem, initValidations} = store
    this.store = store
    this.formName = formName
    this.formItemKey = props.name //表单itemKey
    this.isSynchVerify = isSynchVerify //全局是否同步验证flag

    /*
      *state 包括如下属性:
        value: 表单的值
        error: 验证后是否存在错误
        focused: 此项表单是否focus过
        focusing: 此项表单是否正在focus
    */

    //先进行验证函数初始化，便于初始化数据时，对数据进行第一次验证
    subscribe(formName, props.name, this.changeState)
    initValidations(formName, props.name, props.validations || [])
    initFormItem(formName, props.name)
    this.state = fetch(formName, props.name)
  }

  changeState = () => {
    this.setState({
      ...(this.store.fetch(this.formName, this.props.name))
    })
  }
  /**
   * 改变表格中的值
   * @param e
   */
  handleChange = (e) => {
    const {modify} = this.store,
      {isSynchVerify} = this.props,
      isSynchVerifySub = typeOf(isSynchVerify, 'boolean') ? isSynchVerify : this.isSynchVerify
    //第三个参数支持某一个表格选项

    modify(this.formName, this.formItemKey, e.target.value, isSynchVerifySub)
  }
  /**
   * 修改focus状态，focus和blur事件公用函数
   */
  handleChangeFocus = (e) => {
    this.store.changeFocusState(this.formName, this.formItemKey)
    if(e.type === 'blur') {
      console.log('inBlur')
      this.store.handleValidation(this.formName, this.formItemKey)
    }
  }

  render() {
    const event = {
        onChange: this.handleChange,
        onFocus: this.handleChangeFocus,
        onBlur: this.handleChangeFocus,
      }

    const {component: Component} = this.props
    return <Component event={event} meta={this.state} {...this.props}/>
  }
}