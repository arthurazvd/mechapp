import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from "../../components/CustomInput";
import { PasswordInput } from "../../components/PasswordInput";
import { BackButton } from '../../components/BackButton';

import { globalStyles, colors, spacing } from '../../styles/globalStyles';
import { cadStyles } from './styles';
import { formatarContato } from '../../utils/formatters';

// API
import { usuario } from "../../api";

export default function CadastroScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { tipo: tipo_recebido } = useLocalSearchParams(); // Pega tipo (cliente/mecânico)

  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confsenha, setConfsenha] = useState("");

  const handleContatoChange = (text: string) => {
    const ContatoFormatado = formatarContato(text);
    setTelefone(ContatoFormatado);
  };

  const handleCadastro = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Preencha nome, e-mail e senha.");
      return;
    }

    if (senha !== confsenha) {
      Alert.alert("Erro", "As senhas devem ser iguais.");
      return;
    }

    const tipo = typeof tipo_recebido === "string" ? tipo_recebido : "CLIENTE";

    try {
      const json = await usuario.registar_usuario({
        nome, email, senha, tipo, telefone
      });

      if (json.error) {
        Alert.alert("Erro", json.mensagem || "Erro ao cadastrar.");
        return;
      }

      // Salva o usuário logado (localStorage -> AsyncStorage no futuro)
      localStorage.setItem("usuario_atual", JSON.stringify(json.usuario));

      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");

      // Redireciona (aqui mantive para /pecas/cadastrar, mas você pode mudar conforme o fluxo)
      router.replace('/pecas/cadastrar');
    } catch (err) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    }
  };

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <ScrollView
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={[
          globalStyles.container,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            justifyContent: 'flex-start'
          }
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={cadStyles.initialTop}>
          <BackButton color={colors.white} />
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
            maxLength={15}
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
            title="Cadastrar"
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
