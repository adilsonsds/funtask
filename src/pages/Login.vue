<template>
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-lg-6 col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Entrar</h4>
                        <form @submit.prevent="efetuarLogin">
                            <div class="form-group">
                                <label for="email">E-mail</label>
                                <input id="email" name="email" type="email" v-model="Email" class="form-control" max="100" required>
                            </div>
                            <div class="form-group">
                                <div class="d-flex justify-content-between">
                                    <label for="senha">Senha</label>
                                    <!-- <a href=""  data-toggle="modal" data-target="#modal-esqueceu-senha">Esqueceu sua senha?</a> -->
                                </div>
                                <input id="senha" name="senha" type="password" v-model="Senha" class="form-control" minlength="6" maxlength="50" required>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-block">Entrar</button>
                            </div>
                            <div class="text-center">
                                Não possui uma conta?
                                <router-link :to="{ name: 'cadastro'}">Cadastre-se</router-link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modal-esqueceu-senha" tabindex="-1" role="dialog" aria-labelledby="modal-esqueceu-senha" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Redefinição de senha</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-12">
                                    <form>
                                        <div class="form-group">
                                            <label for="informe-email">E-mail</label>
                                            <input type="email" class="form-control" id="informe-email" aria-describedby="informe-email-help">
                                            <small id="informe-email-help" class="form-text text-muted">Um link para
                                                redefinição de senha será enviado para o seu e-mail.</small>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        <button type="button" class="btn btn-primary">Enviar e-mail</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Autenticar } from "@/services/AuthService";

export default {
  data() {
    return {
      Email: "",
      Senha: ""
    };
  },
  methods: {
    efetuarLogin() {
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
