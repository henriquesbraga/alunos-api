import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {get} from 'lodash';
import {Container, HeaderText } from '../../globalStyles';
import {Image} from 'react-native';
import * as actions from '../../store/modules/auth/actions';
import {
  AlunoContainer,
  AlunoView,
  AlunoText,
  ProfilePicture,
  EditAlunoBtn,
  NewAlunoTxt,
  HeaderView,
  HeaderViewLeft,
  HeaderViewRight,
  UserText,
  LogoutText
} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from '../../services/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Alunos({navigation}) {
  const dispatch = useDispatch();
  const {nome, email} = useSelector((state) => state.auth.user);
  const [alunos, setAlunos] = useState([]);

  useFocusEffect(() => {
    async function getData() {
      const response = await axios.get('/alunos');
      setAlunos(response.data);
    }
    getData();
  }, [nome]);

  async function handleLogout(){
    try{
      await AsyncStorage.removeItem('ALUNOS_API')
      dispatch(actions.loginFailure());
    }
    catch(err){
      alert(err)
    }
  }

  async function handleDelete(id, index){
    
    try{
      await axios.delete(`/alunos/${id}`);
      alert('Aluno deletado com sucesso!');
      const refreshedAlunos = [...alunos]
      refreshedAlunos.splice(index, 1);
      setAlunos(refreshedAlunos);
    }
    catch(err){
      alert(err);
    }
  }


  return (
    <Container>
        <HeaderView>
          <HeaderViewLeft>
            <HeaderText>Alunos</HeaderText>
            <EditAlunoBtn onPress={() => navigation.navigate('CadastroAluno')}>
              <NewAlunoTxt>Novo Aluno</NewAlunoTxt>
            </EditAlunoBtn>
          </HeaderViewLeft>

          <HeaderViewRight>
            <UserText>{nome}</UserText>
            <EditAlunoBtn onPress={() => navigation.navigate('EditarLogin')}>
              <LogoutText>Editar dados</LogoutText>
            </EditAlunoBtn>
            <EditAlunoBtn onPress={() => handleLogout()}>
              <LogoutText>Logout</LogoutText>
            </EditAlunoBtn>
          </HeaderViewRight>
          
        </HeaderView>

        <AlunoContainer>
          {alunos.map((aluno, index) => (
            <AlunoView key={String(aluno.id)}>
              <ProfilePicture>
                {get(aluno, 'Fotos[0].url', false) ? (
                  <Image 
                  style={{width: 40, height: 40, borderRadius: 20}}
                  source={{uri: aluno.Fotos[0].url}} />
                ) : (
                  <Icon name="user-circle-o" size={40} />
                )}

              </ProfilePicture>
              <AlunoText>{aluno.nome}</AlunoText>
              <AlunoText>{aluno.email}</AlunoText>
              <EditAlunoBtn>
                <Icon name="edit" size={20} color="#900" onPress={() => navigation.navigate('AlunoEdit', {alunoId: aluno.id})} />
              </EditAlunoBtn>
              <EditAlunoBtn onPress={() => handleDelete(aluno.id, index)}>
                <Icon name="window-close" size={20} color="#900" />
              </EditAlunoBtn>
            </AlunoView>
          ))}
        </AlunoContainer>
    </Container>
  );
}

export default Alunos;
