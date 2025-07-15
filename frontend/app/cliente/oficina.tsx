import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { BottomNavigation } from '../../components/BottomNavigation';
import { BackButton } from '../../components/BackButton';
import { CustomButton } from '../../components/CustomButton';

import { globalStyles, colors, spacing, typography } from '../../styles/globalStyles';
import { cliStyles } from '../../styles/cliStyles';

const getOficinaDetails = (id?: string | string[]) => {
  if (id === '1') {
    return {
      nome: 'Oficina Premium Motors',
      descricao: 'Especializada em manutenção preventiva, revisão completa de freios, troca de óleo com produtos de alta qualidade e serviços rápidos de motor.',
      endereco: 'Rua das Engrenagens, 123 - Vila Motor',
      telefone: '(11) 98765-4321',
      horario: 'Segunda a Sexta, das 8h às 18h. Sábados, das 9h às 13h.',
      imagem: require('../../assets/logo-vertical.png'),
    };
  }
  return {
    nome: 'Oficina Não Encontrada',
    descricao: 'Detalhes não disponíveis.',
    endereco: 'N/A',
    telefone: 'N/A',
    horario: 'N/A',
    imagem: null,
  };
};

const VisualizarOficinaScreen = () => {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const { oficinaId } = useLocalSearchParams();

  const oficina = getOficinaDetails(oficinaId);

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
              style={{ width: 100, height: 60 }}
              resizeMode="contain"
            />
          </View>
          <ScrollView contentContainerStyle={{ paddingBottom: spacing.large }}>
            <View style={cliStyles.infoContainer}>
              <View style={cliStyles.imageBox}>
                {oficina.imagem ? (
                  <Image source={oficina.imagem} style={{width: '100%', height: '100%'}} resizeMode="contain" />
                ) : (
                  <Feather name="image" size={60} color={colors.textLabel} />
                )}
              </View>
              <View style={cliStyles.infoTextBox}>
                <Text style={cliStyles.nome}>{oficina.nome}</Text>
                <Text style={cliStyles.descricao}>{oficina.descricao}</Text>
              </View>
            </View>
            <View style={[globalStyles.homeButtons, { paddingHorizontal: spacing.large }]}>
              <CustomButton
                style={{ width: '100%', height: 70, marginBottom: spacing.medium }}
                title="Ver Serviços"
                onPress={() => router.push({pathname: 'cliente/servico', params: { oficinaId: oficinaId }})}
              />
              <CustomButton
                style={{ width: '100%', height: 70, backgroundColor: colors.inputBackground }}
                textStyle={{color: colors.textPrimary}}
                title="Mais Informações"
                onPress={() => setModalVisible(true)}
              />
            </View>
          </ScrollView>
        </View>

        <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
          <TouchableOpacity style={cliStyles.modalOverlay} activeOpacity={1} onPressOut={() => setModalVisible(false)}>
            <View style={cliStyles.modalContent} onStartShouldSetResponder={() => true}>
              <Text style={cliStyles.modalTitle}>Informações da Oficina</Text>
              <Text style={cliStyles.modalText}>
                <Text style={{fontWeight: typography.fontWeightBold}}>Endereço:</Text> {oficina.endereco}{'\n\n'}
                <Text style={{fontWeight: typography.fontWeightBold}}>Telefone:</Text> {oficina.telefone}{'\n\n'}
                <Text style={{fontWeight: typography.fontWeightBold}}>Horário:</Text> {oficina.horario}
              </Text>
              <TouchableOpacity
                style={cliStyles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={cliStyles.modalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
        <BottomNavigation />
      </View>
    </>
  );
};

export default VisualizarOficinaScreen;
