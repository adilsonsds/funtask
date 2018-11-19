import Http from './Http';

export const cadastrarUsuario = (nome, sobrenome, email, senha) => {
  return Http.post('usuarios', {
    Nome: nome,
    Sobrenome: sobrenome,
    Email: email,
    Senha: senha
  });
};

export const obter = (idUsuario) => {
  if (idUsuario)
    return Http.get(`usuarios/${idUsuario}`);
  else
    return Http.get('usuarios');
}

export const listarCases = (idUsuario) => {
  if (idUsuario > 0)
    return Http.get(`usuarios/${idUsuario}/cases`);
  else
    return Http.get('usuarios/cases');
}

export const listarGrupos = (idUsuario) => {
  return Http.get(`usuarios/${idUsuario}/grupos`);
}

export const listarTrofeus = (idUsuario) => {
  return Http.get(`usuarios/${idUsuario}/trofeus`);
}
