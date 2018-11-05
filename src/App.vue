<template>
  <div>
    <header>      
        <nav class="navbar navbar-expand-md navbar-dark bg-primary navbar-laravel mb-4">
          <div class="container">
            <router-link :to="{ name: 'dashboard' }" class="navbar-brand">funtask</router-link>

            <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent">
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
                    <router-link class="nav-link" :to="{ name: 'perfil' }" title="Ir para meu perfil">
                      <i class="fas fa-user-circle"></i> Perfil
                    </router-link>
                  </li>
                  <li>
                    <a href="#!" class="nav-link" @click.prevent="logout">
                      <i class="fas fa-sign-out-alt"></i> Sair
                    </a>
                  </li>
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
