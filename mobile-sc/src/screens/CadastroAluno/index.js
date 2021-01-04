import React, {useState} from 'react';
import {Container, HeaderText} from '../../globalStyles';
import {LoginLabels } from './styles';

import InputText from '../../components/InputText';
import Button from '../../components/Button';



const CadastroAlunos = () => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');




  return (
    <Container>
        <HeaderText>Cadastrar Aluno</HeaderText>
        <LoginLabels>Nome:</LoginLabels>
        <InputText placeholder="Nome do aluno" />
        <LoginLabels>Sobrenome:</LoginLabels>
        <InputText placeholder="Sobrenome do aluno" />
        <LoginLabels>Email:</LoginLabels>
        <InputText placeholder="Seu Email" />
        <LoginLabels>Idade:</LoginLabels>
        <InputText placeholder="Idade do aluno" />
        <LoginLabels>Peso:</LoginLabels>
        <InputText placeholder="Peso do aluno" />
        <LoginLabels>Altura:</LoginLabels>
        <InputText placeholder="Altura do aluno" />
        <Button
          title="Entrar"
          customClick={() => navigation.navigate('TabNavigator')}
        />
    </Container>
  );
};

export default CadastroAlunos;
