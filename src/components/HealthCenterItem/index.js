import React, { useState, useContext } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Badge from '../Badget'
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message'
import api from '../../services/api'
import { AuthContext } from '../../providers/user/context'

import {
  Container,
  Item,
  Text,
  Box,
  BoxLine,
  AlertButton,
  MapButton
} from './styles'

function chooseBadge (situation, availableQuantity, date) {
  switch(situation){
    case "available" :
      return (
        <Badge name={`${availableQuantity} unidades disponíveis`} type="available"/>
      )
    case "missing" :
      return (
        <Badge name="Em falta" type="missing"/>
      )
    case "coming" :
      return (
        <Badge name={`Chega dia ${date}`} type="coming"/>
      )
  }
}

const HealthCenterItem = ({data}) => {
  const navigation = useNavigation()
  const [color, setColor] = useState('#A8A79D')
  const { user } = useContext(AuthContext)

  const submitNotification = async() => {
    try{
      const response = await api.post("/user/addNotification", {
        userId: user._id,
        medicine_id: data.medicine,
        healthCenter_id: data._id
      })
      if(response.data.type == 'sucesso') {
        Toast.show({
          type: 'success',
          text1: 'Alerta criado!',
          text2: 'quando o remédio ficar disponível você será avisado'
        });
      }
    }catch(err) {
      console.log(err)
    }
  }

  return (
    <Container>
      <Item>
        <Box>
          <Text>{data.name}</Text>
          {chooseBadge(data.situation, data.amountAvailable, '3/08/2022')}
        </Box>
        <BoxLine>
          {
            (data.situation == 'coming' || data.situation == 'missing') && (
              <AlertButton 
                activeOpacity={0.7} 
                onPress={() => {
                  if(user.isLoading != false) {
                    submitNotification()
                  }else {
                    Toast.show({
                      type: 'error',
                      text1: 'Temos um problema!',
                      text2: 'Você precisa estar logado para criar uma notificação',
                    });
                  }
                  if(color != "#FF0000") {
                    setColor('#FF0000')
                  }
                  
                }}>
                <Ionicons name="notifications" size={30} color={color}  />
              </AlertButton>
            )
          }
            <MapButton 
              activeOpacity={0.7} 
              onPress={() => {
                navigation.navigate(
                  'Fullmap',{
                    latitude:parseFloat(data.latitude), 
                    longitude:parseFloat(data.longitude)})
                    }}>
              <Ionicons name="location-sharp" size={30} color="#FF0000" />
            </MapButton>
        </BoxLine>
          
      </Item>
    </Container>
  )
}

export default HealthCenterItem
