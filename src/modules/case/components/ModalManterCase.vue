<template>
    <div>
        <div v-if="visible" class="modal show fade" :id="id" tabindex="-1" role="dialog" style="display: block">
             <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <form class="modal-content" @submit="salvar">
                    <div class="modal-header">
                        <h5 class="modal-title" id="manter-case-title">{{ titulo }}</h5>
                        <button type="button" class="close" @click="visible=false">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <!-- <div class="col-lg-3 col-md-4">
                                    <div>
                                        <div class="form-group text-center">
                                            <label for="case-foto" class="mb-3">
                                                <i class="fab fa-fort-awesome-alt" style="font-size:120px;"></i>
                                            </label>
                                            <input type="file" class="form-control" id="case-foto">
                                        </div>
                                    </div>
                                </div> -->
                                <div class="col-12">
                                    <div class="form-group">
                                        <label for="case-nome">Nome</label>
                                        <input v-model="Nome" type="text" class="form-control" id="case-nome" aria-describedby="nome-help">
                                        <small id="nome-help" class="form-text text-muted">Dê um nome memorável ao
                                            seu case de negócio.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="case-apresentacao">Apresentação</label>
                                        <textarea v-model="TextoDeApresentacao" class="form-control" rows="3" id="case-apresentacao" aria-describedby="apresentacao-help">
                                            </textarea>
                                        <small id="apresentacao-help" class="form-text text-muted">Faça uma apresentação
                                            motivadora do que os seus alunos verão durante as lições.</small>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="aceita-grupos">Aceita grupos</label>
                                            <select v-model="PermiteMontarGrupos" id="aceita-grupos" class="form-control">
                                                <option value="0">Não</option>
                                                <option value="1">Sim</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-3" v-if="PermiteMontarGrupos == 1">
                                            <label for="minimo-grupos">Mínimo</label>
                                            <input v-model="MinimoDeAlunosPorGrupo" type="number" class="form-control" id="minimo-grupos">
                                        </div>
                                        <div class="form-group col-md-3" v-if="PermiteMontarGrupos == 1">
                                            <label for="maximo-grupos">Máximo</label>
                                            <input v-model="MaximoDeAlunosPorGrupo" type="number" class="form-control" id="maximo-grupos">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="visible=false">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
        <div v-if="visible" class="modal-backdrop fade show"></div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      Id: 0,
      Nome: "",
      TextoDeApresentacao: "",
      PermiteMontarGrupos: 0,
      MinimoDeAlunosPorGrupo: "",
      MaximoDeAlunosPorGrupo: ""
    };
  },
  props: {
    id: ""
  },
  computed: {
    titulo() {
      return this.Id > 0 ? "Editar case de negócio" : "Criar case de negócio";
    }
  },
  methods: {
    salvar() {
      this.$router.push({ name: "case", params: { id: 1 } });
    }
  },
  created() {
    this.$root.$on("abrir-modal", id => {
      if (this.id === id) {
        this.visible = true;
      }
    });
  }
};
</script>
