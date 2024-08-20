<template>
  <ul>
    <li>call 和 apply 会立即调用函数，并改变 this 的指向</li>
    <li>call 和 apply 的参数传递方式不同，call 使用单个参数列表，而 apply 使用数组或类数组对象</li>
    <li>bind 会返回一个新的函数，该函数在调用时将 this 绑定到指定的对象，并且可以预设参数，传参方式是单个参数列表</li>
  </ul>
</template>
<script setup>
// call
function test1(name1, name2) {
  console.log(this, name1, name2) // null 'zs1' 'zs2'
}
test1.call(null, 'call1', 'call2')

// apply
function test2(name1, name2) {
  console.log(this, name1, name2)
}
test2.apply(null, ['apply1', 'apply2'])

// bind
function test3(name1, name2, name3) {
  console.log(this, name1, name2, name3)
}
let bindTest3 = test3.bind(null, 'bind1', 'bind2')
bindTest3('bind3')
</script>
