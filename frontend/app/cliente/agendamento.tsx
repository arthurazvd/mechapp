import React, { useState } from 'react';
import { View, StatusBar, Image, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackButton } from '../../components/BackButton';
import { BottomNavigation } from '../../components/BottomNavigation';
import { AgendamentoCard } from '../../components/AgendamentoCard';

import { globalStyles } from '../../styles/globalStyles';

const VisualizarPeca = () => {
    const router = useRouter();

    const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar backgroundColor="#A10000" barStyle="light-content" />
      <View style={[globalStyles.container,{paddingTop: insets.top,paddingBottom: insets.bottom,},]}>
        <View style={globalStyles.crudTop}>
          <BackButton />
          <Image source={require('../../assets/logo-nome.png')} style={{ width: 100, height: 190 }} resizeMode="contain"/>
        </View>
        <View style={globalStyles.telaServicos}>
          <View style={globalStyles.homeButtons}>
            <Text style={globalStyles.title}>Agendamento</Text>
            
            <AgendamentoCard
              servico="Troca de óleo"
              oficina="Oficina Premium"
              status="pendente"
              onPress={() => router.back()}
            />

          </View>
          
        </View>
        <BottomNavigation />
      </View>
    </>
  );
};

export default VisualizarPeca;