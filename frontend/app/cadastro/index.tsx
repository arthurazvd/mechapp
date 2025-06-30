import React, { useState } from 'react';
import { View, Text, Alert, Image } from "react-native";
import { useRouter } from 'expo-router';

import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from "../../components/CustomInput";
import { PasswordInput } from "../../components/PasswordInput";

import { globalStyles } from '../../styles/globalStyles';
import { cadStyles } from './styles';

export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
      if (!email || !senha) {
        Alert.alert("Erro", "Preencha todos os campos!");
        return;
      }
  
      Alert.alert("Login", "Login realizado com sucesso!");
    };
  
  return (
    <View style={globalStyles.container}>
    <View style={cadStyles.initialTop}>
        <Text style={globalStyles.title}>Cadastro</Text>
    </View>
      <View style={globalStyles.initialBottom}>
        <CustomInput
            placeholder="Nome"
            label="Nome"
            value={email}
            onChangeText={setEmail}
            contentStyle={{ width: "80%", maxWidth: 400 }}
        />
        <CustomInput
            placeholder="Telefone" 
            label="Telefone"
            value={email}
            onChangeText={setEmail}
            contentStyle={{ width: "80%", maxWidth: 400 }}
        />
        <CustomInput
            placeholder="E-mail"
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            contentStyle={{ width: "80%", maxWidth: 400 }}
        />
        <PasswordInput
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
        />
        <PasswordInput
            placeholder="Confirmar Senha"
            value={senha}
            onChangeText={setSenha}
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
            onPress={handleLogin}
        />

        <Text style={globalStyles.text}>Já tem uma conta?</Text>
        <Text style={globalStyles.link}>Fazer Login</Text>
      </View>
    </View>
  );
}
