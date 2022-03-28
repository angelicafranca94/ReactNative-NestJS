import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import usuarioService from '../services/UsuarioService';
import CustomDialog from '../components/CustomDialog';
import styles from '../style/MainStyle';
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Login({navigation}) {

  const [visibleDialog, setVisibleDialog] = useState(false);
  const [titulo, setTitulo] = useState(null)
  const [mensagem, setMensagem] = useState(null)
  const [tipo, setTipo] = useState(null)


  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [isLoadingToken, setLoadingToken] = useState(true)

  const showDialog = (titulo, mensagem, tipo) => {
    setVisibleDialog(true)
    setTitulo(titulo)
    setMensagem(mensagem)
    setTipo(tipo)
  }

  const hideDialog = (status) => {
    setVisibleDialog(status)
  }
  

  const entrar = () => {

    let data = {
      username: email,
      password: password
    }
    
    usuarioService.login(data)
    .then((response) => {
      setLoading(false)
      navigation.reset({
        index: 0,
        routes: [{name: "Principal"}]
      })
    
    })
    .catch((error) => {
      debugger;
      setLoading(false)
      showDialog("Erro","Usuário não encontrado", "ERRO")
    })
  }
  
  const cadastrar = () => {
    navigation.navigate("Cadastro")

  }

  const logarComToken = (token) => {

    setLoadingToken(true)
    let data = {
      token: token
    }
    
    usuarioService.loginComToken(data)
    .then((response) => {
      setLoadingToken(false)
      navigation.reset({
        index: 0,
        routes: [{name: "Principal"}]
      })
    
    })
    .catch((error) => {
      setLoadingToken(false)
    })
  }

  useEffect(() => {
    AsyncStorage.getItem("TOKEN").then((token) => {
      logarComToken(token)
    })
  }, [])

  return (
    <View style={[styles.container, specifcStyle.specificContainer]}>


      {isLoadingToken &&
      <Text>Em instantes vamos te logar no app</Text>
      }

      {!isLoadingToken &&
      <>
        <Text h3>Entre no TemTudaki</Text>

        <Input
        placeholder="E-mail"
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        onChangeText={value => setEmail(value)}
        keyboardType="email-address"
        />

        <Input
        placeholder="Sua senha"
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        onChangeText={value => setPassword(value)}
        secureTextEntry={true}
        />

        {isLoading &&
          <ActivityIndicator/>
        }

        { !isLoading &&
        <Button
                icon={
                  <Icon
                    name="check"
                    size={15}
                    color="white"
                  />
                }
                title="Entrar"
                buttonStyle={specifcStyle.button}
                onPress={() => entrar()}
        />
        }

            <Button
              icon={
                <Icon
                  name="user"
                  size={15}
                  color="white"
                />
              }
              title="Cadastrar"
              buttonStyle={specifcStyle.button}
              onPress={() => cadastrar()}
            />
      </>
    }
            
        { visibleDialog && 
          <CustomDialog titulo={titulo} mensagem={mensagem} tipo={tipo} visible={visibleDialog} onClose={hideDialog}></CustomDialog>
        }
    </View>
  );
}


const specifcStyle = StyleSheet.create({
  specificContainer: {
    backgroundColor: "#FFF"
  },
  button: {
    marginTop:10
  }
})