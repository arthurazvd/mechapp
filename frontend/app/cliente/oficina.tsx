import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { BottomNavigation } from '../../components/BottomNavigation';
import { BackButton } from '../../components/BackButton';
import { CustomButton } from '../../components/CustomButton';

import { globalStyles } from '../../styles/globalStyles';
import { cliStyles } from '../../styles/cliStyles';

const VisualizarOficina = () => {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  

  return (
    <>
      <StatusBar backgroundColor="#A10000" barStyle="light-content" />

      <View
        style={[
          globalStyles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <View style={globalStyles.crudTop}>
          <BackButton />
          <Image
            source={require('../../assets/logo-nome.png')}
            style={{ width: 100, height: 190 }}
            resizeMode="contain"
          />
        </View>
        <View style={globalStyles.crudBottom}>
            <View style={cliStyles.infoContainer}>
                <View style={cliStyles.imageBox}>
                    <Feather name="image" size={80} color="#888" />
                </View>
                <View style={cliStyles.infoTextBox}>
                    <Text style={cliStyles.nome}>Oficina Mecânica Premium</Text>
                    <Text style={cliStyles.descricao}>
                    Especializada em manutenção preventiva, revisão e serviços rápidos.
                    </Text>
                </View>
            </View>
            <View style={globalStyles.homeButtons}>
                <CustomButton
                    style={{ width: '90%', height: 80}}
                    title="Serviços"
                    onPress={() => router.push('cliente/servico')}
                />
                <CustomButton
                    style={{ width: '90%', height: 80}}
                    title="Informações"
                    onPress={() => setModalVisible(true)}
                />
            </View>
            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={cliStyles.modalOverlay}>
                <View style={cliStyles.modalContent}>
                    <Text style={cliStyles.modalTitle}>Informações da Oficina</Text>
                    <Text style={cliStyles.modalText}>
                    Endereço: Rua das Engrenagens, 123{'\n'}
                    Telefone: (11) 99999-9999{'\n'}
                    Horário: Seg a Sex, 8h às 18h
                    </Text>
                    <TouchableOpacity
                    style={cliStyles.modalButton}
                    onPress={() => setModalVisible(false)}
                    >
                    <Text style={cliStyles.modalButtonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
        </View>
        <BottomNavigation />
      </View>
    </>
  );
};

export default VisualizarOficina;
