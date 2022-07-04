import React from 'react'
import { AntDesign } from '@expo/vector-icons';

import {
  Container,
  QuantityTextInput,
  IncreaseButton,
  DecreaseButton,
} from './styles'


const Counter = ({ quantity, setQuantity }) => {

    const increaseQuantity = () => {
        setQuantity(Number(quantity) + 1);
    }

    const decreaseQuantity = () => {
        if(quantity > 0) {
            setQuantity(Number(quantity) - 1);
        }
    }

    const handleChange = (inputText) => {
        setQuantity(inputText.toString())
    }

    return (
        <Container>
            <DecreaseButton onPress={() => {decreaseQuantity()}} >
                <AntDesign name="minuscircle" size={40} color="#42B448"/>
            </DecreaseButton>
            <QuantityTextInput keyboardType='numeric' onChangeText={handleChange} value={String(quantity)}/>
            <IncreaseButton onPress={() => {increaseQuantity()}}>
                <AntDesign name="pluscircle" size={40} color="#42B448"/>
            </IncreaseButton>
        </Container>
    )
}

export default Counter