import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomNavigation } from '../../components/BottomNavigation';
import { BackButton } from '../../components/BackButton';

import { globalStyles } from '../../styles/globalStyles';
import { cliStyles } from './styles';

const oficinasMock = [
  {
    id: '1',
    nome: 'Oficina 1',
    servicos: 'Troca de óleo, revisão',
    avaliacao: 4.5,
    imagem: null,
  },
  {
    id: '2',
    nome: 'Oficina 2',
    servicos: 'Alinhamento, balanceamento',
    avaliacao: 3.8,
    imagem: null,
  },
  {
    id: '3',
    nome: 'Oficina 3',
    servicos: 'Pintura, funilaria',
    avaliacao: null,
    imagem: null,
  },
];


const BuscarOficina = () => {
  const insets = useSafeAreaInsets();
  const [busca, setBusca] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [filtroLocal, setFiltroLocal] = useState('');

  const oficinasFiltradas = oficinasMock.filter((oficina) =>
    oficina.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={[globalStyles.container,{ paddingTop: insets.top, paddingBottom: insets.bottom },]}>
      <View style={globalStyles.crudTop}>
        <BackButton />
        <Image
          source={require('../../assets/logo-nome.png')}
          style={{ width: 100, height: 190 }}
          resizeMode="contain"
        />
      </View>

      <View style={cliStyles.searchContainer}>
        <TextInput
          placeholder="Buscar oficina..."
          placeholderTextColor="#aaa"
          value={busca}
          onChangeText={setBusca}
          style={cliStyles.searchInput}
        />
        <TouchableOpacity
          style={cliStyles.filterButton}
          onPress={() => setModalVisible(true)}
        >
          <Feather name="filter" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={oficinasFiltradas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={cliStyles.listContent}
        renderItem={({ item }) => (
        <View style={cliStyles.card}>
            {item.imagem ? (
            <Image source={item.imagem} style={cliStyles.cardImage} />
            ) : (
            <View style={cliStyles.placeholderImage}>
                <Feather name="image" size={24} color="#888" />
            </View>
            )}

            <View style={cliStyles.cardInfo}>
            <Text style={cliStyles.cardTitle}>{item.nome}</Text>
            <Text style={cliStyles.cardSubtitle}>{item.servicos}</Text>
            </View>

            <View style={cliStyles.cardRating}>
            {item.avaliacao ? (
                <>
                <Feather name="star" size={16} color="#FFD700" />
                <Text style={cliStyles.ratingText}>{item.avaliacao.toFixed(1)}</Text>
                </>
            ) : (
                <Text style={cliStyles.noRating}>Sem avaliações</Text>
            )}
            </View>
        </View>
        )}

      />

      <Modal visible={modalVisible} transparent animationType='slide'>
        <View style={cliStyles.modalOverlay}>
          <View style={cliStyles.modalContent}>
            <Text style={cliStyles.modalTitle}>Filtrar por local</Text>
            <TextInput
              placeholder="Digite o local"
              placeholderTextColor="#aaa"
              value={filtroLocal}
              onChangeText={setFiltroLocal}
              style={cliStyles.modalInput}
            />
            <TouchableOpacity
              style={cliStyles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={cliStyles.modalButtonText}>Aplicar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <BottomNavigation />
    </View>
  );
};


export default BuscarOficina;
