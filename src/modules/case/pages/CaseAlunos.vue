<template>    
    <div class="tab-pane fade show active" id="alunos" role="tabpanel">
        <h5>Seu progresso</h5>
        <div class="progress mb-4">
            <div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0"
                aria-valuemax="100">25%
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Alunos</h5>
                <table class="table table-borderless table-hover">
                    <tbody>
                        <tr v-for="aluno in alunos" :key="aluno.idUsuario">
                            <td>
                                <i class="fas fa-user-circle" style="font-size: 20px;"></i>
                            </td>
                            <td>
                                <router-link :to="{ name: 'user', params: { id: aluno.idUsuario }}">{{ aluno.nomeCompleto }}</router-link>
                                <router-link v-if="!!aluno.idGrupo" class="small" :to="{ name: 'group', params: { id: aluno.idGrupo }}">({{ aluno.nomeGrupo }})</router-link>
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
import { listarAlunos } from "@/services/CaseService";
export default {
  data() {
    return {
      idCase: 0,
      alunos: []
    };
  },
  computed: {
    totalDeAlunos() {
      return this.alunos.length;
    },
    textoQuantidadeAlunos() {
      return this.totalDeAlunos > 1
        ? this.totalDeAlunos + " Alunos"
        : this.totalDeAlunos == 1
          ? "1 Aluno"
          : "Nenhum aluno ainda inscrito";
    }
  },
  methods: {
    carregarDados() {
      const self = this;
      listarAlunos(self.idCase).then(response => {
        self.alunos = response.data;
      });
    }
  },
  created() {
    this.idCase = this.$route.params.id;
    this.carregarDados();
  }
};
</script>
