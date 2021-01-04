import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

const RootStack = createStackNavigator();

//Telas
import Login from '../Login';
import SignUp from '../SignUp';
import Alunos from '../Alunos'
import AlunoEdit from '../AlunoEdit';
import CadastroAluno from '../CadastroAluno';
import EditarLogin from '../EditarLogin';

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator headerMode="none" initialRouteName="Login">
    <RootStack.Screen name="Login" component={Login} />
    <RootStack.Screen name="SignUp" component={SignUp} />
    <RootStack.Screen name="Alunos" component={Alunos} />
    <RootStack.Screen name="CadastroAluno" component={CadastroAluno} />
    <RootStack.Screen name="AlunoEdit" component={AlunoEdit} />
    <RootStack.Screen name="EditarLogin" component={EditarLogin} />
  </RootStack.Navigator>
);

export default RootStackScreen;
