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

export const gerarEntrega = (idCase, idLicao) => {
  return Http.post(`cases/${idCase}/licoes/${idLicao}/entregas`);
}

export const obterEntrega = (idEntrega) => {
  return Http.get(`entregas/${ idEntrega }`);
}

export const salvarEntrega = (licao) => {
  return Http.put(`entregas/${ licao.idEntregaDeLicao }`, licao);
}
