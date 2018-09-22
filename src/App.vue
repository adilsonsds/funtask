<template>
  <div>
    <ul>
        <li>
            <router-link :to="{ name: 'home' }">Home</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'cadastro' }">Cadastro</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'login' }">Login</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'user' }">Perfil</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'group' }">Grupo</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'case', params: { id: 1 }}">Case</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'case-licao', params: { id: 1 }}">Lição</router-link>
        </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
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
