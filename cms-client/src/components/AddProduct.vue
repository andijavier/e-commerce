<template>
  <div>
      <div class="modal fade" id="AddModal" tabindex="-1" role="dialog" aria-labelledby="AddModalTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">ADD PRODUCT</h5>
            </div>
            <div class="modal-body">
               <form>
                <div>
                    <div class="form-floating mb-3">
                        <input type="text" v-model="name" class="form-control" placeholder="Product's Name">
                        <label>Name</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" v-model="image_url" class="form-control" placeholder="Product's Image Url">
                        <label>Image Url</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" v-model="price" class="form-control" placeholder="Product's Price">
                        <label>Price</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" v-model="stock" class="form-control" placeholder="Product's Stock">
                        <label>Stock</label>
                    </div>
                    <label class="my-1 mr-2">Category</label>
                    <select v-model="category"  class="custom-select">
                        <option selected disabled>category</option>
                        <option value="other">other</option>
                        <option v-for="(cat, i) in products" :key="i" :value="cat">{{cat}}</option>
                    </select>
                    <div class="form-floating mb-3">
                        <input type="text" v-if="category === 'other'" v-model="otherCat" class="form-control" placeholder="Product's Category">
                        <label v-if="category === 'other'">Category</label>
                    </div>
                </div>
            </form>
            </div>
            <div class="modal-footer">
                <button type="button" @click="clearAdd" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" @click="addProduct(); clearAdd();" data-bs-dismiss="modal" class="btn btn-primary">Save</button>
            </div>
            </div>
        </div>
        </div>
  </div>
</template>

<script>
export default {
  name: 'AddProduct',
  data () {
    return {
      name: '',
      image_url: '',
      price: 1,
      stock: 1,
      category: '',
      otherCat: ''
    }
  },
  computed: {
    products () {
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
  methods: {
    addProduct () {
      if (this.category === 'other') {
        const payload1 = {
          name: this.name,
          image_url: this.image_url,
          price: this.price,
          stock: this.stock,
          category: this.otherCat
        }
        this.$store.dispatch('addProduct', payload1)
      } else {
        const payload = {
          name: this.name,
          image_url: this.image_url,
          price: this.price,
          stock: this.stock,
          category: this.category
        }
        this.$store.dispatch('addProduct', payload)
      }
    },
    clearAdd () {
      this.name = ''
      this.image_url = ''
      this.category = ''
      this.otherCat = ''
      this.price = 1
      this.stock = 1
    }
  }
}
</script>

<style>

</style>
