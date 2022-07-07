import React from 'react'
import DefaultButton from '../../components/DefaultButton'
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Background,
  Image,
  Logo,
  Text,
  StyleButton
} from './styles'

const Apresentation = () => {
  const navigation = useNavigation()

  const gotToHome = () => {
    navigation.navigate("Home")
  }

  return (
    <Container>
      <Background source={require('../../assets/apresentation.jpg')}>
        <Image source={require('../../assets/doctors.png')} resizeMode="contain"/>
        <Logo source={require('../../assets/logo.png')} resizeMode="contain"/>
        <Text>
          Bem-vindo ao GSaúde aqui você pode pesquisar a disponibilidade de remédios e postos de saúde próximos a você
          </Text>
        <StyleButton>
          <DefaultButton  name="Começar" action={gotToHome}/>
        </StyleButton>
      </Background>
    </Container>
  )
}

export default Apresentation