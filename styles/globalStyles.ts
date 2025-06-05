import { Button, StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151515',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  initialTop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A10000',
    height: 100,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },

  initialBottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,

  },

});
