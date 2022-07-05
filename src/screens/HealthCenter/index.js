import React, {useEffect, useState} from 'react'
import { Feather, Ionicons } from '@expo/vector-icons'
import { Dimensions, ActivityIndicator } from 'react-native'
import Minimap from '../../components/Minimap/index'
import MedicineItem from '../../components/MedicineItem'
import { useNavigation, useRoute } from '@react-navigation/native'
import api from '../../services/api'

import {
  Container,
  Image,
  BackButton,
  Body,
  Title,
  Info,
  StyleMinimap,
  Item,
  Text,
  Section
} from './styles'

const { width } = Dimensions.get('screen')

const HealthCenter = () => {
  const navigation = useNavigation()
  const route = useRoute();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [medicines, setMedicines] = useState([])
  const [healthCenterId, setHealthCenterId] = useState(String(route.params.healthCenterId));
  
  const capitalizeFirst = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getHealthCenterData = async () => {
    try {
      const response = await api.get(`/healthCenter/${healthCenterId}`);
      setData(response.data);
      setMedicines(response.data.medicines);
    } catch(error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHealthCenterData();
  },[]); 
    
  return (
    <Container>
      <Image 
        source={{uri:data.image}}
        resizeMode="cover"
      >
        <BackButton onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={30} color={"#fff"} />
        </BackButton>
      </Image>
      { isLoading ?  <ActivityIndicator/> : 
      <Body>
        <Title>{capitalizeFirst(data.name)}</Title>
        <Info>
          <Item>
            <Ionicons name="location-outline" size={25} color={"#00B954"} />
            <Text>{capitalizeFirst(data.name)}</Text>
          </Item>
          <Item>
            <Feather name="phone" size={25} color={"#00B954"} />
            <Text>{data.phone}</Text>
          </Item>
          <Item>
            <Feather name="clock" size={25} color={"#00B954"} />
            <Text>Aberto {data.hour}</Text>
          </Item>
        </Info>
        <StyleMinimap width={width}>
          <Minimap data={{latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude)}}/>
        </StyleMinimap>
        <Section>Lista de remédios</Section>
        { 
          medicines.map((element, index) => (
            <MedicineItem key={index} data={element}/>
          )) 
        }
      </Body> }
    </Container>
  )
}

export default HealthCenter