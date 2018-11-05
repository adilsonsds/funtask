import Http from './Http';

export const listar = (idCase) => {
  return Http.get('cases/' + idCase + '/trofeus');
}

export const obterPorId = (idCase, idTrofeu) => {
  return Http.get('cases/' + idCase + '/trofeus/' + idTrofeu);
}

export const salvar = (trofeu) => {
  if (trofeu.id > 0)
    return Http.put('cases/' + trofeu.idCase + '/trofeus/' + trofeu.id, trofeu);
  else
    return Http.post('cases/' + trofeu.idCase + '/trofeus', trofeu);
}
