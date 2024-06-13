export interface Image{
    id: number
    image: string
    original_image: string
    user: number
    group: number | null
    title: string
}

export interface ImageCreateBody{
    image: File
    title: string
}

export interface ImageUpdateBody{
    image: File | null
    title: string | null
}

export interface SelectableImage{
    image: Image,
    active: boolean,
}