export async function getWeatherData(location) {
  const apiKey = "34LZ7RCQ376ZNGGEHUVNH37RL"; // Reemplaza con tu clave de API de Visual Crossing Weather
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`No se pudo obtener el clima: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la peticion", error);
    throw error;
  }
}

export function processWeatherData(rawData) {
  const currentConditions = rawData.currentConditions;

  return {
    location: rawData.resolvedAddress,
    temp: currentConditions.temp,
    conditions: currentConditions.conditions,
  };
}

// async function probarApi() {
//   try {
//     let data = await getWeatherData("Caracas");

//     let processData = processWeatherData(data);

//     console.log(processData);
//   } catch (error) {
//     console.error("Hubo un error:", error);
//   }
// }

// probarApi();
