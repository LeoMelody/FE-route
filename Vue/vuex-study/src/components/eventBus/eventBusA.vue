<template>
  <div style="border: 1px solid;">
    EventBusA
    <div>
      B发来的信息是: {{msg}}
    </div>
  </div>
</template>

<script>
import eventBus from './eventBus'
export default {
  data() {
    return {
      msg: ''
    }
  },
  mounted() {
    eventBus.$on('sendMsg', val => {
      // console.log(val)
      this.msg = val
    })
  },
}
</script>
