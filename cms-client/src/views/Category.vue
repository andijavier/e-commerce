<template>
<div>
  <Navbar/>
  <div class="container">
      <h1 class="text-light my-5">Categories</h1>
      <table class="table table-dark table-striped">
        <thead>
            <tr>
                <th scope="col">No</th>
                <th scope="col">Category</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(cat, i) in categories" :key="i">
                <th scope="row">{{i + 1}}</th>
                <td>{{cat}}</td>
            </tr>
        </tbody>
      </table>
      <iframe width="600" height="450" style="border:0" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/search?q=Bank%20Sampah&key=AIzaSyAixPAAmPjVM16e3JneMCoT36vqcFNoSnA"></iframe>
  </div>
</div>
</template>

<script>
import Navbar from '../components/Navbar'
export default {
  name: 'Categories',
  computed: {
    categories () {
      const prodCategory = []
      this.$store.state.products.forEach(el => {
        let flag = true
        prodCategory.forEach(e => {
          if (el.category === e) {
            flag = false
          }
        })
        if (flag) {
          prodCategory.push(el.category)
        }
      })
      return prodCategory
    }
  },
  created () {
    this.$store.dispatch('getProducts')
  },
  components: {
    Navbar
  }
}
</script>

<style>

</style>
