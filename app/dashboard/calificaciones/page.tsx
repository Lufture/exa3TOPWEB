'use client';
import { useEffect, useState } from 'react';
import { getToken } from '@/lib/api';
import { getCalificaciones } from '@/lib/api';
import { CalificacionesPeriodo } from '@/lib/types';
import CalificacionesTable from '@/components/CalificacionesTable';

export default function CalificacionesPage() {
  const [periodos, setPeriodos] = useState<CalificacionesPeriodo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        if (!token) throw new Error('No token');
        const res = await getCalificaciones(token);
        setPeriodos(res.data);
      } catch (err) {
        setError('Error al cargar calificaciones');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-10">Cargando...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Calificaciones</h1>
      {periodos.map((p) => (
        <div key={p.periodo.clave_periodo} className="mb-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">
            {p.periodo.descripcion_periodo} ({p.periodo.clave_periodo})
          </h2>
          <CalificacionesTable materias={p.materias} />
        </div>
      ))}
    </div>
  );
}