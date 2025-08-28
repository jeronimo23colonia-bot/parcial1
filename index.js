const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));


const votos = {
  JavaScript: 0,
  Python: 0,
  'C++': 0,
  Otro: 0
};


app.post('/votar', (req, res) => {
  const { opcion } = req.body;
  if (votos.hasOwnProperty(opcion)) {
    votos[opcion]++;
    res.json({ ok: true, votos });
  } else {
    res.status(400).json({ ok: false, error: 'Opción inválida' });
  }
});


app.get('/resultados', (req, res) => {
  const total = Object.values(votos).reduce((a, b) => a + b, 0);
  const resultados = Object.entries(votos).map(([opcion, cantidad]) => ({
    opcion,
    cantidad,
    porcentaje: total > 0 ? ((cantidad / total) * 100).toFixed(2) : '0.00'
  }));
  res.json({ total, resultados });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pagina.html'));
});

app.listen(port, () => {
  console.log('Servidor corriendo en http://localhost:' + port);
});