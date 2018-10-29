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
                <p v-if="licao.entregue" class="card-text">
                  {{ licao.dataHoraEntrega }}
                </p>
                <p v-if="!!licao.dataLiberacao" class="card-text">
                  Inicia em {{ licao.dataLiberacao }}
                </p>
                <p v-if="!!licao.dataEncerramento" class="car-text">
                  Termina em {{ licao.dataEncerramento }}
                </p>
                <router-link v-if="licao.permiteEditar" :to="{ name: 'case-licao', params: { idCase: idCase, idLicao: licao.id }}" class="btn btn-primary">Editar</router-link>
                <router-link v-else-if="licao.ehProfessor" :to="{ name: 'case-licao', params: { idCase: idCase, idLicao: licao.id }}" class="btn btn-primary">Visualizar</router-link>

                <router-link v-if="licao.permiteAvaliar" :to="{ name: 'case-licao', params: { idCase: idCase, idLicao: licao.id }}" class="btn btn-secondary">Avaliar respostas</router-link>

                <router-link v-if="licao.permiteRealizar && !!licao.idEntregaDeLicao" :to="{ name: 'case-entrega', params: { idCase: idCase, idEntregaDeLicao: licao.idEntregaDeLicao }}" class="btn btn-primary">Realizar</router-link>
                <button v-else-if="licao.permiteRealizar" @click="gerarEntregaDaLicao(licao.id)" class="btn btn-primary">Realizar</button>
                
                <router-link v-if="licao.entregue" :to="{ name: 'case-entrega', params: { idCase: idCase, idEntregaDeLicao: licao.idEntregaDeLicao }}" class="btn btn-secondary">Visualizar</router-link>
            </div>
        </div>
    </div>
</template>
<script>
import { listar, gerarEntrega } from "@/services/LicaoService";
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
    gerarEntregaDaLicao(idLicao) {
      const self = this;

      gerarEntrega(self.idCase, idLicao)
        .then(idEntregaDeLicao => {
          self.$router.push({
            name: "case-entrega",
            params: { idEntregaDeLicao: idEntregaDeLicao }
          });
        })
        .catch(error => {
          alert(error);
        });
    },
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
