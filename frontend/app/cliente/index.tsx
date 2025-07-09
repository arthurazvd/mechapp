import React from 'react';
import { View, StatusBar, Image, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { CustomButton } from '../../components/CustomButton';
import { BackButton } from '../../components/BackButton';
import { BottomNavigation } from '../../components/BottomNavigation';
import { globalStyles } from '../../styles/globalStyles';

const TelaCliente = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const buttons = [
  { title: 'Buscar Oficinas', icon: 'car-wrench', onPress: () => router.push('cliente/busca'), height: 130 },
  { title: 'Agendamentos', icon: 'calendar-clock', onPress: () => router.back(), height: 130 },
  { title: 'Orçamentos', icon: 'cash-multiple', onPress: () => router.back(), height: 130 },
  { title: 'Histórico', icon: 'history', onPress: () => router.back(), height: 130 },
] as const;

  return (
    <>
      <StatusBar backgroundColor="#A10000" barStyle="light-content" />
      <View
        style={[
          globalStyles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <View style={globalStyles.crudTop}>
          <BackButton />
          <Image
            source={require('../../assets/logo-nome.png')}
            style={{ width: 100, height: 190 }}
            resizeMode="contain"
          />
        </View>

        <View style={[globalStyles.crudBottom, { width: '100%', alignItems: 'center' }]}>
          <View style={{width: '100%', alignItems: 'center', gap: 12 }}>
            {buttons.map((btn, index) => (
              <Animatable.View
                key={index}
                animation="fadeInUp"
                delay={index * 100}
                style={{ width: '90%' }}
              >
                <View style={{ position: 'relative', justifyContent: 'center' }}>
                  <MaterialCommunityIcons
                    name={btn.icon}
                    size={26}
                    color="#fff"
                    style={{
                      position: 'absolute',
                      left: 25,
                      zIndex: 2,
                    }}
                  />

                  {/* Botão com padding à esquerda pra ícone não cobrir texto */}
                  <CustomButton
                    style={{
                      height: btn.height || 100,
                      backgroundColor: '#2d2d2d',
                      paddingLeft: 60,
                      borderRadius: 14,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}
                    title={btn.title}
                    onPress={btn.onPress}
                  />
                </View>
              </Animatable.View>
            ))}
          </View>
        </View>

        <BottomNavigation />
      </View>
    </>
  );
};

export default TelaCliente;
