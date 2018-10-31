<template>
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-lg-6 col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Cadastrar-se</h4>
                        <form v-on:submit.prevent="realizarCadastro">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-sm-6 col-12">
                                        <label for="nome">Nome</label>
                                        <input id="nome" type="text" class="form-control" v-model="Nome" minlength="3" maxlength="50" required>
                                    </div>
                                    <div class="col-sm-6 col-12">
                                        <label for="sobrenome">Sobrenome</label>
                                        <input id="sobrenome" type="text" class="form-control" v-model="Sobrenome" minlength="2" maxlength="49" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email">E-mail</label>
                                <input id="email" type="email" class="form-control" v-model="Email" maxlength="100" required>
                            </div>
                            <div class="form-group">
                                <label for="senha">Senha</label>
                                <input id="senha" type="password" class="form-control" v-model="Senha" minlength="6" maxlength="20" required>
                            </div>
                            <div class="form-group">
                                <label for="confirme-senha">Confirme a senha</label>
                                <input id="confirme-senha" type="password" class="form-control" v-model="SenhaConfirmacao" minlength="6" maxlength="20" required>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-block">Cadastrar</button>
                            </div>
                            <div class="text-center">
                                Já possui uma conta?
                                <router-link :to="{ name: 'login' }">Entrar</router-link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { cadastrarUsuario } from "@/services/UsuarioService";
import { Autenticar } from "@/services/AuthService";
export default {
  data() {
    return {
      Nome: "",
      Sobrenome: "",
      Email: "",
      Senha: "",
      SenhaConfirmacao: ""
    };
  },
  methods: {
    realizarCadastro() {
      const self = this;

      cadastrarUsuario(this.Nome, this.Sobrenome, this.Email, this.Senha)
        .then(response => {
          self.autenticar();
        })
        .catch(mensagem => {
          alert(mensagem || "Preencha os dados corretamente.");
        });
    },
    autenticar() {
      const self = this;
      self.$store.dispatch("login");
      
      Autenticar(self.Email, self.Senha)
        .then(res => {
          self.$store.commit("loginSuccess", res);
          self.$router.push({ name: "dashboard" });
        })
        .catch(error => {
          self.$store.commit("loginFailed", { error });
          alert(error);
        });
    }
  }
};
</script>
