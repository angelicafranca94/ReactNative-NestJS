import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Button, CheckBox, Input, Text } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomDialog from '../components/CustomDialog';
import servicoService from '../services/ServicoService';
import usuarioService from '../services/UsuarioService';
import styles from '../style/MainStyle';

export default function CadastroServico() {

  const [titulo, setTitulo] = useState(null)
  const [descricao, setDescricao] = useState(null)
  const [errorTitulo, setErrorTitulo] = useState(null)
  const [errorDescricao, setErrorDescricao] = useState(null)
  const [isLoading, setLoading] = useState(false)
  
  const validar = () => {
    let error = false
    setErrorTitulo(null)
    setErrorDescricao(null)
 
    if (titulo == null){
      setErrorTitulo("Preencha o titulo")
      error = true
    }
    if (descricao == null){
      setErrorDescricao("Preencha a descrição")
      error = true
    }
  
    return !error
  }

  const salvar = () => {
    if (validar()){
      setLoading(true)
      
      let data = {
        titulo: titulo,
        descricao: descricao
      }
      
      servicoService.cadastrar(data)
      .then((response) => {
        setLoading(false)
        // const titulo = (response.data.status) ? "Sucesso!" : "Erro!"
        // showDialog(titulo, response.data.message, "SUCESSO")
        Alert.alert(response.data.message)
        setTitulo(null)
        setDescricao(null)          
      })
      .catch((error) => {
        debugger;
        setLoading(false)
       // console.log(JSON.stringify(error));
       // showDialog("Erro","Houve um erro inesperado", "ERRO")
        Alert.alert("Erro", "Houve um erro inesperado")
      })
    }
  }



    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : null}
        style={[styles.container]}
        keyboardVerticalOffset={80}>

        <ScrollView style={{width: "100%"}}>

          <Text h3>Cadastre-se</Text>

          <Input
            placeholder="Título do serviço"
            onChangeText={value => {
              setTitulo(value)
              setErrorTitulo(null)
            }}
            errorMessage={errorTitulo}
          />

          <Input
            placeholder="Descreva o serviço"
            onChangeText={value => {
              setDescricao(value)
              setErrorDescricao(null)
            }}
            errorMessage={errorDescricao}
          />



          { isLoading && 
            <Text>Carregando...</Text>
          }

          { !isLoading && 
          <>
          <Button
            icon={
              <Icon
                name="check"
                size={15}
                color="white"
              />
            }
            title="Salvar"
            buttonStyle={styles.button}
            onPress={() => salvar()}
          />
          <Button
          icon={
            <Icon
              name="stop"
              size={15}
              color="white"
            />
          }
          title="Cancelar"
          buttonStyle={[styles.button, styles.cancelButton]}
          onPress={() => cancelar()}
        />
        </>
          }
        </ScrollView>

      </KeyboardAvoidingView>
    );
}
  