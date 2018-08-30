<template>
  <div class="body">
    我是第一版测试代码，devServer完成
    <!-- <div class="icon">
      <img src="./assets/star.png" alt="" srcset="" width="200" height="200">
      <img src="./assets/cz.png" alt="" width="100" height="100">
    </div> -->

    <div class="icon-big">
    </div>

    <div class="icon-sm"></div>
  </div>
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

<style lang="scss" scoped>
$height: 200px;
$fontColor: rgb(66, 252, 29);
@mixin bg($url, $w, $h) {
  background: url($url) no-repeat  0px 0px;
  background-size: $w $h;
}

.body {
  color: $fontColor;
  .icon-big {
    height: $height;
    @include bg('./assets/star.png', 200px, 200px);
  }

  .icon-sm {
    height: $height;
    @include bg('./assets/cz.png', 50px, 50px);
  }
}

</style>

