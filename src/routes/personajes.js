import express from "express";
import fs from "fs";

const router = express.Router();
const DATA_PATH = "./src/data/personajes.json";

// Leer archivo JSON
const getData = () => JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));

// Guardar archivo JSON
const saveData = (data) => fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

// Obtener todos los personajes
router.get("/", (req, res) => {
  const data = getData();
  res.json(data);
});

// Obtener personaje por ID
router.get("/:id", (req, res) => {
  const data = getData();
  const personaje = data.items.find(p => p.id === parseInt(req.params.id));
  if (!personaje) return res.status(404).json({ message: "Personaje no encontrado" });
  res.json(personaje);
});

// Crear personaje nuevo
router.post("/", (req, res) => {
  const data = getData();
  const nuevo = { id: data.items.length + 1, ...req.body };
  data.items.push(nuevo);
  saveData(data);
  res.status(201).json(nuevo);
});

// Actualizar personaje
router.put("/:id", (req, res) => {
  const data = getData();
  const index = data.items.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Personaje no encontrado" });
  data.items[index] = { ...data.items[index], ...req.body };
  saveData(data);
  res.json(data.items[index]);
});

// Eliminar personaje
router.delete("/:id", (req, res) => {
  const data = getData();
  const index = data.items.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Personaje no encontrado" });
  const eliminado = data.items.splice(index, 1);
  saveData(data);
  res.json(eliminado[0]);
});

export default router;
