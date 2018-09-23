<template>
  <div>
    <header class="mb-4">
        <nav class="navbar navbar-expand-md navbar-dark bg-primary">
            <router-link :to="{ name: 'dashboard' }" class="navbar-brand">funtask</router-link>

            <button class="navbar-toggler" type="button" @click="expandirOuRecolherMenu">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse show" v-show="menuAberto" id="navbarTogglerDemo02">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'user' }">Meu Perfil</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'login' }" >Sair</router-link>
                    </li>
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
      menuAberto: false
    };
  },
  methods: {
    expandirOuRecolherMenu() {
      this.menuAberto = !this.menuAberto;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
