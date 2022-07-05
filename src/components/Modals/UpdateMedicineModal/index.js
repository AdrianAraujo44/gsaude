import React, {useContext, useState, useEffect} from 'react'
import { Modalize } from 'react-native-modalize'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation} from '@react-navigation/native';
import DefaultButton from '../../DefaultButton';
import CounterCopy from '../../CounterCopy';
import { AuthContext } from '../../../providers/user/context';
import Toast from 'react-native-toast-message';

import {
  Title,
  Container,
  Text,
  KeyboardAvoidingView,
  TextSection,
  Item,
  MapButton
} from './styles'

const UpdateMedicineModal = ({ modalizeRef,  name, availableQuantity, closeModal}) => {
  const navigation = useNavigation()
  const [amount, setAmount] = useState("0");
  const { user } = useContext(AuthContext);
  
  const handleSubmit = () => {
    handlerSaveButton();
    
    setTimeout(() => {
      closeModal();
      }, 5000);
  }

  const handlerSaveButton = async() => {
    if(name.trim() != '') {
        if(amount > 0) {
            try {
                const medicine = await api.get(`/medicine/${name}`)
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

  useEffect(() => {
    setAmount(amount);
  }, [amount]);

  return (
        <Modalize ref={modalizeRef} snapPoint={350} handlePosition={'inside'} keyboardAvoidingBehavior={'height'} modalStyle={{borderTopLeftRadius:25, borderTopRightRadius:25}}>
            <Container>
                <Title>{name}</Title>
                <Text>Quantas unidades chegaram?</Text>
                <CounterCopy availableQuantity={availableQuantity} setAmount={setAmount}/>
                <DefaultButton name="Salvar" action={handleSubmit}/>
            </Container>
        </Modalize>
    
  )
} 

export default UpdateMedicineModal