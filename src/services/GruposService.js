import Http from './Http';

export const obterPorId = (idGrupo) => {
  return Http.get('grupos/' + idGrupo);
}

export const pesquisarNovosMembros = (idCaseDeNegocio, nomeAluno) => {
  return Http.get(`grupos/novosmembros?idcase=${idCaseDeNegocio}&aluno=${nomeAluno}`);
}

export const prepararMontagens = (idCaseDeNegocio, idGrupo) => {
  if (idGrupo)
    return Http.get(`grupos/preparar?grupo=${idGrupo}`);
  else
    return Http.get(`grupos/preparar?idcase=${idCaseDeNegocio}`);
}

export const manterGrupo = (grupo) => {
  if (grupo.IdGrupo > 0)
    return Http.put(`grupos/${grupo.IdGrupo}`, grupo);
  else
    return Http.post('grupos', grupo);
}

export const listarTrofeus = (idGrupo) => {
  return Http.get(`grupos/${idGrupo}/trofeus`);
}
