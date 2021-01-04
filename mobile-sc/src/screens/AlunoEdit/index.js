import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import { useDispatch } from 'react-redux';
import { isEmail, isInt, isFloat } from 'validator';
import { get } from 'lodash';
import axios from '../../services/axios'
import {Container, HeaderText} from '../../globalStyles';
import {LoginLabels, FotoView, FotoContainer } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import InputText from '../../components/InputText';
import Button from '../../components/Button';



const AlunoEdit = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {alunoId} = route.params;
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [foto, setFoto] = useState('');

  useEffect(() => {
    async function getData() {
      try{
        const { data } = await axios.get(`/alunos/${alunoId}`);
        const Foto = get(data, 'Fotos[0].url', '');
        setFoto(Foto);
        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);
      }
      catch(err){
        alert(err);
      }
    }
    getData();
  }, []);

  async function handleSubmit(e) {
    let formErrors = false;
    e.preventDefault();

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      alert('Nome deve ter entre 3 e 255 caracteres!');
    }

    if (sobrenome.length < 3 || sobrenome.length > 255) {
      formErrors = true;
      alert('Sobrenome deve ter entre 3 e 255 caracteres!');
    }

    if (!isEmail(email)) {
      formErrors = true;
      alert('Email Inválido!');
    }

    if (!isInt(String(idade))) {
      formErrors = true;
      alert('Idade Inválida!');
    }

    if (!isFloat(String(peso))) {
      formErrors = true;
      alert('Peso Inválido!');
    }

    if (!isFloat(String(altura))) {
      formErrors = true;
      alert('Altura Inválida!');
    }

    // eslint-disable-next-line no-useless-return
    if (formErrors) return;

    try {
      if (id) {
        // editando
        await axios.put(`/alunos/${alunoId}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        alert('Aluno(a) editado com sucesso!');
        navigation.navigate('Alunos');
      }
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro Desconhecido.');
      }

      if (status === 401) {
        dispatch(actions.loginFailure());
      }
    }
  };

  return (
    <Container>
        <HeaderText>Editar Aluno</HeaderText>
        <FotoContainer>
            <FotoView>
            {foto ? 
              (
                <Image 
                style={{width: 180, height: 180, borderRadius: 90}}
                source={{uri: foto}} />
              )
              :
              (
                <Icon name="user-circle-o" size={180} />
              )
            }
            </FotoView>
        </FotoContainer>
        <LoginLabels>Nome:</LoginLabels>
        <InputText value={nome} placeholder="Nome do aluno" onChangeText={(e) => setNome(e)}/>
        <LoginLabels>Sobrenome:</LoginLabels>
        <InputText value={sobrenome} placeholder="Sobrenome do aluno" onChangeText={(e) => setSobrenome(e)}/>
        <LoginLabels>Email:</LoginLabels>
        <InputText value={email} placeholder="Email do aluno" onChangeText={(e) => setEmail(e)} autoCapitalize="none"/>
        <LoginLabels>Idade:</LoginLabels>
        <InputText value={String(idade)} placeholder="Idade do aluno" keyboardType="numeric" onChangeText={(e) => setIdade(e)}/>
        <LoginLabels>Peso:</LoginLabels>
        <InputText value={String(peso)} placeholder="Peso do aluno" keyboardType="numeric" onChangeText={(e) => setPeso(e)}/>
        <LoginLabels>Altura:</LoginLabels>
        <InputText value={String(altura)} placeholder="Altura do aluno" keyboardType="numeric" onChangeText={(e) => setAltura(e)}/>
        <Button
          title="Salvar"
          customClick={handleSubmit}
        />
    </Container>
  );
};

export default AlunoEdit;
