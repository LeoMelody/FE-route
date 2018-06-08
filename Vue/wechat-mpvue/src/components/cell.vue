<template>
    <div class="cell">
        <div class="cell-label">
            <slot name="label">
                {{label}}
            </slot>
        </div>
        <div class="cell-value" @click="handleClick">
            <slot name="value">
                {{value}}
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        label: {
            type: String,
            default: '123'
        },
        value: {
            type: String,
            default: ''
        }
    },
    methods: {
        handleClick(evt) {
            this.$emit('click', evt);
        }
    }   
}
</script>

<style lang="scss">
.container {
    padding: 10rpx 0;
    .cell {
        box-sizing: border-box;
        width: 100%;
        display: flex;
        align-self: center;
        height: 90rpx;
        line-height: 90rpx;
        padding: 0 30rpx;
        border-bottom: 1rpx solid #efeff4;
        background: #fff;
        font-size: 26rpx;
            .cell-value {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }
            .cell-label {
                width: 240rpx;
                text-align: left;
            }
        }
}





</style>

