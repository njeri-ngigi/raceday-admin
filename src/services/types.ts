export interface LoginResponse {
  accessToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export type ApiError = {
  status: number;
  data: {
    message: string;
    error: string;
    statusCode: number;
  }
};
