import { useState } from 'react';
import { FiTruck, FiAlertCircle, FiPlusCircle, FiCheckCircle, FiShield, FiDollarSign, FiGrid, FiTool } from 'react-icons/fi';
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

export default function KPIs() {
  const [diasComFalhaEntregas, setDiasComFalhaEntregas] = useState([]);
  const [rncDataEntregas, setRncDataEntregas] = useState([]);
  const [diasComFalhaQualidade, setDiasComFalhaQualidade] = useState([]);
  const [rncDataQualidade, setRncDataQualidade] = useState([]);
  const [diasComFalhaSeguranca, setDiasComFalhaSeguranca] = useState([]);
  const [rncDataSeguranca, setRncDataSeguranca] = useState([]);
  const [diasComFalhaCustos, setDiasComFalhaCustos] = useState([]);
  const [rncDataCustos, setRncDataCustos] = useState([]);
  const [diasComFalha5S, setDiasComFalha5S] = useState([]);
  const [rncData5S, setRncData5S] = useState([]);
  const [diasComFalhaManutencao, setDiasComFalhaManutencao] = useState([]);
  const [rncDataManutencao, setRncDataManutencao] = useState([]);
  const [selectedDateEntregas, setSelectedDateEntregas] = useState('');
  const [rncTextEntregas, setRncTextEntregas] = useState('');
  const [selectedDateQualidade, setSelectedDateQualidade] = useState('');
  const [rncTextQualidade, setRncTextQualidade] = useState('');
  const [selectedDateSeguranca, setSelectedDateSeguranca] = useState('');
  const [rncTextSeguranca, setRncTextSeguranca] = useState('');
  const [selectedDateCustos, setSelectedDateCustos] = useState('');
  const [rncTextCustos, setRncTextCustos] = useState('');
  const [selectedDate5S, setSelectedDate5S] = useState('');
  const [rncText5S, setRncText5S] = useState('');
  const [selectedDateManutencao, setSelectedDateManutencao] = useState('');
  const [rncTextManutencao, setRncTextManutencao] = useState('');

  const toggleDia = (dia) => {
    setDiasComFalhaEntregas((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    );
    setDiasComFalhaQualidade((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    );
    setDiasComFalhaSeguranca((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    );
    setDiasComFalhaCustos((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    );
    setDiasComFalha5S((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    );
    setDiasComFalhaManutencao((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    );
  };

  const handleAddRNC = () => {
    if (selectedDateEntregas && rncTextEntregas) {
      setRncDataEntregas((prev) => [...prev, { date: selectedDateEntregas, rnc: rncTextEntregas }]);
      setRncDataQualidade((prev) => [...prev, { date: selectedDateEntregas, rnc: rncTextEntregas }]);
      setRncDataSeguranca((prev) => [...prev, { date: selectedDateEntregas, rnc: rncTextEntregas }]);
      setRncDataCustos((prev) => [...prev, { date: selectedDateEntregas, rnc: rncTextEntregas }]);
      setRncData5S((prev) => [...prev, { date: selectedDateEntregas, rnc: rncTextEntregas }]);
      setRncDataManutencao((prev) => [...prev, { date: selectedDateEntregas, rnc: rncTextEntregas }]);
      setSelectedDateEntregas('');
      setRncTextEntregas('');
    }
  };

  return (
    <div className="ml-16 p-6 w-[calc(100%-4rem)]">
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <FiTruck className="text-valmet-orange" />
        Indicadores de Performance - Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-6">
        <KpiGaugeCard
          icon={<FiTruck />}
          title="Entregas"
          diasComFalha={diasComFalhaEntregas}
          onToggleDia={(dia) => setDiasComFalhaEntregas((prev) => prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia])}
          rncData={rncDataEntregas}
          setSelectedDate={setSelectedDateEntregas}
          setRncText={setRncTextEntregas}
          handleAddRNC={() => {
            if (selectedDateEntregas && rncTextEntregas) {
              setRncDataEntregas((prev) => [...prev, { date: selectedDateEntregas, rnc: rncTextEntregas }]);
              setSelectedDateEntregas('');
              setRncTextEntregas('');
            }
          }}
          selectedDate={selectedDateEntregas}
          rncText={rncTextEntregas}
        />
        <KpiGaugeCard
          icon={<FiCheckCircle />}
          title="Qualidade"
          diasComFalha={diasComFalhaQualidade}
          onToggleDia={(dia) => setDiasComFalhaQualidade((prev) => prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia])}
          rncData={rncDataQualidade}
          setSelectedDate={setSelectedDateQualidade}
          setRncText={setRncTextQualidade}
          handleAddRNC={() => {
            if (selectedDateQualidade && rncTextQualidade) {
              setRncDataQualidade((prev) => [...prev, { date: selectedDateQualidade, rnc: rncTextQualidade }]);
              setSelectedDateQualidade('');
              setRncTextQualidade('');
            }
          }}
          selectedDate={selectedDateQualidade}
          rncText={rncTextQualidade}
        />
        <KpiGaugeCard
          icon={<FiShield />}
          title="Segurança"
          diasComFalha={diasComFalhaSeguranca}
          onToggleDia={(dia) => setDiasComFalhaSeguranca((prev) => prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia])}
          rncData={rncDataSeguranca}
          setSelectedDate={setSelectedDateSeguranca}
          setRncText={setRncTextSeguranca}
          handleAddRNC={() => {
            if (selectedDateSeguranca && rncTextSeguranca) {
              setRncDataSeguranca((prev) => [...prev, { date: selectedDateSeguranca, rnc: rncTextSeguranca }]);
              setSelectedDateSeguranca('');
              setRncTextSeguranca('');
            }
          }}
          selectedDate={selectedDateSeguranca}
          rncText={rncTextSeguranca}
        />
        <KpiGaugeCard
          icon={<FiDollarSign />}
          title="Custos"
          diasComFalha={diasComFalhaCustos}
          onToggleDia={(dia) => setDiasComFalhaCustos((prev) => prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia])}
          rncData={rncDataCustos}
          setSelectedDate={setSelectedDateCustos}
          setRncText={setRncTextCustos}
          handleAddRNC={() => {
            if (selectedDateCustos && rncTextCustos) {
              setRncDataCustos((prev) => [...prev, { date: selectedDateCustos, rnc: rncTextCustos }]);
              setSelectedDateCustos('');
              setRncTextCustos('');
            }
          }}
          selectedDate={selectedDateCustos}
          rncText={rncTextCustos}
        />
        <KpiGaugeCard
          icon={<FiGrid />}
          title="5S"
          diasComFalha={diasComFalha5S}
          onToggleDia={(dia) => setDiasComFalha5S((prev) => prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia])}
          rncData={rncData5S}
          setSelectedDate={setSelectedDate5S}
          setRncText={setRncText5S}
          handleAddRNC={() => {
            if (selectedDate5S && rncText5S) {
              setRncData5S((prev) => [...prev, { date: selectedDate5S, rnc: rncText5S }]);
              setSelectedDate5S('');
              setRncText5S('');
            }
          }}
          selectedDate={selectedDate5S}
          rncText={rncText5S}
        />
        <KpiGaugeCard
          icon={<FiTool />}
          title="Manutenção"
          diasComFalha={diasComFalhaManutencao}
          onToggleDia={(dia) => setDiasComFalhaManutencao((prev) => prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia])}
          rncData={rncDataManutencao}
          setSelectedDate={setSelectedDateManutencao}
          setRncText={setRncTextManutencao}
          handleAddRNC={() => {
            if (selectedDateManutencao && rncTextManutencao) {
              setRncDataManutencao((prev) => [...prev, { date: selectedDateManutencao, rnc: rncTextManutencao }]);
              setSelectedDateManutencao('');
              setRncTextManutencao('');
            }
          }}
          selectedDate={selectedDateManutencao}
          rncText={rncTextManutencao}
        />
      </div>
    </div>
  );
}

