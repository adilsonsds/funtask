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

export const localizar = (key) => {
  return Http.get(`cases/localizar?key=${key}`);
}

export const inscreverAlunoNoCase = (idCaseDeNegocio) => {
  return Http.post(`cases/${ idCaseDeNegocio }/inscrever`);
}

export const listarAlunos = (idCaseDeNegocio) => {
  return Http.get(`cases/${ idCaseDeNegocio }/alunos`);
}

export const listarGrupos = (idCaseDeNegocio) => {
  return Http.get(`cases/${ idCaseDeNegocio }/grupos`);
}