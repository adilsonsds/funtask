<template>
    <div class="container">
        <div class="row mb-2">
            <div class="col">
                <router-link class="btn btn-secondary btn-sm mb-4" :to="{ name: 'case-licoes', params: { id: idCase }}" >Voltar</router-link>
                <h5>Lição: {{ titulo }}</h5>
                <h6 v-if="!!dataLiberacao">Liberação em: {{ dataLiberacao | dataHora }}</h6>
                <h6 v-if="!!dataEncerramento">Encerramento em: {{ dataEncerramento | dataHora }}</h6>
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
          <div class="card-footer text-muted">
            <div class="row">
              <div class="col-sm-6">
                <form @submit.prevent="atribuirPontuacao(resposta)" class="form-inline">
                  <div class="form-group mb-2 mr-2">
                    <label class="sr-only">Troféu</label>
                    <input type="number" class="form-control form-control-sm" placeholder="Nota" v-model="resposta.pontosRecebidos" v-bind:id="'nota-resposta-'+resposta.idResposta" maxlength="10" required>
                  </div>
                  <button type="submit" class="btn btn-primary btn-sm mb-2">Atribuir nota</button>
                </form>
              </div>
              <div class="col-sm-6">
                <form v-if="!!trofeus" @submit.prevent="atribuirTrofeu(resposta)" class="form-inline">
                  <div class="form-group mb-2 mr-2">
                    <label class="sr-only">Troféu</label>
                    <select v-model="resposta.idTrofeuParaAtribuir" class="form-control form-control-sm" placeholder="Selecione um troféu.." required>
                      <option value="" selected>Selecione um troféu..</option>
                      <option v-for="trofeu in trofeus" :key="trofeu.idTrofeu" :value="trofeu.idTrofeu">{{ trofeu.nome }} ({{trofeu.pontos > 0 ? 'Ganha':'Perde'}} {{ Math.abs(trofeu.pontos) }} pontos)</option>
                    </select>
                  </div>
                  <button type="submit" class="btn btn-secondary btn-sm mb-2">Atribuir troféu</button>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import {
  prepararAvaliacao,
  filtrarQuestoes,
  atribuirNota
} from "@/services/LicaoService";
import { atribuirTrofeu } from "@/services/TrofeuService";
export default {
  data() {
    return {
      idCase: 0,
      idLicao: 0,
      filtro: {
        idQuestao: "",
        removerQuestoesJaAvaliadas: true
      },
      titulo: "",
      textoApresentacao: "",
      dataLiberacao: "",
      dataEncerramento: "",
      questoes: [],
      respostas: [],
      trofeus: []
    };
  },
  filters: {
    dataHora(data) {
      return data ? new Date(data).toLocaleString("pt-BR") : "";
    }
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
          response.data.trofeus.forEach(t => {
            self.trofeus.push({
              idTrofeu: t.idTrofeu,
              nome: t.nome,
              pontos: t.pontos
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
            idEntregaDeLicao: q.idEntregaDeLicao,
            dataHoraEntrega: q.dataHoraEntrega,
            idGrupo: q.idGrupo,
            pontosRecebidos: q.pontosRecebidos,
            idTrofeuParaAtribuir: ""
          });
        });
      });
    },
    atribuirPontuacao(resposta) {
      const self = this;
      let params = {
        IdResposta: resposta.idResposta,
        Pontos: resposta.pontosRecebidos
      };

      atribuirNota(params)
        .then(() => {
          alert("Nota atribuída com sucesso.");
          self.filtrarQuestoes();
        })
        .catch(() => {
          alert("Erro ao atribuir nota.");
        });
    },
    atribuirTrofeu(resposta) {
      const self = this;

      let request = {
        IdTrofeu: resposta.idTrofeuParaAtribuir,
        IdEntregaDeLicao: resposta.idEntregaDeLicao,
        IdResposta: resposta.idResposta
      };

      atribuirTrofeu(request)
        .then(() => {
          alert("Troféu atribuído com sucesso.");
        })
        .catch(() => {
          alert("Erro ao atribuir troféu.");
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
