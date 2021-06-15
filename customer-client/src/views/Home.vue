<template>
<div>
  <section id="Home" class="new-arrivals">
    <div class="container">
      <div class="new-arrivals-content">
        <div class="row">
          <!-- Product -->
          <Product
          v-for="product in products"
          :key="product.id"
          :product="product"
          :category="category"
          />
          <!-- end Product -->
        </div>
      </div>
    </div><!--/.container-->
  </section>
  <section id="Category">
    <Categories
    @categor="categor"
    />
  </section>
</div>
</template>

<script>
// @ is an alias to /src
import Product from '@/components/Product.vue'
import Categories from '@/components/Categories.vue'

export default {
  name: 'Home',
  components: {
    Product,
    Categories
  },
  data () {
    return {
      category: 'all'
    }
  },
  methods: {
    categor (cat) {
      this.category = cat
    }
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
