// src/components/NestedDropdown.js
import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 20px 0;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export default function NestedDropdown({ onChange }) {
  const categories = [
    { label: "Hipocalórica", max: 30 },
    { label: "Normocalórica", max: 25 },
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
      <Label>Categoría de Actividad</Label>
      <Select value={category} onChange={handleCategory}>
        <option value="" disabled>
          -- Elige categoría --
        </option>
        {categories.map((c) => (
          <option key={c.label} value={c.label}>
            {c.label} (max {c.max})
          </option>
        ))}
      </Select>

      <Label>Valor</Label>
      <Select value={value} onChange={handleValue} disabled={!category}>
        <option value="" disabled>
          -- Elige valor --
        </option>
        {filtered.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </Select>
    </Wrapper>
  );
}
