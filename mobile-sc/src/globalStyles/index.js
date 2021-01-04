/* eslint-disable prettier/prettier */
import styled from 'styled-components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export const Container = styled(KeyboardAwareScrollView)`
  display: flex;
  padding: 10px;
  background-color: #fff;
`;

export const HeaderText = styled.Text`
  font-size: 35px;
`;

export const LoginLabels = styled.Text`
  font-size: 20px;
  margin-top: 15px;
`;
