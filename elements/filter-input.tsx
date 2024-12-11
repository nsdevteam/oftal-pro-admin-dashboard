import React, { useState, memo } from "react";

interface FilterInputProps {
  data: any;   
  onFilter: (filteredData: any[]) => void;
  placeholder?: string;
  mapKeysFn?: (data:any) => any   
}

const FilterInput: React.FC<FilterInputProps> = memo(({data, onFilter, placeholder = "Pesquisar...",mapKeysFn }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);

    if(query?.length === 0 || query == null){
      onFilter(data);       
      return;
    }
    // Filter logic
    const filteredData = data.filter((item:any) =>  
      Object.values(mapKeysFn && mapKeysFn(item) || item).some((field) =>
        String(field).toLowerCase().includes(value)
      )
  );
    onFilter(filteredData);
  };   

  return (
    <input
      type="text"
      value={query}
      onChange={handleInputChange}      
      placeholder={placeholder}
      style={{
        padding: "8px",
        width: "100%",
        borderRadius: "4px",
        border: "1px solid #ccc",
        fontSize: "14px",
      }}
    />
  );
});

export default FilterInput;
