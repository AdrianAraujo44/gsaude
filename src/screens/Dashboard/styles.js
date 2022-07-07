import styled from "styled-components/native";
import { KeyboardAvoidingView } from "react-native";

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    justify-content: center;
    background-color: white;
    align-items: flex-start;
    padding-horizontal: 19px; 
`;

export const WelcomeText = styled.Text`
    font-size: 25px;
    font-weight: bold;
    text-align: left;
    margin-left: 25px;
    color: #000;
    width: 100%; 
    position: absolute;
    top: 45px;
`
export const UsernameText = styled.Text`
    font-size: 25px;
    text-align: left;
    margin-left: 25px;
    color: #000;
    position: absolute;
    width: 100%;
    top: 73px;
`
export const SearchBarContainer = styled.View`
    width: 100%;
    position: absolute;
    top: 113px;
    margin-horizontal: 19px;
`
export const Box = styled.View`
    height: 171px;
    position: absolute;
    top: 170px;
    margin-horizontal: 19px;
    background-color: #F5F0F0;
    border-left-width: 5px;
    border-left-color: #00B954;
    width: 100%;
    border-radius: 5px;
    z-index: 100;
    display: flex;
    justify-content: center;
    padding-left: 10px;
`

export const TextContainer = styled.View`
    flex-direction: row;
    margin-top: 5px;
    margin-bottom: 5px;
`

export const TitleText = styled.Text`
    font-size: 16px;
    text-align: left;
    color: #000; 
`

export const QuantityText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    margin-left: 3px;
    color: #000; 
`

export const ShowMoreButton = styled.TouchableOpacity`
    background-color: #00000000;
    display: flex;
    margin-left: 5px;
    justify-content: flex-start;
    height: 18px;
`

export const ShowMoreText = styled.Text`
    font-size: 16px;
    color: #00B954;
`

export const BoxButtonsContainer = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    position: absolute;
    top: 355px;
    margin-horizontal: 19px;
`
export const GoToScreenButton = styled.TouchableOpacity`
    background-color: #F5F0F0;
    justify-content: center;
    align-items: center;
    height: 120px;
    width: 170px;
    border-radius: 10px;
`

export const GoToScreenImage = styled.Image`
    width: 60px;
    height: 60px;
    margin-left: 10px;
`
export const GoToScreenText = styled.Text`
    font-size: 14px;
    color: #000;
    margin-top: 5px;
    text-align: center;
    width: 70%;
`

export const LogoutButton = styled.TouchableOpacity`
    position: absolute;
    background-color: #00000000;
    flex-direction: row;
    align-self: center;
    justify-content: center;
    align-items: center;
    height: 35px;
    bottom: 5px;
`

export const LogoutButtonText = styled.Text`
    font-size: 20px;
    color: #848282;
`