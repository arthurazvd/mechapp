import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing } from '../styles/globalStyles';

interface BackButtonProps {
  color?: string;
  size?: number;
}

export const BackButton: React.FC<BackButtonProps> = ({ color = colors.white, size = 24 }) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.back()} style={styles.button}>
      <Feather name="arrow-left" size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: spacing.small,
    position: 'absolute',
    top: spacing.small, 
    left: spacing.small,
    zIndex: 10,
  },
});
