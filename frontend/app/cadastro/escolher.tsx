import React, { useState } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomButton } from '../../components/CustomButton';
import { BackButton } from '../../components/BackButton';

import { globalStyles } from '../../styles/globalStyles';
import { cadStyles } from './styles';

export default function Index() {
  const router = useRouter();

  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar backgroundColor="#A10000" barStyle="light-content" />
      <View style={[globalStyles.container,{paddingTop: insets.top,paddingBottom: insets.bottom,},]}>
      <View style={cadStyles.initialTop}>
        <BackButton />
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
    </>
  );
}
