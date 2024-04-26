export interface IAudio {
  id: number
  name: string
  title: string
  icon: string
  media: Media
  paid: boolean
}

interface Media {
  url: string
  mimetype: string
  preview_img: string
  duration: number
}