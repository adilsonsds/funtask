<template>
    <div class="tab-pane fade show active" id="criterios" role="tabpanel">
        <div class="row mb-4">
            <div class="col-lg-8 col-md-6">
                <h3>{{ tituloTela }}</h3>
            </div>
            <div class="col-lg-4 col-md-6 text-right">
                <button @click.prevent="abrirModalManterTrofeu" class="btn btn-primary">Novo troféu</button>
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
                        <h6 class="card-subtitle mb-2 text-muted"> Pontos: {{ trofeu.pontos }} </h6>
                        <p class="card-text">
                            {{ trofeu.descricao }}
                        </p>
                        <button class="btn btn-primary btn-sm" @click="abrirModalManterTrofeu(trofeu.id)">Editar</button>
                    </div>
                </div>
            </div>
        </div>
        <modal-manter-trofeu idModal="manter-trofeu"></modal-manter-trofeu>
    </div>
</template>
<script>
import { listarTrofeus } from "@/services/CaseService";
export default {
  data() {
    return {
      idCase: 0,
      listaDeTrofeus: []
    };
  },
  components: {
    "modal-manter-trofeu": () =>
      import("@/modules/case/components/ModalManterTrofeu")
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
    abrirModalManterTrofeu(idTrofeu) {
      const self = this;
      self.$root.$emit("abrir-modal", {
        idModal: "manter-trofeu",
        idCase: self.idCase,
        idTrofeu: idTrofeu
      });
    },
    carregarTrofeus() {
      const self = this;
      listarTrofeus(self.idCase).then(response => {
        self.listaDeTrofeus = response.data;
      });
    }
  },
  created() {
    const self = this;
    self.idCase = self.$route.params.id;
    self.carregarTrofeus();

    self.$root.$on("trofeu-alterado", () => {
      self.carregarTrofeus();
    });
  }
};
</script>
