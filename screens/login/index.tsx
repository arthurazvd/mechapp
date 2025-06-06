import { View, Text, TextInput, Alert } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import CustomButton from '../../components/CustomButton';
import { CustomInput } from '../../components/CustomInput';
import { PasswordInput } from '../../components/PasswordInput';
import { Image } from 'react-native';
import React, { useState } from 'react';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    Alert.alert('Login', 'Login realizado com sucesso!');
  };

  return (
    <View style={globalStyles.container}>
        <View style={globalStyles.initialTop}>
            <Image source={require('../../assets/logo.png')} style={{ width: 150, height: 150 }}
  resizeMode="contain"/>
        </View>
              
        <View style={globalStyles.initialBottom}>
          <Text style={globalStyles.title}>Login</Text>
          <CustomInput
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            inputStyle={{ width: '80%', maxWidth: 400, height: 50 }}
          />
          <PasswordInput 
            placeholder="Senha"
            value={senha} 
            onChangeText={setSenha}
          />

          <Text style={globalStyles.text}>Esqueci minha senha</Text>

          <CustomButton 
            style={{ width: '80%', maxWidth: 400, height: 50, marginTop: 20,marginBottom: 20}} 
            title="Entrar" 
            onPress={handleLogin} />
          
          <Text style={globalStyles.text}>Não tem uma conta?</Text>
          <Text style={globalStyles.link}>Cadastre-se</Text>

        </View>
    </View>
  );
};

export default LoginScreen;
