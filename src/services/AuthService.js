import Http from './Http';

export const Autenticar = (email, senha) => {
    return Http.post('/auth/login', {
        Email: email,
        Senha: senha
    })
}
