import { HorarioClase } from '@/lib/types';

interface Props {
  horarios: HorarioClase[];
}

export default function HorarioTable({ horarios }: Props) {
  const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'] as const;

  return (
    <div className="space-y-6">
      {horarios.map((h) => (
        <div key={h.id_grupo} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4">{h.nombre_materia}</h3>
          <p className="text-sm text-gray-600 mb-4">
            <span className="font-semibold">Clave:</span> {h.clave_materia} |
            <span className="font-semibold ml-3">Grupo:</span> {h.letra_grupo} |
            <span className="font-semibold ml-3">Turno:</span> {h.clave_turno}
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {dias.map((dia) => {
              const timeKey = dia as keyof HorarioClase;
              const salonKey = `${dia}_clave_salon` as keyof HorarioClase;
              const tiempo = h[timeKey] as string | null;
              const salon = h[salonKey] as string | null;

              return (
                <div key={dia} className={`p-3 rounded text-center ${tiempo ? 'bg-blue-50 border-2 border-blue-400' : 'bg-gray-50 border border-gray-300'}`}>
                  <p className="font-semibold text-sm capitalize">{dia}</p>
                  {tiempo ? (
                    <>
                      <p className="text-xs font-bold text-blue-600 mt-1">{tiempo}</p>
                      <p className="text-xs text-blue-600">{salon}</p>
                    </>
                  ) : (
                    <p className="text-xs text-gray-400 mt-1">Libre</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}