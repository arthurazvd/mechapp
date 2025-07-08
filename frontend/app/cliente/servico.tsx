import React, { useState } from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


import { CustomButton } from '../../components/CustomButton';
import { BackButton } from '../../components/BackButton';
import { BottomNavigation } from '../../components/BottomNavigation';
import { ItemCard } from '../../components/ItemCard';
import { DatePickerModal } from '../../components/DatePickerModal';

import { globalStyles } from '../../styles/globalStyles';

const VisualizarPeca = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [modalVisible, setModalVisible] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleAgendar = () => {
    setModalVisible(false);
    router.push('/agendamento/');
  };

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

        <View style={globalStyles.telaServicos}>
          <View style={globalStyles.homeButtons}>
            <Text style={globalStyles.title}>Serviços</Text>

            <ItemCard
              nome="Troca de óleo"
              descricao="Inclui filtro e lubrificação"
              quantidade={0}
              onAdd={() => {}}
              onRemove={() => {}}
              onAgendar={() => setModalVisible(true)}
              multiplo={false}
            />
            <ItemCard
              nome="Revisão"
              descricao="Inclui filtro e lubrificação"
              quantidade={0}
              onAdd={() => {}}
              onRemove={() => {}}
              onAgendar={() => setModalVisible(true)}
              multiplo={false}
            />
            <ItemCard
              nome="Remendo de Pneu"
              descricao="Inclui filtro e lubrificação"
              quantidade={0}
              onAdd={() => {}}
              onRemove={() => {}}
              onAgendar={() => setModalVisible(true)}
              multiplo={false}
            />
          </View>
        </View>

        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={globalStyles.modalOverlay}>
            <View style={globalStyles.modalContent}>
              <TouchableOpacity 
                style={globalStyles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={globalStyles.closeButtonText}>X</Text>
              </TouchableOpacity>
              
              <Text style={globalStyles.modalTitle}>Escolha a data do serviço</Text>

              <TouchableOpacity
                style={globalStyles.modalButton}
                onPress={() => setShowPicker(true)}
              >
                <Text style={globalStyles.modalButtonText}>
                  {selectedDate.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={globalStyles.modalButton}
                onPress={handleAgendar}
              >
                <Text style={globalStyles.modalButtonText}>Agendar Serviço</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <DatePickerModal
          visible={showPicker}
          selectedDate={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          onClose={() => setShowPicker(false)}
        />

        <BottomNavigation />
      </View>
    </>
  );
};

export default VisualizarPeca;
