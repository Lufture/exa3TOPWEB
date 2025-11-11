export interface LoginResponse {
  responseCodeTxt: string;
  message: {
    login: {
      token: string;
    };
  };
  status: number;
  flag: string;
  data: number;
  type: string;
}

export interface StudentData {
  numero_control: string;
  persona: string;
  email: string;
  semestre: number;
  num_mat_rep_no_acreditadas: string;
  creditos_acumulados: string;
  promedio_ponderado: string;
  promedio_aritmetico: string;
  materias_cursadas: string;
  materias_reprobadas: string;
  materias_aprobadas: string;
  creditos_complementarios: number;
  porcentaje_avance: number;
  num_materias_rep_primera: null | string;
  num_materias_rep_segunda: null | string;
  percentaje_avance_cursando: number;
  foto: string;
}

export interface StudentResponse {
  code: number;
  message: string;
  flag: boolean;
  data: StudentData;
}

export interface CalificacionDetail {
  id_calificacion: number;
  numero_calificacion: number;
  calificacion: string | null;
}

export interface Materia {
  id_grupo: number;
  nombre_materia: string;
  clave_materia: string;
  letra_grupo: string;
}

export interface MateriaConCalificaciones {
  materia: Materia;
  calificaiones: CalificacionDetail[];
}

export interface Periodo {
  clave_periodo: string;
  anio: number;
  descripcion_periodo: string;
}

export interface CalificacionesPeriodo {
  periodo: Periodo;
  materias: MateriaConCalificaciones[];
}

export interface CalificacionesResponse {
  code: number;
  message: string;
  flag: boolean;
  data: CalificacionesPeriodo[];
}

export interface HorarioClase {
  id_grupo: number;
  letra_grupo: string;
  nombre_materia: string;
  clave_materia: string;
  clave_turno: string;
  nombre_plan: string;
  letra_nivel: string;
  lunes: string | null;
  lunes_clave_salon: string | null;
  martes: string | null;
  martes_clave_salon: string | null;
  miercoles: string | null;
  miercoles_clave_salon: string | null;
  jueves: string | null;
  jueves_clave_salon: string | null;
  viernes: string | null;
  viernes_clave_salon: string | null;
  sabado: string | null;
  sabado_clave_salon: string | null;
}

export interface HorarioPeriodo {
  periodo: Periodo;
  horario: HorarioClase[];
}

export interface HorariosResponse {
  code: number;
  message: string;
  flag: boolean;
  data: HorarioPeriodo[];
}

export interface KardexMateria {
  nombre_materia: string;
  clave_materia: string;
  periodo: string;
  creditos: string;
  calificacion: string;
  descripcion: string;
  semestre: number;
}

export interface KardexResponse {
  code: number;
  message: string;
  flag: boolean;
  data: {
    porcentaje_avance: number;
    kardex: KardexMateria[];
  };
}