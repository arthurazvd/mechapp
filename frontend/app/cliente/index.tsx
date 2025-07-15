import React from 'react';
import { View, StatusBar, Image, Text, StyleSheet } from 'react-native'; 
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { CustomButton } from '../../components/CustomButton';
import { BackButton } from '../../components/BackButton';
import { BottomNavigation } from '../../components/BottomNavigation';
import { globalStyles, colors, spacing, typography } from '../../styles/globalStyles'; 

const TelaCliente = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const buttons = [
    { title: 'Buscar Oficinas', icon: 'car-wrench', onPress: () => router.push('cliente/busca'), height: 100 }, 
    { title: 'Agendamentos', icon: 'calendar-clock', onPress: () => router.push('/agendamento'), height: 100 }, 
    { title: 'Orçamentos', icon: 'cash-multiple', onPress: () => router.back(), height: 100 }, 
    { title: 'Histórico', icon: 'history', onPress: () => router.push('/agendamento/historico'), height: 100 }, 
  ] as const;

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View
        style={[
          globalStyles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <View style={globalStyles.crudTop}>
          <BackButton color={colors.white}/>
          <Image
            source={require('../../assets/logo-nome.png')}
            style={styles.logoNome}
            resizeMode="contain"
          />
        </View>

        <View style={[globalStyles.crudBottom, styles.buttonListContainer]}>
          <View style={styles.buttonsInnerContainer}>
            {buttons.map((btn, index) => (
              <Animatable.View
                key={index}
                animation="fadeInUp"
                delay={index * 100}
                style={styles.animatableButtonView}
              >
                <View style={styles.buttonWrapper}>
                  <MaterialCommunityIcons
                    name={btn.icon}
                    size={28} 
                    color={colors.textPrimary}
                    style={styles.buttonIcon}
                  />
                  <CustomButton
                    style={[
                        styles.menuButton,
                        { height: btn.height || 100 }
                    ]}
                    textStyle={styles.menuButtonText} 
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

const styles = StyleSheet.create({
  logoNome: {
    width: 100,
    height: 60, 
  },
  buttonListContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: spacing.large, 
  },
  buttonsInnerContainer: {
    width: '100%',
    alignItems: 'center',
    gap: spacing.medium, 
  },
  animatableButtonView: {
    width: '90%',
    maxWidth: 500, 
  },
  buttonWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  buttonIcon: {
    position: 'absolute',
    left: spacing.large, 
    zIndex: 2,
  },
  menuButton: {
    backgroundColor: colors.surface, 
    paddingLeft: spacing.xlarge + spacing.medium, 
    borderRadius: spacing.medium, 
    justifyContent: 'center',
    alignItems: 'flex-start', 
  },
  menuButtonText: {
    fontSize: typography.fontSizeText + 2, 
    fontWeight: typography.fontWeightBold, 
  }
});

export default TelaCliente;
