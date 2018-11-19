<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-4">
                <div class="card text-center mb-3">
                    <div class="img-fluid">
                        <i class="fas fa-users" style="font-size: 120px;"></i>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">
                            {{ nome }}
                        </h5>
                        <ul class="list-group list-group-flush">
                            <li v-if="permiteEditar" class="list-group-item">
                                <router-link :to="{ name: 'grupo-editar', params: { id: id }}" class="btn btn-primary">Editar</router-link>
                            </li>
                            <li class="list-group-item">{{ totalDeMembros }} membros</li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="card text-center mb-3">
                            <picture class="card-img-top img-fluid p-1" alt="Case de Negócio">
                                <i class="fab fa-fort-awesome-alt" style="font-size: 60px;"></i>
                            </picture>
                            <div class="card-body p-1">
                                <p class="card-text">
                                    <router-link :to="{ name: 'case-grupos', params: { id: idCase }}">{{ nomeCase }}</router-link>
                                </p>
                            </div>
                        </div>
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
                <div v-if="!!gritoDeGuerra" class="row mb-3">
                    <div class="col">
                        <div class="card">
                            <div class="card-body">
                                <blockquote class="blockquote mb-0">
                                    <p>{{ gritoDeGuerra }}</p>
                                    <footer class="blockquote-footer">Grupo <cite title="Source Title">{{ nome }}</cite></footer>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">Membros</h5>
                                <table class="table table-borderless table-hover">
                                    <tbody>
                                        <tr v-for="membro in membros" :key="membro.idUsuario">
                                            <td>
                                                <i class="fas fa-user" style="font-size: 20px;"></i>
                                            </td>
                                            <td>
                                                <router-link :to="{ name: 'user', params: { id: membro.idUsuario }}">{{ membro.nomeCompleto }}</router-link>
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
import { obterPorId, listarTrofeus } from "@/services/GruposService";
export default {
  data() {
    return {
      id: "",
      nome: "",
      idCase: "",
      nomeCase: "",
      gritoDeGuerra: "",
      permiteEditar: false,
      trofeus: [],
      membros: []
    };
  },
  computed: {
    totalDeMembros() {
      return this.membros.length;
    }
  },
  methods: {
    carregarTrofeus() {
      const self = this;

      listarTrofeus(self.id)
        .then(response => {
          response.data.forEach(t => {
            self.trofeus.push({
                idEntrega: t.idEntrega,
                idTrofeu: t.idTrofeu,
                nomeTrofeu: t.nomeTrofeu,
                pontosMovimentados: t.pontosMovimentados
            });
          });
        })
        .catch();
    },
    carregarDados() {
      const self = this;
      obterPorId(self.id).then(response => {
        self.id = response.data.id;
        self.idCase = response.data.idCase;
        self.nome = response.data.nome;
        self.nomeCase = response.data.nomeCase;
        self.gritoDeGuerra = response.data.gritoDeGuerra;
        self.permiteEditar = response.data.permiteEditar;
        response.data.membros.forEach(el => {
          self.membros.push({
            idAluno: el.idAluno,
            idUsuario: el.idUsuario,
            nomeCompleto: el.nomeCompleto
          });
        });

        self.carregarTrofeus();
      });
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.carregarDados();
  }
};
</script>
