<template>
  <div class="col-lg-3 col-md-6 mb-4">
    <div class="card" style="max-height: 60vh">
      <img class="card-img-top" style="max-height: 35vh" :src="product.image_url" alt="">
      <div class="card-body">
        <h5 class="card-title">{{product.name}}</h5>
        <p class="card-text">{{toRupiah()}}</p>
        <p class="card-text">stock: <strong>{{product.stock}}</strong></p>
      </div>
      <div class="card-footer">
        <button type="button" @click="getDetail" data-bs-toggle="modal" data-bs-target="#EditModal" class="btn btn-primary">
        Edit
        </button>
        <a href="#" @click.prevent="deleteProduct" class="btn btn-danger mx-2">Delete</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['product'],
  methods: {
    toRupiah () {
      let rupiah = ''
      const angkarev = this.product.price.toString().split('').reverse().join('')
      for (let i = 0; i < angkarev.length; i++) if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + '.'
      return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('') + ',-'
    },

    getDetail () {
      this.$store.dispatch('getProductById', { id: this.product.id })
    },

    deleteProduct () {
      this.$store.dispatch('deleteProduct', { id: this.product.id })
    }
  }
}
</script>
