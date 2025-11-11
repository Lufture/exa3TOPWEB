const API_BASE = 'https://cetech.roque.tecnm.mx/api';

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

async function apiCall<T>(endpoint: string, token: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    if (res.status === 401) throw new Error('Token inválido o expirado');
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

export async function getStudentData(token: string): Promise<StudentResponse> {
  return apiCall('/movil/estudiante', token);
}

export async function getCalificaciones(token: string): Promise<CalificacionesResponse> {
  return apiCall('/movil/estudiante/calificaciones', token);
}

export async function getHorarios(token: string): Promise<HorariosResponse> {
  return apiCall('/movil/estudiante/horarios', token);
}

export async function getKardex(token: string): Promise<KardexResponse> {
  return apiCall('/movil/estudiante/kardex', token);
}