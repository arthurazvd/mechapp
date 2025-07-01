import { Button, StyleSheet, TextInput } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151515',
    justifyContent: 'center',
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },

  link: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },

  text:{
    fontSize: 15,
    textAlign: 'center',
    color: '#868686',
  },

  initialTop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A10000',
    height: 100,
    borderBottomLeftRadius: 80,
  },

  initialBottom: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#888',
    textAlign: 'left',
  },

  title2: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#888',
  }
});
