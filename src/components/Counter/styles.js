import styled from "styled-components/native";

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 30px;
  margin-bottom: 30px;
`

export const IncreaseButton = styled.TouchableOpacity`
    z-index: 1;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const DecreaseButton = styled.TouchableOpacity`
    z-index: 1;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const QuantityTextInput = styled.TextInput`
  height: 100px;
  width: 100px;
  background-color: #F5F0F0;
  padding: 10px;
  align-self: center;
  border-radius: 30px;
  margin-horizontal: 15px;
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: #000000;
`