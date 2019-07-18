<template>
  <div>
    <p>Props 进行数据传递</p>
    <p>姓名: {{name}}</p>
    <son :name="name"/>
  </div>
</template>

<script>
import son from '../components/props/son'
export default {
  data() {
    return {
      name: 'wyh'
    }
  },
  components: {
    son
  }
}
</script>
