import React, { useState } from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, ScrollView} from "react-native";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from "../../components/CustomInput";
import { PasswordInput } from "../../components/PasswordInput";
import { BackButton } from '../../components/BackButton';

import { globalStyles, colors, spacing  } from '../../styles/globalStyles';
import { cadStyles } from '../../styles/cadStyles';
import { formatarContato } from '../../utils/formatters';

// API
import { usuario } from "../../api/index";

export default function CadastroScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confsenha, setConfsenha] = useState("");
  const { tipo: tipo_recebido } = useLocalSearchParams();

  const handleContatoChange = (text: string) => {
    const ContatoFormatado = formatarContato(text);
    setTelefone(ContatoFormatado);
  };

  
  // Cadastro de usuário
  const handleCadastro = async () => {
    if (!email || !nome || !senha) {
      alert("Digite email, nome e senha.");
      return;
    }

    if (senha != confsenha) {
      alert("As senhas devem ser iguais.");
      return;
    }

    var tipo = "CLIENTE"
    if (typeof tipo_recebido === "string") {
      tipo = tipo_recebido;
    }

    // Resposta da requisição
    const json = await usuario.registar_usuario({
      nome, email, senha, tipo, telefone
    });

    // Caso aconteça algum tipo de erro
    if (json.error) {
      alert(json.mensagem);
      return;
    }

    // Login efetuado com sucesso, salvando no local storage
    localStorage.setItem("usuario_atual", JSON.stringify(json.usuario));

    // Redirecionando
    router.replace('/pecas/cadastrar');
  }

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
              style={{
              width: "90%",
              maxWidth: 400,
              height: 50,
              marginTop: 20,
              marginBottom: 20,
              }}
              title="Cadastrar"
              onPress={handleCadastro}
          />

          <Text style={globalStyles.text}>Já tem uma conta?</Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={globalStyles.link}>Fazer Login</Text>
          </TouchableOpacity>
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
