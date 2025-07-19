import { useState } from "react";
import BottomNavigation from "../../components/BottomNavigation";

const PecaListar = () => {
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario_atual")!)
  );

  return (
    <>
      <h1>Página de Peças</h1>
      <BottomNavigation activeRoute="pecas" />
    </>
  );
};

export default PecaListar;
