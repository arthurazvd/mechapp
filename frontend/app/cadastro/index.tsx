import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity} from "react-native";
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from "../../components/CustomInput";
import { PasswordInput } from "../../components/PasswordInput";
import { BackButton } from '../../components/BackButton';

import { globalStyles } from '../../styles/globalStyles';
import { cadStyles } from './styles';
import { formatarContato } from '../../utils/formatters';


export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confsenha, setConfsenha] = useState("");

  const handleContatoChange = (text: string) => {
    const ContatoFormatado = formatarContato(text);
    setTelefone(ContatoFormatado);
  };

  const insets = useSafeAreaInsets();
  
  return (
    <>
      <StatusBar backgroundColor="#A10000" barStyle="light-content" /> 
      <View style={[globalStyles.container,{paddingTop: insets.top,paddingBottom: insets.bottom,},]}>
      <View style={cadStyles.initialTop}>
        <BackButton />
        <Text style={globalStyles.title}>Cadastro</Text>
      </View>
        <View style={globalStyles.initialBottom}>
          <CustomInput
              placeholder="Nome"
              placeholderTextColor="#868686"
              label="Nome"
              value={nome}
              onChangeText={setNome}
              contentStyle={{ width: "80%", maxWidth: 400 }}
          />
          <CustomInput
              placeholder="Telefone" 
              placeholderTextColor="#868686"
              label="Telefone"
              keyboardType='numeric'
              value={telefone}
              onChangeText={handleContatoChange}
              contentStyle={{ width: "80%", maxWidth: 400 }}
          />
          <CustomInput
              placeholder="E-mail"
              placeholderTextColor="#868686"
              label="E-mail"
              value={email}
              onChangeText={setEmail}
              contentStyle={{ width: "80%", maxWidth: 400 }}
          />
          <PasswordInput
              placeholder="Senha"
              label="Senha"
              placeholderTextColor="#868686"
              value={senha}
              onChangeText={setSenha}
          />
          <PasswordInput
              placeholder="Confirmar Senha"
              label="Confirmar Senha"
              placeholderTextColor="#868686"
              value={confsenha}
              onChangeText={setConfsenha}
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
              onPress={() => router.push('/cadastro/oficina')}
          />

          <Text style={globalStyles.text}>Já tem uma conta?</Text>
                  <TouchableOpacity onPress={() => router.push('/login')}>
                    <Text style={globalStyles.link}>Fazer Login</Text>
                  </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
