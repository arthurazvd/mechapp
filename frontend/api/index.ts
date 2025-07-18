// URL das APIs
export const BASE_URL = "http://localhost:8000";

// Integração de "models" como classes
import * as usuario from "./models/usuarios";
import * as peca from "./models/pecas";
import * as oficina from "./models/oficinas";
import * as servico from "./models/servicos";

// Exportando API
export { usuario, peca, oficina, servico };
