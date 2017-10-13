function requireArguments(){
  const array = [...arguments]
  array.forEach(item => {
    if(!item) {
      throw new Error(`require ${array.length} arguments`)
    }
  })
  return true
}

const mustBeUnique = (object, ...keys) => {
  let index = 0
  while(object[keys[index]]) {
    object = object[keys[index]]
    index++
  }
  if(index === keys.length) {
    throw new Error('the value is exists, can not init twice')
  }else {
    return true
  }
}

export {
  mustBeUnique,
  requireArguments,
}