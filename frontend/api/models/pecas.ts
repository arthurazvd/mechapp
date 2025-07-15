import { BASE_URL } from "..";
import { ImagePickerAsset } from 'expo-image-picker';

interface PecaCreate {
  nome: string;
  descricao: string;
  quantidade: number;
  preco: number;
  imagem?: string | null;
}

interface PecaUpdate {
  nome?: string;
  descricao?: string;
  quantidade?: number;
  preco?: number;
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

// Recuperar uma peça especifica
export const consultar_peca = async(peca_id: string | string[]) => {
    const response = await fetch(`${BASE_URL}/peca/${peca_id}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const data = await response.json();
    return data;
}

// Alterar uma peça existente
export const alterar_peca = async(peca: PecaUpdate, peca_id: string | string[]) => {
    const response = await fetch(`${BASE_URL}/peca/${peca_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(peca),
    })
    const data = await response.json();
    return data;
}

// Remover uma peça existente
export const remover_peca = async(peca_id: string | string[]) => {
    const response = await fetch(`${BASE_URL}/peca/${peca_id}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const data = await response.json();
    return data;
}

// Listar todas as peças
export const listar_pecas = async () => {
    const response = await fetch(`${BASE_URL}/peca`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
};
