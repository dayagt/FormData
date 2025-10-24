const express = require('express');
const cors = require('cors');
const ExcelJS = require('exceljs');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/guardar', async (req, res) => {
  const datos = req.body;
  const archivo = 'datos.xlsx';

  const workbook = fs.existsSync(archivo)
    ? await new ExcelJS.Workbook().xlsx.readFile(archivo)
    : new ExcelJS.Workbook();

  const hoja = workbook.getWorksheet('Formulario') || workbook.addWorksheet('Formulario');

  if (hoja.rowCount === 0) {
    hoja.addRow(['Nombre', 'Apellido', 'Deporte', 'Género', 'Estado', 'Mayor de 21', 'Carros']);
  }

  hoja.addRow([
    datos.nombre,
    datos.apellido,
    datos.deporte,
    datos.genero,
    datos.estado,
    datos.edadConfirmada ? 'Sí' : 'No',
    datos.carros.join(', ')
  ]);

  await workbook.xlsx.writeFile(archivo);
  res.send({ mensaje: 'Datos guardados' });
});

app.listen(3001, () => console.log('Servidor corriendo en puerto 3001'));