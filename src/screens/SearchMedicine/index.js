import React, { useState, useEffect } from 'react'
import { Keyboard } from 'react-native'
import { MaterialIcons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute, useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import HealthCenterItem from '../../components/HealthCenterItem';

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
  FlatList,
  TouchableWithoutFeedback
} from './styles'

const SearchMedicine = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const [search, setSearch] = useState(route.params?.medicine)
  const [searchFinal, setSearchFinal] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const getMedicines = async () => {
    try {
      const response = await api.get(`/medicine/${search}`)
      if (response.data.data != undefined) {
        setData(response.data.data.inventory)
        setSearchFinal(search)
      } else {
        setData([])
      }
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getMedicines()
  }, [])

  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Header>
          <BackButton activeOpacity={0.7} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={30} color="black" />
          </BackButton>
          <BoxSearch>
            <Input
              placeholder="Pesquisar novo remédio"
              defaultValue={search}
              onChangeText={(text) => setSearch(text)}
              onSubmitEditing={() => getMedicines(search)}
            />
            <BoxIcon>
              <Feather name="search" size={25} color="#C4C4C4" />
            </BoxIcon>
          </BoxSearch>
        </Header>
      </TouchableWithoutFeedback>

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
        renderItem={({ item }) => <HealthCenterItem data={item} />}
      />
    </Container>
  )
}

export default SearchMedicine