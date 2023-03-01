// ** MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { MouseEventHandler } from 'react'

interface ICardImgTopProps {
  title: string
  price: string
  image: string,
  onClickEvent: MouseEventHandler<HTMLDivElement> | undefined;
}

const CardImgTop = (props: ICardImgTopProps) => {
  return (
    <Card onClick={props.onClickEvent} sx={{ cursor: 'pointer' }}>
      <CardMedia sx={{ height: '14.5625rem' }} image={props.image} />
      <CardContent>
        <Typography variant='h6' sx={{ mb: 2 }}>
          {props.title}
        </Typography>
        <Typography variant='body2'>{props.price}</Typography>
      </CardContent>
    </Card>
  )
}

export default CardImgTop
