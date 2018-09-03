<template>
  <router-view></router-view>
</template>

<script>
// 引入json文件，引入成功。说明webpack4自带json处理
import User from './data/user.json'

export default {
  data() {
    return{

    }
  },
  mounted() {
    // 模拟进行数据获取
    console.log(User) 
  }
}
</script>

