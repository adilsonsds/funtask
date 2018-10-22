<template>
  <div>
    <header>      
        <nav class="navbar navbar-expand-md navbar-dark bg-primary navbar-laravel mb-4">
          <div class="container">
            <router-link :to="{ name: 'dashboard' }" class="navbar-brand">funtask</router-link>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent">
                <span class="navbar-toggler-icon"></span>
            </button>
          </div>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ml-auto">
                <template v-if="!usuarioAutenticado">
                  <li>
                    <router-link class="nav-link" :to="{ name: 'cadastro' }">Cadastrar</router-link>
                  </li>
                  <li>
                    <router-link class="nav-link" :to="{ name: 'login' }">Entrar</router-link>
                  </li>
                </template>
                <template v-else>
                  <li>
                    <router-link class="nav-link" :to="{ name: 'user' }">Perfil</router-link>
                  </li>
                  <li>
                    <a href="#!" class="nav-link" @click.prevent="logout">Sair</a>
                  </li>
                  <!-- <li class="nav-link dropdown">
                    <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" aria-toggle="dropdown" aria-expanded="false" aria-haspopup="true">
                      {{ usuarioAutenticado.nomeCompleto || 'Adilson' }} <span class="caret"></span>
                    </a>

                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a href="#!" class="dropdown-item" @click.prevent="logout">Sair</a>
                    </div>
                  </li> -->
                </template>
              </ul>
          </div>
        </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      // menuAberto: false
    };
  },
  computed: {
    usuarioAutenticado() {
      return this.$store.getters.usuarioAutenticado;
    }
  },
  methods: {
    // expandirOuRecolherMenu() {
    //   this.menuAberto = !this.menuAberto;
    // },
    logout() {
      this.$store.commit("logout");
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style>

</style>
