import Http from './Http';

export const obterPorId = (idGrupo) => {
  return Http.get('grupos/' + idGrupo);
}
