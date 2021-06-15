<template>
  <!-- top-area Start -->
  <div class="top-area">
    <div class="header-area">
      <!-- Start Navigation -->
        <nav class="navbar navbar-default bootsnav  navbar-sticky navbar-scrollspy"  data-minus-value-desktop="70" data-minus-value-mobile="55" data-speed="1000">
          <div class="container">
              <!-- Start Atribute Navigation -->
              <div class="attr-nav">
                  <ul>
                    <li class="dropdown">
                        <router-link to="/cart">
                            <span class="lnr lnr-cart"></span>
                        </router-link>
                    </li><!--/.dropdown-->
                  </ul>
              </div><!--/.attr-nav-->
              <!-- End Atribute Navigation -->

              <!-- Start Header Navigation -->
              <div class="navbar-header">
                  <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                      <i class="fa fa-bars"></i>
                  </button>
                  <router-link class="navbar-brand" to="/">e-Commerce</router-link>

              </div><!--/.navbar-header-->
              <!-- End Header Navigation -->

              <!-- Collect the nav links, forms, and other content for toggling -->
              <div class="collapse navbar-collapse menu-ui-design" id="navbar-menu">
                  <ul class="nav navbar-nav navbar-center" data-in="fadeInDown" data-out="fadeOutUp">
                      <li class="scroll active"><router-link to="/" href="#Home">home</router-link></li>
                      <li class="scroll"><a href="#Category">category</a></li>
                      <li class="scroll"><a @click.prevent="logout" href="#">Log Out</a></li>
                  </ul><!--/.nav -->
              </div><!-- /.navbar-collapse -->
          </div><!--/.container-->
        </nav><!--/nav-->
        <!-- End Navigation -->
    </div><!--/.header-area-->

  </div><!-- /.top-area-->
  <!-- top-area End -->
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      this.$store.dispatch('logout')
      console.log(this.$store.state.loggedIn)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
