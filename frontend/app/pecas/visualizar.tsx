import React, { useState, useEffect } from 'react';
import { View, Text, Image, StatusBar, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

import { InfoView } from '../../components/InfoView';
import { CustomButton } from '../../components/CustomButton';
import { BackButton } from '../../components/BackButton';
import { BottomNavigation } from '../../components/BottomNavigation';

import { globalStyles, colors, spacing } from '../../styles/globalStyles';
import { pecStyles } from '../../styles/pecStyles';

const VisualizarPecaScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [pecaInfo, setPecaInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Simula carregamento de dados mockados
  useEffect(() => {
    const mock = {
      id: 'peca-001',
      nome: 'Pastilha de Freio',
      descricao: 'Pastilha de freio dianteira para carros populares',
      fabricante: 'Bosch',
      quantidade: 42,
      preco: 89.9,
      imagem: '', // ou base64 se quiser testar imagem
    };

    setTimeout(() => {
      setPecaInfo(mock);
      setLoading(false);
    }, 800); // Simula tempo de carregamento
  }, []);

  if (loading) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ fontSize: 16 }}>Carregando peça...</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={[
        globalStyles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom, justifyContent: 'space-between' }
      ]}>
        <View style={{ flex: 1 }}>
          <View style={globalStyles.crudTop}>
            <BackButton color={colors.white} />
            <Image
              source={require('../../assets/logo-nome.png')}
              style={styles.logoNome}
              resizeMode="contain"
            />
          </View>

          <ScrollView
            style={globalStyles.crudBottom}
            contentContainerStyle={styles.scrollContentContainer}
          >
            <View style={pecStyles.viewPecas}>
              {pecaInfo?.imagem ? (
                <Image
                  source={{ uri: pecaInfo.imagem }}
                  style={pecStyles.pecaImageVisualizar}
                  resizeMode="cover"
                />
              ) : (
                <View style={[pecStyles.pecaImageVisualizar, styles.imagePlaceholder]}>
                  <Feather name="camera-off" size={40} color={colors.textLabel} />
                </View>
              )}
              <Text style={pecStyles.nomePecaVisualizar}>{pecaInfo?.nome}</Text>
            </View>

            <InfoView label="Descrição Detalhada" value={pecaInfo?.descricao || "N/A"} containerStyle={styles.infoViewContainer} />
            <InfoView label="Fabricante / Marca" value={pecaInfo?.fabricante || "N/A"} containerStyle={styles.infoViewContainer} />
            <InfoView label="Quantidade em Estoque" value={pecaInfo?.quantidade?.toString() || "0"} containerStyle={styles.infoViewContainer} />
            <InfoView label="Preço Unitário" value={`R$ ${Number(pecaInfo?.preco).toFixed(2).replace('.', ',')}`} containerStyle={styles.infoViewContainer} />

            <CustomButton
              style={styles.editButton}
              title="Editar Peça"
              onPress={() =>
                router.push({ pathname: '/pecas/editar', params: { id: pecaInfo.id } })
              }
              disabled={!pecaInfo?.id}
            />
          </ScrollView>
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
  scrollContentContainer: {
    paddingBottom: spacing.large,
    alignItems: 'center',
  },
  infoViewContainer: {
    width: '90%',
    maxWidth: 500,
    marginBottom: spacing.medium,
  },
  editButton: {
    width: '90%',
    maxWidth: 500,
    height: 50,
    marginTop: spacing.large,
  },
  imagePlaceholder: {
    backgroundColor: colors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VisualizarPecaScreen;
