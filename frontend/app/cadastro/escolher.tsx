import React from 'react'; // Removed useState
import { View, Text, StatusBar, StyleSheet } from 'react-native'; // Added StyleSheet
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomButton } from '../../components/CustomButton';
import { BackButton } from '../../components/BackButton';

import { globalStyles, colors, spacing } from '../../styles/globalStyles'; // Import theme
import { cadStyles } from './styles'; // cadStyles.initialTop is used

export default function EscolherTipoCadastroScreen() { // Renamed component
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={[globalStyles.container,{paddingTop: insets.top,paddingBottom: insets.bottom,},]}>
        <View style={cadStyles.initialTop}>
          <BackButton color={colors.white} />
          <Text style={globalStyles.title}>Cadastro</Text>
        </View>
        <View style={[globalStyles.initialBottom, styles.contentContainer]}>
          <Text style={[globalStyles.title2, styles.subtitle]}>O que você é?</Text>
          <CustomButton
            title="Sou Cliente" // Slightly more engaging text
            style={styles.choiceButton}
            onPress={() => router.push('/cadastro')} // Navigate to client registration
          />
          <CustomButton
            title="Sou Mecânico / Oficina" // Clarified text
            style={styles.choiceButton}
            onPress={() => router.push('/cadastro/oficina')} // Navigate to workshop registration
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: spacing.large,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    flex: 1, // Ensure it takes available space after header
  },
  subtitle: {
    marginBottom: spacing.xlarge, // More space after subtitle
  },
  choiceButton: {
    width: '100%', // Buttons take full width of their container
    maxWidth: 350, // Max width for buttons
    height: 60, // Slightly taller buttons
    marginBottom: spacing.medium, // Space between buttons
    // paddingVertical from CustomButton will apply if not overridden by height
  },
});
