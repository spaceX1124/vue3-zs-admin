declare module '*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}

/**
 * 全局类型的命名空间
 * */
declare namespace Global {
  // 通用的对象类型,
  // 选择索引签名的接口还是Record类型主要取决于你的具体需求：
  // 如果你需要定义一个对象类型，其中既包含动态的键值对，又包含固定的属性或方法，那么使用接口更为合适；
  // 如果你只关心键值对的映射关系，并追求更简洁的语法，Record类型将是更好的选择
  declare type Recordable<T = any> = Record<string, T>

  /**
   * 得到枚举的值作为联合类型
   * @result 如 'a' | 'b'
   * */

  declare type EnumValues<T> = typeof T[keyof typeof T]

  /**
   * 通用的promise函数返回
   * */
  declare interface PromiseFn<T = any, R = T> {
    (...args: T[]): Promise<R>
  }
  /**
   * 一个函数类型
   * */
  declare interface Fn<T = any, R = T> {
    (...arg: T[]): R;
  }
}