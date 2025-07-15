import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert, StatusBar, Image, TouchableOpacity } from "react-native";
import { useNavigationContainerRef, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Componentes
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import { PasswordInput } from "../../components/PasswordInput";
import { BackButton } from '../../components/BackButton';

import { globalStyles, colors, spacing } from "../../styles/globalStyles";

// API
import { usuario } from "../../api/index";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Realizando autenticação
  const handleLogin = async () => {
    if (!email || !senha) {
      alert("Digite um e-mail e senha");
      return;
    }

    // Resposta da requisição
    const json = await usuario.autenticar_usuario(email, senha);

    // Caso aconteça algum tipo de erro
    if (json.error) {
      alert(json.mensagem);
      return;
    }

    try {
      const json = await usuario.autenticar_usuario(email, senha);

      if (json.error) {
        Alert.alert("Erro", json.mensagem || "Erro ao realizar login.");
        return;
      }

      // Salvando dados do usuário (em async storage no futuro, aqui tá simplificado)
      localStorage.setItem("usuario_atual", JSON.stringify(json));

      Alert.alert("Sucesso", "Login realizado com sucesso!");
      router.replace('/agendamento/historico');
    } catch (err) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    }
  };

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={[globalStyles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={globalStyles.initialTop}>
          <BackButton color={colors.white} />
          <Image
            source={require("../../assets/logo-vertical.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={[globalStyles.initialBottom, styles.formContainer]}>
          <Text style={globalStyles.title}>Login</Text>
          <CustomInput
            placeholder="E-mail"
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            style={styles.inputField}
          />
          <PasswordInput
            placeholder="Senha"
            label="Senha"
            value={senha}
            onChangeText={setSenha}
            containerStyle={styles.inputField}
          />

          <TouchableOpacity onPress={() => Alert.alert("Esqueci minha senha", "Funcionalidade a ser implementada.")}>
            <Text style={[globalStyles.text, styles.forgotPassword]}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <CustomButton
            style={styles.loginButton}
            title="Entrar"
            onPress={handleLogin}
          />

          <Text style={globalStyles.text}>Não tem uma conta?</Text>
          <TouchableOpacity onPress={() => router.push('/cadastro/escolher')}>
            <Text style={globalStyles.link}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
    logo: {
        width: 170,
        height: 190,
    },
    formContainer: {
        paddingHorizontal: spacing.large,
    },
    inputField: {
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
    },
    forgotPassword: {
        marginVertical: spacing.medium,
    },
    loginButton: {
        width: '100%',
        maxWidth: 400,
        height: 50,
        marginTop: spacing.medium,
        marginBottom: spacing.large,
        alignSelf: 'center',
    }
});

export default LoginScreen;
