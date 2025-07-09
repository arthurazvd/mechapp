import React, { useState, useEffect } from "react";
import { View, Text, Alert, StatusBar, Image, TouchableOpacity } from "react-native";
import { useNavigationContainerRef, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Componentes
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import { PasswordInput } from "../../components/PasswordInput";
import { BackButton } from '../../components/BackButton';

import { globalStyles } from "../../styles/globalStyles";

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

    // Login efetuado com sucesso, salvando no local storage
    localStorage.setItem("usuario_atual", JSON.stringify(json));

    // Redirecionando
    return router.replace('/pecas/cadastrar');
  };

  return (
    <>
      <StatusBar backgroundColor="#A10000" barStyle="light-content" />
      <View style={[globalStyles.container,{paddingTop: insets.top,paddingBottom: insets.bottom,},]}>
        <View style={globalStyles.initialTop}>
          <BackButton />
          <Image
            source={require("../../assets/logo-vertical.png")}
            style={{ width: 170, height: 190 }}
            resizeMode="contain"
          />
        </View>

        <View style={globalStyles.initialBottom}>
          <Text style={globalStyles.title}>Login</Text>
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

          <Text style={globalStyles.text}>Esqueci minha senha</Text>

          <CustomButton
            style={{
              width: "80%",
              maxWidth: 400,
              height: 50,
              marginTop: 20,
              marginBottom: 20,
            }}
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

export default LoginScreen;
