export interface CurrentUser {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  avatar: string
  token: string
}

export interface UserUpdateBody {
  first_name: string
  last_name: string
  avatar: File | null
}