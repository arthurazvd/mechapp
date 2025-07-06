import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


interface BackButtonProps {
  color?: string;
  size?: number;
}

export const BackButton: React.FC<BackButtonProps> = ({ color = '#fff', size = 24 }) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.back()} style={styles.button}>
      <Feather name="arrow-left" size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
});
