<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h3 v-if="estaEditandoGrupo">Editar Grupo</h3>
                <h3 v-else>Novo Grupo</h3>
            </div>
        </div>
        <template v-if="concluiuPrimeiraEtapa" >
            <form @submit.prevent="salvar">
                <div class="row">
                    <div class="col">
                        <div class="form-group mt-4">
                            <label for="grupo-nome">Nome do grupo:</label>
                            <input id="grupo-nome" type="text" class="form-control" v-model="nomeGrupo" minlength="3" maxlength="100" required>
                        </div>
                        <div class="form-group mt-4">
                            <label for="grupo-descricao">Grito de guerra (Opcional):</label>
                            <textarea id="grupo-descricao" class="form-control" rows="2" v-model="gritoDeGuerra" maxlength="1000"></textarea>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button @click="voltarParaPrimeiraEtapa" type="button" class="btn btn-secondary">
                            Voltar
                        </button>
                    </div>
                    <div class="col text-right">
                        <button type="submit" class="btn btn-primary">Salvar</button>
                    </div>
                </div>
            </form>
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
                        <button class="btn btn-danger btn-sm mr-2 mb-2" v-for="membro in membrosAdicionados" :key="membro.idUsuario" @click="removerMembro(membro)" title="Remover">
                            {{ membro.nomeCompleto }} <i class="fas fa-minus-circle"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <h4>Resultado da Pesquisa</h4>
                    <table v-if="pesquisaDeMembros.length > 0" class="table table-borderless table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                <th class="col-md-6"></th>
                                <th class="col-md-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="membro in pesquisaDeMembros" :key="membro.idUsuario">
                                <td>
                                    <i class="fas fa-user-circle" style="font-size: 20px;"></i>
                                </td>
                                <td>{{ membro.nomeCompleto }}</td>
                                <td>
                                    <button @click="adicionarMembro(membro)" :disabled="!podeAdicionarMembros" class="btn btn-success btn-sm" title="Adicionar">
                                        <i class="fas fa-plus-circle"></i>
                                    </button>                                
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <h6 v-else>Nenhum aluno encontrado</h6>
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
import {
  manterGrupo,
  pesquisarNovosMembros,
  prepararMontagens
} from "@/services/GruposService";
export default {
  data() {
    return {
      idCase: 0,
      idGrupo: 0,
      nomeGrupo: "",
      gritoDeGuerra: "",
      textoPesquisa: "",
      minimoPermitidoDeAlunos: 1,
      maximoPermitidoDeAlunos: 1,
      permiteAlterarMembros: false,
      concluiuPrimeiraEtapa: false,
      membrosAdicionados: [],
      pesquisaDeMembros: []
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
      return (
        this.permiteAlterarMembros &&
        this.maximoPermitidoDeAlunos > this.totalMembrosAdicionados
      );
    },
    quantidadeDeAlunoEstaValida() {
      return (
        this.totalMembrosAdicionados >= this.minimoPermitidoDeAlunos &&
        this.totalMembrosAdicionados <= this.maximoPermitidoDeAlunos
      );
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
      if (this.quantidadeDeAlunoEstaValida) this.concluiuPrimeiraEtapa = true;
      else
        alert(
          `A quantidade de alunos deve estar entre ${
            this.minimoPermitidoDeAlunos
          } e ${this.maximoPermitidoDeAlunos}.`
        );
    },
    voltarParaPrimeiraEtapa() {
      this.concluiuPrimeiraEtapa = false;
    },
    pesquisarMembros() {
      const self = this;

      pesquisarNovosMembros(self.idCase, self.textoPesquisa)
        .then(response => {
          self.pesquisaDeMembro = [];
          response.data.forEach(m => {
            let membroJaAdicionado = self.membrosAdicionados.find(
              x => x.idUsuario == m.idUsuario
            );
            if (!membroJaAdicionado) self.pesquisaDeMembros.push(m);
          });
        })
        .catch(() => {
          alert("Nenhum registro encontrado.");
        });
    },
    salvar() {
      const self = this;
      let params = {
        IdGrupo: self.idGrupo,
        IdCase: self.idCase,
        Nome: self.nomeGrupo,
        GritoDeGuerra: self.gritoDeGuerra,
        IdsAlunosMembros: []
      };

      self.membrosAdicionados.forEach(m => {
        params.IdsAlunosMembros.push(m.idAluno);
      });

      manterGrupo(params)
        .then(response => {
          let idGrupo = self.idGrupo || response.data;
          self.$router.push({
            name: "grupo",
            params: { id: idGrupo }
          });
        })
        .catch(error => {
          alert("Não foi possível salvar as alterações.");
        });
    },
    carregarDados() {
      const self = this;

      prepararMontagens(self.idCase, self.idGrupo)
        .then(response => {
          self.idCase = response.data.idCase;
          self.idGrupo = response.data.idGrupo;
          self.nomeGrupo = response.data.nomeGrupo;
          self.gritoDeGuerra = response.data.gritoDeGuerra;
          self.minimoPermitidoDeAlunos = response.data.minimoPermitidoDeAlunos;
          self.maximoPermitidoDeAlunos = response.data.maximoPermitidoDeAlunos;
          self.permiteAlterarMembros = response.data.permiteAlterarMembros;

          response.data.membros.forEach(m => {
            self.membrosAdicionados.push(m);
          });

          if (self.podeAdicionarMembros) self.pesquisarMembros();
        })
        .catch(error => {
          alert(error);
        });
    }
  },
  created() {
    this.idGrupo = this.$route.params.id;
    this.idCase = this.$route.params.idCase;
    this.carregarDados();
  }
};
</script>
