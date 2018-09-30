<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-4">
                <div class="card text-center mb-3 border-0">
                    <div class="img-fluid">
                        <i class="fab fa-fort-awesome-alt" style="font-size: 120px;"></i>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">
                            {{ nome }}
                        </h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <i class="fas fa-star" style="font-size: 15px;"></i>
                                <i class="fas fa-star" style="font-size: 15px;"></i>
                                <i class="fas fa-star" style="font-size: 15px;"></i>
                                <i class="fas fa-star" style="font-size: 15px;"></i>
                                <i class="fas fa-star-half-alt" style="font-size: 15px;"></i>
                            </li>
                            <li v-if="permiteInscricao" class="list-group-item">
                                <button class="btn btn-success btn-xs">Inscreve-se</button>
                            </li>
                            <li class="list-group-item">
                                <button @click.prevent="abrirModalManterCase()" type="button" class="btn btn-primary btn-xs">Editar</button>
                            </li>
                            <li class="list-group-item">Por
                                <router-link :to="{ name: 'user', params: { id: idProfessor } }">{{ nomeProfessor }}</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-lg-9 col-md-8">
                <ul class="nav mb-4" id="list-tab" role="tablist">
                    <li class="nav-item">
                        <router-link :to="{ name: 'case-home' }" class="nav-link">Início</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'case-licoes' }" class="nav-link">Lições</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'case-alunos' }" class="nav-link">Alunos</router-link>
                    </li>
                    <li class="nav-item" v-if="permiteMontarGrupos">
                        <router-link :to="{ name: 'case-grupos' }" class="nav-link">Grupos</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'case-criterios' }" class="nav-link">Critérios</router-link>
                    </li>
                </ul>
                <router-view :texto="textoDeApresentacao"></router-view>
            </div>
        </div>
        <modal-manter-case idModal="manter-case"></modal-manter-case>
    </div>
</template>
<script>
import { obterPorId } from "@/services/CaseService";
export default {
  data() {
    return {
      id: "",
      nome: "",
      permiteInscricao: false,
      permiteMontarGrupos: false,
      textoDeApresentacao: "",
      idProfessor: 0,
      nomeProfessor: ""
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
        idModal: "manter-case",
        idCase: self.id
      });
    },
    carregarDados() {
      const self = this;
      obterPorId(self.id).then(response => {
        self.nome = response.data.nome;
        self.textoDeApresentacao = response.data.textoDeApresentacao;
        self.permiteMontarGrupos = response.data.permiteMontarGrupos;
        self.idProfessor = response.data.idProfessor;
        self.nomeProfessor = response.data.nomeProfessor;
      });
    }
  },
  created() {
    const self = this;
    self.id = self.$route.params.id;
    self.carregarDados();

    self.$root.$on("case-salvo", () => {
      self.carregarDados();
    });
  }
};
</script>
