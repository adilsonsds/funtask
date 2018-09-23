<template>
    <main class="container">
        <div class="row">
            <div class="col-12">
                <div class="d-flex justify-content-between">
                    <h5>Meus Cases de Negócio</h5>
                    <button class="btn btn-primary btn-sm" @click="$root.$emit('abrir-modal', 'manter-case')">
                        Criar um Case de Negócio
                    </button>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-lg-3 col-md-4 col-sm-6 text-center" v-for="item in lista" :key="item.id">
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

        <modal-manter-case id="manter-case"></modal-manter-case>
    </main>
</template>
<script>
export default {
  data() {
    return {
      lista: [
        { id: 1, nome: "Teste 1" },
        { id: 2, nome: "Teste 3" },
        { id: 3, nome: "Teste 3" },
        { id: 4, nome: "Teste 4" },
        { id: 5, nome: "Teste 5" },
        { id: 6, nome: "Teste 2" },
        { id: 7, nome: "Teste 2" }
      ]
    };
  },
  components: {
    'modal-manter-case': () => import("@/modules/case/components/ModalManterCase")
  },
  methods: {}
};
</script>
