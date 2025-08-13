import type { Rule } from 'antd/es/form'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^(\+33\s?|0)[1-9](\s?\d{2}){4}$/

export const emailRule = function (): Rule {
  return {
    pattern: emailPattern,
    message: 'Input is not a valid email',
  }
}

export const phoneRule = function (): Rule {
  return {
    pattern: phonePattern,
    message: 'Input is not a valid phone number',
  }
}

export const emailOrPhoneRule = () => ({
  validator(_: any, value: string) {
    if (!value) {
      return Promise.reject('Please input your email or phone number')
    }
    if (emailPattern.test(value) || phonePattern.test(value)) {
      return Promise.resolve()
    }
    return Promise.reject('Input must be a valid email or phone number')
  },
})

export const minLengthRule = function (length: number): Rule {
  return {
    pattern: new RegExp(`.{${length.toString()},}`, 'g'),
    message: `The value must have at least ${length} characters`,
  }
}

export const capsRule = function (): Rule {
  return {
    pattern: new RegExp(/[A-Z]+/g),
    message: 'The value must include a capital letter',
  }
}
export const lowercaseRule = function (): Rule {
  return {
    pattern: new RegExp(/[a-z]+/g),
    message: 'The value must contain at least one lowercase letter',
  }
}

export const containsNumberRule = function (): Rule {
  return {
    pattern: new RegExp(/\d+/g),
    message: 'The value must have at least one number',
  }
}
export const containsSymbolRule = function (): Rule {
  return {
    pattern: new RegExp(/\W+/g),
    message: 'The value must have at least one symbol',
  }
}