function KpiGaugeCard({
  icon,
  title,
  diasComFalha,
  onToggleDia,
  rncData,
  setSelectedDate,
  setRncText,
  handleAddRNC,
  selectedDate,
  rncText,
}) {
  const diasNoMes = 31;
  const falhas = diasComFalha.length;
  const sucesso = ((diasNoMes - falhas) / diasNoMes) * 100;

  const cor = sucesso >= 90 ? '#22c55e' : sucesso >= 75 ? '#facc15' : '#ef4444';

  const data = [{ name: title, value: sucesso, fill: cor }];

  // Função para formatar a data no formato DD/MM/YYYY
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR'); // Formato DD/MM/YYYY
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-6">
      <div className="text-xl text-gray-700 font-semibold flex gap-2 items-center">
        {icon}
        {title}
      </div>

      {/* Velocímetro e Dias */}
      <div className="flex flex-row items-center justify-between gap-6">
        {/* Velocímetro */}
        <div className="flex flex-col items-center">
          <RadialBarChart
            key={sucesso}
            width={250}
            height={150}
            cx={125}
            cy={125}
            innerRadius={70}
            outerRadius={90}
            barSize={18}
            startAngle={180}
            endAngle={0}
            data={data}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={10} />
          </RadialBarChart>
        </div>

        {/* Dias OK/Falhos */}
        <div className="flex flex-col w-full">
          <h3 className="text-lg font-semibold mb-2">Dias com falha</h3>
          <div className="flex gap-2 overflow-x-auto">
            {[...Array(diasNoMes)].map((_, i) => {
              const day = i + 1;
              const isFalha = diasComFalha.includes(day);
              return (
                <button
                  key={day}
                  onClick={() => onToggleDia(day)}
                  className={`w-9 h-9 text-base rounded transition-all font-semibold ${
                    isFalha
                      ? 'bg-red-200 text-red-800'
                      : 'bg-green-200 text-green-800'
                  } hover:scale-105`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Formulário e Tabela */}
      <div className="flex flex-row gap-6 items-start">
        {/* Contador de Dias */}
        <div className="flex flex-col items-center" style={{ width: '250px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <h3 className="text-lg font-semibold mb-2">Resumo dos Dias</h3>
          <div className="flex flex-col gap-2 text-center">
            <span className="text-sm font-medium text-gray-700">Dias OK: <span className="text-green-600">{diasNoMes - falhas}</span></span>
            <span className="text-sm font-medium text-gray-700">Dias com Falha: <span className="text-red-600">{falhas}</span></span>
            <span className="text-sm font-medium text-gray-700">% de Sucesso: <span className="text-blue-600">{sucesso.toFixed(2)}%</span></span>
          </div>
        </div>

        <div className="flex flex-col items-start" style={{ width: '80%' }}>
          {/* Adicionar RNC */}
          <div className="flex gap-4 mb-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border p-2 rounded-lg w-48"
            />
            <input
              type="text"
              placeholder="Descrição da RNC"
              value={rncText}
              onChange={(e) => setRncText(e.target.value)}
              className="border p-2 rounded-lg w-80"
            />
            <button
              onClick={() => handleAddRNC()}
              className="flex items-center gap-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              <FiPlusCircle />
              Adicionar RNC
            </button>
          </div>

          {/* Tabela de RNCs */}
          {rncData.length > 0 && (
            <div className="mt-4 w-full">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 text-left" style={{ width: '15%' }}>Data</th>
                    <th className="p-2 text-left">RNC</th>
                  </tr>
                </thead>
                <tbody>
                  {rncData.map((rnc, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{formatDate(rnc.date)}</td>
                      <td className="p-2">{rnc.rnc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
