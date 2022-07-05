import React, { useState,useEffect } from 'react'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons"
import ListItem from '../../components/ListItem';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Container, EmptySearch, EmptySearchText, ResultsText, ListContainer, BackButton, Header} from './styles'
import { FlatList } from "react-native";
import jsonData from './fakeHealthCenterData.json';
import { MaterialIcons } from '@expo/vector-icons';
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import api from '../../services/api';
import Toast from 'react-native-toast-message'
import Geolocation from '@react-native-community/geolocation';

import {
    BoxSearch,
    Input,
    BoxIcon
} from './styles'

const ListHealthCenter = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const [searchPhrase, setSearchPhrase] = useState(route.params.healthCenter);
    const [dataSource, setDataSource] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [userLongitude, setUserLongitude] = useState(0);
    const [userLatitude, setUserLatitude] = useState(0);

    const renderItem = ({item, index}) => {
        return <ListItem data={item}/>
    };

    const fakeData = jsonData.filter(x => x.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, "")))
    

    const getHealthCenterList = async () => {
        const formattedSearchPhrase = searchPhrase.trim().replace(/\s/g, "%20");
        try { 
            const formattedSearchPhrase = searchPhrase.trim().replace(/\s/g, "%20");
            const response = await api.post(`/healthCenter/listHealthCenter/${formattedSearchPhrase}`, { latitude: String(userLatitude), longitude: String(userLongitude) });
            setDataSource(response.data);
        } catch(error) {
            console.log(error.message);
          Toast.show({
            type: 'error',
            text1: 'Temos um problema!',
            text2: 'Algo de errado aconteceu, tente novamente mais tarde'
          });
          
        } finally {
          setLoading(false);
        }
    }; 

    const handleEmpty = () => {
        return (
            <EmptySearch>
                <MaterialCommunityIcons
                    name="exclamation-thick"
                    size={50}
                    color="#9C9C9C"
                />
                <EmptySearchText>Não foram encontrados resultados {'\n'} para sua pesquisa.</EmptySearchText>
            </EmptySearch>
        ); 
    }; 

    useEffect(() => {
        getHealthCenterList();

        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
              //getting the Longitude from the location json
              setUserLongitude(JSON.stringify(position.coords.longitude));
           
              //getting the Latitude from the location json
              setUserLatitude(JSON.stringify(position.coords.latitude));
                
             }, (error) => alert(error.message), { 
               enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 
             }
          );
    },[]); 

    return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <BackButton activeOpacity={0.7} onPress={() => navigation.goBack()}>
                            <MaterialIcons name="arrow-back" size={30} color="black"/>
                        </BackButton>

                        <BoxSearch>
                            <Input
                                placeholder="Pesquisar..."
                                defaultValue={searchPhrase}
                                onChangeText={(text) => setSearchPhrase(text)}
                            />
                            <BoxIcon>
                                <Feather name="search" size={25} color="#C4C4C4" />
                            </BoxIcon>
                        </BoxSearch>
                    </Header>
                    {searchPhrase.length != 0 && (
                        <ResultsText>
                            Resultados para {searchPhrase}
                        </ResultsText>
                    )}
                    <ListContainer> 
                        <FlatList
                            data={dataSource}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => {return index.toString()}}
                            ListEmptyComponent={handleEmpty}
                        />
                    </ListContainer> 
                </Container>
            </TouchableWithoutFeedback>
    )
}

export default ListHealthCenter