import PropTypes from 'prop-types'
import {CreateForm, Field} from '../src/script/index.js'
import React, { Component } from 'react'
import {render} from 'react-dom'
import createData from '../src/script/data'
// import 
// createData.init(formName, initData || {})

const RenderInput = ({value}) => (
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

  }
  render() {
    return (
      <div>
        <Field component={RenderInput} name="name"/>
      </div>
    )
  }
}



const A = CreateForm({formName: 'strong', initData: {}})(Index)


// console.log(CreateForm({formName: 'strong', initData: {}})(Index))

render(<A />, document.getElementById('root')) 