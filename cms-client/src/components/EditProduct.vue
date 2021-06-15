<template>
  <div>
      <div class="modal fade" id="EditModal" tabindex="-1" role="dialog" aria-labelledby="AddModalTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">EDIT PRODUCT</h5>
            </div>
            <div class="modal-body">
               <form>
                <div>
                    <div class="form-floating mb-3">
                        <input type="text" v-model="detail.name" class="form-control" placeholder="Product's Name">
                        <label>Name</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" v-model="detail.image_url" class="form-control" placeholder="Product's Image Url">
                        <label>Image Url</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" v-model="detail.price" class="form-control" placeholder="Product's Price">
                        <label>Price</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" v-model="detail.stock" class="form-control" placeholder="Product's Stock">
                        <label>Stock</label>
                    </div>
                    <label class="my-1 mr-2">Category</label>
                    <select v-model="detail.category"  class="custom-select">
                        <option selected disabled>category</option>
                        <option v-for="(cat, i) in categories" :key="i" :value="cat">{{cat}}</option>
                    </select>
                </div>
            </form>
            </div>
            <div class="modal-footer">
                <button type="button" @click="clearEdit" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" @click="editProduct(); clearEdit();" data-bs-dismiss="modal" class="btn btn-primary">Save</button>
            </div>
            </div>
        </div>
        </div>
  </div>
</template>

<script>
export default {
  name: 'EditProduct',
  data () {
    return {
      name: '',
      image_url: '',
      price: 1,
      stock: 1,
      category: ''
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
    },

    detail () {
      return this.$store.state.detailProduct
    }
  },
  methods: {
    editProduct () {
      const payload = {
        id: this.detail.id,
        name: this.detail.name,
        image_url: this.detail.image_url,
        price: this.detail.price,
        stock: this.detail.stock,
        category: this.detail.category
      }
      this.$store.dispatch('editProduct', payload)
    },
    clearEdit () {
      this.name = ''
      this.image_url = ''
      this.category = ''
      this.price = 1
      this.stock = 1
    }
  }
}
</script>

<style>

</style>
