<template>
  <div id="register">
      <!-- register -->
      <div class="container mt-5">
        <h1 class="text-dark" style="text-align: center;">E-Commerce</h1>
      </div>
      <form>
          <div class="card grey justify-content mx-auto mt-5 mb-5 p-3" style="width: 50vh">
          <h2 class="text-dark" style="text-align: center;">Register</h2>
              <div class="form-floating mb-3">
                <input type="email" v-model="email" class="form-control" id="InputEmail" placeholder="example@mail.com" aria-describedby="emailHelp">
                <label for="InputEmail" class="">Email address</label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" v-model="password" class="form-control" placeholder="password" id="InputPassword">
                <label for="InputPassword" class="">Password</label>
              </div>
              <div class="form-floating mb-3">
                <input type="text" v-model="fullName" class="form-control" placeholder="John Wick" id="fullName">
                <label for="fullName" class="">Your Name</label>
              </div>
              <button @click.prevent="register" type="submit" class="btn btn-primary">Register</button>
              <p>Already have an account ? <router-link to="/login">Login</router-link></p>
          </div>
      </form>
      <!-- END register -->
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      fullName: ''
    }
  },
  methods: {
    register () {
      const payload = {
        email: this.email,
        password: this.password,
        fullName: this.fullName
      }
      this.$store.dispatch('register', payload)
      this.email = ''
      this.password = ''
      this.fullName = ''
    }
  }
}
</script>

<style scoped>
</style>
