import React, { useState } from 'react';

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    deporte: '',
    genero: '',
    estado: '',
    edadConfirmada: false,
    carros: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox' && name === 'carros') {
      setFormData((prev) => ({
        ...prev,
        carros: checked
          ? [...prev.carros, value]
          : prev.carros.filter((c) => c !== value)
      }));
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3001/api/guardar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      alert('Datos guardados correctamente');
    } catch (error) {
      alert('Error al guardar los datos');
    }
  };

  return (
    <form className="container mt-5 mb-5 p-4 border rounded bg-light" onSubmit={handleSubmit}>
      <h2 className="mb-4 text-success">Actualizar Información</h2>

      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input type="text" name="nombre" className="form-control" onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Apellido</label>
        <input type="text" name="apellido" className="form-control" onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Deporte favorito</label>
        <select name="deporte" className="form-select" onChange={handleChange} required>
          <option value="">Seleccione</option>
          <option value="basketball">Basketball</option>
          <option value="fútbol">Fútbol</option>
          <option value="tenis">Tenis</option>
          <option value="natación">Natación</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label d-block">Género</label>
        <div className="form-check form-check-inline">
          <input type="radio" name="genero" value="masculino" className="form-check-input" onChange={handleChange} />
          <label className="form-check-label">Masculino</label>
        </div>
        <div className="form-check form-check-inline">
          <input type="radio" name="genero" value="femenino" className="form-check-input" onChange={handleChange} />
          <label className="form-check-label">Femenino</label>
        </div>
        <div className="form-check form-check-inline">
          <input type="radio" name="genero" value="no definido" className="form-check-input" onChange={handleChange} />
          <label className="form-check-label">No definido</label>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Estado</label>
        <select name="estado" className="form-select" onChange={handleChange} required>
          <option value="">Seleccione</option>
          <option value="Kansas">Kansas</option>
          <option value="Texas">Texas</option>
          <option value="California">California</option>
          <option value="Florida">Florida</option>
        </select>
      </div>

      <div className="form-check mb-3">
        <input type="checkbox" name="edadConfirmada" className="form-check-input" onChange={handleChange} />
        <label className="form-check-label">Soy mayor de 21 años</label>
      </div>

      <div className="mb-3">
        <label className="form-label d-block">Marcas de carro que posee</label>
        {['Ford', 'Nissan', 'Toyota', 'Chrysler'].map((marca) => (
          <div className="form-check form-check-inline" key={marca}>
            <input
              type="checkbox"
              name="carros"
              value={marca}
              className="form-check-input"
              onChange={handleChange}
            />
            <label className="form-check-label">{marca}</label>
          </div>
        ))}
      </div>

      <button type="submit" className="btn btn-success">Guardar cambios</button>
    </form>
  );
};

export default Formulario;