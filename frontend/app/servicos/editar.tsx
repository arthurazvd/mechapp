import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, ScrollView, StyleSheet, Alert, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from 'expo-checkbox';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomInput } from '../../components/CustomInput';
import { ExpandingTextArea } from '../../components/ExpandingTextArea';
import { CustomButton } from '../../components/CustomButton';
import { BackButton } from '../../components/BackButton';
import { BottomNavigation } from '../../components/BottomNavigation';

import { globalStyles } from '../../styles/globalStyles';
import { servStyles } from '../../styles/servStyles';
import { formatarPreco } from '../../utils/formatters';

const getServicoDetails = (servicoId?: string | string[]) => {
    if (servicoId === '1') { 
        return {
            nome: 'Troca de Oléo Completa',
            descricao: 'Substituição do óleo do motor por um novo (Mobil Super 5W-30 Sintético), garantindo a lubrificação adequada das peças internas e o bom desempenho do veículo. Inclui verificação e troca do filtro de óleo (Tecfil). Recomendado a cada 10.000km ou 6 meses.',
            categoria: 'mecanica_geral',
            tempoEstimado: '1', 
            precoMin: 'R$ 180,00',
            precoMax: 'R$ 250,00',
            somenteOrcamento: false,
        };
    }
    return null;
};


