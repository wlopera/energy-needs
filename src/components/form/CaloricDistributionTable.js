// src/components/CaloricDistributionTable.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const macros = [
  {
    label: "Carbohidratos (20-45)",
    key: "carbohydrates",
    values: [20, 25, 30, 35, 40, 45],
  },
  { label: "Proteínas (30-45)", key: "proteins", values: [30, 35, 40, 45] },

  { label: "Grasas (20-35)", key: "fats", values: [20, 25, 30, 35] },
];

export default function CaloricDistributionTable({ onChange, RCT }) {
  const [values, setValues] = useState({
    proteins: "",
    carbohydrates: "",
    fats: "",
  });

  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const { proteins, carbohydrates, fats } = values;

    // Validamos solo si los tres tienen valores seleccionados
    if (proteins && carbohydrates && fats) {
      const sum = Number(proteins) + Number(carbohydrates) + Number(fats);
      if (sum !== 100) {
        setError(
          `Distribución calorica seleccionada=${sum}% debe ser exactamente 100%`
        );
        setIsValid(false);
        onChange?.(null);
      } else {
        setError("");
        setIsValid(true);
        onChange?.(values);
      }
    } else {
      setIsValid(false);
    }
  }, [values, onChange]);

  const handleChange = (key, newVal) => {
    setValues((prev) => ({
      ...prev,
      [key]: newVal,
    }));
  };

  return (
    <Wrapper>
      <TitleRow>
        <Title>Distribución Calórica</Title>
      </TitleRow>
      <Table>
        <tbody>
          {macros.map((macro) => (
            <tr key={macro.key}>
              <Td>{macro.label}</Td>
              <Td>
                <Select
                  value={values[macro.key]}
                  onChange={(e) => handleChange(macro.key, e.target.value)}
                >
                  <option value="">Seleccione…</option>
                  {macro.values.map((v) => (
                    <option key={v} value={v}>
                      {v}%
                    </option>
                  ))}
                </Select>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </Wrapper>
  );
}

// Styled Components
const Wrapper = styled.div`
  margin: 20px 0;
`;

const Title = styled.h4`
  margin-bottom: 12px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 8px;
  border-bottom: 2px solid #ccc;
`;

const Td = styled.td`
  padding: 8px;
  border-bottom: 1px solid #eee;
`;

const Select = styled.select`
  width: 100%;
  padding: 6px;
  font-size: 1rem;
`;

const ErrorMsg = styled.div`
  margin-top: 10px;
  color: red;
  font-weight: 500;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const CalculateButton = styled.button`
  padding: 8px 16px;
  font-size: 0.9rem;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
  &:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
  }
`;
