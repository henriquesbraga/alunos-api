import { call, put, all, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import { Alert } from 'react-native';
import * as RootNavigation from '../../../screens/RootNavigation'

/* eslint no-empty-function: ["error", { "allow": ["generatorFunctions"] }] */
/* eslint-env es6 */

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    RootNavigation.navigate('Alunos');
  } catch (err) {
    Alert.alert('Usuário ou senha inválidos!');
    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const { nome, email, password } = payload;
  try {
    // Cadastro
    yield call(axios.post, '/users', {
      email,
      nome,
      password,
    });
    Alert.alert('Conta criada com sucesso!');
    yield put(actions.registerCreatedSuccess({ nome, email, password }));
    RootNavigation.navigate('Login');
    
  } catch (err) {
    const errors = get(err, 'response.data.error', []);
    const status = get(err, 'response.status', 0);

    if (status === 401) {
      Alert.alert('Você precisa fazer login novamente!');
      yield put(actions.loginFailure());
      //navigation to login
    }

    if (errors.length > 0) {
      errors.map((error) => Alert.alert(error));
    } else {
      Alert.alert('Erro Desconhecido');
    }

    yield put(actions.registerFailure());
  }
}

function* updateRegisterRequest({ payload }) {
  const { id, nome, email, password } = payload;
  // Edição
  try {
      yield call(axios.put, '/users', {
        email,
        nome,
        password: password || undefined,
      });
      alert('Dados alterados com sucesso!');
      yield put(actions.registerUpdatedSuccess({ nome, email, password }));
      RootNavigation.navigate('Alunos');
  } catch (err) {
    const errors = get(err, 'response.data.error', []);
    const status = get(err, 'response.status', 0);

    if (status === 401) {
      Alert.alert('Você precisa fazer login novamente!');
      yield put(actions.loginFailure());
      //navigation to login
    }

    if (errors.length > 0) {
      errors.map((error) => Alert.alert(error));
    } else {
      Alert.alert('Erro Desconhecido');
    }

    yield put(actions.registerFailure());
  }
}





export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.UPDATE_REGISTER_REQUEST, updateRegisterRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
