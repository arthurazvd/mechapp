import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../styles/globalStyles';

interface BottomNavigationProps {
  activeRoute?: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeRoute }) => {
  // const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Feather name="search" size={22} color={colors.white} />
        <Text style={styles.label}>Busca</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <MaterialIcons name="build" size={22} color={colors.white} />
        <Text style={styles.label}>Oficinas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.homeButton}>
        <Feather name="home" size={24} color={colors.primary} />
        <Text style={styles.homeLabel}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Feather name="list" size={22} color={colors.white} />
        <Text style={styles.label}>Histórico</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <FontAwesome5 name="user-alt" size={20} color={colors.white} />
        <Text style={styles.label}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.small,
    width: '100%',
    height: '10%', // Consider if a fixed DP value might be better for consistency across screen sizes
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20, // Could be a theme variable if used elsewhere
    borderTopRightRadius: 20, // Could be a theme variable
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: typography.fontSizeLabel - 2, // Example: 12
    color: colors.textSecondary, // Was #ccc
    marginTop: spacing.small / 2,
  },
  homeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingVertical: spacing.medium - 2, // 14
    paddingHorizontal: spacing.medium + 4, // 20
    borderRadius: 20, // Could be a theme variable
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4, // These shadow props are fine as is, or could be a utility style
  },
  homeLabel: {
    fontSize: typography.fontSizeLabel - 2, // Example: 12
    color: colors.primary,
    marginTop: spacing.small / 2,
  },
});

export default BottomNavigation;
