import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, CheckBox, Input, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style/MainStyle';

export default function Cadastro({navigation}) {

  const [email, setEmail] = useState(null)
  const [nome, setNome] = useState(null)
  const [cpf, setCpf] = useState(null)
  const [telefone, setTelefone] = useState(null)
  const [isSelected, setSelected] = useState(false)

  const salvar = () => {
    console.log("salvou")
  }

  return (
    <View style={[styles.container, specifcStyle.specificContainer]}>

      <Text h3>Cadastre-se</Text>

        <Input
        placeholder="E-mail"
        onChangeText={value => setEmail(value)}
        keyboardType="email-address"
        />

        <Input
          placeholder="Nome"
          onChangeText={value => setNome(value)}
        />

        <Input
          placeholder="CPF"
          onChangeText={value => setCpf(value)}
          keyboardType="number-pad"
          returnKeyType="done"
        />

        <Input
          placeholder="Telefone"
          onChangeText={value => setTelefone(value)}
          keyboardType="phone-pad"
          returnKeyType="done"
        />
      
        <CheckBox 
          title="Eu aceito os termos de uso"
          checkedIcon="check"
          uncheckedIcon="square-o"
          checkedColor="green"
          uncheckedColor="red"
          checked={isSelected}
          onPress={() => setSelected(!isSelected)}
        />

        <Button
                icon={
                  <Icon
                    name="check"
                    size={15}
                    color="white"
                  />
                }
                title="Salvar"
                buttonStyle={specifcStyle.button}
                onPress={() => salvar()}
        />
    </View>
  );
}


const specifcStyle = StyleSheet.create({
  specificContainer: {
    backgroundColor: "#fff"
  },
  button: {
    marginTop:10
  }
})