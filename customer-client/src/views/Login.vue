<template>
  <div id="login">
      <!-- LOGIN -->
      <div class="container mt-5">
        <h1 class="text-dark" style="text-align: center;">E-Commerce</h1>
      </div>
      <form>
          <div class="card grey justify-content mx-auto mt-5 mb-5 p-3" style="width: 50vh">
          <h2 class="text-dark" style="text-align: center;">Login</h2>
              <div class="form-floating mb-3">
                <input type="email" v-model="email" class="form-control" id="InputEmail" placeholder="example@mail.com" aria-describedby="emailHelp">
                <label for="InputEmail" class="">Email address</label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" v-model="password" class="form-control" placeholder="password" id="InputPassword">
                <label for="InputPassword" class="">Password</label>
              </div>
              <button @click.prevent="login" type="submit" class="btn btn-primary">Login</button>
              <p>Don't have an account ? <router-link to="/register">Register</router-link></p>
          </div>
      </form>
      <!-- END LOGIN -->
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style scoped>
</style>
