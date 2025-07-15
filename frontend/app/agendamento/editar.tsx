import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackButton } from '../../components/BackButton';
import { BottomNavigation } from '../../components/BottomNavigation';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { PecaSelector } from '../../components/PecaSelector';

import { globalStyles, colors, spacing, typography } from '../../styles/globalStyles';

const EditarAgendamento = () => {
  const insets = useSafeAreaInsets();

  const [servico, setServico] = useState('Troca de óleo');
  const [descricao, setDescricao] = useState('Troca completa com filtro incluso.');
  const [preco, setPreco] = useState('120');

  const [pecaNome, setPecaNome] = useState('');
  const [pecaQtd, setPecaQtd] = useState(1);
  const [pecas, setPecas] = useState<{ nome: string; quantidade: number }[]>([]);

  type StatusAgendamento = 'pendente' | 'confirmado' | 'cancelado' | 'concluido';
  const [status, setStatus] = useState<StatusAgendamento>('pendente');
  const [modalVisible, setModalVisible] = useState(false);

  const adicionarPeca = () => {
    if (!pecaNome.trim()) return;
    setPecas([...pecas, { nome: pecaNome, quantidade: pecaQtd }]);
    setPecaNome('');
    setPecaQtd(1);
  };

  const statusOptions = [
    { label: 'Pendente', value: 'pendente', color: colors.warning },
    { label: 'Confirmado', value: 'confirmado', color: colors.success },
    { label: 'Cancelado', value: 'cancelado', color: colors.error },
    { label: 'Concluído', value: 'concluido', color: colors.secondary },
  ];

  const selectedStatusStyle = statusOptions.find(opt => opt.value === status) || statusOptions[0];

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View
        style={[
          globalStyles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <View style={{flex: 1}}>
          <View style={globalStyles.crudTop}>
            <BackButton color={colors.white}/>
            <Image
              source={require('../../assets/logo-nome.png')}
              style={styles.logoNome}
              resizeMode="contain"
            />
          </View>

          <ScrollView
            style={globalStyles.telaServicos}
            contentContainerStyle={styles.scrollContentContainer}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={[globalStyles.title, styles.pageTitle]}>Editar Agendamento</Text>

            <View style={styles.formSection}>
              <CustomInput
                label="Serviço" 
                value={servico}
                onChangeText={setServico}
                style={styles.inputField}
              />
              <CustomInput
                label="Descrição"
                value={descricao}
                onChangeText={setDescricao}
                style={styles.inputField}
              />
              <CustomInput
                label="Preço (R$)"
                value={preco}
                onChangeText={setPreco}
                keyboardType="numeric"
                style={styles.inputField}
              />

              <View style={styles.statusSelectorContainer}>
                <Text style={globalStyles.label}>Status atual</Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={[styles.statusDisplayButton, {backgroundColor: selectedStatusStyle.color}]}
                >
                  <Text style={styles.statusDisplayText}>
                    {selectedStatusStyle.label}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.pecaSection}>
                <Text style={globalStyles.label}>Adicionar Peça</Text>
                <PecaSelector
                  nome={pecaNome}
                  quantidade={pecaQtd}
                  onChangeNome={setPecaNome}
                  onAdd={() => setPecaQtd((q) => q + 1)}
                  onRemove={() => setPecaQtd((q) => Math.max(1, q - 1))}
                  onAdicionar={adicionarPeca}
                  containerStyle={styles.pecaSelector}
                />
              </View>

              {pecas.length > 0 && (
                <View style={styles.pecasListSection}>
                  <Text style={globalStyles.label}>Peças adicionadas</Text>
                  {pecas.map((item, index) => (
                    <View key={`${item.nome}-${index}`}>
                      <View style={styles.pecaItem}>
                        <Text style={styles.pecaItemText}>{item.nome}</Text>
                        <Text style={styles.pecaItemQuantity}>x{item.quantidade}</Text>
                      </View>
                      {index < pecas.length - 1 && <View style={styles.separator} />}
                    </View>
                  ))}
                </View>
              )}
            </View>
            <CustomButton 
              title="Salvar Alterações"
              style={styles.saveButton}
              onPress={() => { alert("Salvo!")}}
            />
          </ScrollView>
        </View>

        <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
          <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setModalVisible(false)}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Selecionar novo status</Text>
              {statusOptions.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={[styles.modalStatusButton, { backgroundColor: item.color }]}
                  onPress={() => {
                    setStatus(item.value as StatusAgendamento);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalStatusText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>

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
  pageTitle: {
    marginBottom: spacing.large,
  },
  formSection: {
    width: '90%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  inputField: {
    marginBottom: spacing.medium,
  },
  statusSelectorContainer: {
    marginTop: spacing.medium,
    marginBottom: spacing.medium,
  },
  statusDisplayButton: {
    padding: spacing.medium,
    borderRadius: spacing.small,
    marginTop: spacing.small / 2,
    alignItems: 'center',
  },
  statusDisplayText: {
    color: colors.white,
    fontWeight: typography.fontWeightBold,
    textTransform: 'capitalize',
    fontSize: typography.fontSizeText,
  },
  pecaSection: {
    marginTop: spacing.medium,
  },
  pecaSelector: {
    width: '100%',
  },
  pecasListSection: {
    marginTop: spacing.medium,
  },
  pecaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.small,
  },
  pecaItemText: {
    color: colors.textPrimary,
    fontSize: typography.fontSizeLabel,
  },
  pecaItemQuantity: {
    color: colors.textHint,
    fontSize: typography.fontSizeLabel,
  },
  separator: {
    height: 1,
    backgroundColor: colors.inputBackground,
  },
  saveButton: {
    width: '90%',
    maxWidth: 500,
    height: 50,
    marginTop: spacing.large,
  },
  modalOverlay: globalStyles.modalOverlay,
  modalContent: {
    ...globalStyles.modalContent,
    maxWidth: 350,
  },
  modalTitle: globalStyles.modalTitle,
  modalStatusButton: {
    paddingVertical: spacing.medium - 2,
    paddingHorizontal: spacing.large,
    borderRadius: spacing.small,
    marginVertical: spacing.small / 2,
    width: '100%',
    alignItems: 'center',
  },
  modalStatusText: {
    color: colors.white,
    fontWeight: typography.fontWeightBold,
    fontSize: typography.fontSizeText,
  },
});

export default EditarAgendamento;