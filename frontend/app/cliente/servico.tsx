import React, { useState } from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomButton } from '../../components/CustomButton';
import { BackButton } from '../../components/BackButton';
import { BottomNavigation } from '../../components/BottomNavigation';
import { ItemCard } from '../../components/ItemCard';
import { DatePickerModal } from '../../components/DatePickerModal';

import { globalStyles, colors, spacing, typography } from '../../styles/globalStyles';

const getServicosPorOficina = (oficinaId?: string | string[]) => {
  if (oficinaId === '1') {
    return [
      { id: 's1', nome: 'Troca de Óleo Completa', descricao: 'Inclui óleo sintético, filtro e mão de obra especializada.', precoEstimado: 'R$ 150,00 - R$ 250,00' },
      { id: 's2', nome: 'Revisão de Freios', descricao: 'Verificação e substituição de pastilhas e discos, se necessário.', precoEstimado: 'A partir de R$ 120,00' },
      { id: 's3', nome: 'Alinhamento e Balanceamento', descricao: 'Correção da geometria da suspensão e balanceamento das rodas.', precoEstimado: 'R$ 80,00' },
    ];
  }
  return [
    { id: 's_default', nome: 'Serviço Padrão', descricao: 'Descrição do serviço padrão.', precoEstimado: 'Consulte-nos' },
  ];
};

const VisualizarServicosOficinaScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { oficinaId } = useLocalSearchParams();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedServico, setSelectedServico] = useState<{nome: string} | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const servicos = getServicosPorOficina(oficinaId);

  const handleAbrirModalAgendamento = (servico: {nome: string}) => {
    setSelectedServico(servico);
    setModalVisible(true);
  };

  const handleAgendar = () => {
    if (!selectedServico) return;
    setModalVisible(false);
    Alert.alert("Agendamento Solicitado", `Serviço "${selectedServico.nome}" agendado para ${selectedDate.toLocaleDateString('pt-BR')}. Você receberá uma confirmação.`);
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
            <BackButton color={colors.white} />
            <Image
              source={require('../../assets/logo-nome.png')}
              style={styles.logoNome}
              resizeMode="contain"
            />
          </View>

          <FlatList
            ListHeaderComponent={<Text style={[globalStyles.title, styles.pageTitle]}>Serviços Disponíveis</Text>}
            data={servicos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ItemCard
                nome={item.nome}
                descricao={`${item.descricao}\nPreço Estimado: ${item.precoEstimado}`}
                quantidade={0}
                onAdd={() => {}}
                onRemove={() => {}}
                onAgendar={() => handleAbrirModalAgendamento(item)}
                multiplo={false}
              />
            )}
            contentContainerStyle={styles.listContentContainer}
            ItemSeparatorComponent={() => <View style={{height: spacing.small}} />}
            ListEmptyComponent={<Text style={styles.emptyListText}>Nenhum serviço encontrado para esta oficina.</Text>}
          />
        </View>

        {selectedServico && (
          <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
            <TouchableOpacity style={globalStyles.modalOverlay} activeOpacity={1} onPressOut={() => setModalVisible(false)}>
              <View style={globalStyles.modalContent} onStartShouldSetResponder={() => true}>
                <TouchableOpacity
                  style={globalStyles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={globalStyles.closeButtonText}>X</Text>
                </TouchableOpacity>

                <Text style={globalStyles.modalTitle}>Agendar "{selectedServico.nome}"</Text>
                <Text style={styles.modalSubtitle}>Escolha a data do serviço:</Text>

                <CustomButton
                  style={styles.datePickerButton}
                  textStyle={styles.datePickerButtonText}
                  title={selectedDate.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                  onPress={() => setShowPicker(true)}
                />

                <CustomButton
                  style={styles.confirmButton}
                  title="Confirmar Agendamento"
                  onPress={handleAgendar}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        )}

        <DatePickerModal
          visible={showPicker}
          selectedDate={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
          }}
          onClose={() => setShowPicker(false)}
        />

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
  pageTitle: {
    marginTop: spacing.large,
    marginBottom: spacing.medium,
  },
  listContentContainer: {
    paddingHorizontal: spacing.medium,
    paddingBottom: spacing.large,
  },
  emptyListText: {
    ...globalStyles.text,
    marginTop: spacing.large * 2,
    fontSize: typography.fontSizeText,
  },
  modalSubtitle: {
    ...globalStyles.label,
    textAlign: 'center',
    marginBottom: spacing.medium,
    fontSize: typography.fontSizeLabel + 1,
  },
  datePickerButton: {
    backgroundColor: colors.inputBackground,
    width: '100%',
    marginBottom: spacing.medium,
    paddingVertical: spacing.medium,
  },
  datePickerButtonText: {
    color: colors.textPrimary,
    fontWeight: typography.fontWeightBold,
  },
  confirmButton: {
    backgroundColor: colors.success,
    width: '100%',
  }
});

export default VisualizarServicosOficinaScreen;
