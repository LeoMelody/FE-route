<template>
  <div>
    <p>Props 进行数据传递</p>
    <Customer v-for="(item,index) in names" :index="index" :name="item" :key="item" @rename="rename" />
  </div>
</template>

<script>
import Customer from '../components/props/Customer'
export default {
  data() {
    return {
      names: ['wyh1','wyh2','wyh3','wyh4','wyh5']
    }
  },
  components: {
    Customer
  },
  methods: {
    rename(index, item) {
      console.log(index, item)
    }
  },
}
</script>
