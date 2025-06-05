import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { globalStyles } from './styles/globalStyles';
import CustomButton from './components/CustomButton';
import { Image } from 'react-native';

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
            <Image source={require('./assets/logo.png')} style={{ width: 150, height: 150 }}
  resizeMode="contain"/>
            <Text style={globalStyles.title}>Seja Bem-Vindo</Text>
        </View>
              
        <View style={globalStyles.initialBottom}>
            <CustomButton style={{ width: '80%', maxWidth: 400, height: 50 }} title="Entre" onPress={handleLogin} />
            <CustomButton style={{ width: '80%', maxWidth: 400, height: 50 }} title="Cadastre-se" onPress={handleLogin} />
        </View>
    </View>
  );
};

export default LoginScreen;
