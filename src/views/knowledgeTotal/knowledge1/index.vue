<template>
  <h2 style="text-align: center">数据类型判断</h2>
  <p>描述：</p>
  <p>
    判断数据的方式有很多，如typeof，instanceof，Object.prototype.toString，isArray等，
    但实际上typeof只能判断出一些基本的数据类型，当遇到复杂数据或者null，Date，Error，Array，正则的时候是没有办法做出区分的。
    为了更加精准的判断数据类型，我们可以使用Object.ptototype.toString.call()，他会返回这个数据的class名
    一般我们在开发过程中，为了避免产生因为数据格式的问题，会基于Object.ptototype.toString.call去封装一些is函数
  </p>
  <ul>
    <li>对于数组：[object Array]</li>
    <li>对于函数：[object Function]</li>
    <li>对于对象：[object Object]</li>
    <li>对于字符串：[object String]</li>
    <li>对于数字：[object Number]</li>
    <li>对于布尔值：[object Boolean]</li>
    <li>对于日期：[object Date]</li>
    <li>对于正则表达式：[object RegExp]</li>
    <li>对于错误对象：[object Error]</li>
  </ul>
  <p>
    <ul>
        <li>console.log(typeof 'a') //  string</li>
        <li>console.log(typeof 1) //  number</li>
        <li>console.log(typeof undefined) // undefined</li>
        <li>console.log(typeof true) // boolean</li>
        <li>console.log(typeof function a() {}) // function</li>
        <li>console.log(typeof null) // object</li>
        <li>console.log(typeof {a:1}) // object</li>
        <li>console.log(typeof Symbol('a')) // symbol</li>
        <li>console.log(typeof BigInt(1)) // bigint</li>
    </ul>
  </p>
</template>
<script lang="ts" setup>
console.log(typeof 'a') //  string
console.log(typeof 1) //  number
console.log(typeof undefined) // undefined
console.log(typeof true) // boolean
console.log(typeof function a() {}) // function
console.log(typeof null) // object
console.log(typeof {a:1}) // object
console.log(typeof Symbol('a')) // symbol
console.log(typeof BigInt(1)) // bigint


</script>
