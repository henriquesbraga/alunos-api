import React, {useState} from 'react';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';
import { LoginHeader,  Main} from './styles';
import {LoginLabels} from '../../globalStyles'
import { Container } from './styles'

import InputText from '../../components/InputText';
import Button from '../../components/Button';

function Signup() {
  const dispatch = useDispatch();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function handleSubmit() {
    
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      alert('Nome deve ter entre 3 e 255 caracteres!');
    }

    if (!isEmail(email)) {
      formErrors = true;
      alert('Emails Inválido!');
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      alert('Senha Inválida!');
    }

    if (formErrors) return;
    dispatch(actions.registerRequest({ nome, email, password }));
  }

  return (
    <Container >
      <Main>
        <LoginHeader>Crie sua conta</LoginHeader>
        <LoginLabels>Nome:</LoginLabels>
        <InputText placeholder="Seu Nome" onChangeText={(e) => setNome(e)}/>
        <LoginLabels>Email:</LoginLabels>
        <InputText placeholder="Seu Email" onChangeText={(e) => setEmail(e)} autoCapitalize="none" />
        <LoginLabels>Senha:</LoginLabels>
        <InputText placeholder="Sua Senha" onChangeText={(e) => setPassword(e)}/>
        <Button title="Criar minha conta" customClick={handleSubmit}/>
      </Main>
    </Container>
  );
}

export default Signup;
