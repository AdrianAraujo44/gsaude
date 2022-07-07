import React from 'react'
import { View, Text } from 'react-native'
import { Entypo } from "@expo/vector-icons";
import { Container, ListTitle, ListDistance, LocationButton } from './styles';
import { useNavigation } from '@react-navigation/native';

const ListItem = ({ data}) => {
    const { name, distance } = data
    const navigation = useNavigation()

    const goToHealthCenter = () => {
        navigation.navigate("HealthCenter")
    }

    return (
        <Container onPress={goToHealthCenter}>  
            <ListTitle>{name}</ListTitle>
            <ListDistance>{distance}</ListDistance>
            <LocationButton>
                <Entypo
                    name="location-pin"
                    size={30}
                    color="red"
                />
            </LocationButton>
        </Container>
    )
}
  
export default ListItem