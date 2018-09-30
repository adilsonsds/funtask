<template>
    <div>
        <div v-if="visible" class="modal show fade" :id="idModal" tabindex="-1" role="dialog" style="display: block">
             <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <form class="modal-content" @submit.prevent="salvar">
                    <div class="modal-header">
                        <h5 class="modal-title" id="manter-case-title">{{ titulo }}</h5>
                        <button type="button" class="close" @click="fecharModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-12">
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
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="fecharModal">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
        <div v-if="visible" class="modal-backdrop fade show"></div>
    </div>
</template>
<script>
import { obterTrofeuPorId, manterTrofeu } from "@/services/CaseService";

export default {
  data() {
    return {
      visible: false,
      id: 0,
      idCase: 0,
      nome: "",
      descricao: "",
      pontos: 0
    };
  },
  props: {
    idModal: ""
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
      obterTrofeuPorId(self.idCase, self.id).then(response => {
        self.nome = response.data.nome;
        self.descricao = response.data.descricao;
        self.pontos = response.data.pontos;
      });
    },
    salvar(event) {
      var self = this;

      manterTrofeu(self.$data)
        .then(response => {
          self.fecharModal();
          self.$root.$emit("trofeu-alterado");
        })
        .catch(() => {
          alert("Erro ao salvar. Tente novamente.");
        });
    },
    fecharModal() {
      this.visible = false;
      this.id = "";
      this.idCase = "";
      this.nome = "";
      this.descricao = "";
      this.pontos = "";
    }
  },
  created() {
    this.$root.$on("abrir-modal", params => {
      if (this.idModal === params.idModal) {
        this.idCase = params.idCase;
        
        if (!isNaN(params.idTrofeu)) {
          this.id = params.idTrofeu;
          this.carregarDados();
        }

        this.visible = true;
      }
    });
  }
};
</script>
