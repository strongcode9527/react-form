import PropTypes from 'prop-types'
import {CreateForm, Field} from '../src/script/index.js'
import React, { Component } from 'react'
import {render} from 'react-dom'

const renderInput = ({value}) => (
  <div>
    <input value={value}/>
    <p>第一个掉个单元</p>
  </div>
)

class Index extends Component {
  render() {
    return (
      <div>
        <Field component={renderInput} />
      </div>
    )
  }
}

console.log('index', Index)

render(<Index />, document.getElementById('root')) 