import React, {useRef, useState, useEffect, useContext} from 'react'
import Header from '../../components/Header'
import MedicineItem from '../../components/MedicineItem'
import { FlatList } from "react-native";
import { useRoute } from '@react-navigation/native';
import UpdateMedicineModal from '../../components/Modals/UpdateMedicineModal';
import { AuthContext } from '../../providers/user/context'
import api from '../../services/api';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  Container,
  EmptySearch,
  EmptySearchText
} from './styles'

const ListMedicine = () => {
  const route = useRoute()
  const [name, setName] = useState("Teste");
  const [search] = useState(route.params?.medicine)
  const [situation] = useState(route.params?.situation);
  const [errorMessange, setErrorMessage] = useState('')
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [data, setData] = useState([])
  const modalizeRef = useRef(null);
  const { user } = useContext(AuthContext);

  const openUpdateMedicineModal = (name, availableQuantity) => {
     modalizeRef.current?.open()
     setName(name)
     setAvailableQuantity(availableQuantity)
  };

  useEffect(() => {
    const getData = async() => {
      try {
        if(search != undefined) {
          const response = await api.post(`/healthCenter/searchMedicine/${user.healthCenterId}`,{name:search})
          setData(response.data)
          setErrorMessage(`Não foram encontrados resultados \n para sua pesquisa.`)
        }
        if(situation != undefined) {
          const response = await api.post(`/healthCenter/listMedicines/${user.healthCenterId}`,{type:situation})
          setData(response.data)
          setErrorMessage(`Ǹão existe remédios cadastrados \n para essa categoria!`)
        }
      }catch(err) {
        console.log(err)
      }
    }

    getData()
  },[situation, search])

  return (
    <Container>
      <Header title={"Lista de remédios"} />
      {
        data.length == 0 && (
          <EmptySearch>
            <MaterialCommunityIcons
              name="exclamation-thick"
              size={50}
              color="#9C9C9C"
            />
            <EmptySearchText>{errorMessange}</EmptySearchText>
          </EmptySearch>
        )
      }
      <FlatList
        data={data}
        renderItem={({item}) => {return <MedicineItem data={item} openModal={openUpdateMedicineModal} />}}
        keyExtractor={(item, index) => { return index.toString()}}
        showsVerticalScrollIndicator={false}
     /> 
      <UpdateMedicineModal modalizeRef={modalizeRef} name={name} availableQuantity={availableQuantity} />
    </Container>
  )
}

export default ListMedicine
