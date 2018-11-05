<template>
    <main class="container">
        <div class="row">
            <div class="col">
                <h2>{{ titulo }}</h2>
            </div>
        </div>
        <form @submit.prevent="salvar">
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="recompensa-nome">Nome</label>
                        <input type="text" v-model="nome" minlength="2" maxlength="100" required class="form-control" id="recompensa-nome" aria-describedby="nome-help">
                        <small id="nome-help" class="form-text text-muted">Atribua um nome de honra
                            ao troféu.</small>
                    </div>
                    <div class="form-group">
                        <label for="recompensa-pontos">Pontos adicionais</label>
                        <input type="number" v-model="pontos" required class="form-control" id="recompensa-pontos" />
                        <small id="recompensa-pontos" class="form-text text-muted">Dê vantagens ou punições aos
                            merecedores deste trofeu atribuindo pontos adicionais.</small>
                    </div>
                    <div class="form-group">
                        <label for="recompensa-descricao">Descrição</label>
                        <textarea class="form-control" v-model="descricao" minlength="2" maxlength="500" required rows="3" id="recompensa-descricao" aria-describedby="descricao-help"></textarea>
                        <small id="descricao-help" class="form-text text-muted">Diga aos seus
                            alunos quem ganha esse troféu com uma breve descrição motivacional.</small>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <button type="submit" class="btn btn-primary">Salvar</button>
                </div>
            </div>
        </form>
    </main>
</template>
<script>
import { obterPorId, salvar } from "@/services/TrofeuService";
export default {
  data() {
    return {
      id: 0,
      idCase: 0,
      nome: "",
      descricao: "",
      pontos: 0
    };
  },
  computed: {
    ehNovoCadastro() {
      return this.id > 0;
    },
    titulo() {
      return this.ehNovoCadastro ? "Editar Troféu" : "Criar Troféu";
    }
  },
  methods: {
    carregarDados() {
      const self = this;
      obterPorId(self.idCase, self.id).then(response => {
        self.nome = response.data.nome;
        self.descricao = response.data.descricao;
        self.pontos = response.data.pontos;
      });
    },
    salvar() {
      const self = this;

      salvar(self.$data)
        .then(response => {
          self.$router.push({
            name: "case-trofeus",
            params: { id: self.idCase }
          });
        })
        .catch(() => {
          alert("Erro ao salvar. Tente novamente.");
        });
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.idCase = this.$route.params.idCase;

    if (this.id > 0) this.carregarDados();
  }
};
</script>