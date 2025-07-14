import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../styles/globalStyles';

interface BottomNavigationProps {
  activeRoute?: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeRoute }) => {

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
    height: '10%', 
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: typography.fontSizeLabel - 2, 
    color: colors.textSecondary, 
    marginTop: spacing.small / 2,
  },
  homeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingVertical: spacing.medium - 2, 
    paddingHorizontal: spacing.medium + 4, 
    borderRadius: 20, 
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4, 
  },
  homeLabel: {
    fontSize: typography.fontSizeLabel - 2,
    color: colors.primary,
    marginTop: spacing.small / 2,
  },
});

export default BottomNavigation;
