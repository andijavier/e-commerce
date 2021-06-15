<template>
  <div id="app">
    <Navbar v-if="isLoggedIn"/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'App',
  components: {
    Footer,
    Navbar
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.loggedIn
    }
  }
}
</script>
