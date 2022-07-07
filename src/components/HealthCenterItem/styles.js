import styled from "styled-components/native";

export const Container = styled.View`
  padding: 10px;
  justify-content: center;
  width: 100%;
`

export const Item = styled.View`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-color: #E3DFDF;
  border-bottom-width: 1px;
  padding-bottom: 10px ;
`

export const Box = styled.View`
  display: flex;
  flex-direction: column;
  max-width: 70%;
`
export const BoxLine = styled.View`
  display: flex;
  flex-direction: row;
`

export const Text = styled.Text`
  color: #000;
  font-size: 16px;
  font-weight: bold;
`

export const MapButton = styled.TouchableOpacity`
  border: 1px solid #D6D6D6;
  border-radius: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
`

export const AlertButton = styled.TouchableOpacity`
  border: 1px solid #D6D6D6;
  border-radius: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
`
