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
                                        <label for="case-nome">Nome</label>
                                        <input v-model="nome" type="text" class="form-control" id="case-nome" aria-describedby="nome-help" minlength="3" maxlength="100" required>
                                        <small id="nome-help" class="form-text text-muted">Dê um nome memorável ao
                                            seu case de negócio.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="case-apresentacao">Apresentação</label>
                                        <textarea v-model="textoDeApresentacao" class="form-control" rows="3" id="case-apresentacao" aria-describedby="apresentacao-help" minlength="3" maxlength="5000" required>
                                            </textarea>
                                        <small id="apresentacao-help" class="form-text text-muted">Faça uma apresentação
                                            motivadora do que os seus alunos verão durante as lições.</small>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="aceita-grupos">Aceita grupos</label>
                                            <select v-model="permiteMontarGrupos" id="aceita-grupos" class="form-control" required>
                                                <option value="false">Não</option>
                                                <option value="true">Sim</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-3" v-if="deveInformarQtdDeAlunosPorGrupo">
                                            <label for="minimo-grupos">Mínimo</label>
                                            <input v-model="minimoAlunosGrupo" type="number" class="form-control" id="minimo-grupos" min="1" step="1">
                                        </div>
                                        <div class="form-group col-md-3" v-if="deveInformarQtdDeAlunosPorGrupo">
                                            <label for="maximo-grupos">Máximo</label>
                                            <input v-model="maximoAlunosGrupo" type="number" class="form-control" id="maximo-grupos" min="1" step="1">
                                        </div>
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
import { obterPorId, manterCase } from "@/services/CaseService";
export default {
  data() {
    return {
      visible: false,
      id: 0,
      nome: "",
      textoDeApresentacao: "",
      permiteMontarGrupos: "false",
      minimoAlunosGrupo: "",
      maximoAlunosGrupo: ""
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
      return this.ehNovoCadastro
        ? "Editar Case de Negócio"
        : "Criar Case de Negócio";
    },
    deveInformarQtdDeAlunosPorGrupo() {
      return this.permiteMontarGrupos == "true";
    }
  },
  methods: {
    carregarDados() {
      const self = this;

      obterPorId(self.id).then(response => {
        self.nome = response.data.nome;
        self.textoDeApresentacao = response.data.textoDeApresentacao;
        self.permiteMontarGrupos = response.data.permiteMontarGrupos
          ? "true"
          : "false";
        self.minimoAlunosGrupo = response.data.minimoAlunosGrupo;
        self.maximoAlunosGrupo = response.data.maximoAlunosGrupo;
      });
    },
    salvar() {
      const self = this;

      manterCase(self.$data)
        .then(response => {
          self.fecharModal();
          self.$root.$emit("case-salvo", response.data);
        })
        .catch(() => {
          alert("Erro ao salvar. Tente novamente.");
        });
    },
    fecharModal() {
      this.visible = false;
      this.id = 0;
      this.nome = "";
      this.textoDeApresentacao = "";
      this.permiteMontarGrupos = "false";
      this.minimoAlunosGrupo = "";
      this.maximoAlunosGrupo = "";
    }
  },
  created() {
    const self = this;
    self.$root.$on("abrir-modal", params => {
      if (self.idModal === params.idModal) {
        if (!isNaN(params.idCase)) {
          self.id = params.idCase;
          self.carregarDados();
        }

        self.visible = true;
      }
    });
  }
};
</script>
