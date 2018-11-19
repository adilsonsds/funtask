<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-4">
                <div class="card text-center mb-3">
                    <div class="img-fluid">
                        <i class="fas fa-user-circle" style="font-size: 120px;"></i>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">
                            {{ nomeCompleto }}
                        </h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                {{ email }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div> 
            <div class="col-lg-9 col-md-8">
                <div v-if="trofeus" class="row">
                    <div class="col-lg-4 col-md-6 text-center" v-for="trofeu in trofeus" :key="trofeu.idEntrega">
                        <div class="card mb-3 border-0">
                            <picture class="card-img-top img-fluid">
                                <i class="fas fa-trophy" style="font-size:60px;"></i>
                            </picture>
                            <div class="card-body">
                                <h5 class="card-title">{{ trofeu.nomeTrofeu }}</h5>
                                <p class="card-text">
                                    {{ trofeu.pontosMovimentados > 0 ? 'Ganhou':'Perdeu' }} {{ Math.abs(trofeu.pontosMovimentados) }} pontos
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">Cases de Negócio</h5>
                                <table class="table table-borderless table-hover">
                                    <tbody>
                                        <tr v-for="caseDeNegocio in casesDeNegocios" :key="caseDeNegocio.id">
                                            <td>
                                                <i class="fab fa-fort-awesome-alt" style="font-size: 20px;"></i>
                                            </td>
                                            <td>
                                                <router-link :to="{ name: 'case', params: { id: caseDeNegocio.id }}">{{ caseDeNegocio.nome }}</router-link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="grupos" class="row">
                    <div class="col">
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">Grupos</h5>
                                <table class="table table-borderless table-hover">
                                    <tbody>
                                        <tr v-for="grupo in grupos" :key="grupo.id">
                                            <td>
                                                <i class="fas fa-users" style="font-size: 20px;"></i>
                                            </td>
                                            <td>
                                                <router-link :to="{ name: 'grupo', params: { id: grupo.id }}">{{ grupo.nome }}</router-link><br>
                                                <router-link class="small" :to="{ name: 'case', params: { id: grupo.idCase }}">({{ grupo.nomeCase }})</router-link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
  obter,
  listarCases,
  listarGrupos,
  listarTrofeus
} from "@/services/UsuarioService";
export default {
  data() {
    return {
      id: "",
      nomeCompleto: "",
      email: "",
      casesDeNegocios: [],
      trofeus: [],
      grupos: []
    };
  },
  methods: {
    carregarGrupos() {
      const self = this;

      listarGrupos(self.id).then(response => {
        response.data.forEach(g => {
          self.grupos.push({
            id: g.id,
            nome: g.nome,
            idCase: g.caseDeNegocio.id,
            nomeCase: g.caseDeNegocio.nome
          });
        });
      });
    },
    carregarTrofeus() {
      const self = this;

      listarTrofeus(self.id).then(response => {
        response.data.forEach(t => {
          self.trofeus.push({
            idEntrega: t.idEntrega,
            idTrofeu: t.idTrofeu,
            nomeTrofeu: t.nomeTrofeu,
            pontosMovimentados: t.pontosMovimentados
          });
        });
      });
    },
    carregarCases() {
      const self = this;

      listarCases(self.id).then(response => {
        response.data.forEach(c => {
          self.casesDeNegocios.push({
            id: c.id,
            nome: c.nome
          });
        });

        if (self.casesDeNegocios.length > 0) {
          self.carregarTrofeus();
          self.carregarGrupos();
        }
      });
    },
    carregarDados() {
      const self = this;
      obter(self.id).then(response => {
        self.id = response.data.id;
        self.nomeCompleto = response.data.nomeCompleto;
        self.email = response.data.email;
      });

      self.carregarCases();
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.carregarDados();
  }
};
</script>
