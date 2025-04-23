export default function CardManutencao({ manutencao }) {
  return (
    <div
      className="p-4 rounded shadow-md text-white"
      style={{ backgroundColor: cor }}
    >
      <h3 className="font-bold">{manutencao.peca}</h3>
      <p>Área: {manutencao.area.nome}</p>
      <p>Entrada: {manutencao.entrada}</p>
      <p>Saída: {manutencao.saida}</p>
    </div>
  );
}
