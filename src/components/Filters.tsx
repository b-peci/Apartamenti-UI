import Grid from '@mui/material/Grid'
import { Box, Input, Typography } from '@mui/material'
import MultipleSelect from './MultipleSelect'

interface IPostFilterProps {
  countries: string[]
  showNoRoomsInput: boolean
}

const Filters = (props: IPostFilterProps) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={3}>
          <MultipleSelect names={props.countries} labelText='Countries' />
        </Grid>
        <Grid item md={3}>
          <MultipleSelect names={props.countries} labelText='Cities' />
        </Grid>
        <Grid item md={3}>
          <MultipleSelect names={props.countries} labelText='Property status' />
        </Grid>
        <Grid item md={3}>
          <MultipleSelect names={props.countries} labelText='Property Type' />
        </Grid>
      </Grid>
      <Grid container columnSpacing={2} sx={{ marginTop: '1.1em', marginBottom: '5em' }}>
        <Grid item columnSpacing={2} md={3}>
          <Typography textAlign={'center'}>Price range</Typography>
          <Box
            sx={{
              display: 'flex'
            }}
          >
            <Input type='number' placeholder='Min' />
            <Typography paddingLeft={1} paddingRight={1}>
              —
            </Typography>
            <Input type='number' placeholder={'Max'} />
          </Box>
        </Grid>
        {props.showNoRoomsInput && (
          <Grid item md={3}>
            <Typography>Number of rooms</Typography>
            <Input type='text' id='rows-per-page'></Input>
          </Grid>
        )}
      </Grid>
    </>
  )
}

export default Filters
