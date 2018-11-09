<template>
    <div class="container">
        <form @submit.prevent="filtrarQuestoes" class="mb-3">
            <div class="row mb-2">
                <div class="col">
                    <!-- <router-link class="h3 d-block mb-3" :to="{ name: 'case-licoes', params: { id: idCase }}" >{{ nomeCase }}</router-link> -->
                    <h5>Lição: {{ titulo }}</h5>
                    <h6 v-if="!!dataLiberacao">Liberada em: {{ dataLiberacao }}</h6>
                    <h6 v-if="!!dataEncerramento">Termina em: {{ dataEncerramento }}</h6>
                </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <pre>{{ textoApresentacao }}</pre>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-row mt-2">
                <div class="form-group col-lg-6 col-md-12">
                    <label for="filtro-numero-questao">Número da Questão:</label>
                    <select id="filtro-numero-questao" class="form-control" v-model="filtro.idQuestao" required>
                        <option v-for="(questao, index) in questoes" :key="questao.idQuestao" v-bind:value="questao.idQuestao">{{ index + 1 }}</option>
                    </select>
                </div>
            </div>
            <div class="form-row mt-2">
                <div class="form-group col-lg-6 col-md-6">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" v-model="filtro.removerQuestoesJaAvaliadas" class="custom-control-input" id="filtro-questoes-respondidas">
                      <label class="custom-control-label" for="filtro-questoes-respondidas">Remover questões que já foram avalidas</label>
                    </div>
                </div>
            </div>
            <div class="form-row">
              <div class="col text-right">
                <button type="submit" class="btn btn-success">Filtrar</button>
              </div>
            </div>
        </form>
        <form v-for="resposta in respostas" :key="resposta.idResposta" @submit.prevent="atribuirPontuacao(resposta)">  
          <div class="row mt-2">
            <div class="col">
              <h3>Resposta</h3>
              <pre>{{ resposta.resposta }}</pre>
            </div>
          </div>
          <div class="row mt-2">
            <label class="sr-only" v-bind:for="'nota-resposta-'+resposta.idResposta">Nota</label>
            <div class="input-group mb-2 mr-sm-2">
              <div class="input-group-prepend">
                <div class="input-group-text">Nota</div>
              </div>
              <input type="number" class="form-control" v-model="resposta.pontos" v-bind:id="'nota-resposta-'+resposta.idResposta" maxlength="10" required>
            </div>
            <button type="submit" class="btn btn-primary mb-2">Salvar</button>
          </div>
        </form>
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
        idQuestao: 1,
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
