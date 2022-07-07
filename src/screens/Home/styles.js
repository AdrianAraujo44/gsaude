import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const Text = styled.Text`
  font-size: ${props => props.fs};
  color: #fff;
  font-weight: bold;
`

export const Overlay = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(70,66,66,0.80);
  top:0;
  left:0;
  z-index:2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding:20px;
`

export const Box = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-self: flex-start;
`

export const NotificationButton = styled.TouchableOpacity`
  display: flex;
  align-self: flex-start;
  justify-content: flex-start;
  z-index: 3;
  padding: 3px 0px 0px 5px;
  background-color: #AAA4A4;
  width: 40px;
  height: 40px;
  border-radius: 19px;
`

export const ExitButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  padding: 0px 0px 0px 4px;
  background-color: #AAA4A4;
  width: 40px;
  height: 40px;
  border-radius: 19px;
  margin-left: 5px;
`

export const Badge = styled.View`
  background-color: red;
  width: 15px;
  height: 15px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  position: absolute;
  z-index: 1;
  margin-left: 20px;
  margin-top: 5px;
`

export const Input = styled.TextInput`
  width: 100%;
  height: 44px;
  background-color: #fff;
  border-radius: 6px;
  padding-left: 18px;
  margin-bottom: 10px;
`

export const Wrapper = styled.View`
  display: flex;
  align-content: center;
  align-items: center;
  width: 100%;
  margin-top: 35px;
`

export const Logo = styled.Image`
  width: 200px;
  height: 100px;
`

export const Dropdown = styled.View`
  background-color: #fff;
  width: 100%;
  border-radius: 6px;
  margin-bottom: 10px;
  height: 44px;
`

export const LoginButton = styled.TouchableOpacity`
  background-color: rgba(247,250,247,0.21);
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 57px;
  border-radius: 10px;
`
export const SignupButton = styled.TouchableOpacity`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Background = styled.ImageBackground`
  flex:1;
`