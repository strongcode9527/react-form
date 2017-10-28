
import {CreateForm, Field} from '../src/script/index.js'
import React, { Component } from 'react'
import {render} from 'react-dom'
import './index.less'

const RenderInput = ({meta:{value, error, focused, focusing}, event, name}) => (
  <div className="form-item">
    <p className="input-label">{name}</p>
    <input className="input" value={value} {...event} />
    {focused && <p className="error">{error}</p>}
  </div>
)

class Index extends Component {
  handleSubmit = (data) => {
    alert('通过调试台，查看提交数据')
    console.log(data)
  }
  render() {
    const {handleSubmit} = this.props
    return (
      <div>
        <Field component={RenderInput} name="name" validations={[a => {
          if(!a) return 'The form cannot be empty'
          return undefined
        }]} />
        <Field
          component={RenderInput} name="age"
          validations={[a => {
            if(!a) return 'The form cannot be empty'
            return undefined 
          }, a=> /^\d*$/.test(a) ? undefined : 'Only fill in the numbers'
          ]}
        />
        <input className="button" type="button" onClick={handleSubmit(this.handleSubmit)} value="提交数据" isSynchVerify={true}/>
      </div>
    )
  }
}


let A = CreateForm({formName: 'strong', initData: {name : 'strong'}, })(Index)



render(<A />, document.getElementById('root'))