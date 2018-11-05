<template>
    <div class="tab-pane fade show active" id="criterios" role="tabpanel">
        <div class="row mb-4">
            <div class="col-lg-8 col-md-6">
                <h3>{{ tituloTela }}</h3>
            </div>
            <div class="col-lg-4 col-md-6 text-right">
                <router-link class="btn btn-primary" :to="{ name: 'trofeu-novo', params: { idCase: idCase } }">
                  Novo troféu
                </router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-4 col-md-6 mb-4" v-for="trofeu in listaDeTrofeus" :key="trofeu.id">
                <div class="card">
                    <picture class="card-img-top text-center p-2">
                        <i class="fas fa-trophy" style="font-size:80px;"></i>
                    </picture>
                    <div class="card-body">
                        <h5 class="card-title">{{ trofeu.nome }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Pontos: {{ trofeu.pontos }} </h6>
                        <p class="card-text">
                            {{ trofeu.descricao }}
                        </p>
                        <router-link class="btn btn-primary btn-sm" :to="{ name: 'trofeu-editar', params: { idCase: idCase, id: trofeu.id }}">
                          Editar
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { listar } from "@/services/TrofeuService";
export default {
  data() {
    return {
      idCase: 0,
      listaDeTrofeus: []
    };
  },
  computed: {
    totalDeTrofeus() {
      return this.listaDeTrofeus.length;
    },
    tituloTela() {
      return this.totalDeTrofeus > 1
        ? this.totalDeTrofeus + " Troféus"
        : this.totalDeTrofeus == 1
          ? "1 Troféu"
          : "Nenhum troféu criado";
    }
  },
  methods: {
    carregarTrofeus() {
      const self = this;
      listar(self.idCase).then(response => {
        self.listaDeTrofeus = response.data;
      });
    }
  },
  created() {
    this.idCase = this.$route.params.id;
    this.carregarTrofeus();
  }
};
</script>
