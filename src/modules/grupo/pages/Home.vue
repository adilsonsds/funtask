<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-4">
                <div class="card text-center">
                    <div class="img-fluid">
                        <i class="fab fa-galactic-senate" style="font-size: 120px;"></i>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">
                            Scorpion
                        </h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <button class="btn btn-success btn-xs">Quero entrar</button>
                            </li>
                            <li class="list-group-item">4 participantes</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-8">
                <div class="card">
                    <div class="card-body">
                        <div class="badges">
                            <div class="badges__item">
                                <i class="fas fa-trophy" style="font-size: 70px;"></i>
                                <span class="text-center">Melhor resposta</span>
                            </div>
                            <div class="badges__item">
                                <i class="fas fa-trophy" style="font-size: 70px;"></i>
                                <span class="text-center">Melhor resposta</span>
                            </div>
                            <div class="badges__item">
                                <i class="fas fa-trophy" style="font-size: 70px;"></i>
                                <span class="text-center">Melhor resposta</span>
                            </div>
                            <div class="badges__item">
                                <i class="fas fa-trophy" style="font-size: 70px;"></i>
                                <span class="text-center">Melhor resposta</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="d-flex justify-content-center mb-2">
                    <button class="btn btn-success" data-toggle="modal" data-target="#convidar-aluno">
                        Convidar alunos
                    </button>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Membros</h5>
                        <div class="users">
                            <div class="users__item">
                                <i class="fas fa-user-circle" style="font-size: 50px;"></i>
                                <span class="text-center"><a href="perfil.html">Letícia de Oliveira</a></span>
                            </div>
                            <div class="users__item">
                                <i class="fas fa-user-circle" style="font-size: 50px;"></i>
                                <span class="text-center"><a href="perfil.html">Renan Dos Santos Fragaio</a></span>
                            </div>
                            <div class="users__item">
                                <i class="fas fa-user-circle" style="font-size: 50px;"></i>
                                <span class="text-center"><a href="perfil.html">Suellen Lima Santos</a></span>
                            </div>
                            <div class="users__item">
                                <i class="fas fa-user-circle" style="font-size: 50px;"></i>
                                <span class="text-center"><a href="perfil.html">Luiz Augusto Monteiro Santiago</a></span>
                            </div>
                            <div class="users__item">
                                <i class="fas fa-user-circle" style="font-size: 50px;"></i>
                                <span class="text-center"><a href="perfil.html">Alexsander De Oliveira Pontes Pires</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="convidar-aluno" tabindex="-1" role="dialog" aria-labelledby="convidar-aluno-title" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="convidar-aluno-title">Convidar alunos</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-12">
                                    <form>
                                        <div class="form-group">
                                            <input type="text" class="form-control" id="convidar-aluno-nome" placeholder="Pesquisar">
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-md-4 col-sm-6 text-center">
                                    <div class="card">
                                        <picture class="card-img-top">
                                            <i class="fas fa-user-circle" style="font-size:60px;"></i>
                                        </picture>
                                        <div class="card-body">
                                            <h5 class="card-title">Letícia de Oliveira</h5>
                                            <button class="btn btn-primary">
                                                Convidar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-4 col-sm-6 text-center">
                                    <div class="card">
                                        <picture class="card-img-top">
                                            <i class="fas fa-user-circle" style="font-size:60px;"></i>
                                        </picture>
                                        <div class="card-body">
                                            <h5 class="card-title">Letícia de Oliveira</h5>
                                            <button class="btn btn-primary">
                                                Convidar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-4 col-sm-6 text-center">
                                    <div class="card">
                                        <picture class="card-img-top">
                                            <i class="fas fa-user-circle" style="font-size:60px;"></i>
                                        </picture>
                                        <div class="card-body">
                                            <h5 class="card-title">Letícia de Oliveira</h5>
                                            <button class="btn btn-primary">
                                                Convidar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
