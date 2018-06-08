<template>
    <div class="container">
        <dd-cell label="姓名" :value="userInfo.realName">
            <div slot="label">
                哈哈姓名
            </div>
        </dd-cell>
    </div>
</template>

<script>
import ddCell from '../../components/cell'

export default {
    data() {
        return {

        }
    },
    components: {
        ddCell
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo
        }
    }
}
</script>

<style lang="scss">

</style>
