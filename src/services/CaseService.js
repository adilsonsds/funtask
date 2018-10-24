import Http from './Http';

export const listarCases = () => {
  return Http.get('cases');
}

export const obterPorId = (id) => {
  return Http.get('cases/' + id);
}

export const manterCase = (caseDeNegocio) => {
  if (caseDeNegocio.id > 0)
    return Http.put('cases/' + caseDeNegocio.id, caseDeNegocio);
  else
    return Http.post('cases', caseDeNegocio);
};

export const inscreverAlunoNoCase = (idCaseDeNegocio) => {
  return Http.post(`cases/${ idCaseDeNegocio }/inscrever`);
}
