import React, { useState } from "react";
import { View, Text, Image, StatusBar } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomButton } from "../../../components/CustomButton";
import { BackButton } from "../../../components/BackButton";
import { BottomNavigation } from "../../../components/BottomNavigation";
import { globalStyles } from "../../../styles/globalStyles";
import { pecStyles } from "../../../styles/pecStyles";

// API
import { agendamento } from "../../../api";

const CadastrarAgendamento = () => {
  const router = useRouter();
  const { servico } = useLocalSearchParams();
  const [dataHora, setDataHora] = useState(new Date());
  const [dataString, setDataString] = useState("");
  const insets = useSafeAreaInsets();
  const cliente = JSON.parse(localStorage.getItem("usuario_atual")!);

  const handleAgendamento = async () => {
    const data = await agendamento.criar_agendamento({
      cliente_id: cliente.id,
      servico_id: servico,
      data: dataString,
      status: "PENDENTE",
    });

    alert(data.mensagem);
    if (data.error) {
      return;
    }

    router.push("/agendamento");
  };

  const handleChange = (e: any) => {
    const novaData = new Date(e.target.value);
    setDataHora(novaData);
    setDataString(e.target.value);
  };

  const formatForInput = (date: any) => {
    const pad = (n: any) => n.toString().padStart(2, "0");
    const yyyy = date.getFullYear();
    const mm = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const hh = pad(date.getHours());
    const min = pad(date.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  };

  return (
    <>
      <StatusBar backgroundColor="#A10000" barStyle="light-content" />
      <View
        style={[
          globalStyles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <View style={globalStyles.crudTop}>
          <BackButton />
          <Image
            source={require("../../../assets/logo-nome.png")}
            style={{ width: 100, height: 190 }}
            resizeMode="contain"
          />
        </View>

        <View style={globalStyles.crudBottom}>
          <Text style={globalStyles.title}>Agendar Serviço</Text>

          {/* Campo de Data e Hora (somente web) */}
          <Text style={globalStyles.label}>Data e Hora</Text>
          <View style={{ marginVertical: 20 }}>
            <input
              type="datetime-local"
              value={formatForInput(dataHora)}
              onChange={handleChange}
              style={{
                padding: 15,
                fontSize: 16,
                borderRadius: 8,
                border: "1px solid #ccc",
                backgroundColor: "#f9f9f9",
              }}
            />
          </View>

          <View style={pecStyles.crudButtons}>
            <CustomButton
              style={{
                width: "39%",
                maxWidth: 193,
                height: 50,
                backgroundColor: "#868686",
              }}
              title="Cancelar"
              onPress={() => router.back()}
            />
            <CustomButton
              style={{ width: "39%", maxWidth: 193, height: 50 }}
              title="Agendar"
              onPress={handleAgendamento}
            />
          </View>
        </View>

        <BottomNavigation />
      </View>
    </>
  );
};

export default CadastrarAgendamento;
