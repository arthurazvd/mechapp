import React, { useState } from 'react';
import { View, StatusBar, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomButton } from '../../components/CustomButton';
import { BackButton } from '../../components/BackButton';
import { BottomNavigation } from '../../components/BottomNavigation';

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
        <View style={globalStyles.crudBottom}>
          <View style={globalStyles.homeButtons}>
              <CustomButton
                  style={{ width: '80%', height: 200, backgroundColor: '#242424'}}
                  title="Buscar Oficinas"
                  onPress={() => router.push('cliente/busca')}
              />
              <CustomButton
                  style={{ width: '80%', height: 100, backgroundColor: '#242424'}}
                  title="Agendamentos"
                  onPress={() => router.back()}
              />
              <CustomButton
                  style={{ width: '80%', height: 100, backgroundColor: '#242424'}}
                  title="Orçamentos"
                  onPress={() => router.back()}
              />
              <CustomButton
                  style={{ width: '80%', height: 100, backgroundColor: '#242424'}}
                  title="Histórico"
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