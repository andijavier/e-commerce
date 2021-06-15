<template>
  <div id="login">
      <!-- LOGIN -->
      <h1 class="text-light" style="text-align: center;">E-Commerce CMS</h1>
      <form>
          <div class="card grey justify-content mx-auto mt-5 p-3" style="width: 50vh">
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
    }
  }
}
</script>

<style>
body {
  background-image: url('https://i.pinimg.com/originals/c9/91/52/c99152f5d459b6923b7caad05e6795c3.jpg');
}
</style>
