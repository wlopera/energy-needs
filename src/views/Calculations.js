// src/views/Calculations.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getPhysicalActivityFactorOsmary } from "../services/InformationsService";
import NestedDropdown from "../components/form/NestedDropdown";

function Calculations() {
  const [formValues, setFormValues] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    fvf: "",
    activityCategory: "",
    activityValue: "",
    tbm: null,
  });

  const [fvfs, setFvfs] = useState([]);

  useEffect(() => {
    async function fetchOsmary() {
      try {
        const data = await getPhysicalActivityFactorOsmary();
        setFvfs(data.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchOsmary();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = ({ category, value }) => {
    setFormValues((v) => ({
      ...v,
      activityCategory: category,
      activityValue: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const computedTbm =
      (655 +
        9.5 * formValues.weight +
        1.8 * formValues.height -
        4.6 * formValues.age) *
      formValues.fvf;
    setFormValues((prev) => ({ ...prev, tbm: computedTbm }));
  };

  return (
    <FormContainer>
      <FormTitle>Calculations</FormTitle>
      <StyledForm onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="name">Nombre</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            required
          />
        </Field>
        <Field>
          <Label htmlFor="age">Edad</Label>
          <Input
            type="number"
            id="age"
            name="age"
            value={formValues.age}
            onChange={handleChange}
            required
          />
        </Field>
        <Field>
          <Label htmlFor="weight">Peso (kg)</Label>
          <Input
            type="number"
            id="weight"
            name="weight"
            value={formValues.weight}
            onChange={handleChange}
            step="0.1"
            required
          />
        </Field>
        <Field>
          <Label htmlFor="height">Altura (cm)</Label>
          <Input
            type="number"
            id="height"
            name="height"
            value={formValues.height}
            onChange={handleChange}
            required
          />
        </Field>
        <Field>
          <Label htmlFor="fvf">Factor de Actividad Física</Label>
          <Select
            id="fvf"
            name="fvf"
            value={formValues.fvf}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Selecciona su nivel de actividad
            </option>
            {fvfs.map((opt) => (
              <option key={opt.id} value={opt.value}>
                {opt.classification} — {opt.value}
              </option>
            ))}
          </Select>
        </Field>

        <NestedDropdown onChange={handleNestedChange} />

        <SubmitButton type="submit">Calcular TBM</SubmitButton>
      </StyledForm>

      {formValues.tbm !== null && (
        <Preview>
          <h4>Tasa Metabólica Basal:</h4>
          <pre>{JSON.stringify(formValues, null, 2)}</pre>
        </Preview>
      )}
    </FormContainer>
  );
}

export default Calculations;

// Styled Components

const FormContainer = styled.div`
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 16px;
  color: #333;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Field = styled.div`
  margin-bottom: 12px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  color: #555;
  font-size: 0.95rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }
`;

const SubmitButton = styled.button`
  padding: 10px 16px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 8px;
  &:hover {
    background-color: #0056b3;
  }
`;

const Preview = styled.div`
  margin-top: 20px;
  background: #f8f9fa;
  padding: 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #333;
`;
