import styled from 'styled-components';

export const Main = styled.ScrollView`
  background-color: #fff;
  margin: 5%;
  width: 90%;
  border-radius: 4px;
  padding: 9px;
`;

export const HeaderView = styled.View`
  display: flex;
  flex-direction: row;
  height: 100px;
`;

export const HeaderViewLeft = styled.View`
  display: flex;
  width: 50%;
`;
export const HeaderViewRight = styled.View`
  width: 50%;
`;

export const UserText = styled.Text`
  font-style: italic;
  font-size: 25px;
  text-align: right;
  margin-top: 10px;
`;

export const LogoutText = styled.Text`
  font-style: italic;
  text-align: right;
  font-size: 20px;
  margin-top: 12px;
  color: #900;
`;




export const AlunoContainer = styled.View`
  margin-top: 20px;
`;

export const AlunoView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom-width: 0.4px;
  border-bottom-color: #000;
  height: 60px;
`;

export const AlunoText = styled.Text`
  font-size: 20px;
`;

export const ProfilePicture = styled.View`
  width: 40px;
  border-radius: 50px;
`;

export const NewAlunoTxt = styled.Text`
  font-size: 20px;
  margin-top: 10px;
  color: #900;
`;



export const EditAlunoBtn = styled.TouchableOpacity``;
