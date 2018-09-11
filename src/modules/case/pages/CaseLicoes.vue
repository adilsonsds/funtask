<template>
    <div class="tab-pane fade show active" id="licoes" role="tabpanel">
        <div class="card mb-4">
            <div class="card-body">
                <h5 class="card-title">
                    1. Levantando requisitos
                </h5>
                <p class="card-text">Pereira está realizando o levantamento de requisitos. Ajude-o a
                    compreender o problema.
                </p>
                <h6>Parabéns! Você entregou sua lição dentro do prazo.</h6>
                <router-link :to="{ name: 'case-licao' }" class="btn btn-success">Ver minha lição</router-link>
            </div>
        </div>
        <div class="card mb-4">
            <div class="card-body">
                <h5 class="card-title">2. Analisando os requisitos</h5>
                <p class="card-text">Agora que temos os requisitos levantados, vamos fazer uma análise
                    antes da implementação. Que tal ajudar o Pereira nesta etapa?
                </p>
                <h6>Cuide para que sua lição seja entregue dentro do prazo.</h6>
                <router-link :to="{ name: 'case-licao' }" class="btn btn-primary">Realizar lição</router-link>
            </div>
        </div>
        <div class="card mb-4">
            <div class="card-body">
                <h5 class="card-title">3. Implementando os requisitos</h5>
                <p class="card-text">Monte uma equipe e ajude o Pereira com o desenvolvimento para que
                    não haja imprevistos.
                </p>
                <h6>Parece que essa lição exijará bastante mão-de-obra.<br> Monte seu grupo para que
                    tudo seja entregue dentro do prazo.</h6>
                <a class="btn btn-warning" data-toggle="modal" data-target="#criar-grupo">Criar um grupo</a>
                <router-link :to="{ name: 'case-grupos' }" class="btn btn-secondary">Ver grupos existentes</router-link>
            </div>
        </div>
        <div class="card mb-4">
            <div class="card-body">
                <h5 class="card-title">4. Homologando os requisitos</h5>
                <p class="card-text">Monte uma equipe e ajude o Pereira com a fase de homologação para
                    que o produto não seja entregue com bugs.
                </p>
                <h6>Ops! Você perdeu o prazo de entrega desta lição.<br>Corra, você ainda pode entregá-la.</h6>
                <router-link :to="{ name: 'case-licao' }" class="btn btn-success">Ver minha lição</router-link>
            </div>
        </div>
        <div class="card mb-4">
            <div class="card-body">
                <h5 class="card-title">5. Implantação</h5>
                <p class="card-text">Agora que tudo foi devido construido conforme o cliente pediu vamos
                    disponizar a entrega para que ele possa começar a utiliza-la.
                </p>
                <h6>Sua lição será liberada em breve.</h6>
            </div>
        </div>
    </div>
</template>
