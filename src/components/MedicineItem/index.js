import React, { useContext } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Badge from '../Badget'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../providers/user/context'

import {
  Container,
  Box,
  Title,
  Footer,
  Buttons,
  Text
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

const MedicineItem = ({ data, openModal }) => {
  const {amountAvailable, situation } = data
  const {name} = data || data.medicine
  const date = "20/05/22"
  const navigation = useNavigation()
  const { user } = useContext(AuthContext)

  return (
    <Container>
      <Box>
        <Title>{name}</Title>
        {chooseBadge(situation, amountAvailable, date)}
      </Box>
      <Footer>
        <Buttons activeOpacity={0.7} onPress={() => navigation.navigate("PDFView", {medicine:name})}>
         <Ionicons name="document" size={25} color={"#767373"}/>
         <Text>Ler a bula</Text>
        </Buttons>
        {
          user.healthCenterId != undefined && (
            <Buttons activeOpacity={0.7} onPress={() => openModal(name, amountAvailable)}>
              <Ionicons name="create" size={30} color={"#767373"}/>
              <Text>Editar</Text>
            </Buttons>
          )
        }
      </Footer>
    </Container>
  )
}

export default MedicineItem

