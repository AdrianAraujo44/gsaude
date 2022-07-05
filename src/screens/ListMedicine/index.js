import React, {useRef, useState, useContext, useEffect} from 'react'
import Header from '../../components/Header'
import MedicineItem from '../../components/MedicineItem'
import { FlatList, ActivityIndicator } from "react-native";
import mockData from './mockData.json';

import { useRoute, useNavigation } from '@react-navigation/native';
import UpdateMedicineModal from '../../components/Modals/UpdateMedicineModal';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import api from '../../services/api';
import { AuthContext } from '../../providers/user/context'
import {
  Container
} from './styles'
import { get } from 'react-native/Libraries/Utilities/PixelRatio';

const ListMedicine = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [name, setName] = useState("Teste");
  const [search, setSearch] = useState(route.params.medicine)
  const [situation, setSituation] = useState(route.params?.situation);
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [healthCenterId, setHealthCenterId] = useState(route.params?.healthCenterId);
  const [filteredDataSource, setFilteredDataSource] = useState(route.params?.filteredDataSource);
  const [isLoading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const modalizeRef = useRef(null);
  const { user } = useContext(AuthContext);

  const openUpdateMedicineModal = (name, availableQuantity, medicine) => {
     modalizeRef.current?.open()
     setName(name)
     setAvailableQuantity(availableQuantity)
  };

  const closeUpdateMedicineModal = () => {
    modalizeRef.current?.close()
    getListMedicines();
  }
  
  const getListMedicines = async () => {
    try {
      const response = await api.post(`/healthCenter/listMedicines/${user.healthCenterId}`)
      setDataSource(response.data); 
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

  const getListMedicinesType = async ({situation}) => {
    try {
      const response = await api.post(`/healthCenter/listMedicines/${user.healthCenterId}`, {type: situation})
      setDataSource(response.data); 
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

  const searchMedicine = async({name}) => {
    try{
      const response = await api.get(`/medicine/${name}`)
      console.log(response.data);
      if(response.data.data != undefined) {
        setDataSource(response.data.data.inventory)
      }else {
        setDataSource([])
      }
    }catch(err) {
      console.log(err)
    }
  }

  const filterSituationFunction = (situation, medicine) => {
    if (situation) {
      getListMedicinesType({situation});
    } else if (medicine) {
      searchMedicine({medicine})
    } else {
      getListMedicines();
    }
  }

  useEffect(() => {
    filterSituationFunction(situation, search);
  }, [situation, search]);

  return (
    <Container>
     <Header title={"Lista de remédios"} />
      
      <FlatList
        data={dataSource}
        renderItem={({item}) => {return <MedicineItem data={item} openModal={openUpdateMedicineModal} />}}
        keyExtractor={(item, index) => { return index.toString()}}
     /> 

      <UpdateMedicineModal modalizeRef={modalizeRef} name={name} availableQuantity={availableQuantity} closeModal={closeUpdateMedicineModal}/> 
    </Container>
  )
}

export default ListMedicine
