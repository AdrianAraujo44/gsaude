import React, { useState, useRef, useContext } from 'react'
import { Ionicons } from '@expo/vector-icons'
import SelectDropdown from 'react-native-select-dropdown'
import DefaultButton from '../../components/DefaultButton'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import NotificationsModal from '../../components/Modals/NotificationsModal'
import { AuthContext } from '../../providers/user/context'

import {
  Container,
  Overlay,
  NotificationButton,
  ExitButton,
  Box,
  Badge,
  Text,
  Input,
  Wrapper,
  Logo,
  Dropdown,
  Background,
  LoginButton,
  SignupButton
} from './styles'

const Home = () => {
  const [selectInput, setSelectInput] = useState('')
  const [searchState, setSearchState] = useState('')
  const modalizeRef = useRef(null)
  const navigation = useNavigation()
  const selectOptions = ["Estou procurando um remédio", "Estou procurando um posto de saúde"]
  const { user, signOut } = useContext(AuthContext)

  const handleSubmit = () => {
    if(selectInput == 'medicine' && searchState.trim() != '') {
      navigation.navigate("SearchMedicine",{medicine:searchState})

    }else if (selectInput == 'healthCenter' && searchState.trim() != '') {
      navigation.navigate("SearchHealthCenter",{healthCenter:searchState})
      
    }else {
      showToast()
    }
  }

  function onOpen() {
    modalizeRef.current?.open()
  }

  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Temos um problema !',
      text2: 'Você deve preencher todos os campos'
    });
  }

  return (
    <>
      <Container>
        <Overlay>
          {
            user.isLoading != false && (
              <Box>
                <NotificationButton activeOpacity={0.7} onPress={onOpen} >
                  <Badge>
                    <Text fs={"10px"}>{user.notifications.length}</Text>
                  </Badge>
                  <Ionicons name="notifications" size={30} color="#fff"/>
                </NotificationButton>
                <ExitButton activeOpacity={0.7} onPress={() => signOut()}>
                  <Ionicons name="exit" size={27} color="#fff"/>
                </ExitButton>
              </Box>
              
            )
          }
          <Wrapper>
            <Logo 
              source={require('./../../assets/logo.png')}
              resizeMode="contain"
            />
            <Dropdown>
              <SelectDropdown
                data={selectOptions}
                defaultButtonText={"Como podemos ajudar ?"}
                dropdownStyle={{borderRadius:5}}
                buttonStyle={{borderRadius:10, width:'100%',height:44,backgroundColor:"#fff"}}
                buttonTextStyle={{color:"#6C6868", textAlign:'left', fontSize:14}}
                rowStyle={{padding:10}}
                rowTextStyle={{textAlign:'left', fontSize:14}}
                dropdownOverlayColor={"rgba(0,0,0,0.70)"}
                renderDropdownIcon={()=> <Ionicons name="caret-down-sharp" size={20} color="#C4C4C4"/>}
                onSelect={(selectedItem, index) => {
                  if(index == 0) {
                    setSelectInput('medicine')
                  }else {
                    setSelectInput('healthCenter')
                  }

                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                  return item
                }}
              />
            </Dropdown>
            <Input 
              placeholder="O que você deseja ?"
              placeholderTextColor={"#6C6868"}
              onChangeText={(text) => setSearchState(text)}
            />
            <DefaultButton  name="Pesquisar" action={handleSubmit}/>
            {
              user.isLoading == false && (
                <>
                  <LoginButton activeOpacity={0.7} onPress={() => navigation.navigate("Login")}>
                    <Text fs={"18px"}>Login</Text>
                  </LoginButton>
                  <SignupButton activeOpacity={0.7} onPress={() => navigation.navigate("Signup")}>
                    <Text fs={"12px"}>Deseja criar uma conta ?</Text>
                  </SignupButton>
                </>
              )
            }
          </Wrapper>
        </Overlay>
        <Background 
          source={require('../../assets/background.png')}
        />
      </Container>
      <NotificationsModal modalizeRef={modalizeRef} />
    </>
  )
}
export default Home