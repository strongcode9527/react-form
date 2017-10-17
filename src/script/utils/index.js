import {requireArguments} from './error'

export const shallowEqual = (a, b) => {
  requireArguments(a, b)
  return a === b
}

export const isArray = (a) => {
  requireArguments(a)
  return Array.isArray(a)
}


export function typeOf(value, type){
  if(arguments.length < 2) {
    return typeof value
  } else {
    if(typeof type !== 'string'){
      throw new Error('the type argument must be string')
    }
    return typeof value === type
  }


}

export * from './error'