const EditarServicoScreen = () => {
    const router = useRouter();
    const { servicoId } = useLocalSearchParams();
    const insets = useSafeAreaInsets();

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [tempoEstimado, setTempoEstimado] = useState('');
    const [precoMin, setPrecoMin] = useState('');
    const [precoMax, setPrecoMax] = useState('');
    const [somenteOrcamento, setSomenteOrcamento] = useState(false);

    useEffect(() => {
        const servico = getServicoDetails(servicoId);
        if (servico) {
            setNome(servico.nome);
            setDescricao(servico.descricao);
            setCategoria(servico.categoria);
            setTempoEstimado(servico.tempoEstimado);
            setPrecoMin(servico.precoMin);
            setPrecoMax(servico.precoMax);
            setSomenteOrcamento(servico.somenteOrcamento);
        } else if (servicoId) {
            Alert.alert("Erro", "Serviço não encontrado.", [{ text: "OK", onPress: () => router.back() }]);
        }
    }, [servicoId]);
    

    const handlePrecoMinChange = (text: string) => {
      const precoFormatado = formatarPreco(text);
      setPrecoMin(precoFormatado);
    };

    const handlePrecoMaxChange = (text: string) => {
      const precoFormatado = formatarPreco(text);
      setPrecoMax(precoFormatado);
    };

    const handleSalvar = () => {
        if (!nome || !descricao || !categoria || !tempoEstimado) {
            Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
            return;
        }
        if (!somenteOrcamento && (!precoMin || !precoMax)) {
            Alert.alert("Erro", "Preencha a faixa de preço ou marque 'Preço somente por orçamento'.");
            return;
        }
        console.log("Salvando Serviço:", {servicoId, nome, descricao, categoria, tempoEstimado, precoMin, precoMax, somenteOrcamento });
        Alert.alert("Sucesso", "Serviço atualizado!");
        router.back();
    };

    const handleDeletar = () => {
        Alert.alert(
            "Confirmar Exclusão",
            `Tem certeza que deseja deletar o serviço "${nome}"? Esta ação não pode ser desfeita.`,
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Deletar", style: "destructive", onPress: () => {
                    console.log("Deletando Serviço:", servicoId);
                    Alert.alert("Sucesso", "Serviço deletado!");
                    router.replace('/servicos/visualizar');
                }}
            ]
        );
    };

  return (
    <>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <View style={[globalStyles.container,{paddingTop: insets.top,paddingBottom: insets.bottom, justifyContent: 'space-between'}]}>
            <View style={{flex:1}}>
                <View style={globalStyles.crudTop}>
                    <BackButton color={colors.white}/>
                    <Image source={require('../../assets/logo-nome.png')} style={styles.logoNome} resizeMode="contain"/>
                </View>

                <ScrollView
                    style={globalStyles.crudBottom}
                    contentContainerStyle={styles.scrollContentContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={[globalStyles.title, styles.pageTitle]}>Editar Serviço</Text>
                    <View style={styles.formContainer}>
                        <CustomInput
                            label="Nome do Serviço"
                            value={nome}
                            onChangeText={setNome}
                            style={styles.inputField}
                        />
                        <ExpandingTextArea
                            label="Descrição Detalhada do Serviço"
                            value={descricao}
                            onChangeText={setDescricao}
                            containerStyle={styles.inputField}
                            minHeight={80}
                        />

                        <View style={[servStyles.pickerContainer, styles.inputField]}>
                            <Text style={globalStyles.label}>Categoria do Serviço</Text>
                            <Picker
                                selectedValue={categoria}
                                onValueChange={(itemValue) => setCategoria(itemValue)}
                                style={[servStyles.picker, styles.pickerComponent]}
                                dropdownIconColor={colors.textHint}
                                mode="dropdown"
                            >
                                <Picker.Item label="Selecione uma categoria..." value="" style={styles.pickerItem}/>
                                <Picker.Item label="Mecânica Geral" value="mecanica_geral" style={styles.pickerItem}/>
                                <Picker.Item label="Elétrica Automotiva" value="eletrica" style={styles.pickerItem}/>
                                <Picker.Item label="Funilaria e Pintura" value="funilaria_pintura" style={styles.pickerItem}/>
                                <Picker.Item label="Estética Automotiva" value="estetica" style={styles.pickerItem}/>
                                <Picker.Item label="Suspensão e Freios" value="suspensao_freios" style={styles.pickerItem}/>
                                <Picker.Item label="Outros" value="outros" style={styles.pickerItem}/>
                            </Picker>
                        </View>
                        <CustomInput
                            label="Tempo Estimado (em horas)"
                            placeholder="Ex: 1.5"
                            keyboardType='numeric'
                            value={tempoEstimado}
                            onChangeText={setTempoEstimado}
                            style={styles.inputField}
                        />
                        <View style={[servStyles.precoInput, styles.inputRowContainer]}>
                            <CustomInput
                                label="Preço Mínimo"
                                value={precoMin}
                                onChangeText={handlePrecoMinChange}
                                keyboardType='numeric'
                                style={styles.inputInRow}
                                editable={!somenteOrcamento}
                                placeholder="R$ 0,00"
                            />
                            <CustomInput
                                label="Preço Máximo"
                                value={precoMax}
                                onChangeText={handlePrecoMaxChange}
                                keyboardType='numeric'
                                style={styles.inputInRow}
                                editable={!somenteOrcamento}
                                placeholder="R$ 0,00"
                            />
                        </View>
                        <View style={[servStyles.checkboxContainer, styles.inputField, styles.checkboxWrapper]}>
                                <Checkbox
                                    color={somenteOrcamento ? colors.success : colors.inputBackground}
                                    value={somenteOrcamento}
                                    onValueChange={setSomenteOrcamento}
                                    style={servStyles.checkbox}
                                />
                                <Text style={[globalStyles.label, styles.checkboxLabel]}>Preço somente sob orçamento</Text>
                        </View>
                    </View>
                    <View style={[servStyles.crudButtons, styles.actionButtonsContainer]}>
                        <CustomButton
                            style={[styles.actionButton, styles.deleteButton]}
                            textStyle={styles.deleteButtonText}
                            title="Deletar"
                            onPress={handleDeletar} />
                        <CustomButton
                            style={styles.actionButton}
                            title="Salvar Alterações"
                            onPress={handleSalvar} />
                    </View>
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
    pageTitle: {
        marginBottom: spacing.large,
    },
    formContainer: {
        width: '90%',
        maxWidth: 500,
    },
    inputField: {
        marginBottom: spacing.medium,
    },
    inputRowContainer: {
        width: '100%',
        maxWidth: '100%',
        paddingHorizontal: 0,
    },
    inputInRow: {
        flex: 1,
    },
    pickerComponent: {
        backgroundColor: colors.inputBackground,
        color: colors.textPrimary,
        height: 50,
        borderRadius: spacing.small,
    },
    pickerItem: {
        backgroundColor: colors.surface,
        color: colors.textPrimary,
    },
    checkboxWrapper: {
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        paddingHorizontal: 0,
        marginTop: spacing.small,
    },
    checkboxLabel: {
        marginLeft: spacing.small,
        color: colors.textLabel,
    },
    actionButtonsContainer: {
        width: '90%',
        maxWidth: 500,
        marginTop: spacing.large,
        paddingHorizontal: 0,
    },
    actionButton: {
        flex: 1,
        height: 50,
    },
    deleteButton: { 
        backgroundColor: colors.error, 
        marginRight: spacing.small,
    },
    deleteButtonText: { 
        color: colors.white, 
    }
});

export default EditarServicoScreen; 