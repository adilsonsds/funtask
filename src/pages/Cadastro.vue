<template>
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-lg-6 col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Cadastrar-se</h4>
                        <form>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-sm-6 col-12">
                                        <label for="nome">Nome</label>
                                        <input id="nome" type="text" class="form-control">
                                    </div>
                                    <div class="col-sm-6 col-12">
                                        <label for="sobrenome">Sobrenome</label>
                                        <input id="sobrenome" type="text" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email">E-mail</label>
                                <input id="email" type="email" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="senha">Senha</label>
                                <input id="senha" type="password" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="confirme-senha">Confirme a senha</label>
                                <input id="confirme-senha" type="password" class="form-control">
                            </div>
                            <div class="form-group">
                                <!-- <button type="submit" class="btn btn-primary btn-block">Cadastrar</button> -->
                                <a href="dashboard.html" class="btn btn-primary btn-block">Cadastrar</a>
                            </div>
                            <div class="text-center">
                                Já possui uma conta?
                                <a href="login.html">Entrar</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
