import React, { useContext, useState, useEffect } from 'react'
import { Modalize } from 'react-native-modalize'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation} from '@react-navigation/native';
import { AuthContext } from '../../../providers/user/context'
import api from '../../../services/api';

import {
  Title,
  Text,
  Box,
  TextSection,
  Item,
  MapButton
} from './styles'

const NotificationsModal = ({ modalizeRef }) => {
  const navigation = useNavigation()
  const { user } = useContext(AuthContext)
  const [data, setData] = useState([])

  const getNotifications = async() => {
    try {
      const response = await api.get(`/user/getNotifications/${user._id}`)
      setData(response.data.notifications)
    }catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if(user.isLoading == true) {
      getNotifications()
    }
  },[user])

  return (
    <Modalize ref={modalizeRef} snapPoint={350} handlePosition={'inside'}>
      <Title>Notificações</Title>
      {data.map((element, index) => (
        <Box key={index}>
          <TextSection>{element.medicine.name} disponível em:</TextSection>
          {element.healthCenter.map((healthCenter,index) => (
            <Item key={index}>
              <Text>{healthCenter.name}</Text>
              <MapButton 
                activeOpacity={0.7} 
                onPress={() => navigation.navigate('Fullmap',{latitude:parseFloat(healthCenter.latitude), longitude:parseFloat(healthCenter.longitude)})}>
                <Ionicons name="location-sharp" size={30} color="#FF0000" />
              </MapButton>
            </Item>
          ))}
        </Box>
      ))}
    </Modalize>
  )
} 

export default NotificationsModal