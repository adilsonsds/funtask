<template>    
    <div class="tab-pane fade show active" id="grupos" role="tabpanel">
        <div class="row" v-if="permiteCriarNovoGrupo">
            <div class="col text-right">
                <router-link :to="{ name: 'grupo-novo', params: { idCase: idCase }}" role="button" class="btn btn-primary">
                    <i class="fas fa-plus-circle"></i>
                    Novo Grupo
                </router-link>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h5>Progresso do seu grupo</h5>
                <div class="progress mb-4">
                    <div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0"
                        aria-valuemax="100">25%
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Grupos</h5>
                <table class="table table-borderless table-hover">
                    <tbody>
                        <tr v-for="grupo in grupos" :key="grupo.id">
                            <td>
                                <i class="fas fa-user-circle" style="font-size: 20px;"></i>
                            </td>
                            <td>
                                <router-link :to="{ name: 'grupo', params: { id: grupo.id }}">{{ grupo.nome }}</router-link>
                            </td>
                            <td>725</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import { listarGrupos } from "@/services/CaseService";
export default {
  props: {
    permiteCriarNovoGrupo: false
  },
  data() {
    return {
      idCase: 0,
      grupos: []
    };
  },
  computed: {
    totalDeGrupos() {
      return this.grupos.length;
    },
    textoQuantidadeGrupos() {
      return this.totalDeGrupos > 1
        ? this.totalDeGrupos + " Grupos"
        : this.totalDeGrupos == 1
          ? "1 Grupo"
          : "Nenhum grupo criado";
    }
  },
  methods: {
    carregarDados() {
      const self = this;
      listarGrupos(self.idCase).then(response => {
        self.grupos = response.data;
      });
    }
  },
  created() {
    this.idCase = this.$route.params.id;
    this.carregarDados();
  }
};
</script>
