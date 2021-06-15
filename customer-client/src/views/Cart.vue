<template>
  <div>
      <section id="cart" class="new-arrivals">
        <div class="section-header">
            <h2>My Cart</h2>
        </div>
        <div class="container new-arrivals-content">
            <div class="table">
                <table class="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <CartItem
                        v-for="(item) in cartItems"
                        :key="item.id"
                        :item="item"
                        />
                    </tbody>
                </table>
                <div class="justify-content center">
                    <button type="button" @click="checkout" class="btn btn-success">Checkout</button>
                </div>
            </div>
        </div>
      </section>
  </div>
</template>

<script>
import CartItem from '../components/CartItem'
export default {
  name: 'Cart',
  components: {
    CartItem
  },
  methods: {
    checkout () {
      this.$store.dispatch('checkout')
    }
  },
  computed: {
    cartItems () {
      return this.$store.state.cart
    }
  },
  created () {
    this.$store.dispatch('getCart')
  }
}
</script>

<style>

</style>
