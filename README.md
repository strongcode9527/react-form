# react-form is a package like redux-form.But it doesn't depend on it.It is just a pure react component.

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
### CreateForm api

| api| description|
| ------------- |:-------------:|
| name(string)      | The only ID of this table |
| initData(object)     | Initial data of table|
| isSynchVerify(boolean) | Default values for synchronous verification of each item in the form     |



