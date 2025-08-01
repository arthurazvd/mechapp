import { StyleSheet } from 'react-native';

export const cliStyles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    color: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 8,
  },
  filterButton: {
    marginLeft: 10,
    backgroundColor: '#A10000',
    padding: 10,
    borderRadius: 8,
  },
  listContent: {
    paddingBottom: 20,
    paddingTop: 20,
    width: '100%',
    alignSelf: 'center',
  },
  avaliarButton: {
    marginTop: 10,
    backgroundColor: '#A10000',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  avaliarText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
    alignSelf: 'center',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  modalInput: {
    backgroundColor: '#242424',
    color: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    alignSelf: 'center',
  },
  modalButton: {
    backgroundColor: '#A10000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#aaa',
    marginTop: 4,
    fontSize: 13,
  },
  cardRating: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingText: {
    color: '#FFD700',
    fontWeight: 'bold',
    marginTop: 2,
  },
  noRating: {
    color: '#888',
    fontSize: 12,
    textAlign: 'right',
  },
  placeholderImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#2e2e2e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    width: '90%',
    alignSelf: 'center',
    padding: 20,
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
  },
  imageBox: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#2e2e2e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  nome: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descricao: {
    color: '#aaa',
    fontSize: 14,
  },
  modalText: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 20,
  },
  infoTextBox: {
    flex: 1,
  },

});
