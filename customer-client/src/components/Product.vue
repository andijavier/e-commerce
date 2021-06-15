<template>
  <div v-if="category === product.category || category === 'all'" class="col-md-3 col-sm-4">
    <div class="single-new-arrival">
      <div class="single-new-arrival-bg">
        <img :src="product.image_url" alt="Product's images">
        <div class="single-new-arrival-bg-overlay"></div>
        <div class="new-arrival-cart">
          <p>
            <span class="lnr lnr-cart"></span>
            <a @click.prevent="addToCart" href="#">add <span>to </span> cart</a>
          </p>
        </div>
      </div>
      <h4 style="margin-block: 2vh;">{{ product.name }}</h4>
      <p class="arrival-product-price">{{ toRupiah() }}</p>
      <p class="arrival-product-price">Stock: <strong>{{ product.stock }}</strong></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: ['product', 'category'],
  methods: {
    toRupiah () {
      let rupiah = ''
      const angkarev = this.product.price.toString().split('').reverse().join('')
      for (let i = 0; i < angkarev.length; i++) if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + '.'
      return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('') + ',-'
    },

    addToCart () {
      console.log('masuk')
      this.$store.dispatch('addToCart', { ProductId: this.product.id, quantity: 1 })
    }
  }
}
</script>

<style>

</style>
