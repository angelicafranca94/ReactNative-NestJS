import * as React from 'react';
import { Alert, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Perfil({navigation}) {

    const logout = (navigation) => {
        AsyncStorage.removeItem("TOKEN").then(() => {

            navigation.reset({
                index: 0,
                routes: [{name: "Login"}]
              })

        }).catch(() => {
            Alert.alert("Erro","Houve um erro inesperado", "ERRO")
        })
        
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile!</Text>
        <Button
                icon={
                  <Icon
                    name="check"
                    size={15}
                    color="white"
                  />
                }
                title="Sair"
                onPress={() => logout(navigation)}
        />
      </View>
    );
  }