import React, {useEffect, useState} from 'react';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';
import { LoginHeader,  Main} from './styles';
import {LoginLabels} from '../../globalStyles'
import {Container} from './styles'

import InputText from '../../components/InputText';
import Button from '../../components/Button';

function EditarLogin() {
  const dispatch = useDispatch();
  const nomeStored = useSelector((state) => state.auth.user.nome);
  const emailStored = useSelector((state) => state.auth.user.email);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setNome(nomeStored);
    setEmail(emailStored);
  }, []);




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
    dispatch(actions.updateRegisterRequest({ nome, email, password }));
  }




  return (
    <Container >
      <Main>
        <LoginHeader>Editar conta</LoginHeader>
        <LoginLabels>Nome:</LoginLabels>
        <InputText value={nome} placeholder="Seu Nome" onChangeText={(e) => setNome(e)}/>
        <LoginLabels>Email:</LoginLabels>
        <InputText value={email} placeholder="Seu Email" onChangeText={(e) => setEmail(e)} autoCapitalize="none" />
        <LoginLabels>Senha:</LoginLabels>
        <InputText value={password} placeholder="Sua Senha" onChangeText={(e) => setPassword(e)}/>
        <Button title="Salvar" customClick={handleSubmit}/>
      </Main>
    </Container>
  );
}

export default EditarLogin;
