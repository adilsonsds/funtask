<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h3 v-if="estaEditandoGrupo">Editar Grupo</h3>
                <h3 v-else>Novo Grupo</h3>
            </div>
        </div>
        <template v-if="concluiuPrimeiraEtapa" >
            <div class="row">
                <div class="col">
                    <div class="form-group mt-4">
                        <label for="grupo-nome">Nome do grupo:</label>
                        <input id="grupo-nome" type="text" class="form-control" v-model="nome" minlength="3" maxlength="100" required>
                    </div>
                    <div class="form-group mt-4">
                        <label for="grupo-descricao">Grito de guerra:</label>
                        <textarea id="grupo-descricao" class="form-control" rows="2" v-model="gritoDeGuerra" maxlength="1000"></textarea>
                    </div>
                </div>
            </div>
            <div class="row">            
                <div class="col">
                    <button @click="voltarParaPrimeiraEtapa" class="btn btn-secondary">
                        Voltar
                    </button>
                </div>
                <div class="col text-right">
                    <button @click="salvar" class="btn btn-primary">Salvar</button>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="row">
                <div class="col">
                    <form @submit.prevent="pesquisarMembros" class="input-group mb-3">                    
                        <input v-model="textoPesquisa" type="text" class="form-control" placeholder="Pesquisar membros pelo nome">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="submit" id="pesquisar-membros" title="Pesquisar">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col">
                    <h6>{{ textoQtdDeMembrosAdicionados }}</h6>
                    <div class="d-block">
                        <button class="btn btn-danger btn-sm mr-2 mb-2" v-for="membro in membrosAdicionados" :key="membro.id" @click="removerMembro(membro)" title="Remover">
                            {{ membro.nome }} <i class="fas fa-minus-circle"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <h4>Resultado da Pesquisa</h4>
                    <table class="table table-borderless table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                <th class="col-md-6"></th>
                                <th class="col-md-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="membro in pesquisaDeMembros" :key="membro.id">
                                <td>
                                    <i class="fas fa-user-circle" style="font-size: 20px;"></i>
                                </td>
                                <td>{{ membro.nome }}</td>
                                <td>
                                    <button @click="adicionarMembro(membro)" :disabled="!podeAdicionarMembros" class="btn btn-success btn-sm" title="Adicionar">
                                        <i class="fas fa-plus-circle"></i>
                                    </button>                                
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="row">
                <div class="col text-right">
                    <button @click="concluirPrimeiraEtapa" class="btn btn-primary">Continuar</button>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import { obterPorId } from "@/services/GruposService";
export default {
  data() {
    return {
      idCase: 3,
      nomeCase: "Meu case de teste",
      nome: "",
      gritoDeGuerra: "",
      textoPesquisa: "",
      limiteMembrosPorGrupo: 3,
      concluiuPrimeiraEtapa: false,
      membrosAdicionados: [],
      pesquisaDeMembros: [
        { id: 16, nome: "Adilson" },
        { id: 15, nome: "Ana" },
        { id: 14, nome: "Bia" },
        { id: 11, nome: "Juvenal" },
        { id: 12, nome: "Chaves" }
      ]
    };
  },
  computed: {
    estaEditandoGrupo() {
      return this.id > 0;
    },
    totalMembrosAdicionados() {
      return this.membrosAdicionados.length;
    },
    textoQtdDeMembrosAdicionados() {
      return this.totalMembrosAdicionados > 1
        ? this.totalMembrosAdicionados + " membros adicionados"
        : this.totalMembrosAdicionados == 1
          ? "1 membro adicionado"
          : "Nenhum membro adicionado";
    },
    podeAdicionarMembros() {
      return this.limiteMembrosPorGrupo > this.totalMembrosAdicionados;
    }
  },
  methods: {
    adicionarMembro(membro) {
      let index = this.pesquisaDeMembros.indexOf(membro);
      if (index > -1) {
        this.pesquisaDeMembros.splice(index, 1);
      }

      this.membrosAdicionados.push(membro);
    },
    removerMembro(membro) {
      let index = this.membrosAdicionados.indexOf(membro);
      if (index > -1) {
        this.membrosAdicionados.splice(index, 1);
      }

      this.pesquisaDeMembros.push(membro);
    },
    concluirPrimeiraEtapa() {
      this.concluiuPrimeiraEtapa = true;
    },
    voltarParaPrimeiraEtapa() {
      this.concluiuPrimeiraEtapa = false;
    },
    pesquisarMembros() {},
    salvar() {},
    carregarDados() {
      const self = this;

      obterPorId(this.id)
        .then(response => {
          self.nome = response.data.nome;
          response.data.membros.forEach(el => {
            self.membrosAdicionados.push({
              idAluno: el.idAluno,
              nome: el.nomeCompleto
            });
          });
        })
        .catch(error => {
          alert(error);
        });
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.carregarDados();
  }
};
</script>
