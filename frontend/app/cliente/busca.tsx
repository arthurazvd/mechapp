import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  // StyleSheet, // cliStyles is imported, no need for another StyleSheet here unless for local styles
  StatusBar,
  Modal,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router'; // Import useRouter

import { BottomNavigation } from '../../components/BottomNavigation';
import { BackButton } from '../../components/BackButton';

import { globalStyles, colors, spacing } from '../../styles/globalStyles'; // Import theme
import { cliStyles } from './styles'; // cliStyles contains all necessary styles

const oficinasMock = [
  {
    id: '1',
    nome: 'Oficina Premium Motors',
    servicos: 'Troca de óleo, revisão completa, freios',
    avaliacao: 4.8,
    imagem: require('../../assets/logo-vertical.png'), // Example: Using an asset
  },
  {
    id: '2',
    nome: 'Centro Automotivo Veloz',
    servicos: 'Alinhamento, balanceamento, suspensão',
    avaliacao: 4.2,
    imagem: null, // No image example
  },
  {
    id: '3',
    nome: 'Mecânica Confiança & Cia',
    servicos: 'Pintura, funilaria, motor',
    avaliacao: null, // No rating example
    imagem: null,
  },
];

const BuscarOficinaScreen = () => { // Renamed component
  const insets = useSafeAreaInsets();
  const router = useRouter(); // Initialize router
  const [busca, setBusca] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [filtroLocal, setFiltroLocal] = useState('');

  const oficinasFiltradas = oficinasMock.filter((oficina) =>
    oficina.nome.toLowerCase().includes(busca.toLowerCase()) &&
    (filtroLocal ? oficina.nome.toLowerCase().includes(filtroLocal.toLowerCase()) : true) // Simple local filter example
  );

  const handleApplyFilter = () => {
    // Here you would typically refetch data with the filter or apply more complex client-side filtering
    setModalVisible(false);
  };

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

      <View
        style={[
          globalStyles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom, justifyContent: 'space-between' },
        ]}
      >
        <View style={{flex:1}}>
            <View style={globalStyles.crudTop}>
            <BackButton color={colors.white}/>
            <Image
                source={require('../../assets/logo-nome.png')}
                style={{ width: 100, height: 60 }} // Adjusted logo size
                resizeMode="contain"
            />
            </View>

            <View style={cliStyles.searchContainer}>
            <TextInput
                placeholder="Buscar oficina por nome..."
                placeholderTextColor={colors.textHint} // Was #aaa
                value={busca}
                onChangeText={setBusca}
                style={cliStyles.searchInput}
            />
            <TouchableOpacity
                style={cliStyles.filterButton}
                onPress={() => setModalVisible(true)}
            >
                <Feather name="filter" size={20} color={colors.white} />
            </TouchableOpacity>
            </View>

            <FlatList
            data={oficinasFiltradas}
            keyExtractor={(item) => item.id}
            contentContainerStyle={cliStyles.listContent}
            renderItem={({ item }) => (
                <TouchableOpacity
                style={cliStyles.card}
                onPress={() => router.push({ pathname: 'cliente/oficina', params: { oficinaId: item.id }})} // Navigate to oficina details
                >
                {item.imagem ? (
                    <Image source={item.imagem} style={cliStyles.cardImage} resizeMode="contain" />
                ) : (
                    <View style={cliStyles.placeholderImage}>
                    <Feather name="image" size={30} color={colors.textLabel} />
                    </View>
                )}

                <View style={cliStyles.cardInfo}>
                    <Text style={cliStyles.cardTitle}>{item.nome}</Text>
                    <Text style={cliStyles.cardSubtitle} numberOfLines={2}>{item.servicos}</Text>
                </View>

                <View style={cliStyles.cardRating}>
                    {item.avaliacao ? (
                    <>
                        <Feather name="star" size={18} color={colors.gold} />
                        <Text style={cliStyles.ratingText}>
                        {item.avaliacao.toFixed(1)}
                        </Text>
                    </>
                    ) : (
                    <Text style={cliStyles.noRating}>N/A</Text>
                    )}
                </View>
                </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={{...globalStyles.text, marginTop: spacing.large*2, fontSize:16}}>Nenhuma oficina encontrada.</Text>}
            />
        </View>

        {/* Filter Modal */}
        <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
          <TouchableOpacity style={cliStyles.modalOverlay} activeOpacity={1} onPressOut={() => setModalVisible(false)}>
            <View style={cliStyles.modalContent} onStartShouldSetResponder={() => true}>
              <Text style={cliStyles.modalTitle}>Filtrar Busca</Text>
              <TextInput
                placeholder="Filtrar por nome/local (exemplo)"
                placeholderTextColor={colors.textHint}
                value={filtroLocal}
                onChangeText={setFiltroLocal}
                style={cliStyles.modalInput}
              />
              <TouchableOpacity
                style={cliStyles.modalButton}
                onPress={handleApplyFilter}
              >
                <Text style={cliStyles.modalButtonText}>Aplicar Filtro</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        <BottomNavigation />
      </View>
    </>
  );
};

export default BuscarOficinaScreen; // Renamed export
