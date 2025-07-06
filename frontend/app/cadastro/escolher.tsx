import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';

import { CustomButton } from '../../components/CustomButton';

import { globalStyles } from '../../styles/globalStyles';
import { cadStyles } from './styles';

export default function Index() {
  const router = useRouter();

  return (
    <View style={globalStyles.container}>
    <View style={cadStyles.initialTop}>
        <Text style={globalStyles.title}>Cadastro</Text>
    </View>
      <View style={globalStyles.initialBottom}>
        <Text style={globalStyles.title2}>O que você é?</Text>
        <CustomButton
          title="Cliente"
          style={{ height: 50, width: "80%", maxWidth: 400, marginBottom: 5 }}
          onPress={() => router.push('/cadastro')}
        />
        <CustomButton
          title="Mecânico"
          style={{ height: 50, width: "80%", maxWidth: 400, marginBottom: 5 }}
          onPress={() => router.push('/cadastro')}
        />
      </View>
    </View>
  );
}
