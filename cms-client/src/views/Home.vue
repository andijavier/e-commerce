<template>
  <div class="container">
    <Navbar/>
    <!-- Jumbotron Header -->
    <header class="text-light my-1">
      <h4 class="display-4">Welcome Admin</h4>
      <p class="">Click button below to add a new product</p>
      <!-- <a href="#" class="btn btn-success btn-lg">Add Product</a> -->
      <button type="button" class="btn mt-3 btn-success" data-bs-toggle="modal" data-bs-target="#AddModal">
      Add Product
      </button>
    </header>

    <!-- Page Features -->
    <div class="row wt rounded text-center" style="max-height: 80vh; overflow-y: scroll;">

      <Card
      v-for="product in products"
      :key="product.id"
      :product="product"
      />

    </div>
    <!-- /.row -->

    <AddProduct/>
    <EditProduct/>

  </div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/Card.vue'
import Navbar from '@/components/Navbar.vue'
import AddProduct from '@/components/AddProduct.vue'
import EditProduct from '@/components/EditProduct.vue'
// import axios from '@/api/axios.js'
export default {
  name: 'Home',
  components: {
    Card,
    Navbar,
    AddProduct,
    EditProduct
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    this.$store.dispatch('getProducts')
  }
}
</script>

<style scoped>
.wt {
  background-color: grey;
  padding-top: 1vh;
}
</style>
