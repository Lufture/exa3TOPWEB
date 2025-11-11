'use client';
import { useState } from 'react';
import { MateriaConCalificaciones } from '@/lib/types';

interface Props {
  materias: MateriaConCalificaciones[];
}

export default function CalificacionesTable({ materias }: Props) {
  const [filtro, setFiltro] = useState('');

  const materiasFiltradas = materias.filter(m =>
    m.materia.nombre_materia.toLowerCase().includes(filtro.toLowerCase()) ||
    m.materia.clave_materia.toLowerCase().includes(filtro.toLowerCase())
  );

  const calcPromedio = (calificaciones: (string | null)[]): string => {
    const validas = calificaciones.filter(c => c !== null).map(Number);
    if (validas.length === 0) return '-';
    const promedio = validas.reduce((a, b) => a + b) / validas.length;
    return promedio.toFixed(2);
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar materia..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 text-left">Materia</th>
              <th className="p-3 text-center">Clave</th>
              <th className="p-3 text-center">P1</th>
              <th className="p-3 text-center">P2</th>
              <th className="p-3 text-center">P3</th>
              <th className="p-3 text-center">P4</th>
              <th className="p-3 text-center">Promedio</th>
            </tr>
          </thead>
          <tbody>
            {materiasFiltradas.map((m) => (
              <tr key={m.materia.id_grupo} className="border-b hover:bg-blue-50">
                <td className="p-3">{m.materia.nombre_materia}</td>
                <td className="p-3 text-center">{m.materia.clave_materia}</td>
                {m.calificaiones.map((cal) => (
                  <td key={cal.id_calificacion} className="p-3 text-center">
                    {cal.calificacion || '-'}
                  </td>
                ))}
                <td className="p-3 text-center font-bold text-blue-600">
                  {calcPromedio(m.calificaiones.map(c => c.calificacion))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}