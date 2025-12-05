import api from "./axios";

export interface UserPayload {
  id: number;
  email: string;
  role: "admin" | "student" | "instructor";
  [key: string]: unknown;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: UserPayload;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/api/auth/login", payload);
  return data;
};

export const fetchCurrentUser = async (): Promise<UserPayload> => {
  const { data } = await api.get<UserPayload>("/api/auth/me");
  return data;
};

