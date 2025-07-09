import { BASE_URL } from "..";
import { ImagePickerAsset } from 'expo-image-picker';

interface PecaCreate {
  nome: string;
  descricao: string;
  quantidade: number;
  preco: number;
  imagem?: string | null;
}

// Função de criação de peças
export const criar_peca = async(peca: PecaCreate) => {
    const response = await fetch(`${BASE_URL}/peca/criar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(peca),
    })
    const data = await response.json();
    return data;
}