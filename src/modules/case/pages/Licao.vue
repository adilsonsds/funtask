<template>
    <div class="container">
        <form @submit.prevent="salvar">
            <div class="d-flex justify-content-between">
                <router-link class="h3" :to="{ name: 'case-licoes', params: { id: idCase }}" >{{ nomeCase }}</router-link>
                <div>
                    <button type="submit" class="btn btn-success">Salvar</button>
                    <!-- <button type="button" @click.prevent="excluir" class="btn btn-outline-danger">Excluir</button> -->
                </div>
            </div>
            <div class="form-group mt-4">
                <label for="licao-nome">Título da lição:</label>
                <input id="licao-nome" type="text" class="form-control" v-model="titulo" minlength="3" maxlength="200" required>
            </div>
            <div class="form-group mt-4">
                <label for="licao-descricao">Descrição:</label>
                <textarea id="licao-descricao" class="form-control" rows="2" v-model="descricao" minlength="3" maxlength="500" required></textarea>
            </div>
            <div class="form-group">
                <label for="licao-apresentacao">Apresentação:</label>
                <textarea id="licao-apresentacao" class="form-control" rows="5" v-model="textoApresentacao" minlength="3" maxlength="5000"></textarea>
            </div>
            <div class="form-row">
                <div class="form-group col-lg-6 col-md-12">
                    <label for="licao-realizado-como">Realizado:</label>
                    <select id="licao-realizado-como" class="form-control" v-model="formaDeEntrega" required>
                        <option value="0">Apenas individualmente</option>
                        <option value="1">Individualmente ou em grupo</option>
                        <option value="2">Apenas em grupo</option>
                    </select>
                </div>
                <div class="form-group col-lg-3 col-md-6">
                    <label for="licao-liberacao">Liberação em</label>
                    <input id="licao-liberacao" type="datetime-local" class="form-control" v-model="dataLiberacao" required>
                </div>
                <div class="form-group col-lg-3 col-md-6">
                    <label for="licao-encerramento">Encerramento em</label>
                    <input id="licao-encerramento" type="datetime-local" class="form-control" v-model="dataEncerramento" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="">Os alunos podem entregar esta lição fora do prazo?</label>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" v-model="permiteEntregasForaDoPrazo" value="true" id="entregar-fora-prazo-nao" name="entregar-fora-prazo" class="custom-control-input">
                        <label class="custom-control-label" for="entregar-fora-prazo-nao">Sim</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" v-model="permiteEntregasForaDoPrazo" value="false" id="entregar-fora-prazo-sim" name="entregar-fora-prazo" class="custom-control-input">
                        <label class="custom-control-label" for="entregar-fora-prazo-sim">Não</label>
                    </div>
                </div>
            </div>        
            <div class="row mt-4">
                <div class="col-12">
                    <h3>Questões</h3>
                    <hr>
                </div>
            </div>
            <div class="mt-2 mb-5" v-for="(questao, index) in questoes" :key="questao.id">
                <div class="row">
                    <div class="col-1">
                        <h4>#{{ index + 1 }}</h4>
                    </div>
                    <div class="col-sm-6 col-7">
                        <div class="input-group input-group-sm mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">Nota</div>
                            </div>
                            <input v-model="questao.notaMaxima" type="text" class="form-control" required>
                        </div>
                    </div>
                    <div class="col-sm-5 col-3 text-right">
                        <button type="button" @click="removerQuestao(index)" class="btn btn-danger btn-sm">Excluir</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <textarea v-model="questao.titulo" class="form-control" rows="6" maxlength="5000" required></textarea>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-12">
                        <label for="">Gabarito:</label>
                        <textarea v-model="questao.gabarito" class="form-control" rows="6" maxlength="5000"></textarea>
                    </div>
                </div>
            </div>
            <div class="d-block mt-2 mb-5">
                <button @click.prevent="adicionarQuestao" class="btn btn-primary">Adicionar questão</button>
            </div>
        </form>
    </div>
</template>

<script>
import { obterPorId, salvar } from "@/services/LicaoService";
import { obterPorId as obterCase } from "@/services/CaseService";

export default {
  data() {
    return {
      id: 0,
      idCase: 0,
      nomeCase: "",
      titulo: "",
      textoApresentacao: "",
      descricao: "",
      formaDeEntrega: 0,
      dataLiberacao: "",
      dataEncerramento: "",
      permiteEntregasForaDoPrazo: false,
      permiteVisualizar: false,
      permiteEditar: false,
      permiteAvaliar: false,
      permiteRealizar: false,
      idEntregaDeLicao: null,
      permiteEntregar: false,
      questoes: []
    };
  },
  methods: {
    adicionarQuestao() {
      this.questoes.push({
        id: "",
        titulo: "",
        notaMaxima: 1,
        gabarito: ""
      });
    },
    excluir() {
      if (confirm("Confirma a exclusão da lição?")) {
        alert("confirmado");
      }
    },
    carregarDados() {
      const self = this;
      obterPorId(self.idCase, self.id).then(response => {
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
        response.data.questoes.forEach(q => {
          self.questoes.push({
            id: q.id,
            titulo: q.titulo,
            notaMaxima: q.notaMaxima,
            gabarito: q.gabarito
          });
        });
      });
    },
    carregarDadosDoCase() {
      const self = this;
      obterCase(self.idCase).then(response => {
        self.nomeCase = response.data.nome;
      });
    },
    salvar() {
      const self = this;
      salvar(self.$data)
        .then(response => {
          self.$router.push({
            name: "case-licoes",
            params: { id: self.idCase }
          });
        })
        .catch(() => {
          alert("Erro ao salvar.");
        });
    },
    removerQuestao(index) {
      this.questoes.splice(index, 1);
    }
  },
  created() {
    this.id = this.$route.params.idLicao;
    this.idCase = this.$route.params.idCase;

    if (this.id > 0) {
      this.carregarDados();
    } else {
      this.carregarDadosDoCase();
      this.adicionarQuestao();
    }
  }
};
</script>
