import type { Rule } from 'antd/es/form'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^(\+33|0)[1-9](\d{2}){4}$/

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
