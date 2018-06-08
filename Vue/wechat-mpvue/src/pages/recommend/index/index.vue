<template>
    <div class="container">
        我是推单页面
    </div>
</template>

<script>
// import ddCell from '../../components/cell'

export default {
    data() {
        return {

        }
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo
        }
    },
    onLoad(options) {
        console.log(this.userInfo)
        console.log(options)
    }
}
</script>

<style lang="scss">

</style>
