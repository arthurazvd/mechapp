import React from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomButton } from '../../components/CustomButton';
import { BackButton } from '../../components/BackButton';

import { globalStyles } from '../../styles/globalStyles';
import { cadStyles } from '../../styles/cadStyles';

export default function EscolherTipoCadastroScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  enum TipoUsuarioEnum {
    CLIENTE = 'CLIENTE',
    MECANICO = 'MECANICO',
  }

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={[globalStyles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={cadStyles.initialTop}>
          <BackButton color={colors.white} />
          <Text style={globalStyles.title}>Cadastro</Text>
        </View>
        <View style={[globalStyles.initialBottom, styles.contentContainer]}>
          <Text style={[globalStyles.title2, styles.subtitle]}>O que você é?</Text>
          <CustomButton
            title="Cliente"
            style={{ height: 50, width: "90%", maxWidth: 400, marginBottom: 5 }}
            onPress={() => router.push({
              pathname: '/cadastro', 
              params: { 
                tipo: TipoUsuarioEnum.CLIENTE as string,
              },
            })}
          />
          <CustomButton
            title="Mecânico"
            style={{ height: 50, width: "90%", maxWidth: 400, marginBottom: 5 }}
            onPress={() => router.push({
              pathname: '/cadastro', 
              params: { 
                tipo: TipoUsuarioEnum.MECANICO as string,
              },
            })}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: spacing.large,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  subtitle: {
    marginBottom: spacing.xlarge,
  },
  choiceButton: {
    width: '100%',
    maxWidth: 350,
    height: 60,
    marginBottom: spacing.medium,
  },
});
