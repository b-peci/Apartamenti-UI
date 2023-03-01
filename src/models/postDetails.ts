import { FileDto } from "./fileDto"

export class postDetails {
  postId!: string
  title!: string
  description!: string
  isForRenting!: boolean
  isForSelling!: boolean
  price!: number
  noRooms: number | undefined
  space: number | undefined
  files!: FileDto[]
}
