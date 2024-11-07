// databaseFunctions.js
import { ref, set, get } from "firebase/database";
import { db as database } from "./firebase.js";

// Função para adicionar um veículo
export function addVehicle(vehicleID, vehicleData) {
  return set(ref(database, 'vehicles/' + vehicleID), vehicleData);
}

// Função para obter um veículo pelo ID
export function getVehicle(vehicleID) {
  const vehicleRef = ref(database, 'vehicles/' + vehicleID);
  return get(vehicleRef)
    .then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    })
    .catch(error => {
      throw error;
    });
}

// Função para obter todos os veículos
export function getAllVehicles() {
    const vehiclesRef = ref(database, 'vehicles');
    return get(vehiclesRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          return snapshot.val();  // Retorna todos os dados de veículos
        } else {
          return {}; // Retorna um objeto vazio se não houver veículos
        }
      })
      .catch(error => {
        throw error;
      });
  }