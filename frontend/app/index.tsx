import React, { useState } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

import { CustomButton } from '../components/CustomButton';

import { globalStyles } from '../styles/globalStyles';

export default function Index() {
  const router = useRouter();

  return (
    <>
      <StatusBar backgroundColor="#A10000" barStyle="light-content" />
      <View style={globalStyles.container}>
        <View style={globalStyles.initialTop}>
          <Image
            source={require("../assets/logo-vertical.png")}
            style={{ width: 170, height: 190 }}
            resizeMode="contain"
          />
        </View>
        <View style={globalStyles.initialBottom}>
          <Text style={globalStyles.title}>Seja bem-vindo</Text>
          <CustomButton
            title="Entrar"
            style={{ height: 50, width: "80%", maxWidth: 400, marginBottom: 5 }}
            onPress={() => router.push('/login')}
          />
          <CustomButton
            title="Cadastre-se"
            style={{ height: 50, width: "80%", maxWidth: 400, marginBottom: 5 }}
            onPress={() => router.push('/cadastro/escolher')}
          />
        </View>
      </View>
    </>
  );
}
