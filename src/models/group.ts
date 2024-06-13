export interface GroupCreateBody{
    name: string
}

export interface GroupUpdateBody{
    name: string
}

export interface Group{
    id: number
    name: string
    user: number
}