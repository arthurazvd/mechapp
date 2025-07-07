import React, { useState } from 'react';
import { View, Text, StatusBar } from "react-native";
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from "../../components/CustomInput";
import { BackButton } from '../../components/BackButton';

import { globalStyles } from '../../styles/globalStyles';
import { cadStyles } from './styles';
import { formatarDocumento, formatarContato } from '../../utils/formatters';

export default function Index() {
  const router = useRouter();
  const [oficina, setOfc] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEnde] = useState("");
  const [telefone, setTelefone] = useState("");

  const handleCnpjChange = (text: string) => {
    const DocFormatado = formatarDocumento(text);
    setCnpj(DocFormatado);
  };

  const handleTelefoneChange = (text: string) => {
    const TelefoneFormatado = formatarContato(text);
    setTelefone(TelefoneFormatado);
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
              placeholder="Nome da oficina"
              placeholderTextColor="#868686"
              label="Nome da oficina"
              value={oficina}
              onChangeText={setOfc}
              contentStyle={{ width: "80%", maxWidth: 400 }}
          />
          <CustomInput
              placeholder="CNPJ/CPF" 
              placeholderTextColor="#868686"
              label="CNPJ/CPF"
              keyboardType='numeric'
              value={cnpj}
              onChangeText={handleCnpjChange}
              contentStyle={{ width: "80%", maxWidth: 400 }}
          />
          <CustomInput
              placeholder="Endereço"
              placeholderTextColor="#868686"
              label="Endereço"
              value={endereco}
              onChangeText={setEnde}
              contentStyle={{ width: "80%", maxWidth: 400 }}
          />
          <CustomInput
              placeholder="Telefone"
              placeholderTextColor="#868686"
              label="Telefone"
              keyboardType='numeric'
              value={telefone}
              onChangeText={handleTelefoneChange}
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
              onPress={() => router.push('/login')}
          />

          <Text style={globalStyles.text}>Já tem uma conta?</Text>
          <Text style={globalStyles.link}>Fazer Login</Text>
        </View>
      </View>
    </>
  );
}
