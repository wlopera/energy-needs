import { useEffect, useState } from "react";
import {
  getBodyMassIndex,
  getPhysicalActivityFactor,
  getPhysicalActivityFactorOsmary,
  getDietTypes,
  getCaloricDeficit,
  getCaloricDistribution,
  getGramsDistribution,
} from "../services/InformationsService";
import TableGeneric from "../components/table/TableGeneric";
import styled from "styled-components";

function Information() {
  const [bodyMassIndex, setBodyMassIndex] = useState(null);
  const [physicalActivityFactor, setPhysicalActivityFactor] = useState(null);

  const [physicalActivityFactorOsmary, setPhysicalActivityFactorOsmary] =
    useState(null);
  const [dietTypes, setDietTypes] = useState(null);
  const [caloricDeficit, setCaloricDeficit] = useState(null);
  const [caloricDistribution, setCaloricDistribution] = useState(null);
  const [gramsDistribution, setGramsDistribution] = useState(null);

  useEffect(() => {
    const fetchBodyMass = async () => {
      try {
        const data = await getBodyMassIndex();
        setBodyMassIndex(data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    const fetchPhysicalActivityFactor = async () => {
      try {
        const data = await getPhysicalActivityFactor();
        setPhysicalActivityFactor(data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    const fetchPhysicalActivityFactorOsmary = async () => {
      try {
        const data = await getPhysicalActivityFactorOsmary();
        setPhysicalActivityFactorOsmary(data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    const fetchDietTypes = async () => {
      try {
        const data = await getDietTypes();
        setDietTypes(data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    const fetchCaloricDeficit = async () => {
      try {
        const data = await getCaloricDeficit();
        setCaloricDeficit(data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    const fetchCaloricDistribution = async () => {
      try {
        const data = await getCaloricDistribution();
        setCaloricDistribution(data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    const fetchGramsDistribution = async () => {
      try {
        const data = await getGramsDistribution();
        setGramsDistribution(data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchBodyMass();
    fetchPhysicalActivityFactor();
    fetchPhysicalActivityFactorOsmary();
    fetchDietTypes();
    fetchCaloricDeficit();
    fetchCaloricDistribution();
    fetchGramsDistribution();
  }, []);

  if (
    !bodyMassIndex ||
    !physicalActivityFactor ||
    !physicalActivityFactorOsmary ||
    !dietTypes ||
    !caloricDeficit ||
    !caloricDistribution ||
    !gramsDistribution
  ) {
    return <p>Cargando datos...</p>;
  }

  return (
    <>
      <CenteredWrapper>
        <TableGeneric
          title={bodyMassIndex.title}
          columns={bodyMassIndex.header}
          data={bodyMassIndex.data}
        />
      </CenteredWrapper>

      <CenteredWrapper>
        <TableGeneric
          title={physicalActivityFactor.title}
          columns={physicalActivityFactor.header}
          data={physicalActivityFactor.data}
        />
      </CenteredWrapper>

      <CenteredWrapper>
        <TableGeneric
          title={physicalActivityFactorOsmary.title}
          columns={physicalActivityFactorOsmary.header}
          data={physicalActivityFactorOsmary.data}
        />
      </CenteredWrapper>

      <CenteredWrapper>
        <TableGeneric
          title={dietTypes.title}
          columns={dietTypes.header}
          data={dietTypes.data}
        />
      </CenteredWrapper>

      <CenteredWrapper>
        <TableGeneric
          title={caloricDeficit.title}
          columns={caloricDeficit.header}
          data={caloricDeficit.data}
        />
      </CenteredWrapper>

      <CenteredWrapper>
        <TableGeneric
          title={caloricDistribution.title}
          columns={caloricDistribution.header}
          data={caloricDistribution.data}
        />
      </CenteredWrapper>

      <CenteredWrapper>
        <TableGeneric
          title={gramsDistribution.title}
          columns={gramsDistribution.header}
          data={gramsDistribution.data}
        />
      </CenteredWrapper>
    </>
  );
}

export default Information;

const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;
