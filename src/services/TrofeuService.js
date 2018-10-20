import Http from './Http';

export const listar = (idCase) => {
  return Http.get('cases/' + idCase + '/questoes');
}

export const obterPorId = (idCase, idquestao) => {
  return Http.get('cases/' + idCase + '/questoes/' + idquestao);
}

export const salvar = (questao) => {
  if (questao.id > 0)
    return Http.put('cases/' + questao.idCase + '/questoes/' + questao.id, questao);
  else
    return Http.post('cases/' + questao.idCase + '/questoes', questao);
}
