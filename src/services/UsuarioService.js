import Http from './Http';

export const cadastrarUsuario = (nome, sobrenome, email, senha) => {
  return Http.post('/usuario', {
    Nome: nome,
    Sobrenome: sobrenome,
    Email: email,
    Senha: senha
  });
};
