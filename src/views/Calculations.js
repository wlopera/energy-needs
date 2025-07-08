// src/views/Calculations.js
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { getPhysicalActivityFactorOsmary } from "../services/InformationsService";
import NestedDropdown from "../components/form/NestedDropdown";
import CaloricDistributionTable from "../components/form/CaloricDistributionTable";
import TableGeneric from "../components/table/TableGeneric";

function Calculations() {
  const [formValues, setFormValues] = useState({
    name: "Carolina",
    age: "45",
    weight: "81",
    height: "171",
    fvf: "1.5",
    activityCategory: "Hipocalórica",
    activityValue: "10",
  });
  const [TBM, setTBM] = useState(null);
  const [RCT, setRCT] = useState(0);

  const [energyNeeds, setEnergyNeeds] = useState({
    proteins: "",
    carbohydrates: "",
    fats: "",
  });
  const [macroTableData, setMacroTableData] = useState([]);

  const [calcTBMValid, setCalcTBMValid] = useState(false);
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

  // Validar campos TBM cuando cambien los valores del formulario
  useEffect(() => {
    const requiredFields = [
      "name",
      "age",
      "weight",
      "height",
      "fvf",
      "activityCategory",
      "activityValue",
    ];
    const isValid = requiredFields.every(
      (field) => formValues[field] && formValues[field].toString().trim() !== ""
    );

    setCalcTBMValid(isValid);

    setRCT(0);
    // Solo ocultar la tabla de macronutrientes cuando RCT vuelve a 0
    setDistributionValid(false);
  }, [formValues]);

  const validateDistributionFields = useCallback(() => {
    return (
      energyNeeds.proteins && energyNeeds.carbohydrates && energyNeeds.fats
    );
  }, [energyNeeds]);

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
      setEnergyNeeds({
        proteins: values.proteins,
        carbohydrates: values.carbohydrates,
        fats: values.fats,
      });
      setDistributionValid(true);
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
    setTBM(computedTbm.toFixed(3));

    const active =
      formValues.activityCategory === "Hipocalórica"
        ? -formValues.activityValue
        : formValues.activityValue;

    const computedTDC = computedTbm + (computedTbm * active) / 100;
    setRCT(computedTDC.toFixed(3));
  };

  const caloricDistribution = useCallback(() => {
    if (!validateDistributionFields()) {
      alert("Por favor, complete la distribución calórica antes de calcular.");
      return;
    }

    if (!RCT || RCT <= 0) {
      alert(
        "Debe calcular el TBM primero antes de calcular la distribución calórica."
      );
      return;
    }

    const computedTDC = RCT;
    const carbKcal = ((computedTDC * energyNeeds.carbohydrates) / 100).toFixed(
      2
    );
    const carbGrams = (
      (computedTDC * energyNeeds.carbohydrates) /
      100 /
      4
    ).toFixed(0);
    const proteinKcal = ((computedTDC * energyNeeds.proteins) / 100).toFixed(2);
    const proteinGrams = (
      (computedTDC * energyNeeds.proteins) /
      100 /
      4
    ).toFixed(0);
    const fatKcal = ((computedTDC * energyNeeds.fats) / 100).toFixed(2);
    const fatGrams = ((computedTDC * energyNeeds.fats) / 100 / 9).toFixed(0);

    setMacroTableData([
      {
        item: "Carbohidratos",
        percentage: energyNeeds.carbohydrates,
        kcal: carbKcal,
        grams: carbGrams,
      },
      {
        item: "Proteínas",
        percentage: energyNeeds.proteins,
        kcal: proteinKcal,
        grams: proteinGrams,
      },
      {
        item: "Grasas",
        percentage: energyNeeds.fats,
        kcal: fatKcal,
        grams: fatGrams,
      },
      {
        item: "TOTAL",
        percentage: "100",
        kcal: (
          parseFloat(carbKcal) +
          parseFloat(proteinKcal) +
          parseFloat(fatKcal)
        ).toFixed(2),
        grams: (
          parseInt(carbGrams) +
          parseInt(proteinGrams) +
          parseInt(fatGrams)
        ).toString(),
      },
    ]);
  }, [RCT, energyNeeds, validateDistributionFields]);

  useEffect(() => {
    if (distributionValid) caloricDistribution();
  }, [distributionValid, caloricDistribution]);

  // Recalcular macronutrientes cuando RCT cambie y ya haya distribución válida
  useEffect(() => {
    if (RCT > 0 && distributionValid) {
      caloricDistribution();
    }
  }, [RCT, distributionValid, caloricDistribution]);

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
            <NestedDropdown
              onChange={handleNestedChange}
              initialCategory={formValues.activityCategory}
              initialValue={formValues.activityValue}
            />
          </NestedField>
        </Row>
        <Row>
          <SubmitButton type="submit" disabled={!calcTBMValid}>
            Calcular TBM
          </SubmitButton>
          <CaloricTotalTitle $isNull={RCT === 0}>
            {RCT === 0
              ? "Calcular las calorías totales"
              : `Requerimiento Calórico Total: ${RCT} kcal`}
          </CaloricTotalTitle>
        </Row>
        {RCT > 0 && (
          <Row>
            <Field style={{ flex: 1 }}>
              <CaloricDistributionTable
                onChange={handleCaloricDistributionChange}
                RCT={RCT}
              />
            </Field>
          </Row>
        )}
      </StyledForm>
      {distributionValid && (
        <div>
          <TableGeneric
            title="Distribución de Macronutrientes"
            columns={[
              { key: "item", label: "Nutrientes", asign: "LEFT" },
              { key: "percentage", label: "%", asign: "CENTER" },
              { key: "kcal", label: "Kcal", asign: "CENTER" },
              { key: "grams", label: "Gramos", asign: "CENTER" },
            ]}
            data={macroTableData}
          />

          <Preview>
            <h4>Tasa Metabólica Basal:</h4>
            <pre>{JSON.stringify(formValues, null, 2)}</pre>
            <pre>{JSON.stringify(energyNeeds, null, 2)}</pre>
            <pre>{"TBM: " + TBM}</pre>
            <pre>{"RCT: " + RCT}</pre>
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
  color: ${(props) => (props.$isNull ? "#dc3545" : "#007bff")};
  text-align: center;
  background-color: ${(props) => (props.$isNull ? "#f8d7da" : "#e9f5ff")};
  padding: 10px 14px;
  border-radius: 6px;
`;
