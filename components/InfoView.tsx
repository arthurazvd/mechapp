import { View, Text, StyleSheet } from 'react-native';

interface InfoViewProps {
  label: string;
  value: string;
}

const InfoView = ({ label, value }: InfoViewProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
    width: '80%',
    maxWidth: 400,
    alignSelf: 'center'
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 4,
    fontSize: 14,
  },
  value: {
    fontSize: 16,
    color:'rgb(231, 231, 231)'
  }
});

export default InfoView;
