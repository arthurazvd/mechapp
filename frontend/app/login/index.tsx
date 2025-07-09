import React, { useState } from "react";
import { View, Text, Alert, StatusBar, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Componentes
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import { PasswordInput } from "../../components/PasswordInput";
import { BackButton } from '../../components/BackButton';

import { globalStyles, colors, spacing } from "../../styles/globalStyles";

// Controller
//import { usuarioController } from "../../controllers/usuario_controller";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();
  
  const insets = useSafeAreaInsets();
  
  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    Alert.alert("Login", "Login realizado com sucesso!");
    // router.push('/agendamento/historico'); // Keep navigation logic
  };

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={[globalStyles.container,{paddingTop: insets.top,paddingBottom: insets.bottom,},]}>
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
            // placeholderTextColor prop is now handled by CustomInput default
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            style={styles.inputField} // Using style for outer container for width control
          />
          <PasswordInput
            placeholder="Senha"
            label="Senha"
            // placeholderTextColor prop is now handled by PasswordInput default
            value={senha}
            onChangeText={setSenha}
            containerStyle={styles.inputField} // Using containerStyle for PasswordInput's wrapper
          />

          <TouchableOpacity onPress={() => Alert.alert("Esqueci minha senha", "Funcionalidade a ser implementada.")}>
            <Text style={[globalStyles.text, styles.forgotPassword]}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <CustomButton
            style={styles.loginButton}
            title="Entrar"
            onPress={() => router.push('/cliente')} // Original navigation
            // onPress={handleLogin} // If you want to use the handleLogin logic
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
    paddingHorizontal: spacing.large, // Add some horizontal padding
  },
  inputField: {
    width: '100%', // Inputs take full width of their container
    maxWidth: 400, // Max width for larger screens
    alignSelf: 'center', // Center the input field itself if its parent is wider
  },
  forgotPassword: {
    marginVertical: spacing.medium,
  },
  loginButton: {
    width: '100%', // Button takes full width of its container
    maxWidth: 400,
    height: 50, // Keep fixed height or use padding from CustomButton
    marginTop: spacing.medium,
    marginBottom: spacing.large, // Increased bottom margin
    alignSelf: 'center',
  },
});

export default LoginScreen;
