import { StyleSheet } from 'react-native';

export const cliStyles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#242424',
    color: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  filterButton: {
    marginLeft: 10,
    backgroundColor: '#A10000',
    padding: 10,
    borderRadius: 8,
  },
  listContent: {
    padding: 20,
  },
  avaliarButton: {
    marginTop: 10,
    backgroundColor: '#A10000',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
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
  },
  modalButton: {
    backgroundColor: '#A10000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
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


});