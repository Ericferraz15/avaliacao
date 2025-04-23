import { useState } from "react";

export default function TabelaTarefas({ tarefas, setTarefas }) {
  const [novaTarefa, setNovaTarefa] = useState("");

  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== "") {
      setTarefas([...tarefas, novaTarefa]);
      setNovaTarefa("");
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Tarefas:</h2>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          className="border rounded p-2 flex-1"
          placeholder="Digite a tarefa"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={adicionarTarefa}>
          Adicionar
        </button>
      </div>
      <ul className="list-disc pl-5">
        {tarefas.map((tarefa, index) => (
          <li key={index}>{tarefa}</li>
        ))}
      </ul>
    </div>
  );
}
