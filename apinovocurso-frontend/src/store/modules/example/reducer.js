import * as types from '../types';

const initialState = {
  botaoClicado: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'BOTAO_CLICADO_SUCCESS': {
      console.log('Sucesso');
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;
      return newState;
    }

    case 'BOTAO_CLICADO_FAILURE': {
      console.log('Deu ruim');
      return state;
    }

    case 'BOTAO_CLICADO_REQUEST': {
      console.log('Estou fazendo a requisição');
      return state;
    }
    default: {
      return state;
    }
  }
} // retorna state
