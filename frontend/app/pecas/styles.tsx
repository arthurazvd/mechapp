import { StyleSheet } from 'react-native';

export const pecStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151515',
    justifyContent: 'center',
  },
  
  crudButtons: {
    flexDirection: 'row',
    columnGap: '2%',
    width: '100%',
    justifyContent: 'center',
    marginTop: 25,
  },

  precoInput: {
    flexDirection: 'row',
    columnGap: '2%',
    width: '80%',
    maxWidth: 400,
    justifyContent: 'center',
  },

  viewPecas: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    gap: 50,
    width: '80%',
    maxWidth: 400,
  }

});
