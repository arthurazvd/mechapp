import { Button, StyleSheet, TextInput } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
    justifyContent: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "white",
    paddingBottom: 20,
  },

  link: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },

  text: {
    fontSize: 15,
    textAlign: "center",
    color: "#868686",
  },

  initialTop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A10000",
    height: 100,
    borderBottomLeftRadius: 80,
  },

  initialBottom: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 10,
  },

  crudTop: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A10000",
    height: "7%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  crudBottom: {
    height: "83%",
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    color: "#888",
    textAlign: "left",
  },

  title2: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "#888",
  },

  homeButtons: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    rowGap: 10,
  },

  telaServicos: {
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: 30,
    height: "83%",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    position: "relative",
    backgroundColor: "#1e1e1e",
    padding: 25,
    borderRadius: 16,
    width: "80%",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  modalTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  modalButton: {
    backgroundColor: "#A10000",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },

  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },

  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 8,
    zIndex: 1,
  },

  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff0000",
  },
});
