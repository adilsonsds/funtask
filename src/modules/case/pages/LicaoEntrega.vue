<template>
    <div class="container">
        <form @submit.prevent="salvar">
            <div class="row mb-2">
                <div class="col">
                    <router-link class="h3 d-block mb-3" :to="{ name: 'case-licoes', params: { id: idCase }}" >{{ nomeCase }}</router-link>
                    <h5>Lição: {{ titulo }}</h5>
                    <h6>Responsáveis: 
                      <ul v-for="responsavel in responsaveis" :key="responsavel.idUsuario">
                        <li>
                          <router-link :to="{ name: 'user', params: { id: responsavel.idUsuario }}">{{ responsavel.nome }}</router-link>
                        </li>
                      </ul>
                    </h6>
                    <h6 v-if="!!dataLiberacao">Liberação em: {{ dataLiberacao | dataHora }}</h6>
                    <h6 v-if="!!dataEncerramento">Encerramento em: {{ dataEncerramento | dataHora }}</h6>
                </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <pre>{{ textoApresentacao }}</pre>
                  </div>
                </div>
                <hr>
              </div>
            </div>
            <div class="row" v-for="(questao, index) in questoes" :key="questao.id">
                <div class="col">
                    <div class="card border-0">
                        <div class="card-body py-2">
                            <h5 class="card-title">Questão {{ index + 1 }} de {{ totalDeQuestoes }}</h5>
                            <h6 class="card-subtitle">Pontuação: {{ questao.notaMaxima }}</h6>
                            <p class="card-text">
                                {{ questao.titulo }}
                            </p>
                        </div>
                    </div>
                    <div class="card border-0">
                        <div class="card-body py-2">
                            <h5 class="card-title">Resposta</h5>
                            <span v-if="entregue">{{ questao.resposta }}</span>
                            <textarea v-else v-model="questao.resposta" class="form-control" rows="6"></textarea>
                        </div>
                    </div>
                    <div class="card border-0" v-if="questao.permiteVisualizarAvaliacao">
                        <div class="card-body py-2">
                            <h5 class="card-title">Avaliação: <span class="small">{{questao.pontosGanhos}} pontos</span></h5>
                        </div>                        
                    </div>
                    <div v-if="questao.trofeus" class="row">
                      <div class="col-lg-3 col-md-4 col-sm-6 text-center" v-for="trofeu in questao.trofeus" :key="trofeu.idTrofeu">
                        <div class="card mb-3">
                          <picture class="card-img-top py-2">
                              <i class="fas fa-trophy" style="font-size:40px;"></i>
                          </picture>
                          <div class="card-body py-2">
                              <h5 class="card-title">
                                  {{ trofeu.nomeTrofeu }}
                              </h5>
                              <p class="card-text">
                                {{ trofeu.pontosMovimentados > 0 ? 'Ganhou':'Perdeu' }} {{ trofeu.pontosMovimentados }} pontos
                              </p>
                          </div>
                        </div>
                      </div>  
                    </div>
                <hr>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col text-right">
                <router-link v-if="entregue" class="btn btn-success" :to="{ name: 'case-licoes', params: { id: idCase }}" >Finalizar revisão</router-link>
                <button v-if="!entregue" @click.prevent="salvar" class="btn btn-secondary">Salvar rascunho</button>
                <button v-if="!entregue" @click.prevent="entregar" class="btn btn-primary">Entregar lição</button>
              </div>
            </div>
        </form>
    </div>
</template>

<script>
import { obterEntrega, salvarEntrega } from "@/services/LicaoService";

export default {
  data() {
    return {
      idEntregaDeLicao: 0,
      idCase: 0,
      nomeCase: "",
      titulo: "",
      textoApresentacao: "",
      descricao: "",
      formaDeEntrega: 0,
      dataLiberacao: "",
      dataEncerramento: "",
      permiteEntregasForaDoPrazo: false,
      permiteEditar: false,
      permiteAvaliar: false,
      permiteRealizar: false,
      permiteEntregar: false,
      entregue: true,
      questoes: [],
      responsaveis: []
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
      obterEntrega(self.idEntregaDeLicao).then(response => {
        self.idCase = response.data.idCase;
        self.nomeCase = response.data.nomeCase;
        self.titulo = response.data.titulo;
        self.textoApresentacao = response.data.textoApresentacao;
        self.descricao = response.data.descricao;
        self.formaDeEntrega = response.data.formaDeEntrega;
        self.dataLiberacao = response.data.dataLiberacao;
        self.dataEncerramento = response.data.dataEncerramento;
        self.permiteEntregasForaDoPrazo =
          response.data.permiteEntregasForaDoPrazo;
        self.permiteEditar = response.data.permiteEditar;
        self.permiteAvaliar = response.data.permiteAvaliar;
        self.permiteRealizar = response.data.permiteRealizar;
        self.permiteEntregar = response.data.permiteEntregar;
        self.entregue = response.data.entregue;
        response.data.questoes.forEach(q => {
          self.questoes.push({
            id: q.id,
            titulo: q.titulo,
            notaMaxima: q.notaMaxima,
            resposta: q.resposta,
            pontosGanhos: q.pontosGanhos,
            permiteVisualizarAvaliacao: q.permiteVisualizarAvaliacao,
            trofeus: q.trofeus
          });
        });
        response.data.responsaveis.forEach(r => {
          self.responsaveis.push({
            idUsuario: r.idUsuario,
            nome: r.nome
          });
        });
      });
    },
    salvar() {
      const self = this;

      let request = {
        idEntregaDeLicao: self.idEntregaDeLicao,
        status: 0,
        questoes: self.questoes
      };
      salvarEntrega(request)
        .then(response => {
          alert("Rascunho salvo com sucesso.");
        })
        .catch(() => {
          alert("Erro ao salvar.");
        });
    },
    entregar() {
      let msgConfirmacao =
        "As respostas inseridas não poderão ser alteradas após realizar a entrega. Confirma esta ação?";

      if (confirm(msgConfirmacao)) {
        const self = this;

        let request = {
          idEntregaDeLicao: self.idEntregaDeLicao,
          status: 1,
          questoes: self.questoes
        };

        salvarEntrega(request)
          .then(response => {
            self.$router.push({
              name: "case-licoes",
              params: { id: self.idCase }
            });
          })
          .catch(() => {
            alert("Erro ao salvar.");
          });
      }
    }
  },
  created() {
    this.idEntregaDeLicao = this.$route.params.idEntregaDeLicao;

    if (this.idEntregaDeLicao > 0) {
      this.carregarDados();
    }
  }
};
</script>