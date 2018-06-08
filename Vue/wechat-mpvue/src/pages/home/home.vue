<template>
    <div class="container">
        <!-- 直接使用小程序的组件 -->
        <swiper class="banner-swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000" circular="true">
            <block  v-for="(item, index) in bannerArr" :key="index">
                <swiper-item>
                    <img :src="item.imgUrl" alt="" srcset=""  class="banner-img">
                </swiper-item>
            </block>
        </swiper>
    </div>
</template>

<script>
import store from '../../store'
import util from '../../utils'

export default {
    data() {
        return {
            bannerArr: [
                {
                    actNo: '001',
                    imgUrl: 'https://cdn.ddjf.com.cn/static/images/miniprogram/yundai/index_banner.jpg'
                },
                {
                    actNo: '002',
                    imgUrl: 'https://cdn.ddjf.com.cn/static/images/miniprogram/yundai/index_banner.jpg'
                }
            ]
        }
    },
    onShow() {
       this.getInfo() 
    },
    computed: {
    },
    methods: {
        getInfo() {
            
        }
    }
}
</script>

<style lang="scss" scope>
    .container {
        padding: 0;
        .banner-swiper {
            width:100%; 
            height: 300rpx;
            .banner-img {
                width:100%;
                height:100%;
            }
        }
    }
</style>

