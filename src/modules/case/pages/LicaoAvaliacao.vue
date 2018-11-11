<template>
    <div class="container">
        <div class="row mb-2">
            <div class="col">
                <!-- <router-link class="h3 d-block mb-3" :to="{ name: 'case-licoes', params: { id: idCase }}" >{{ nomeCase }}</router-link> -->
                <h5>Lição: {{ titulo }}</h5>
                <h6 v-if="!!dataLiberacao">Liberada em: {{ dataLiberacao }}</h6>
                <h6 v-if="!!dataEncerramento">Termina em: {{ dataEncerramento }}</h6>
            </div>
        </div>
        <form @submit.prevent="filtrarQuestoes" class="my-3">
          <div class="form-row align-items-center">
            <div class="col-md-3 my-1">
              <label class="mr-sm-2 sr-only" for="filtro-numero-questao">Questão</label>
              <select class="custom-select mr-sm-2" id="filtro-numero-questao" v-model="filtro.idQuestao" required>
                <option v-for="(questao, index) in questoes" :key="questao.idQuestao" v-bind:value="questao.idQuestao">{{ index + 1 }}</option>
              </select>
            </div>
            <div class="col-md-9 my-1">
              <div class="custom-control custom-checkbox mr-sm-2">
                <input type="checkbox" v-model="filtro.removerQuestoesJaAvaliadas" class="custom-control-input" id="filtro-questoes-respondidas">
                <label class="custom-control-label" for="filtro-questoes-respondidas">Remover questões que já foram avaliadas</label>
              </div>
            </div>
          </div>
          <div class="form-row align-items-center my-3">
            <div class="col">
              <button type="submit" class="btn btn-primary">Filtrar</button>
            </div>
          </div>
        </form>
        <div class="card my-4" v-for="resposta in respostas" :key="resposta.idResposta">
          <div class="card-header">
            Resposta
          </div>
          <div class="card-body">
            <pre>{{ resposta.resposta }}</pre>
          </div>
          <form @submit.prevent="atribuirPontuacao(resposta)" class="card-footer text-muted">
            <div class="form-row">
              <div class="col-md-4">
                <div class="input-group mb-3">
                  <input type="number" class="form-control" placeholder="Nota" v-model="resposta.pontos" v-bind:id="'nota-resposta-'+resposta.idResposta" maxlength="10" required>
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" id="atribuir-nota">Atribuir Nota</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
    </div>
</template>
<script>
import {
  prepararAvaliacao,
  filtrarQuestoes,
  atribuirNota
} from "@/services/LicaoService";
export default {
  data() {
    return {
      idCase: 0,
      idLicao: 0,
      filtro: {
        idQuestao: '',
        removerQuestoesJaAvaliadas: true
      },
      titulo: "",
      textoApresentacao: "",
      dataLiberacao: "",
      dataEncerramento: "",
      questoes: [],
      respostas: []
    };
  },
  computed: {
    totalDeQuestoes() {
      return this.questoes ? this.questoes.length : 0;
    }
  },
  methods: {
    carregarDados() {
      const self = this;
      prepararAvaliacao(self.idLicao)
        .then(response => {
          self.titulo = response.data.titulo;
          self.textoApresentacao = response.data.textoApresentacao;
          self.dataLiberacao = response.data.dataLiberacao;
          self.dataEncerramento = response.data.dataEncerramento;
          response.data.questoes.forEach(q => {
            self.questoes.push({
              idQuestao: q.idQuestao,
              titulo: q.titulo,
              notaMaxima: q.notaMaxima
            });
          });
        })
        .catch(() => {});
    },
    filtrarQuestoes() {
      const self = this;

      filtrarQuestoes(
        self.idLicao,
        self.filtro.idQuestao,
        self.filtro.removerQuestoesJaAvaliadas
      ).then(response => {
        self.respostas = [];
        response.data.forEach(q => {
          self.respostas.push({
            idResposta: q.idResposta,
            resposta: q.resposta,
            idQuestao: q.idQuestao,
            dataHoraEntrega: q.dataHoraEntrega,
            idGrupo: q.idGrupo,
            pontos: ""
          });
        });
      });
    },
    atribuirPontuacao(resposta) {
      const self = this;

      atribuirNota(resposta)
        .then(() => {
          alert("Nota atribuída com sucesso.");
        })
        .catch(() => {
          alert("Erro ao atribuir nota.");
        });
    }
  },
  created() {
    this.idCase = this.$route.params.idCase;
    this.idLicao = this.$route.params.idLicao;

    if (this.idCase > 0 && this.idLicao > 0) {
      this.carregarDados();
    }
  }
};
</script>
