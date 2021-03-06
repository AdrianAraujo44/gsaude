import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const Text = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
`

export const Backbutton = styled.TouchableOpacity`
  background-color: #AAA4A4;
  position: absolute;
  z-index: 1;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0px 0px 10px;
`