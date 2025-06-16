import { api } from "./config";

/**
 *  SERVICIOS DATOS GENERALES - Índice De Masa Corporal (Imc)
 */
const getBodyMassIndex = async () => {
  try {
    const response = await api.get("/information/body-mass-index");
    return response.data;
  } catch (error) {
    console.error("Error al obtener body-mass-index:", error);
    throw error;
  }
};

/**
 *  SERVICIOS DATOS GENERALES - Factor de Actividad Física o Factor de Corrección (FAF)
 */
const getPhysicalActivityFactor = async () => {
  try {
    const response = await api.get("/information/physical-activity-factor");
    return response.data;
  } catch (error) {
    console.error("Error al obtener physical-activity-factor:", error);
    throw error;
  }
};

/**
 *  SERVICIOS DATOS GENERALES - FACTOR DE ACTIVIDAD FÍSICA - OsmaryCuerpoFit
 */
const getPhysicalActivityFactorOsmary = async () => {
  try {
    const response = await api.get(
      "/information/physical-activity-factor-osmary"
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener physical-activity-factor-osmary:", error);
    throw error;
  }
};

/**
 *  SERVICIOS DATOS GENERALES - TIPOS DE DIETA
 */
const getDietTypes = async () => {
  try {
    const response = await api.get("/information/diet-types");
    return response.data;
  } catch (error) {
    console.error("Error al obtener diet-types:", error);
    throw error;
  }
};

/**
 *  SERVICIOS DATOS GENERALES - DÉFICIT CALÓRICO
 */
const getCaloricDeficit = async () => {
  try {
    const response = await api.get("/information/caloric-deficit");
    return response.data;
  } catch (error) {
    console.error("Error al obtener caloric-deficit:", error);
    throw error;
  }
};

/**
 *  SERVICIOS DATOS GENERALES - DISTRIBUCIÓN CALÓRICA
 */
const getCaloricDistribution = async () => {
  try {
    const response = await api.get("/information/caloric-distribution");
    return response.data;
  } catch (error) {
    console.error("Error al obtener caloric-distribution:", error);
    throw error;
  }
};

/**
 *  SERVICIOS DATOS GENERALES - Distribución en Gramos
 */
const getGramsDistribution = async () => {
  try {
    const response = await api.get("/information/grams-distribution");
    return response.data;
  } catch (error) {
    console.error("Error al obtener grams-distribution:", error);
    throw error;
  }
};

export {
  getBodyMassIndex,
  getPhysicalActivityFactor,
  getPhysicalActivityFactorOsmary,
  getDietTypes,
  getCaloricDeficit,
  getCaloricDistribution,
  getGramsDistribution,
};
