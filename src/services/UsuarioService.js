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
