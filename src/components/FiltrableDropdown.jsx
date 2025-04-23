import { useState, useEffect, useRef } from "react";

export default function FiltrableDropdown({
  options,
  selected,
  onSelect,
  placeholder = "Selecione...",
}) {
  const [filter, setFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        tabIndex={0}
        className="border p-2 rounded cursor-pointer flex justify-between bg-white w-full"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => e.key === "Enter" && setIsOpen(!isOpen)}
      >
        {selected || placeholder}
        <span>▼</span>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg">
          <input
            type="text"
            className="p-2 border-b w-full focus:outline-none"
            placeholder="Filtrar..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            autoFocus
            onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
          />
          <ul className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, idx) => (
                <li
                  key={idx}
                  tabIndex={0}
                  className="p-2 hover:bg-valmet-gray cursor-pointer"
                  onClick={() => {
                    onSelect(opt);
                    setIsOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onSelect(opt);
                      setIsOpen(false);
                    }
                  }}
                >
                  {opt}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">Nenhuma opção encontrada</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
