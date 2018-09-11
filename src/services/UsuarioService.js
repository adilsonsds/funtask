import api from './Api';

export default class UsuarioService {

  create = (dados) => {
    return api.post('/usuario', dados);
  }

  get = (filtro) => {
    return api.get('/usuario', filtro);
  }
}
