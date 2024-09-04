// 使用枚举对象来优化代码，它会使代码更简洁、易读且易于扩展。使用对象不仅可以提供更加结构化的代码，还可以避免在 switch 语句中出现的硬编码
// 不要用函数
// 1.易于维护: 当你需要添加或修改正则表达式时，只需要更新 regexMap 对象中的对应条目即可。
// 2.更强的类型安全: 使用 TypeScript 枚举（ValidationType）来定义可能的验证类型，可以减少传入无效类型的风险。
// 3.减少重复代码: 通过将正则表达式和消息与 ValidationType 关联，可以避免在 switch 语句中重复代码。
// 4.可扩展性: 新的验证类型可以通过简单地添加到 ValidationType 和 regexMap 中来支持，而无需修改逻辑代码。

// interface regularInter {
//     regular: any;
//     msg: string;
// }
//
// const regular = (type: string): regularInter => {
//   switch (type) {
//     case 'phone': // 手机号码
//       return {
//         regular: /^1[3-9]\d{9}$/,
//         msg: '请输入正确的手机号码'
//       }
//     case 'ID': // 身份证
//       return {
//         regular: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
//         msg: '请输入正确的身份证号'
//       }
//     case 'pwd': // 密码以字母开头，长度在6~16之间，只能包含字母、数字和下划线
//       return {
//         regular: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
//         msg: '请输入正确的密码'
//       }
//     case 'email': // 邮箱
//       return {
//         regular: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
//         msg: '请输入正确的邮箱'
//       }
//     default:
//       throw new Error(type + 'regular')
//   }
// }
//
// export default regular

type RegularInter = {
  regular: RegExp;
  msg: string;
}
enum ValidationType {
  PHONE = 'phone', // 手机号
  ID = 'ID', // 身份证
  EMAIL = 'email', // 邮箱
  POSITIVEINTEGER = 'positiveInteger' // 正整数
}

const RegexMap: Record<ValidationType, RegularInter> = {
  [ValidationType.PHONE]: {
    regular: /^1[3-9]\d{9}$/,
    msg: '请输入正确的手机号码'
  },
  [ValidationType.ID]: {
    regular: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
    msg: '请输入正确的身份证号码'
  },
  [ValidationType.EMAIL]: {
    regular: /^\w+@[a-zA-Z0-9]+((\.[a-z0-9A-Z]{1,})+)$/,
    msg: '请输入正确的邮箱'
  },
  [ValidationType.POSITIVEINTEGER]: {
    regular: /^[1-9]\d*$/,
    msg: '请输入正整数'
  }
}

export {
  ValidationType,
  RegexMap
}