<template>
  <div>
    <!-- <son-a 
      id="sona"
      :name="name"
      :age="age"
      :address="address"
      :salary="salary"
      @add="changeAddress"/> -->
      <Customer v-for="(item,index) in customers" :key="item.name" :index="index" @add="addOrder" :name="item.name" :order="item.order"/> 
  </div>
</template>

<script>
import Customer from '../components/attrs/Customer'
export default {
  data() {
    return {
      customers: [
        {
          name: 'wyh',
          order: 1
        },
        {
          name: 'wyh2',
          order: 2
        },
        {
          name: 'wyh3',
          order: 3
        },
        {
          name: 'wyh4',
          order: 2
        },
        {
          name: 'wyh5',
          order: 1
        }
      ]
    }
  },
  components: {
    // sonA
    Customer
  },
  methods: {
    addOrder(index) {
      this.customers[index].order++
    }
  },
}
</script>
