<template>
  <div class="container">
      <div class="section-header">
        <h2>Categories</h2>
      </div>
      <div class="row">
        <div class="new-arrivals-content">
          <button style="margin-block: 1vh;" @click="categor('all')" class="col-md-12 btn m-2 btn-success" href="#">All</button>
          <button
          style="margin-block: 1vh;"
          class="col-md-12 btn m-2 btn-success"
          v-for="(cat, i) in categories"
          :key="i"
          @click="categor(cat)"
          href="#">{{cat}}</button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Categories',
  methods: {
    categor (cat) {
      this.$emit('categor', cat)
    }
  },
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
  }
}
</script>

<style>

</style>
