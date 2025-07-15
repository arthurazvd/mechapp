import React from 'react';
import { StyleSheet, ScrollView, View, StatusBar, Image, Text, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackButton } from '../../components/BackButton';
import { BottomNavigation } from '../../components/BottomNavigation';
import { globalStyles, colors, spacing, typography } from '../../styles/globalStyles';

const DetalhesAgendamento = () => {
  const insets = useSafeAreaInsets();

  const agendamento = {
    servico: 'Troca de óleo',
    descricao: 'Troca completa com filtro incluso e lubrificação.',
    status: 'Confirmado',
    statusColor: colors.success,
    preco: 120.0,
    pecas: [
      { id: '1', nome: 'Filtro de óleo', quantidade: 1 },
      { id: '2', nome: 'Óleo Sintético 5W30', quantidade: 4 },
      { id: '3', nome: 'Anel de Vedação do Bujão', quantidade: 1 },
    ],
    data: '25 de Julho de 2024',
    horario: '14:30',
    oficina: 'Oficina Premium Motors',
  };

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={[globalStyles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={{flex: 1}}>
          <View style={globalStyles.crudTop}>
            <BackButton color={colors.white} />
            <Image
              source={require('../../assets/logo-nome.png')}
              style={styles.logoNome}
              resizeMode="contain"
            />
          </View>

          <ScrollView
            style={globalStyles.telaServicos}
            contentContainerStyle={styles.scrollContentContainer}
          >
            <Text style={[globalStyles.title, styles.pageTitle]}>Detalhes do Agendamento</Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Informações Gerais</Text>
              <InfoItem label="Serviço:" value={agendamento.servico} />
              <InfoItem label="Oficina:" value={agendamento.oficina} />
              <InfoItem label="Data:" value={agendamento.data} />
              <InfoItem label="Horário:" value={agendamento.horario} />
              <InfoItem label="Status:" value={agendamento.status} valueColor={agendamento.statusColor} />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Descrição do Serviço</Text>
              <Text style={styles.descriptionText}>{agendamento.descricao}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preço Estimado</Text>
              <Text style={styles.priceText}>R$ {agendamento.preco.toFixed(2)}</Text>
            </View>

            {agendamento.pecas.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Peças Incluídas</Text>
                {agendamento.pecas.map((item) => (
                  <View key={item.id}>
                    <View style={styles.pecaItem}>
                      <Text style={styles.valueText}>{item.nome}</Text>
                      <Text style={styles.quantityText}>x{item.quantidade}</Text>
                    </View>
                    <View style={styles.separator} />
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        </View>

        <BottomNavigation />
      </View>
    </>
  );
};

const InfoItem = ({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) => (
  <View style={styles.infoItemContainer}>
    <Text style={styles.labelText}>{label}</Text>
    <Text style={[styles.valueText, valueColor ? { color: valueColor } : {}]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  logoNome: {
    width: 100,
    height: 60,
  },
  scrollContentContainer: {
    paddingBottom: spacing.large,
  },
  pageTitle: {
    marginBottom: spacing.large,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: spacing.small,
    padding: spacing.medium,
    marginBottom: spacing.medium,
    width: '90%',
    alignSelf: 'center',
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSizeTitle2 - 4,
    fontWeight: typography.fontWeightBold,
    marginBottom: spacing.medium,
  },
  infoItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.small,
  },
  labelText: {
    color: colors.textLabel,
    fontSize: typography.fontSizeLabel,
  },
  valueText: {
    color: colors.textPrimary,
    fontSize: typography.fontSizeLabel,
    fontWeight: typography.fontWeightBold,
    flexShrink: 1,
    textAlign: 'right',
  },
  descriptionText: {
    color: colors.textSecondary,
    fontSize: typography.fontSizeLabel,
    lineHeight: typography.fontSizeLabel + 6,
  },
  priceText: {
    color: colors.success,
    fontSize: typography.fontSizeText,
    fontWeight: typography.fontWeightBold,
  },
  pecaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.small / 2,
  },
  quantityText: {
    color: colors.textHint,
    fontSize: typography.fontSizeLabel,
  },
  separator: {
    height: 1,
    backgroundColor: colors.inputBackground,
    marginVertical: spacing.small / 2,
  }
});

export default DetalhesAgendamento;