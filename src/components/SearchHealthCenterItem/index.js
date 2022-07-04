import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Item,
  Text,
  TextDistance,
  Box,
  BoxLine,
  MapButton
} from './styles'

const SearchHealthCenterItem = ({data}) => {
  const navigation = useNavigation()
  return (
    <Container>
      <Item>
        <Box>
          <Text>{data.name}</Text>
          <TextDistance >{data.distance}</TextDistance >
        </Box>
        <BoxLine>
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

export default SearchHealthCenterItem
