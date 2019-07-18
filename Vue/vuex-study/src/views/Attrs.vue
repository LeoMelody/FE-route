<template>
  <div>
    <p>使用$attrs&$listeners来完成组件间的通信，常用于多级组件嵌套</p>
    <son-a 
      id="sona"
      :name="name"
      :age="age"
      :address="address"
      :salary="salary"
      @add="changeAddress"/>
  </div>
</template>

<script>
import sonA from '../components/attrs/firstA'
export default {
  data() {
    return {
      name: 'wyh',
      age: 18,
      address: 'xjxks',
      salary: 9999999
    }
  },
  components: {
    sonA
  },
  methods: {
    changeAddress(val) {
      this.address = val
    }
  },
}
</script>
