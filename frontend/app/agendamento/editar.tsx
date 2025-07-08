import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackButton } from '../../components/BackButton';
import { BottomNavigation } from '../../components/BottomNavigation';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { PecaSelector } from '../../components/PecaSelector';

import { globalStyles } from '../../styles/globalStyles';

const EditarAgendamento = () => {
  const insets = useSafeAreaInsets();

  const [servico, setServico] = useState('Troca de óleo');
  const [descricao, setDescricao] = useState('Troca completa com filtro incluso.');
  const [preco, setPreco] = useState('120');

  const [pecaNome, setPecaNome] = useState('');
  const [pecaQtd, setPecaQtd] = useState(1);
  const [pecas, setPecas] = useState<{ nome: string; quantidade: number }[]>([]);

  const [status, setStatus] = useState<'pendente' | 'confirmado' | 'cancelado' | 'concluido'>('pendente');
  const [modalVisible, setModalVisible] = useState(false);

  const adicionarPeca = () => {
    if (!pecaNome.trim()) return;
    setPecas([...pecas, { nome: pecaNome, quantidade: pecaQtd }]);
    setPecaNome('');
    setPecaQtd(1);
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
          <Text style={globalStyles.title}>Editar Agendamento</Text>

          <CustomInput label="Serviço" value={servico} onChangeText={setServico} />
          <CustomInput label="Descrição" value={descricao} onChangeText={setDescricao} />
          <CustomInput
            label="Preço"
            value={preco}
            onChangeText={setPreco}
            keyboardType="numeric"
            onlyNumbers
          />

          <View style={{ marginTop: 20, width: '90%', alignSelf: 'center' }}>
            <Text style={globalStyles.label}>Status atual</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                backgroundColor: '#2a2a2a',
                padding: 12,
                borderRadius: 8,
                marginTop: 8,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', textTransform: 'capitalize' }}>
                {status}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={[globalStyles.label, { marginLeft: 20 }]}>Adicionar Peça</Text>
            <PecaSelector
              nome={pecaNome}
              quantidade={pecaQtd}
              onChangeNome={setPecaNome}
              onAdd={() => setPecaQtd((q) => q + 1)}
              onRemove={() => setPecaQtd((q) => Math.max(1, q - 1))}
              onAdicionar={adicionarPeca}
            />
          </View>

          <View style={{ marginTop: 20, width: '90%', alignSelf: 'center' }}>
            <Text style={globalStyles.label}>Peças adicionadas</Text>
            <FlatList
              data={pecas}
              keyExtractor={(item, index) => `${item.nome}-${index}`}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 6,
                  }}
                >
                  <Text style={{ color: '#fff' }}>{item.nome}</Text>
                  <Text style={{ color: '#aaa' }}>x{item.quantidade}</Text>
                </View>
              )}
            />
          </View>

          <View style={{ marginTop: 30, width: '90%', alignSelf: 'center' }}>
            <CustomButton title="Salvar alterações" onPress={() => {}} />
          </View>
        </View>

        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={modalStyles.overlay}>
            <View style={modalStyles.content}>
              <Text style={modalStyles.title}>Selecionar novo status</Text>

              {[
                { label: 'Pendente', value: 'pendente', color: '#FFA500' },
                { label: 'Confirmado', value: 'confirmado', color: '#00A100' },
                { label: 'Cancelado', value: 'cancelado', color: '#D00000' },
                { label: 'Concluído', value: 'concluido', color: '#007BFF' },
              ].map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={[modalStyles.statusButton, { backgroundColor: item.color }]}
                  onPress={() => {
                    setStatus(item.value as any);
                    setModalVisible(false);
                  }}
                >
                  <Text style={modalStyles.statusText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>

        <BottomNavigation />
      </View>
    </>
  );
};

export default EditarAgendamento;

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#1e1e1e',
    padding: 24,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statusButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 6,
    width: '100%',
    alignItems: 'center',
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
