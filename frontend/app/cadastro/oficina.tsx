import React, { useState } from 'react';
import { View, Text, StatusBar, StyleSheet, ScrollView, TouchableOpacity } from "react-native"; 
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from "../../components/CustomInput";
import { BackButton } from '../../components/BackButton';

import { globalStyles } from '../../styles/globalStyles';
import { cadStyles } from '../../styles/cadStyles';
import { formatarDocumento, formatarContato } from '../../utils/formatters';

export default function CadastroOficinaScreen() { 
  const router = useRouter();
  const [nomeOficina, setNomeOficina] = useState("");
  const [documento, setDocumento] = useState(""); 
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");

  const handleDocumentoChange = (text: string) => {
    const DocFormatado = formatarDocumento(text);
    setDocumento(DocFormatado);
  };

  const handleTelefoneChange = (text: string) => {
    const TelefoneFormatado = formatarContato(text);
    setTelefone(TelefoneFormatado);
  };

  const insets = useSafeAreaInsets();

  const handleCadastroOficina = () => {
    console.log("Cadastrando Oficina:", { nomeOficina, documento, endereco, telefone });
    router.push('/login'); 
  };
  
  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <ScrollView
        style={{backgroundColor: colors.background}}
        contentContainerStyle={[
            globalStyles.container,
            {paddingTop: insets.top,paddingBottom: insets.bottom, justifyContent: 'flex-start'}
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={cadStyles.initialTop}>
          <BackButton color={colors.white}/>
          <Text style={globalStyles.title}>Cadastro da Oficina</Text>
        </View>
        <View style={[globalStyles.initialBottom, styles.formContainer]}>
          <CustomInput
              placeholder="Nome da sua oficina"
              label="Nome da Oficina"
              value={nomeOficina}
              onChangeText={setNomeOficina}
              style={styles.inputField}
          />
          <CustomInput
              placeholder="00.000.000/0000-00 ou 000.000.000-00"
              label="CNPJ / CPF"
              keyboardType='numeric'
              value={documento}
              onChangeText={handleDocumentoChange}
              style={styles.inputField}
              maxLength={18} 
          />
          <CustomInput
              placeholder="Rua, Número, Bairro, Cidade - UF"
              label="Endereço Completo"
              value={endereco}
              onChangeText={setEndereco}
              style={styles.inputField}
          />
          <CustomInput
              placeholder="(XX) XXXXX-XXXX"
              label="Telefone Comercial"
              keyboardType='numeric'
              value={telefone}
              onChangeText={handleTelefoneChange}
              style={styles.inputField}
              maxLength={15}
          />

          <CustomButton
              style={styles.actionButton}
              title="Finalizar Cadastro"
              onPress={handleCadastroOficina}
          />

          <View style={styles.loginRedirectContainer}>
            <Text style={globalStyles.text}>Já tem uma conta?</Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
                <Text style={globalStyles.link}>Fazer Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
    formContainer: {
      width: '100%',
      paddingHorizontal: spacing.large,
      alignItems: 'center',
    },
    inputField: {
      width: '100%',
      maxWidth: 450,
    },
    actionButton: {
      width: '100%',
      maxWidth: 450,
      height: 50,
      marginTop: spacing.large,
      marginBottom: spacing.medium,
    },
    loginRedirectContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: spacing.medium,
      gap: spacing.small,
    }
});
