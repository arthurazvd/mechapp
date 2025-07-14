import React from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomButton } from '../../components/CustomButton';
import { BackButton } from '../../components/BackButton';

import { globalStyles, colors, spacing } from '../../styles/globalStyles';
import { cadStyles } from './styles';

export default function EscolherTipoCadastroScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

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
            title="Sou Cliente"
            style={styles.choiceButton}
            onPress={() => router.push('/cadastro')}
          />
          <CustomButton
            title="Sou Mecânico / Oficina"
            style={styles.choiceButton}
            onPress={() => router.push('/cadastro/oficina')}
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
