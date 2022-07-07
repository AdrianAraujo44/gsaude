import React, { useState, useContext } from 'react'
import Header from '../../components/Header'
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import Counter from '../../components/Counter'
import DefaultButton from '../../components/DefaultButton'
import { AuthContext } from '../../providers/user/context'
import Toast from 'react-native-toast-message';
import api from '../../services/api'

import {
  Container,
  Text,
  NewMedicineTextInput,
  HeaderContainer
} from './styles'

const RegisterNewMedicine = () => {
    const [medicineName, setMedicineName] = useState('')
    const [amount, setAmount] = useState(0)
    const { user } = useContext(AuthContext)

    function isFloat(value) {
        if (
          typeof value === 'number' &&
          !Number.isNaN(value) &&
          !Number.isInteger(value)
        ) {
          return true;
        }
      
        return false;
      }

    const handlerSubmit = async() => {
        if(medicineName.trim() != '') {
            if(amount > 0 && !isFloat(amount)) {
                try {
                    const medicine = await api.get(`/medicine/${medicineName}`)
                    if(medicine.data.type == "success") {
                        await api.post('/healthCenter/addMedicine', {
                            medicine: medicine.data.data._id,
                            amountAvailable: amount,
                            healthCenterId: user.healthCenterId
                        })
                        Toast.show({
                            type: 'success',
                            text1: 'Remédio cadastrado com sucesso!',
                        });
                        setAmount(0)
                        setMedicineName('')
                    }else {
                        Toast.show({
                            type: 'warning',
                            text1: medicine.data.message,
                        });
                    }
    
                }catch(err) {
                    Toast.show({
                        type: 'error',
                        text1: 'Temos um problema !',
                        text2: 'tente mais tarde'
                    });
                }
            }else {
                Toast.show({
                    type: 'error',
                    text1: 'Temos um problema !',
                    text2: 'insira uma quantidade válida'
                });
            }
        }else {
            Toast.show({
                type: 'error',
                text1: 'Temos um problema !',
                text2: 'preencha o nome do medicamento'
            });
        }
    }   

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <HeaderContainer>
                <Header title="Cadastrar novo remédio"/>
                <Container>
                    <NewMedicineTextInput 
                        placeholder="Nome do medicamento"
                        placeholderTextColor="#BFBCBC"
                        onChangeText={text => setMedicineName(text)}
                        defaultValue={medicineName}
                    />
                    <Text>Quantidade disponível</Text>
                    <Counter quantity={amount} setQuantity={setAmount}/>
                    <DefaultButton  name="Salvar" action={() => handlerSubmit()}/>
                </Container>
            </HeaderContainer>
        </TouchableWithoutFeedback>
    )
}

export default RegisterNewMedicine