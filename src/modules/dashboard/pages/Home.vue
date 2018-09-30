<template>
    <main class="container">
        <div class="row">
            <div class="col-12">
                <div class="d-flex justify-content-between">
                    <h5>Meus Cases de Negócio</h5>
                    <button class="btn btn-primary btn-sm" @click.prevent="abrirModalManterCase">
                        Criar um Case de Negócio
                    </button>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-lg-3 col-md-4 col-sm-6 text-center" v-for="item in listaDeCasesCriados" :key="item.id">
                <div class="card mb-3">
                    <picture class="card-img-top pt-2">
                        <i class="fab fa-fort-awesome-alt" style="font-size:80px;"></i>
                    </picture>
                    <div class="card-body">
                        <h5 class="card-title">
                            <router-link :to="{ name: 'case', params: { id: item.id }}">{{ item.nome }}</router-link>
                        </h5>
                    </div>
                </div>
            </div>  
        </div>

        <modal-manter-case idModal="manter-case"></modal-manter-case>
    </main>
</template>
<script>
import { listarCases } from "@/services/CaseService";
export default {
  data() {
    return {
      listaDeCasesCriados: []
    };
  },
  components: {
    "modal-manter-case": () =>
      import("@/modules/case/components/ModalManterCase")
  },
  methods: {
    abrirModalManterCase() {
      const self = this;
      self.$root.$emit("abrir-modal", {
        idModal: "manter-case"
      });
    },
    carregarCases() {
      const self = this;

      listarCases().then(response => {
        self.listaDeCasesCriados = response.data;
      });
    }
  },
  created() {
    const self = this;
    self.carregarCases();

    self.$root.$on("case-salvo", idCase => {
      self.$router.push({ name: "case", params: { id: idCase } });
    });
  }
};
</script>
