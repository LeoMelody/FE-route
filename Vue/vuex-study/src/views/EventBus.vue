<template>
  <div>
    <p>eventBus实现组件间通信，常用于兄弟组件</p>
    <busA />
    <busB />  
  </div>

</template>

<script>
import busA from '../components/eventBus/eventBusA'
import busB from '../components/eventBus/eventBusB'
export default {
  components: {
    busA,
    busB
  }
}
</script>

