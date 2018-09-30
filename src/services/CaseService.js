import Http from './Http';

export const listarCases = () => {
  return Http.get('case');
}

export const obterPorId = (id) => {
  return Http.get('/case/' + id);
}

export const manterCase = (caseDeNegocio) => {
  if (caseDeNegocio.id > 0)
    return Http.put('/case/' + caseDeNegocio.id, caseDeNegocio);
  else
    return Http.post('/case', caseDeNegocio);
};

export const listarLicoes = (idCase) => {
  return Http.get('case/' + idCase + '/licao');
}

export const obterLicaoPorId = (idCase, idLicao) => {
  return Http.get('case/' + idCase + '/licao/' + idLicao);
}

export const manterLicao = (licao) => {
  if (licao.id > 0)
    return Http.put('/case/' + licao.idCase + '/licao/' + licao.id, licao);
  else
    return Http.post('/case/' + licao.idCase + '/licao', licao);
}

export const manterTrofeu = (trofeu) => {
  if (trofeu.id > 0)
    return Http.put('/case/' + trofeu.idCase + '/trofeu/' + trofeu.id, trofeu);
  else
    return Http.post('/case/' + trofeu.idCase + '/trofeu', trofeu);
}

export const listarTrofeus = (idCase) => {
  return Http.get('case/' + idCase + '/trofeu');
}

export const obterTrofeuPorId = (idCase, idTrofeu) => {
  return Http.get('case/' + idCase + '/trofeu/' + idTrofeu);
}
