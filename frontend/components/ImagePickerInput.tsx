import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing, typography } from '../styles/globalStyles';

interface Props {
  imagem: string | null;
  setImagem: (uri: string) => void;
  containerStyle?: object;
  buttonStyle?: object;
  textStyle?: object;
}

export const ImagePickerInput = ({
  imagem,
  setImagem,
  containerStyle,
  buttonStyle,
  textStyle,
}: Props) => {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão Negada', 'Permissão para acessar a galeria foi negada!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity onPress={pickImage} style={[styles.button, buttonStyle]}>
        <Text style={[styles.text, textStyle]}>
          {imagem ? 'Alterar imagem' : 'Selecionar imagem'}
        </Text>
        {imagem && <Image source={{ uri: imagem }} style={styles.preview} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center', // Let parent handle alignment or apply via containerStyle
    marginTop: spacing.medium,
    width: '100%', // Default to full width
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: spacing.small,
    padding: spacing.medium, // Adjusted padding
    // width: '80%', // Control width via containerStyle or parent
    height: 60, // Keep or make dynamic
    // maxWidth: 400, // Control via containerStyle or parent
    justifyContent: 'space-between',
  },
  text: {
    color: colors.textLabel, // Was #555
    fontSize: typography.fontSizeText,
  },
  preview: {
    width: 30, // Consider making these themeable if sizes vary
    height: 30,
    marginLeft: spacing.small,
    borderRadius: spacing.small / 2, // Smaller radius for small image
  },
});

export default ImagePickerInput;
