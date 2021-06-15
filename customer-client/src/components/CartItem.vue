<template>
  <tr v-if="item.status === 'Unpaid'" class="cart-row">
      <td>{{ item.Product.name }}</td>
      <td>{{ toRupiah() }}</td>
      <td>{{ item.quantity }}</td>
      <td>
          <button @click.prevent="addItem" type="button" class="btn mx-1 my-1 btn-success">+</button>
          <button @click.prevent="minItem" type="button" class="btn mx-1 my-1 btn-warning">-</button>
          <button @click.prevent="deleteItem" type="button" class="btn mx-1 my-1 btn-danger">Delete</button>
      </td>
  </tr>
</template>

<script>
export default {
  name: 'CartItem',
  props: ['nums', 'item'],
  methods: {
    toRupiah () {
      let rupiah = ''
      const angkarev = this.item.Product.price.toString().split('').reverse().join('')
      for (let i = 0; i < angkarev.length; i++) if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + '.'
      return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('') + ',-'
    },

    deleteItem () {
      const ProductId = this.item.ProductId
      this.$store.dispatch('deleteCartItem', { ProductId })
    },

    addItem () {
      const ProductId = this.item.ProductId
      this.$store.dispatch('updateCart', { ProductId, quantity: 1 })
    },

    minItem () {
      const ProductId = this.item.ProductId
      this.$store.dispatch('updateCart', { ProductId, quantity: -1 })
    }
  }
}
</script>

<style>

</style>
