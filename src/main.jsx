import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Programacao from "./pages/Programacao";
import Acompanhamento from "./pages/Acompanhamento";
import GenericCadastro from "./pages/cadastros/GenericCadastro";
import Usuarios from "./pages/Usuarios";
import KPIs from "./pages/KPIs"; // Importação adicionada
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Programacao />} />
          <Route path="acompanhamento" element={<Acompanhamento />} />
          <Route path="kpis" element={<KPIs />} /> {/* Rota adicionada */}
          <Route path="cadastros/:tipo" element={<GenericCadastro />} />
          <Route path="usuarios" element={<Usuarios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
