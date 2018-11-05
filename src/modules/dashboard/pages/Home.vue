<template>
    <main class="container">
        <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 col-12 mt-3 mb-4">
                <form @submit.prevent="localizarCase" class="input-group mb-3">                    
                    <input v-model="chaveDeBusca" type="text" class="form-control" maxlength="10" required placeholder="Ir para case de negócio..">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="submit" id="ir-para-case" title="Localizar case de negócio">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="d-flex justify-content-between">
                    <h5>Meus Cases de Negócio</h5>
                    <router-link :to="{ name: 'case-novo' }" class="btn btn-primary btn-sm" title="Criar Case de Negócio">
                        <i class="fas fa-plus-circle"></i>
                        Criar um Case de Negócio
                    </router-link>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div v-if="!possuiCaseDeNegocio" class="col-lg-3 col-md-4 col-sm-6 text-center">
                <div class="card mb-3">
                    <picture class="card-img-top pt-2">
                        <i class="fas fa-plus-circle" style="font-size:80px;"></i>
                    </picture>
                    <div class="card-body">
                        <h5 class="card-title">
                            <router-link :to="{ name: 'case-novo' }">
                                Criar um Case de Negócio
                            </router-link>
                        </h5>
                    </div>
                </div>
            </div> 
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
    </main>
</template>
<script>
import { listarCases, localizar } from "@/services/CaseService";
export default {
  data() {
    return {
      chaveDeBusca: "",
      listaDeCasesCriados: []
    };
  },
  computed: {
    possuiCaseDeNegocio() {
      return this.listaDeCasesCriados && this.listaDeCasesCriados.length > 0;
    }
  },
  methods: {
    carregarCases() {
      const self = this;

      listarCases().then(response => {
        self.listaDeCasesCriados = response.data;
      });
    },
    localizarCase() {
      const self = this;

      if (!self.chaveDeBusca) {
        alert("Insira um valor para pesquisar.");
      }

      localizar(self.chaveDeBusca)
        .then(response => {
          self.$router.push({ name: "case", params: { id: response.data } });
        })
        .catch(() => {
          alert(
            "Case de negócio não localizado. Verifique o filtro e tente novamente."
          );
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