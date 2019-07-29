<template>
<!-- 客户信息组件 -->
  <div>
    <input type="text" v-model="selfName" /> <button @click="rename">Rename</button>{{name}}
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    index: Number
  },
  data() {
    return {
      selfName: ''
    }
  },
  mounted() {
    this.selfName = this.name
  },
  methods: {
    rename() {
      // this.$emit('rename', this.index, this.selfName)
      this.$parent.$set(this.$parent.$data.names, this.index, this.selfName)
    }
  },
}
</script>
