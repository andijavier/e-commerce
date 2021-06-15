import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import router from '../router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLoggedIn: false,
    products: [],
    detailProduct: {}
  },
  mutations: {
    setLogin (state, payload) {
      state.isLoggedIn = payload.status
    },
    setProducts (state, payload) {
      state.products = payload.products
    },
    setDetail (state, payload) {
      state.detailProduct = payload.product
    }
  },
  actions: {
    login (context, payload) {
      axios({
        method: 'POST',
        url: '/loginadmin',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(response => {
          localStorage.setItem('access_token', response.data.access_token)
          context.commit('setLogin', { status: true })
          router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err)
        })
    },

    logout (context) {
      context.commit('setLogin', { status: false })
      localStorage.clear()
      router.push({ name: 'Login' })
    },

    getProducts (context) {
      axios({
        method: 'GET',
        url: '/products',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          context.commit('setProducts', { products: response.data })
        })
        .catch(err => {
          console.log(err)
        })
    },

    getProductById (context, payload) {
      axios({
        method: 'GET',
        url: '/products/' + payload.id,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          const product = {
            id: response.data.id,
            name: response.data.name,
            image_url: response.data.image_url,
            stock: response.data.stock,
            price: response.data.price,
            category: response.data.category
          }
          context.commit('setDetail', { product: product })
        })
        .catch(err => {
          console.log(err)
        })
    },

    addProduct (context, payload) {
      axios({
        method: 'POST',
        url: '/products',
        data: {
          name: payload.name,
          image_url: payload.image_url,
          stock: payload.stock,
          price: payload.price,
          category: payload.category
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          context.dispatch('getProducts')
        })
        .catch(err => {
          console.log(err)
        })
    },

    editProduct (context, payload) {
      axios({
        method: 'PUT',
        url: '/products/' + payload.id,
        data: {
          name: payload.name,
          image_url: payload.image_url,
          stock: payload.stock,
          price: payload.price,
          category: payload.category
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          context.dispatch('getProducts')
        })
        .catch(err => {
          console.log(err)
        })
    },

    deleteProduct (context, payload) {
      axios({
        method: 'DELETE',
        url: '/products/' + payload.id,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          context.dispatch('getProducts')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})

export default store
