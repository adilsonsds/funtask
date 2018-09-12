<template>
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-lg-6 col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Cadastrar-se</h4>
                        <form v-on:submit.prevent="cadastrar">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-sm-6 col-12">
                                        <label for="nome">Nome</label>
                                        <input id="nome" type="text" class="form-control" v-model="nome">
                                    </div>
                                    <div class="col-sm-6 col-12">
                                        <label for="sobrenome">Sobrenome</label>
                                        <input id="sobrenome" type="text" class="form-control" v-model="sobrenome">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email">E-mail</label>
                                <input id="email" type="email" class="form-control" v-model="email">
                            </div>
                            <div class="form-group">
                                <label for="senha">Senha</label>
                                <input id="senha" type="password" class="form-control" v-model="senha">
                            </div>
                            <div class="form-group">
                                <label for="confirme-senha">Confirme a senha</label>
                                <input id="confirme-senha" type="password" class="form-control" v-model="senhaConfirmacao">
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-block">Cadastrar</button>
                            </div>
                            <div class="text-center">
                                Já possui uma conta?
                                <router-link to="/login">Entrar</router-link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { criarUsuario } from "../services/UsuarioService";

export default {
  data() {
    return {
      nome: "",
      sobrenome: "",
      email: "",
      senha: "",
      senhaConfirmacao: ""
    };
  },
  methods: {
    cadastrar() {
      criarUsuario(this.nome, this.sobrenome, this.email, this.senha)
        .then(response => {
          console.log("id: " + respose.data);
        })
        .catch(() => {
          console.log("erro durante a requisição");
        });
    }
  }
};
</script>
