import React, { useState } from 'react';
import { View, Text, Alert, Image } from "react-native";
import { useRouter } from 'expo-router';

import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from "../../components/CustomInput";

import { globalStyles } from '../../styles/globalStyles';
import { cadStyles } from './styles';

export default function Index() {
  const router = useRouter();
  const [oficina, setOfc] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEnde] = useState("");
  const [contato, setContato] = useState("");

  
  return (
    <View style={globalStyles.container}>
    <View style={cadStyles.initialTop}>
        <Text style={globalStyles.title}>Cadastro</Text>
    </View>
      <View style={globalStyles.initialBottom}>
        <CustomInput
            placeholder="Nome da oficina"
            label="Nome da oficina"
            value={oficina}
            onChangeText={setOfc}
            contentStyle={{ width: "80%", maxWidth: 400 }}
        />
        <CustomInput
            placeholder="CNPJ/CPF" 
            label="CNPJ/CPF"
            value={cnpj}
            onChangeText={setCnpj}
            contentStyle={{ width: "80%", maxWidth: 400 }}
        />
        <CustomInput
            placeholder="Endereço"
            label="Endereço"
            value={endereco}
            onChangeText={setEnde}
            contentStyle={{ width: "80%", maxWidth: 400 }}
        />
        <CustomInput
            placeholder="Contato"
            label="Contato"
            value={contato}
            onChangeText={setContato}
            contentStyle={{ width: "80%", maxWidth: 400 }}
        />

        <CustomButton
            style={{
            width: "80%",
            maxWidth: 400,
            height: 50,
            marginTop: 20,
            marginBottom: 20,
            }}
            title="Cadastrar"
            onPress={() => console.log('Botão pressionado, mas sem ação!')}
        />

        <Text style={globalStyles.text}>Já tem uma conta?</Text>
        <Text style={globalStyles.link}>Fazer Login</Text>
      </View>
    </View>
  );
}
