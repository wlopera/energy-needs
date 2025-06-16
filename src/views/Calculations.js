// src/views/Calculations.js
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { getPhysicalActivityFactorOsmary } from "../services/InformationsService";
import NestedDropdown from "../components/form/NestedDropdown";
import CaloricDistributionTable from "../components/form/CaloricDistributionTable";
import TableGeneric from "../components/table/TableGeneric";

function Calculations() {
  const [formValues, setFormValues] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    fvf: "",
    activityCategory: "",
    activityValue: "",
    TBM: null,
    RCT: null,
  });

  const [energyNeeds, setEnergyNeeds] = useState([]);

  const [distributionValid, setDistributionValid] = useState(false);

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

  const handleCaloricDistributionChange = useCallback((values) => {
    if (values) {
      setDistributionValid(true);
      setEnergyNeeds((prev) => ({
        ...prev,
        proteins: values.proteins,
        carbohydrates: values.carbohydrates,
        fats: values.fats,
      }));
    } else {
      setDistributionValid(false);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const computedTbm =
      (655 +
        9.5 * formValues.weight +
        1.8 * formValues.height -
        4.6 * formValues.age) *
      formValues.fvf;
    setFormValues((prev) => ({ ...prev, TBM: computedTbm.toFixed(3) }));

    const active =
      formValues.activityCategory === "Hipocalórica"
        ? -formValues.activityValue
        : formValues.activityValue;

    const computedTDC = computedTbm + (computedTbm * active) / 100;

    setFormValues((prev) => ({
      ...prev,
      RCT: computedTDC.toFixed(3),
    }));

    setEnergyNeeds([
      {
        item: "Carbohidratos",
        percentage: energyNeeds.carbohydrates,
        kcal: ((computedTDC * energyNeeds.carbohydrates) / 100).toFixed(2),
        grams: ((computedTDC * energyNeeds.carbohydrates) / 100 / 4).toFixed(0),
      },
      {
        item: "Proteínas",
        percentage: energyNeeds.proteins,
        kcal: ((computedTDC * energyNeeds.proteins) / 100).toFixed(2),
        grams: ((computedTDC * energyNeeds.proteins) / 100 / 4).toFixed(0),
      },
      {
        item: "Grasas",
        percentage: energyNeeds.fats,
        kcal: ((computedTDC * energyNeeds.fats) / 100).toFixed(2),
        grams: ((computedTDC * energyNeeds.fats) / 100 / 9).toFixed(0),
      },
    ]);
  };

  return (
    <FormContainer>
      <FormTitle>Planes Macro Nutrientes</FormTitle>
      <StyledForm onSubmit={handleSubmit}>
        <Row>
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
        </Row>

        <Row>
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
        </Row>

        <Field>
          <Label htmlFor="fvf">Factor de actividad física</Label>
          <Select
            id="fvf"
            name="fvf"
            value={formValues.fvf}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Seleccione...
            </option>
            {fvfs.map((opt) => (
              <option key={opt.id} value={opt.value}>
                {opt.classification} — {opt.value}
              </option>
            ))}
          </Select>
        </Field>

        <Row>
          <NestedField>
            <NestedDropdown onChange={handleNestedChange} />
          </NestedField>
        </Row>
        <Row>
          <CaloricTotalTitle>
            Requerimiento Calórico Total: {formValues.RCT} kcal
          </CaloricTotalTitle>
        </Row>
        <Row>
          <Field style={{ flex: 1 }}>
            <CaloricDistributionTable
              onChange={handleCaloricDistributionChange}
            />
          </Field>
        </Row>
        <SubmitButton type="submit" disabled={!distributionValid}>
          Calcular TBM
        </SubmitButton>
      </StyledForm>
      {formValues.TBM !== null && (
        <div>
          <TableGeneric
            title="Distribución de Macronutrientes"
            columns={[
              { key: "item", label: "Nutrientes", asign: "LEFT" },
              { key: "percentage", label: "%", asign: "CENTER" },
              { key: "kcal", label: "Kcal", asign: "CENTER" },
              { key: "grams", label: "Gramos", asign: "CENTER" },
            ]}
            data={energyNeeds}
          />

          <Preview>
            <h4>Tasa Metabólica Basal:</h4>
            <pre>{JSON.stringify(formValues, null, 2)}</pre>
            <pre>{JSON.stringify(energyNeeds, null, 2)}</pre>
          </Preview>
        </div>
      )}
    </FormContainer>
  );
}

export default Calculations;

// Styled Components

const FormContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 24px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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
  gap: 8px;
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
`;

const Field = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const NestedField = styled(Field)`
  flex: 1;
`;

const Label = styled.label`
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
  padding: 12px 16px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: center;
  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
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

const CaloricTotalTitle = styled.h4`
  margin-top: 16px;
  font-size: 1.2rem;
  color: #007bff;
  text-align: center;
  background-color: #e9f5ff;
  padding: 10px 14px;
  border-radius: 6px;
`;
