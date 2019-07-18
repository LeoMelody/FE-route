<template>
  <div>
    <p>Level2 sonA</p>
    <div>
      <p>第二等级的$attrs</p>
      <div>
        {{$attrs}}
      </div>
      <son v-bind="$attrs" v-on="$listeners"/>
    </div>
  </div>
</template>

<script>
import son from './third'
export default {
  inheritAttrs: false,
  created() {
    console.log(this.$listeners)
  },
  components: {
    son
  }
}
</script>