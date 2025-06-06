import { StyleSheet } from 'react-native';

export const servStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151515',
    justifyContent: 'center',
  },

  initialTop: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A10000',
    height: '7%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  initialBottom: {
    height: '93%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  crudButtons: {
    flexDirection: 'row',
    columnGap: 10,
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

  picker:{
    backgroundColor:'#242424',
    borderRadius: 8,
    borderWidth: 0,
    color: '#868686',
    width: '100%',
    height: 50,
    paddingHorizontal: 12,
  },
  
  pickerContainer: {
    width: '80%',
    maxWidth: 400,
    marginBottom: 10,
    justifyContent: 'center',
  },

  checkbox: {
    height: 20,
    width: 20,
  },

  checkboxContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    borderRadius: 8,
    backgroundColor: '#242424',
    paddingHorizontal: 20,
    height: 50,
    width: '80%',
    maxWidth: 400,
    marginTop: 10,
  },
});
