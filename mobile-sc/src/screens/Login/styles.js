import styled from 'styled-components';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #1a1a1d;
`;

export const Main = styled.View`
  background-color: #fff;
  height: 330px;
  width: 90%;
  border-radius: 4px;
  padding: 9px;
`;

export const LoginHeader = styled.Text`
  font-size: 30px;
`;

export const LoginLabels = styled.Text`
  font-size: 20px;
  margin-top: 15px;
`;

export const LoginFooter = styled.Text`
  text-align: center;
  font-size: 20px;
`;
