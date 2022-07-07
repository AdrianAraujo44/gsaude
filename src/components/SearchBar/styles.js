import styled from "styled-components/native";

export const Container = styled.View`
    justify-content: center;
    align-items: center;
    flex-direction: row;
`

export const SearchBarView = styled.View`
    padding: 5px;
    flexDirection: row;
    background-color: #F5F0F0;
    border-radius: 5px;
    height: 45px;
    align-items: center;
    justify-content: space-evenly;
`

export const SearchInput = styled.TextInput`
    font-size: 17px;
    margin-left: 10px;
    width: 90%;
    color: #929090;
    font-weight: bold;
`