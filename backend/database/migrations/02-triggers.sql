CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Colocando trigger para empre atualizar o updated at
CREATE TRIGGER update_usuarios BEFORE UPDATE ON usuarios FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_oficinas BEFORE UPDATE ON oficinas FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_pecas BEFORE UPDATE ON pecas FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_servicos BEFORE UPDATE ON servicos FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_agendamentos BEFORE UPDATE ON agendamentos FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_avaliacoes BEFORE UPDATE ON avaliacoes FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_pecas_do_agendamento BEFORE UPDATE ON pecas_do_agendamento FOR EACH ROW EXECUTE FUNCTION update_updated_at();