<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-4">
                <div class="card text-center">
                    <div class="img-fluid">
                        <i class="fab fa-galactic-senate" style="font-size: 120px;"></i>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">
                            {{ nome }}
                        </h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <router-link :to="{ name: 'grupo-editar', params: { id: id }}" class="btn btn-primary">Editar</router-link>
                            </li>
                            <li class="list-group-item">{{ totalDeMembros }} membros</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-lg-9 col-md-8">
                <div class="row">
                    <div class="col-lg-4 col-md-6 text-center" v-for="membro in membros" :key="membro.idUsuario">
                        <div class="card mb-3">
                            <picture class="card-img-top pt-2">
                                <i class="fas fa-user-circle" style="font-size:60px;"></i>
                            </picture>
                            <div class="card-body">
                                <h5 class="card-title">
                                    <router-link :to="{ name: 'user', params: { id: membro.idUsuario }}">{{ membro.nomeCompleto }}</router-link>
                                </h5>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { obterPorId } from "@/services/GruposService";
export default {
  data() {
    return {
      id: "",
      nome: "",
      membros: []
    };
  },
  computed: {
    totalDeMembros() {
      return this.membros.length;
    }
  },
  methods: {
    carregarDados() {
      const self = this;
      obterPorId(self.id).then(response => {
        self.id = response.data.id;
        self.nome = response.data.nome;
        response.data.membros.forEach(el => {
          self.membros.push({
            idAluno: el.idAluno,
            idUsuario: el.idUsuario,
            nomeCompleto: el.nomeCompleto
          });
        });
      });
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.carregarDados();
  }
};
</script>
