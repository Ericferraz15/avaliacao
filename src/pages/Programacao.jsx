import { useState } from 'react';
import { areas, bus, clientes, itens, custos } from '../data/areas';
import FiltrableDropdown from '../components/FiltrableDropdown';

export default function Programacao() {
  const [form, setForm] = useState({
    bu: '',
    cliente: '',
    pcs: '',
    item: '',
    custo: '',
    tempo: 0
  });

  const [programacoes, setProgramacoes] = useState([]);
  const [atividades, setAtividades] = useState({});
  const [todasAtividades, setTodasAtividades] = useState([
    'Calibração', 
    'Troca de Rolamentos',
    'Inspeção Elétrica'
  ]);

  const handleAddProgramacao = () => {
    const novaProgramacao = {
      id: Date.now(),
      area: areas[0],
      inicio: '',
      fim: '',
    };
    setProgramacoes([...programacoes, novaProgramacao]);
    setAtividades({ ...atividades, [novaProgramacao.id]: [] });
  };

  const handleAddAtividade = (programacaoId) => {
    const programacao = programacoes.find(p => p.id === programacaoId);
    if (!programacao) return;

    const novasAtividades = [
      ...(atividades[programacaoId] || []),
      {
        id: Date.now(),
        descricao: '',
        inicio: programacao.inicio || '',
        fim: programacao.fim || ''
      }
    ];
    setAtividades({ ...atividades, [programacaoId]: novasAtividades });
  };

  const validateAtividadeDates = (atividade, programacao) => {
    if (!atividade.inicio || !atividade.fim || !programacao.inicio || !programacao.fim) return false;
    return (
      new Date(atividade.inicio) >= new Date(programacao.inicio) &&
      new Date(atividade.fim) <= new Date(programacao.fim)
    );
  };

  const handleDateChange = (programacaoId, field, value) => {
    const updated = programacoes.map(p => {
      if (p.id === programacaoId) {
        const newDate = { ...p, [field]: value };

        if (field === 'inicio' && p.fim && new Date(value) > new Date(p.fim)) {
          newDate.fim = value;
        } else if (field === 'fim' && p.inicio && new Date(value) < new Date(p.inicio)) {
          newDate.inicio = value;
        }

        return newDate;
      }
      return p;
    });
    setProgramacoes(updated);
  };

  const handleRemoveArea = (programacaoId) => {
    if (window.confirm('Tem certeza que deseja remover esta área e todas suas atividades?')) {
      setProgramacoes(programacoes.filter(p => p.id !== programacaoId));
      const newAtividades = { ...atividades };
      delete newAtividades[programacaoId];
      setAtividades(newAtividades);
    }
  };

  const handleRemoveAtividade = (programacaoId, atividadeId) => {
    if (window.confirm('Tem certeza que deseja remover esta atividade?')) {
      const updated = atividades[programacaoId].filter(a => a.id !== atividadeId);
      setAtividades({ ...atividades, [programacaoId]: updated });
    }
  };

  const handleAtividadeChange = (programacaoId, atividadeId, field, value) => {
    const updated = atividades[programacaoId].map(a => 
      a.id === atividadeId ? { ...a, [field]: value } : a
    );
    setAtividades({ ...atividades, [programacaoId]: updated });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Programação de Manutenção</h1>

      {/* Formulário Principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* BU */}
        <div className="space-y-1">
          <label className="block font-medium">BU</label>
          <FiltrableDropdown
            options={bus}
            selected={form.bu}
            onSelect={(value) => setForm({ ...form, bu: value })}
          />
        </div>

        {/* Cliente */}
        <div className="space-y-1">
          <label className="block font-medium">Cliente</label>
          <FiltrableDropdown
            options={clientes}
            selected={form.cliente}
            onSelect={(value) => setForm({ ...form, cliente: value })}
          />
        </div>

        {/* PCS */}
        <div className="space-y-1">
          <label className="block font-medium">PCS</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={form.pcs}
            onChange={(e) => setForm({ ...form, pcs: e.target.value })}
          />
        </div>

        {/* Item */}
        <div className="space-y-1">
          <label className="block font-medium">Item</label>
          <FiltrableDropdown
            options={itens}
            selected={form.item}
            onSelect={(value) => setForm({ ...form, item: value })}
          />
        </div>

        {/* Custo */}
        <div className="space-y-1">
          <label className="block font-medium">Custo</label>
          <FiltrableDropdown
            options={custos}
            selected={form.custo}
            onSelect={(value) => setForm({ ...form, custo: value })}
          />
        </div>

        {/* Tempo */}
        <div className="space-y-1">
          <label className="block font-medium">Tempo (horas)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            className="w-full p-2 border rounded"
            value={form.tempo}
            onChange={(e) => setForm({ ...form, tempo: parseFloat(e.target.value) || 0 })}
          />
        </div>
      </div>

      {/* Programação por Área */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Programação por Área</h2>
          <button
            type="button"
            onClick={handleAddProgramacao}
            className="bg-valmet-blue hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          >
            + Adicionar Área
          </button>
        </div>

        {programacoes.map((programacao) => (
          <div key={programacao.id} className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
            {/* Cabeçalho da Área */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* Dropdown de Áreas */}
              <div className="space-y-1 col-span-1">
                <label className="block text-sm font-medium">Área</label>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: programacao.area.color }}
                  />
                  <FiltrableDropdown
                    options={areas.map(a => a.nome)}
                    selected={programacao.area.nome}
                    onSelect={(value) => {
                      const updated = programacoes.map(p =>
                        p.id === programacao.id
                          ? { ...p, area: areas.find(a => a.nome === value) }
                          : p
                      );
                      setProgramacoes(updated);
                    }}
                  />
                </div>
              </div>

              {/* Início */}
              <div className="space-y-1">
                <label className="block text-sm font-medium">Início</label>
                <input
                  type="datetime-local"
                  className="w-full p-2 border rounded"
                  value={programacao.inicio}
                  onChange={(e) => handleDateChange(programacao.id, 'inicio', e.target.value)}
                />
              </div>

              {/* Fim */}
              <div className="space-y-1">
                <label className="block text-sm font-medium">Término</label>
                <input
                  type="datetime-local"
                  className="w-full p-2 border rounded"
                  value={programacao.fim}
                  onChange={(e) => handleDateChange(programacao.id, 'fim', e.target.value)}
                />
              </div>

              {/* Botão Remover Área */}
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => handleRemoveArea(programacao.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm transition-colors h-[42px]"
                >
                  Remover Área
                </button>
              </div>
            </div>

            {/* Atividades */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Atividades</h3>
                <button
                  type="button"
                  onClick={() => handleAddAtividade(programacao.id)}
                  className="bg-valmet-blue hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm transition-colors"
                >
                  + Adicionar Atividade
                </button>
              </div>

              {(atividades[programacao.id] || []).map((atividade) => {
                const isValid = validateAtividadeDates(atividade, programacao);
                return (
                  <div 
                    key={atividade.id}
                    className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3 p-3 rounded"
                  >
                    {/* Campo Atividade */}
                    <div className="space-y-1 flex flex-col">
                      <label className="block text-xs font-medium">Atividade</label>
                      <div className="flex-1">
                        <FiltrableDropdown
                          options={todasAtividades}
                          selected={atividade.descricao}
                          onSelect={(value) => handleAtividadeChange(programacao.id, atividade.id, 'descricao', value)}
                          placeholder="Selecione a atividade"
                        />
                      </div>
                    </div>

                    {/* Início */}
                    <div className="space-y-1">
                      <label className="block text-xs font-medium">Início</label>
                      <input
                        type="datetime-local"
                        className="w-full p-1.5 border rounded text-sm"
                        value={atividade.inicio}
                        onChange={(e) => handleAtividadeChange(programacao.id, atividade.id, 'inicio', e.target.value)}
                      />
                    </div>

                    {/* Fim */}
                    <div className="space-y-1">
                      <label className="block text-xs font-medium">Término</label>
                      <input
                        type="datetime-local"
                        className="w-full p-1.5 border rounded text-sm"
                        value={atividade.fim}
                        onChange={(e) => handleAtividadeChange(programacao.id, atividade.id, 'fim', e.target.value)}
                      />
                      {!isValid && (
                        <span className="text-red-500 text-xs block mt-1">Fora do período da área</span>
                      )}
                    </div>

                    {/* Botão Remover */}
                    <div className="flex items-center">
                      <button
                        onClick={() => handleRemoveAtividade(programacao.id, atividade.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm transition-colors h-[42px]"
                      >
                        🗑️ Remover
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Botão de Salvar */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            console.log('Dados salvos:', { ...form, programacoes });
            alert('Programação salva com sucesso!');
          }}
          className="bg-valmet-green hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Salvar Programação
        </button>
      </div>
    </div>
  );
}
