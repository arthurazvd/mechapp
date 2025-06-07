import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface Props {
  imagem: string | null;
  setImagem: (uri: string) => void;
  containerStyle?: object;
  buttonStyle?: object;
}

const ImagePickerInput = ({ imagem, setImagem, containerStyle, buttonStyle }: Props) => {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão para acessar a galeria foi negada!');
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
        <Text style={{ color: '#555' }}>
          {imagem ? 'Alterar imagem' : 'Selecionar imagem'}
        </Text>
        {imagem && (
          <Image
            source={{ uri: imagem }}
            style={styles.preview}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '80%',
    maxWidth: 400,
    justifyContent: 'space-between',
  },
  preview: {
    width: 30,
    height: 30,
    marginLeft: 10,
    borderRadius: 8,
  },
});

export default ImagePickerInput;
