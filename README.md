# react-form is a package like redux-form.But it doesn't depend on it.It is just a pure react component.

一个类似于redux-form的组件，不需要绑定多余reducer，组建内部带有数据存储的json对象。

写这个项目主要是对研究react-redux和redux源码的一个总结。自己来写一套react的全家桶。而且这个项目也锻炼了高阶组件的使用。

```

git clone https://github.com/strongcode9527/react-form.git

yarn install or npm install

npm start


```


### create a form

```

const RenderInput = ({meta:{value, error, focused}, event}) => (
  <div>
    <input value={value} {...event} />
    <p>the input</p>
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
          if(!a) return 'It Can not be empty'
          return undefined
        }]} />
        <Field
          component={RenderInput} name="age"
          validations={[a => {
            if(!a) return 'Can not be empty'
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

```

A = connect(....)(A) //support react-redux connect方法。


```



```
### CreateForm api

| api| description|
| ------------- |:-------------:|
| name(string)      | The only ID of this table |
| initData(object)     | Initial data of table|
| isSynchVerify(boolean) | Default values for synchronous verification of each item in the form     |



