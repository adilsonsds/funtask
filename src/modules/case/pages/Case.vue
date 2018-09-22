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
                        Jogo Engenharia de Software
                    </h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <i class="fas fa-star" style="font-size: 15px;"></i>
                            <i class="fas fa-star" style="font-size: 15px;"></i>
                            <i class="fas fa-star" style="font-size: 15px;"></i>
                            <i class="fas fa-star" style="font-size: 15px;"></i>
                            <i class="fas fa-star-half-alt" style="font-size: 15px;"></i>
                        </li>
                        <li class="list-group-item">id: {{ $route.params.id }}</li>
                        <li class="list-group-item">
                            <button class="btn btn-success btn-xs">Inscreve-se</button>
                        </li>
                        <li class="list-group-item">Por
                            <router-link to="/user">Rafael Targino</router-link>
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
                <li class="nav-item">
                    <router-link :to="{ name: 'case-grupos' }" class="nav-link">Grupos</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'case-criterios' }" class="nav-link">Critérios</router-link>
                </li>
            </ul>
            <router-view></router-view>
        </div>
    </div>
</div>
</template>
<script>
export default {
  props: {
    id: {
      type: Number
    }
  }
};
</script>
