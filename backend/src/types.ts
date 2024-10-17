
export type RegisterRequestBody = {
  username: string;
  email: string;
  password: string;
}

export type LoginRequestBody = {
  email: string;
  password: string;
}

export type UpdateProfileRequestBody = {
  profileImage?: string;
  bio?: string;
}