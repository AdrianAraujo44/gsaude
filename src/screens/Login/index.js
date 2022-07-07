import React, { useState, useContext } from 'react'
import DefaultButton from '../../components/DefaultButton'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../providers/user/context'
import {
  Container,
  Overlay,
  Input,
  Logo,
  SignupButton,
  Text,
  Background,
} from './styles'

const Login = () => {
  const [emailState, setEmailState] = useState('')
  const [passwordState, setPasswordState] = useState('')

  const navigation = useNavigation()
  const { signIn } = useContext(AuthContext)

  return (
    <Container>
      <Overlay>
        <Logo
          source={require('./../../assets/logo.png')}
          resizeMode="contain"
        />
        <Input
          placeholder="Digite seu email"
          placeholderTextColor={"#6C6868"}
          onChangeText={(text) => setEmailState(text)}
        />
        <Input
          placeholder="Digite sua senha"
          secureTextEntry={true}
          placeholderTextColor={"#6C6868"}
          onChangeText={(password) => setPasswordState(password)}
        />
        <DefaultButton name="Logar" action={() => signIn(emailState, passwordState)} />
        <SignupButton activeOpacity={0.7} onPress={() => navigation.navigate("Signup")}>
          <Text fs={"12px"}>Deseja criar uma conta ?</Text>
        </SignupButton>
      </Overlay>
      <Background
        source={require('../../assets/background.png')}
      />
    </Container>
  )
}

export default Login