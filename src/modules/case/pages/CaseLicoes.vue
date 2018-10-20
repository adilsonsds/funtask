<template>
    <div class="tab-pane fade show active" id="licoes" role="tabpanel">
        <div class="row mb-4">
            <div class="col-lg-8 col-md-6">
                <h3>{{ tituloTela }}</h3>
            </div>
            <div class="col-lg-4 col-md-6 text-right">
                <router-link :to="{ name: 'case-licao', params: { idCase: idCase } }" class="btn btn-primary">Nova lição</router-link>
            </div>
        </div>
        <div class="card mb-4" v-for="(licao, index) in licoes" :key="licao.id">
            <div class="card-body">
                <h5 class="card-title">{{ index+1 }}. {{ licao.titulo }}</h5>
                <p class="card-text">
                    {{ licao.descricao }}
                </p>
                <router-link class="btn btn-warning" :to="{ name: 'case-licao', params: { idCase: idCase, idLicao: licao.id }}">Editar</router-link>
                <a class="btn btn-primary" href="avaliar-respostas.html">Avaliar respostas</a>
            </div>
        </div>
    </div>
</template>
<script>
import { listar } from "@/services/LicaoService";
export default {
  data() {
    return {
      idCase: 0,
      licoes: []
    };
  },
  computed: {
    totalDeLicoes() {
      return this.licoes.length;
    },
    tituloTela() {
      return this.totalDeLicoes > 1
        ? this.totalDeLicoes + " Lições"
        : this.totalDeLicoes == 1
          ? "1 Lição"
          : "Nenhuma lição criada";
    }
  },
  methods: {
    carregarDados() {
      const self = this;
      listar(self.idCase).then(response => {
        self.licoes = response.data;
      });
    }
  },
  created() {
    this.idCase = this.$route.params.id;
    this.carregarDados();
  }
};
</script>
