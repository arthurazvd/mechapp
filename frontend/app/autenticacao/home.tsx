import { useState } from "react";
import BottomNavigation from "../../components/BottomNavigation";

const Home = () => {
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario_atual")!)
  );

  return (
    <>
      <h1>Página Home</h1>
      <BottomNavigation activeRoute="home" />
    </>
  );
};

export default Home;
