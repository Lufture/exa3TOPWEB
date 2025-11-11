import { StudentData } from '@/lib/types';

interface Props {
  student: StudentData;
}

export default function StudentCard({ student }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{student.persona}</h2>
        <p className="text-gray-600 mb-1"><span className="font-semibold">No. Control:</span> {student.numero_control}</p>
        <p className="text-gray-600 mb-1"><span className="font-semibold">Email:</span> {student.email}</p>
        <p className="text-gray-600"><span className="font-semibold">Semestre:</span> {student.semestre}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded">
          <p className="text-sm text-gray-600">Promedio Ponderado</p>
          <p className="text-2xl font-bold text-blue-600">{student.promedio_ponderado}</p>
        </div>
        <div className="bg-green-50 p-4 rounded">
          <p className="text-sm text-gray-600">Créditos Acumulados</p>
          <p className="text-2xl font-bold text-green-600">{student.creditos_acumulados}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded">
          <p className="text-sm text-gray-600">Materias Aprobadas</p>
          <p className="text-2xl font-bold text-purple-600">{student.materias_aprobadas}</p>
        </div>
        <div className="bg-orange-50 p-4 rounded">
          <p className="text-sm text-gray-600">% Avance</p>
          <p className="text-2xl font-bold text-orange-600">{student.porcentaje_avance}%</p>
        </div>
      </div>
    </div>
  );
}