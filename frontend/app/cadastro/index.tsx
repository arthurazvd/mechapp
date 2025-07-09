import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from "../../components/CustomInput";
import { PasswordInput } from "../../components/PasswordInput";
import { BackButton } from '../../components/BackButton';

import { globalStyles, colors, spacing } from '../../styles/globalStyles';
import { cadStyles } from './styles'; // Assuming cadStyles might still have specific layout adjustments
import { formatarContato } from '../../utils/formatters';

export default function CadastroScreen() { // Renamed component for clarity
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
  
  // Placeholder for actual registration logic
  const handleCadastro = () => {
    if (senha !== confsenha) {
      alert("As senhas não coincidem!");
      return;
    }
    // Add other validations as needed
    console.log("Cadastrando:", { nome, email, telefone });
    router.push('/cadastro/oficina');
  };

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <ScrollView
        style={{backgroundColor: colors.background }}
        contentContainerStyle={[
          globalStyles.container,
          {paddingTop: insets.top, paddingBottom: insets.bottom, justifyContent: 'flex-start'} // Adjusted for ScrollView
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={cadStyles.initialTop}>
          <BackButton color={colors.white}/>
          <Text style={globalStyles.title}>Cadastro</Text>
        </View>
        <View style={[globalStyles.initialBottom, styles.formContainer]}>
          <CustomInput
              placeholder="Nome completo"
              label="Nome"
              value={nome}
              onChangeText={setNome}
              style={styles.inputField}
          />
          <CustomInput
              placeholder="(XX) XXXXX-XXXX"
              label="Telefone"
              keyboardType='numeric'
              value={telefone}
              onChangeText={handleContatoChange}
              style={styles.inputField}
              maxLength={15} // Max length for formatted phone number
          />
          <CustomInput
              placeholder="seuemail@dominio.com"
              label="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.inputField}
          />
          <PasswordInput
              placeholder="Mínimo 6 caracteres"
              label="Senha"
              value={senha}
              onChangeText={setSenha}
              containerStyle={styles.inputField}
          />
          <PasswordInput
              placeholder="Repita sua senha"
              label="Confirmar Senha"
              value={confsenha}
              onChangeText={setConfsenha}
              containerStyle={styles.inputField}
          />

          <CustomButton
              style={styles.actionButton}
              title="Continuar" // Changed title for clarity
              onPress={handleCadastro}
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
    alignItems: 'center', // Center items like button and text link
  },
  inputField: {
    width: '100%',
    maxWidth: 450, // Consistent max width for form fields
    // marginBottom is handled by CustomInput/PasswordInput default
  },
  actionButton: {
    width: '100%',
    maxWidth: 450,
    height: 50,
    marginTop: spacing.large, // More space before button
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
