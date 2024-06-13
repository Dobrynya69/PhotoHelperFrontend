export interface SignUpBody {
    username: string
    email: string
    password: string
    first_name: string
    last_name: string
    avatar: File | null
}
  