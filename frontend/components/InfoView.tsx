import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../styles/globalStyles';

interface InfoViewProps {
  label: string;
  value: string;
  containerStyle?: object;
}

export const InfoView = ({ label, value, containerStyle }: InfoViewProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.textLabel, 
    borderRadius: spacing.small,
    padding: spacing.medium,        
    marginVertical: spacing.small,  
    width: '90%',                  
    maxWidth: 500,                  
    alignSelf: 'center',
    backgroundColor: colors.surface, 
  },
  label: {
    fontWeight: typography.fontWeightBold,
    color: colors.textLabel,        
    marginBottom: spacing.small / 2, 
    fontSize: typography.fontSizeLabel,
  },
  value: {
    fontSize: typography.fontSizeText, 
    color: colors.textSecondary,      
  },
});

export default InfoView;
