import React, { useState } from "react";
import { View, Text, Alert, Image } from "react-native";
import { useRouter } from 'expo-router';

// Componentes
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import { PasswordInput } from "../../components/PasswordInput";
import { globalStyles } from "../../styles/globalStyles";

// Controller
//import { usuarioController } from "../../controllers/usuario_controller";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    Alert.alert("Login", "Login realizado com sucesso!");
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.initialTop}>
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
          onPress={() => router.push('/pecas/visualizar')}
        />

        <Text style={globalStyles.text}>Não tem uma conta?</Text>
        <Text style={globalStyles.link}>Cadastre-se</Text>
      </View>
    </View>
  );
};

export default LoginScreen;
