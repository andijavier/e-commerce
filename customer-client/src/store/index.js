import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import router from '../router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loggedIn: localStorage.loggedIn,
    products: [],
    cart: [],
    product: {}
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload.products
    },

    setLoggedIn (state, payload) {
      state.loggedIn = payload.status
    },

    setCart (state, payload) {
      state.cart = payload.cartItems
    }
  },
  actions: {
    login (context, payload) {
      axios({
        method: 'POST',
        url: '/logincust',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(res => {
          localStorage.setItem('access_token', res.data.access_token)
          localStorage.setItem('loggedIn', true)
          context.commit('setLoggedIn', { status: true })
          router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err)
        })
    },

    register (context, payload) {
      axios({
        method: 'POST',
        url: '/register',
        data: {
          email: payload.email,
          password: payload.password,
          fullName: payload.fullName
        }
      })
        .then(res => {
          router.push({ name: 'Login' })
        })
        .catch(err => {
          console.log(err)
        })
    },

    logout (context) {
      localStorage.clear()
      context.commit('setLoggedIn', { status: false })
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

    getCart (context) {
      axios({
        method: 'GET',
        url: '/carts',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          context.commit('setCart', { cartItems: response.data })
        })
        .catch(err => {
          console.log(err)
        })
    },

    addToCart (context, payload) {
      axios({
        method: 'POST',
        url: '/carts',
        data: {
          ProductId: payload.ProductId,
          quantity: payload.quantity
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          context.dispatch('getCart')
        })
        .catch(err => {
          console.log(err)
        })
    },

    updateCart (context, payload) {
      axios({
        method: 'PATCH',
        url: '/carts',
        data: {
          ProductId: payload.ProductId,
          quantity: payload.quantity
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(res => {
          context.dispatch('getCart')
        })
        .catch(err => {
          console.log(err)
        })
    },

    deleteCartItem (context, payload) {
      axios({
        method: 'DELETE',
        url: '/carts',
        data: {
          ProductId: payload.ProductId
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(res => {
          context.dispatch('getCart')
        })
        .catch(err => {
          console.log(err)
        })
    },

    checkout (context) {
      axios({
        method: 'PATCH',
        url: '/carts/checkout',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(res => {
          context.dispatch('getCart')
          router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})

export default store
