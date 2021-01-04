import React, {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Container, LoginFooter, LoginHeader, LoginLabels, Main} from './styles';
import {TouchableOpacity} from 'react-native'
import { isEmail } from 'validator';
import * as actions from '../../store/modules/auth/actions';
import InputText from '../../components/InputText';
import Button from '../../components/Button';

const Login = ({navigation}) => {
  
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((state) => state.auth.user);

  //Checa se existe usuário logado
  useEffect(() => {
    if(user.email){
      navigation.navigate('Alunos');
    }
    else {
      return;
    }
  }, []);


  function handleSubmit() {
    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      alert('Emails Inválido!');
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      alert('Senha Inválida!');
    }

    if (formErrors) return;
    dispatch(actions.loginRequest({ email, password }));
  }
  
  return (
    <Container behavior="height">
      <Main>
        <LoginHeader>Login</LoginHeader>
        <LoginLabels>Email:</LoginLabels>
        <InputText placeholder="Seu Email" onChangeText={(e) => setEmail(e)} autoCapitalize="none"/>
        <LoginLabels>Senha:</LoginLabels>
        <InputText placeholder="Sua Senha" onChangeText={(e) => setPassword(e)}/>
        <Button
          title="Entrar"
          customClick={handleSubmit}
        />
        <TouchableOpacity>
          <LoginFooter onPress={() => navigation.navigate('SignUp')}>
            Ainda não possui uma conta?
          </LoginFooter>
        </TouchableOpacity>
      </Main>
    </Container>
  );
};

export default Login;
