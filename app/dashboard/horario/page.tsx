'use client';
import { useEffect, useState } from 'react';
import { getToken } from '@/lib/api';
import { getHorarios } from '@/lib/api';
import { HorarioPeriodo } from '@/lib/types';
import HorarioTable from '@/components/HorarioTable';

export default function HorarioPage() {
  const [periodos, setPeriodos] = useState<HorarioPeriodo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        if (!token) throw new Error('No token');
        const res = await getHorarios(token);
        setPeriodos(res.data);
      } catch (err) {
        setError('Error al cargar horarios');
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
      <h1 className="text-4xl font-bold mb-6">Horario de Clases</h1>
      {periodos.map((p) => (
        <div key={p.periodo.clave_periodo} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {p.periodo.descripcion_periodo} ({p.periodo.clave_periodo})
          </h2>
          <HorarioTable horarios={p.horario} />
        </div>
      ))}
    </div>
  );
}