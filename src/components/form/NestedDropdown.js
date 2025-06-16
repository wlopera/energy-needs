// src/components/NestedDropdown.js
import React, { useState } from "react";
import styled from "styled-components";

export default function NestedDropdown({ onChange }) {
  const categories = [
    { label: "Hipocalórica", max: 30 },
    // { label: "Normocalórica", max: 25 },
    { label: "Hipercalórica", max: 15 },
  ];
  const allValues = [5, 10, 15, 20, 25, 30];

  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");

  const filtered = category
    ? allValues.filter(
        (v) => v <= categories.find((c) => c.label === category).max
      )
    : [];

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setValue("");
    onChange?.({ category: e.target.value, value: "" });
  };

  const handleValue = (e) => {
    setValue(e.target.value);
    onChange?.({ category, value: e.target.value });
  };

  return (
    <Wrapper>
      <Label htmlFor="category">Tipo de dieta</Label>
      <SelectRow>
        <Select id="category" value={category} onChange={handleCategory}>
          <option value="" disabled>
            Seleccione...
          </option>
          {categories.map((c) => (
            <option key={c.label} value={c.label}>
              {c.label} (max {c.max})
            </option>
          ))}
        </Select>
        <Select
          id="value"
          value={value}
          onChange={handleValue}
          disabled={!category}
        >
          <option value="" disabled>
            Elige valor…
          </option>
          {filtered.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </Select>
      </SelectRow>
    </Wrapper>
  );
}

// Styled Components

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 20px 0;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 0.95rem;
`;

const SelectRow = styled.div`
  display: flex;
  gap: 16px;
`;

const Select = styled.select`
  flex: 1;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;
