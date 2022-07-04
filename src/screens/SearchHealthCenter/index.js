import React, { useState, useEffect } from 'react'
import { Keyboard, PermissionsAndroid, Platform, TouchableWithoutFeedback } from 'react-native'
import { MaterialIcons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute, useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import SearchHealthCenterItem from '../../components/SearchHealthCenterItem';
import Geolocation from '@react-native-community/geolocation';

import {
  Container,
  Header,
  BoxSearch,
  Input,
  BoxIcon,
  BackButton,
  ResultText,
  EmptySearch,
  EmptySearchText,
  FlatList
} from './styles'

const SearchHealthCenter= () => {
  const route = useRoute()
  const navigation = useNavigation()
  const [search, setSearch] = useState(route.params?.healthCenter)
  const [searchFinal, setSearchFinal] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const getMedicines = async(latitude, longitude) => {
    try{
      if((latitude != undefined) && (longitude != undefined)) {
        const response = await api.post(`/healthCenter/listHealthCenter/${search}`,{latitude,longitude})
        if(response.data != undefined) {
          setData(response.data)
          setSearchFinal(search)
        }else {
          setData([])
        }
      }else {
        const response = await api.post(`/healthCenter/listHealthCenter/${search}`)
        if(response.data != undefined) {
          setData(response.data)
          setSearchFinal(search)
        }else {
          setData([])
        }
      }
      
      setLoading(false)
    }catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    
    Platform.OS === 'android' &&
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
          .then((info) => {
            if(info == 'granted') {
              Geolocation.getCurrentPosition(item => {
                getMedicines(item.coords.latitude, item.coords.longitude)
              })
            }else {
              getMedicines()
            }
          })

  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <BackButton activeOpacity={0.7} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={30} color="black"/>
          </BackButton>

          <BoxSearch>
            <Input
              placeholder="Pesquisar novo posto"
              defaultValue={search}
              onChangeText={(text) => setSearch(text)}
              onSubmitEditing={() => getMedicines(search)}
            />
            <BoxIcon>
              <Feather name="search" size={25} color="#C4C4C4" />
            </BoxIcon>
          </BoxSearch>
        </Header>

        {
          (data.length == 0 && loading == false) ? ( 
            <EmptySearch>
              <MaterialCommunityIcons
                name="exclamation-thick"
                size={50}
                color="#9C9C9C"
              />
              <EmptySearchText>Não foram encontrados resultados {'\n'} para sua pesquisa.</EmptySearchText>
            </EmptySearch>
          ) : (
            <ResultText>
              Resultados para {searchFinal}
            </ResultText>
          )
        }

        <FlatList
          data={data}
          keyExtrator={(item) => item._id}
          renderItem={({ item }) => <SearchHealthCenterItem data={ item }/>}
        />
      </Container>
    </TouchableWithoutFeedback>
  )
}

export default SearchHealthCenter