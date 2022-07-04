import React, { useState, useContext } from 'react'
import { Modalize } from 'react-native-modalize'
import DefaultButton from '../../DefaultButton'
import { AuthContext } from '../../../providers/user/context';
import Counter from '../../Counter';
import { useEffect } from 'react/cjs/react.development';
import api from '../../../services/api';

import {
  Title,
  Container,
  Text,
} from './styles'
import Toast from 'react-native-toast-message';

const UpdateMedicineModal = ({ modalizeRef,  name, availableQuantity, medicineId}) => {
  const [amount, setAmount] = useState()
  const { user } = useContext(AuthContext);

  const handlerSubmit = async() => {
    try {
      await api.put("/healthCenter/updateAmountMedicine", {
        healthCenterId: user.healthCenterId,
        medicineId: medicineId,
        amount: amount
      })
      modalizeRef.current?.close()
      Toast.show({
        type: 'success',
        text1: 'O remédio foi atualizado',
        text2: 'a atualização pode demorar um pouco para aparecer a todos os usuarios'
      });
    }catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setAmount(availableQuantity)
  }, [availableQuantity])

  return (
        <Modalize ref={modalizeRef} 
          snapPoint={350} handlePosition={'inside'} 
          keyboardAvoidingBehavior={'height'} 
          modalStyle={{borderTopLeftRadius:25, borderTopRightRadius:25}}>
            <Container>
                <Title>{name}</Title>
                <Text>Quantas unidades chegaram?</Text>
                <Counter quantity={amount} setQuantity={setAmount}/>
                <DefaultButton name="Salvar" action={handlerSubmit}/>
            </Container>
        </Modalize>
    
  )
} 

export default UpdateMedicineModal