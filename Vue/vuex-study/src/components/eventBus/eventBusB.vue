<template>
  <div>

    EventBusB
    <input type="text" v-model="msg">
    <button @click="sendMsg">发送信息给A</button>
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
  methods: {
    sendMsg() {
      eventBus.$emit('sendMsg', this.msg)
    }
  },
}
</script>
