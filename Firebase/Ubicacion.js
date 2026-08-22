import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "./config.js";

export async function agregarCampoATodos() {
  const usuariosRef = collection(db, "Usuarios");
  const snapshot = await getDocs(usuariosRef);

  snapshot.forEach(async (usuarioDoc) => {
    const docRef = doc(db, "Usuarios", usuarioDoc.id);
    await updateDoc(docRef, {
      Ubicación: "" // valor por defecto
    });
  });
}
