import PropTypes from 'prop-types'
import {CreateForm, Field} from '../src/script/index.js'
import React, { Component } from 'react'
import {render} from 'react-dom'
import createData from '../src/script/data'

const renderInput = ({value}) => (
  <div>
    <input value={value}/>
    <p>第一个掉个单元</p>
  </div>
)

class Index extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const data = createData.init()
    data.init('strong', {name: 'strong', age: '18'})
    data.subscribe('strong', (data) => {
      console.log('subscribe', data)
    })
    data.modify('strong', 'name', 'strongModified')
  }
  render() {
    return (
      <div>
        <Field component={renderInput} />
      </div>
    )
  }
}



render(<Index />, document.getElementById('root')) 