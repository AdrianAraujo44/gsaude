import React, { useState, useContext, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../../components/SearchBar'
import { Ionicons } from "@expo/vector-icons";
import { Keyboard, TouchableWithoutFeedback, ActivityIndicator } from "react-native";
import { AuthContext } from '../../providers/user/context'
import api from '../../services/api';
import Toast from 'react-native-toast-message'

import {
  Container,
  WelcomeText,
  UsernameText,
  SearchBarContainer,
  Box,
  TextContainer,
  TitleText,
  QuantityText,
  ShowMoreButton,
  ShowMoreText,
  BoxButtonsContainer,
  GoToScreenButton,
  GoToScreenImage,
  GoToScreenText,
  LogoutButton,
  LogoutButtonText
} from './styles'

const Dashboard = () => {
    const navigation = useNavigation();
    const [search, setSearch] = useState("");
    const { signOut, user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [missing, setMissing] = useState(0);
    const [available, setAvailable] = useState([]);
    const [coming, setComing] = useState(0);

    const goToListMedicine = () => {
        navigation.navigate("ListMedicine",{medicine:"", healthCenterId:user.healthCenterId})
    }

    const searchFilterFunction = (text) => {
        if (text) {
            setSearch(text);
        } 
    };

    const searchFilterMedicine = () => {
        navigation.navigate("ListMedicine",{medicine:search, healthCenterId:user.healthCenterId})
    }
    
    const getAmountMedicines = async () => {
        try {
          const response = await api.get(`/healthCenter/getAmountMedicines/${user.healthCenterId}`);
          setData(response.data);
        } catch(error) {
          Toast.show({
            type: 'error',
            text1: 'Temos um problema!',
            text2: 'Algo de errado aconteceu, tente novamente mais tarde'
          });
          
        } finally {
          setLoading(false);
        }
    };

    useEffect(() => {
        getAmountMedicines();
        if (isLoading === false ) {
            if(data.data) {
                setMissing(data.data.missing);
                setAvailable(data.data.available);
                setComing(data.data.coming);
            }
        }
    },[isLoading]); 

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <WelcomeText>Seja bem-vindo,</WelcomeText>
                <UsernameText>{user.name}</UsernameText>
                <SearchBarContainer>
                    <SearchBar
                        placeholderPhrase="Pesquisar remédio"
                        searchPhrase={search}
                        setSearchFilter={searchFilterFunction}
                        shouldCrossIconShow={false}
                        goToListMedicine={searchFilterMedicine}
                    />
                </SearchBarContainer>
                { isLoading ? <Box><TitleText style={{textAlign: "center"}}>carregando informações</TitleText><ActivityIndicator/></Box> :
                <Box>
                    <TextContainer>
                        <TitleText>Remédios em falta:</TitleText>
                        <QuantityText>{missing}</QuantityText>
                        <ShowMoreButton> 
                            <ShowMoreText onPress={() => navigation.navigate("ListMedicine",{situation:"missing"})}>
                              ver mais
                            </ShowMoreText>
                        </ShowMoreButton>
                    </TextContainer>
                    <TextContainer>
                        <TitleText>Remédios disponíveis:</TitleText>
                        <QuantityText>{available}</QuantityText>
                        <ShowMoreButton onPress={() => navigation.navigate("ListMedicine",{situation:"available"})}> 
                            <ShowMoreText>ver mais</ShowMoreText>
                        </ShowMoreButton>
                    </TextContainer>
                    <TextContainer>
                        <TitleText>Remédios chegando:</TitleText>
                        <QuantityText>{coming}</QuantityText>
                        <ShowMoreButton onPress={() => navigation.navigate("ListMedicine",{situation:"coming"})}> 
                            <ShowMoreText>ver mais</ShowMoreText>
                        </ShowMoreButton>
                    </TextContainer>
                    <TextContainer>
                        <TitleText>Total de remédios:</TitleText>
                        <QuantityText>{missing + available + coming}</QuantityText>
                    </TextContainer>
                </Box> 
                }

                <BoxButtonsContainer>
                    <GoToScreenButton onPress={() => navigation.navigate("RegisterNewMedicine")}> 
                        <GoToScreenImage source={require('../../assets/medicine.png')} resizeMode="contain"/>
                        <GoToScreenText>Cadastrar novos remédios</GoToScreenText>
                    </GoToScreenButton>
                    <GoToScreenButton onPress={goToListMedicine}> 
                        <GoToScreenImage source={require('../../assets/search.png')} resizeMode="contain"/>
                        <GoToScreenText>Lista de remédios</GoToScreenText>
                    </GoToScreenButton>
                </BoxButtonsContainer>

                <LogoutButton onPress={() => signOut()}>
                    <Ionicons name="md-log-out" color="#848282" size={35}/>
                    <LogoutButtonText>Sair</LogoutButtonText>
                </LogoutButton>
            </Container>
        </TouchableWithoutFeedback>
    )   
}

export default Dashboard