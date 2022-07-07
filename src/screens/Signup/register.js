import React, { useState, useContext } from 'react'
import DefaultButton from '../../components/DefaultButton'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons'
import { Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core'
import Toast from 'react-native-toast-message'
import { AuthContext } from '../../providers/user/context'

import {
  Container,
  Body,
  TitleLeft,
  TextLeft,
  InputText,
  DateButton,
  TextDate,
  Password,
  PassButton,
  InputPassword
} from './styles'

const Register = () => {
  const navigation = useNavigation()
  const [fullname, setFullName] = useState('')
  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [date, setDate] = useState(new Date())
  const [text, setText] = useState('Data de nascimento')
  const [showPassword, setShowPassword] = useState(false)
  const route = useRoute()

  const { signUp } = useContext(AuthContext)

  const getDate = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShowDatePicker(Platform.OS === 'ios')
    setDate(currentDate)

    let tempDate = new Date(currentDate)
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear()
    setText(fDate)
  }

  const handlerSubmit = async() => {
    if(fullname.trim() != '' &&  text != 'Data de nascimento') {
      if(validateCPF(cpf) == false) {
        Toast.show({
          type: 'error',
          text1: 'CPF inválido!',
        });
      }else {
        if(password.trim().length >= 5) {
          signUp(route.params?.email, password, fullname, text,cpf)
        }else {
          Toast.show({
            type: 'error',
            text1: 'Senha fraca!',
            text2: 'Sua senha precisa ter no mínimo 5 caracteres'
          });
        }
      }
    }else {
      Toast.show({
        type: 'error',
        text1: 'Temos um problema!',
        text2: 'Você precisa preencher todos os campos'
      });
    }
  }

  const validateCPF = (strCPF) => {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (let i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

    Soma = 0;
      for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;

      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
      return true;
  }

  return (
    <>
      <Container>
        <Body>
          <TitleLeft>Estamos quase lá !</TitleLeft>
          <TextLeft>informe seus dados pessoais e crie uma senha para sua conta</TextLeft>
          <InputText
            placeholder="Nome Completo"
            placeholderTextColor={"#BFBCBC"}
            onChangeText={(text) => setFullName(text)}
          />
          <InputText
            placeholder="CPF"
            maxLength={11}
            keyboardType="number-pad"
            placeholderTextColor={"#BFBCBC"}
            onChangeText={(text) => setCpf(text)}
          />
          <DateButton activeOpacity={0.7} onPress={() => setShowDatePicker(true)}>
            <TextDate color={text != "Data de nascimento" ? "#000" : "#BFBCBC"}>{text}</TextDate>
          </DateButton>
          <Password>
            <InputPassword
              secureTextEntry={!showPassword}
              placeholder="Senha"
              placeholderTextColor={"#BFBCBC"}
              onChangeText={(text) => setPassword(text)}
            />
            <PassButton onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Ionicons name="eye" size={30} color="#BFBCBC"/>
              ): (
                <Ionicons name="eye-off" size={30} color="#BFBCBC"/>
              )}
            </PassButton>
          </Password>
          <DefaultButton name="Concluir" action={handlerSubmit}/>
        </Body>
      </Container>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          mode={'date'}
          display='default'
          value={date}
          onChange={getDate}
          maximumDate={ new Date() }
        />
      )}

    </>
  )
}

export default Register