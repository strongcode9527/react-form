
import {CreateForm, Field} from '../src/script/index.js'
import React, { Component } from 'react'
import {render} from 'react-dom'


const RenderInput = ({value, onChange, error}) => (
  <div>
    <input value={value} onChange={onChange} error={error}/>
    <p>第一个掉个单元</p>
    <p>{error}</p>
  </div>
)

class Index extends Component {
  render() {
    return (
      <div>
        <Field component={RenderInput} name="name" validations={[a => {
          if(!a) return 'input框不能为空'
          return undefined
        }]} />
        <Field
          component={RenderInput} name="age"
          validations={[a => {
            if(!a) return 'input框不能为空'
            return undefined
          }]}
          isSynchVerify={false}
        />
      </div>
    )
  }
}



const A = CreateForm({formName: 'strong', initData: {}, isSynchVerify: true})(Index)



render(<A />, document.getElementById('root')) 