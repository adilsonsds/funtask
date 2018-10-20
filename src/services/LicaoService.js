import Http from './Http';

export const listar = (idCase) => {
  return Http.get('cases/' + idCase + '/licoes');
}

export const obterPorId = (idCase, idLicao) => {
  return Http.get('cases/' + idCase + '/licoes/' + idLicao);
}

export const salvar = (licao) => {
  if (licao.id > 0)
    return Http.put('cases/' + licao.idCase + '/licoes/' + licao.id, licao);
  else
    return Http.post('cases/' + licao.idCase + '/licoes', licao);
}