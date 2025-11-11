'use client';
import { useEffect, useState } from 'react';
import { getToken } from '@/lib/api';
import { getStudentData } from '@/lib/api';
import { StudentData } from '@/lib/types';
import StudentCard from '@/components/StudentCard';

export default function Dashboard() {
  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        if (!token) throw new Error('No token');
        const res = await getStudentData(token);
        setStudent(res.data);
      } catch (err) {
        setError('Error al cargar datos del estudiante');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-10">Cargando...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;
  if (!student) return <div className="text-center py-10">No hay datos</div>;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Bienvenido</h1>
      <StudentCard student={student} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Materias Reprobadas</h3>
          <p className="text-2xl font-bold text-red-600">{student.materias_reprobadas}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Promedio Aritmético</h3>
          <p className="text-2xl font-bold text-green-600">{student.promedio_aritmetico}</p>
        </div>
      </div>
    </div>
  );
}