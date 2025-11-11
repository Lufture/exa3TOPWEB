'use client';
import { useEffect, useState } from 'react';
import { getToken } from '@/lib/api';
import { getKardex } from '@/lib/api';
import { KardexMateria } from '@/lib/types';

export default function KardexPage() {
  const [materias, setMaterias] = useState<KardexMateria[]>([]);
  const [filtroSemestre, setFiltroSemestre] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        if (!token) throw new Error('No token');
        const res = await getKardex(token);
        setMaterias(res.data.kardex);
      } catch (err) {
        setError('Error al cargar kardex');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const semestres = [...new Set(materias.map(m => m.semestre))].sort((a, b) => a - b);
  const materiasFiltradas = filtroSemestre === 0
    ? materias
    : materias.filter(m => m.semestre === filtroSemestre);

  if (loading) return <div className="text-center py-10">Cargando...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Kardex</h1>
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setFiltroSemestre(0)}
          className={`px-4 py-2 rounded ${filtroSemestre === 0 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Todos
        </button>
        {semestres.map(sem => (
          <button
            key={sem}
            onClick={() => setFiltroSemestre(sem)}
            className={`px-4 py-2 rounded ${filtroSemestre === sem ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Sem {sem}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 text-left">Materia</th>
              <th className="p-3 text-center">Clave</th>
              <th className="p-3 text-center">Sem</th>
              <th className="p-3 text-center">Período</th>
              <th className="p-3 text-center">Créditos</th>
              <th className="p-3 text-center">Calificación</th>
              <th className="p-3 text-left">Descripción</th>
            </tr>
          </thead>
          <tbody>
            {materiasFiltradas.map((m) => (
              <tr key={`${m.clave_materia}-${m.periodo}`} className="border-b hover:bg-blue-50">
                <td className="p-3">{m.nombre_materia}</td>
                <td className="p-3 text-center text-sm">{m.clave_materia}</td>
                <td className="p-3 text-center">{m.semestre}</td>
                <td className="p-3 text-center">{m.periodo}</td>
                <td className="p-3 text-center">{m.creditos}</td>
                <td className={`p-3 text-center font-bold ${m.calificacion === 'AC' ? 'text-green-600' : Number(m.calificacion) >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                  {m.calificacion}
                </td>
                <td className="p-3 text-sm">{m.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}