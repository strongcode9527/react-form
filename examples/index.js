
import {CreateForm, Field} from '../src/script/index.js'
import React, { Component } from 'react'
import {render} from 'react-dom'


const RenderInput = ({meta:{value, error, focused}, event}) => (
  <div>
    <input value={value} {...event} />
    <p>第一个掉个单元</p>
    {focused && <p>{error}</p>}
  </div>
)

class Index extends Component {
  handleSubmit = (data) => {
    console.log('adf',data)
  }
  render() {
    const {handleSubmit} = this.props
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
        <input type="button" onClick={handleSubmit(this.handleSubmit)}/>
      </div>
    )
  }
}



const A = CreateForm({formName: 'strong', initData: {name : 'strong'}, })(Index)



render(<A />, document.getElementById('root')) 