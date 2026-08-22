import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, GeoPoint } from "firebase-admin/firestore";
import { readFileSync } from "fs";
 
// Cargamos la service account key
const serviceAccount = JSON.parse(
  readFileSync(new URL("./serviceAccountKey.json", import.meta.url))
);
 
initializeApp({
  credential: cert(serviceAccount),
});
 
const db = getFirestore();
 
async function migrarTodosLosUsuarios() {
  // OJO: la colección real es "Usuarios" (con mayúscula), no "usuarios"
  const usuariosRef = db.collection("Usuarios");
  const snapshot = await usuariosRef.get();
 
  if (snapshot.empty) {
    console.log("No hay usuarios en la colección.");
    return;
  }
 
  console.log(`Revisando ${snapshot.size} usuario(s)...`);
 
  let exitosos = 0;
  let fallidos = 0;
 
  for (const usuarioDoc of snapshot.docs) {
    try {
      const data = usuarioDoc.data();
      // OJO: el campo real es "Ubicación" (con mayúscula y tilde), no "ubicacion"
      const ubi = data["Ubicación"];
 
      let lat = 13.6929; // Coordenada por defecto (San Salvador)
      let lng = -89.2182;
 
      // Si ya tiene ubicación guardada como objeto {lat,lng} o {latitude,longitude}
      // intentamos extraer sus valores. Si es un string vacío u otro texto sin
      // coordenadas, simplemente usamos el valor por defecto.
      if (ubi && typeof ubi === "object") {
        if (typeof ubi.latitude === "number") lat = ubi.latitude;
        else if (typeof ubi.lat === "number") lat = ubi.lat;
 
        if (typeof ubi.longitude === "number") lng = ubi.longitude;
        else if (typeof ubi.lng === "number") lng = ubi.lng;
      }
 
      const nuevoGeoPoint = new GeoPoint(lat, lng);
 
      await usuarioDoc.ref.update({
        "Ubicación": nuevoGeoPoint,
      });
 
      console.log(`-> Usuario ${usuarioDoc.id} actualizado correctamente a GeoPoint.`);
      exitosos++;
    } catch (error) {
      console.error(`Error actualizando ${usuarioDoc.id}:`, error.message);
      fallidos++;
    }
  }
 
  console.log(
    `\nMigración completa. Éxitos: ${exitosos}, Fallidos: ${fallidos}, Total: ${snapshot.size}`
  );
}
 
migrarTodosLosUsuarios()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error general al procesar los usuarios:", error);
    process.exit(1);
  });