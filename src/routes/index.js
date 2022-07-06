import React, { useEffect, useReducer, useMemo } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Apresentation from '../screens/Apresentation'
import Login from '../screens/Login'
import Home from '../screens/Home'
import HealthCenter from '../screens/HealthCenter'
import Signup from '../screens/Signup'
import Otp from '../screens/Signup/otp'
import Register from '../screens/Signup/register'
import Fullmap from '../screens/Fullmap'
// import NewMedicine from '../screens/NewMedicine'
import Dashboard from '../screens/Dashboard'
import SearchMedicine from '../screens/SearchMedicine'
import ListMedicine from '../screens/ListMedicine'
// import ListHealthCenter from '../screens/ListHealthCenter'
import PDFView from '../screens/PDFView'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api'
import { Alert } from 'react-native'
import { AuthContext } from '../providers/user/context'
import { useNavigation } from '@react-navigation/core'
import RegisterNewMedicine from '../screens/RegisterNewMedicine'
import SearchHealthCenter from '../screens/SearchHealthCenter'

const Stack = createNativeStackNavigator()

const Routes = () => {
  const navigation = useNavigation()

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null
  }

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          ...action.id,
          isLoading: action.token != null ? true: false ,
        }
      case 'LOGIN':
        return {
          // ...prevState,
          ...action.id,
          userToken: action.token,
          isLoading: true,
        }
      case 'LOGOUT':
        return {
          // ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        }
      case 'REGISTER':
        return {
          ...prevState,
          ...action.id,
          userToken: action.token,
          isLoading: false,
        }
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)

  const authContext = useMemo(() => ({
    signIn: async (email, password) => {
      let userToken = null
      let user = null
      try {
        if(password.trim() != '' & email.trim() != '') {
          const response = await api.post('/user/login', { email:email, password:password })
          if (response.data.type  ==  "success") {
            userToken = 'bbb'
            user = response.data.user
            await AsyncStorage.setItem('userToken', userToken)
            await AsyncStorage.setItem('gsaude@user', JSON.stringify(user))

            dispatch({ type: 'LOGIN', id: user, token: userToken })
            if(user.healthCenterId == undefined) {
              navigation.navigate("Home")
              Toast.show({
                type: 'success',
                text1: 'Usuário logado com sucesso!',
              });
            }
          }else {
            Toast.show({
              type: 'error',
              text1: response.data.message,
            });
          }
        }else {
          Toast.show({
            type: 'error',
            text1: 'Temos um problema!',
            text2: 'você precisa preencher todos os campos.',
          });
        }
      } catch (error) {
        console.log(error)
      }
    },
    signOut:() => {
      try {
        Alert.alert('Deseja sair ?',
          loginState.healthCenterId != undefined 
            ? 'ao sair de sua conta você não poderar ver mais notificações até que esteja logado novamente'
            : '', 
          [
            {text: 'cancelar', style: "cancel"},
            {
              text: 'sair',
              onPress: async() => {
                await AsyncStorage.removeItem('userToken')
                await AsyncStorage.removeItem('gsaude@user')
                Toast.show({
                  type: 'success',
                  text1: 'Você foi deslogado!',
                });
                dispatch({ type: 'LOGOUT' })
                delete loginState.healthCenterId
              }
            }
          ])
      } catch (err) {
        console.log(err)
      }
    },
    signUp: async(email, password, name, dateOfBirth, cpf) => {
      let userToken = null
      let newUser = null
      try {
        const response = await api.post('/user/newUser', { 
          email,
          password,
          name,
          dateOfBirth,
          cpf
        })
        if(response.data != null) {
          userToken = 'bbb'
          newUser = response.data
          await AsyncStorage.setItem('userToken', userToken)
          await AsyncStorage.setItem('gsaude@user', JSON.stringify(newUser))
          navigation.navigate("Login")
          Toast.show({
            type: 'success',
            text1: 'Usuário cadastrado com sucesso!',
          });

        }else {
          Toast.show({
            type: 'error',
            text1: 'Temos um problema!',
            text2: 'Algo de errado aconteceu, tente novamente mais tarde'
          });
        }

      }catch(error) {
        console.log(error)
      }

      // dispatch({ type: 'LOGIN', id:newUser, token: userToken });

    }
  }), [])

  useEffect(() => {
    const getStorage = async () => {
      let userToken = null
      try {
        userToken = await AsyncStorage.getItem('userToken')
        user = await AsyncStorage.getItem('gsaude@user')
  
      } catch (err) {
        console.log(err)
      }
      dispatch({ type: 'RETRIVE_TOKEN', id:JSON.parse(user), token: userToken })
    }

    getStorage()
  }, [])

  return (
    <AuthContext.Provider 
      value={{
        signIn: authContext.signIn, 
        signOut: authContext.signOut,
        signUp: authContext.signUp,
        user: loginState}} >

      {(loginState.healthCenterId != undefined) ? (
        <Stack.Navigator>
          <Stack.Screen 
            name="Dashboard"
            component={Dashboard}
            options={{
              headerShown:false
            }}
          />
          {/* <Stack.Screen 
            name="NewMedicine"
            component={NewMedicine}
            options={{
              headerShown:false
            }}
          /> */}
          <Stack.Screen 
            name="RegisterNewMedicine"
            component={RegisterNewMedicine}
            options={{
              headerShown:false
            }}
          />
          <Stack.Screen 
            name="ListMedicine"
            component={ListMedicine}
            options={{
              headerShown:false
            }}
          />
          <Stack.Screen 
            name="PDFView"
            component={PDFView}
            options={{
              title:'Bula'
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen 
          name="Apresentation"
          component={Apresentation}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen 
          name="Home"
          component={Home}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen 
          name="SearchMedicine"
          component={SearchMedicine}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen 
          name="Login"
          component={Login}
          options={{
            headerShown:false
          }}
        />
        
        <Stack.Screen 
          name="HealthCenter"
          component={HealthCenter}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen 
          name="Signup"
          component={Signup}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen 
          name="Otp"
          component={Otp}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen 
          name="Register"
          component={Register}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen 
          name="Fullmap"
          component={Fullmap}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen 
          name="PDFView"
          component={PDFView}
          options={{
            title:'Bula'
          }}
        />
        <Stack.Screen 
          name="ListMedicine"
          component={ListMedicine}
          options={{
            headerShown:false
          }}
        />
        {/* <Stack.Screen
          name="ListHealthCenter"
          component={ListHealthCenter}
          options={{
            headerShown: false
          }}
        /> */}
        <Stack.Screen
          name="SearchHealthCenter"
          component={SearchHealthCenter}
          options={{
            headerShown: false
          }}
        />
        </Stack.Navigator>
      )}
    </AuthContext.Provider>
  )
}

export default Routes