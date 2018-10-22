import Http from './Http';

export const Autenticar = (email, senha) => {
  return new Promise((res, rej) => {
    Http.post('auth/login', {
        Email: email,
        Senha: senha
      })
      .then(response => {
        res(response.data);
      })
      .catch(err => {
        rej('Email e/ou senha inválidos.');
      });
  })
}

export const ObterUsuario = () => {
  const userStr = localStorage.getItem('user');

  if (!userStr)
    return null;

  return JSON.parse(userStr);
}
