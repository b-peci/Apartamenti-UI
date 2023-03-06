import Grid from '@mui/material/Grid'
import { Box, Button, Input, Typography } from '@mui/material'
import MultipleSelect from './MultipleSelect'
import { fetchData } from 'src/@core/utils/axios'
import { useEffect, useState } from 'react'
import PropertyType from 'src/enums/PropertyType'
import postsThumbnailData from 'src/models/postsThumbnailData'



interface iFilterProps {
  setFilteredPosts: (param: postsThumbnailData[]) => void;
}


const Filters = (props: iFilterProps) => {

  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const [selectedCity, setSelectedCity] = useState<string>();
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [propertyType, setPropertyType] = useState<number>();
  const [noRooms, setNoRooms] = useState<number>();

  const [showNoRoomsInput, setShowNoRoomsInput] = useState<boolean>(true);
  const getCountries = async () => {
    const requestData = await fetchData("country/getCountries");
    if (!requestData && !requestData.isSuccess) return;
    setCountries(requestData.data);
  }

  useEffect(() => {
    getCountries();

  }, [])
  const propertyTypes = Object.values(PropertyType).filter(x => typeof x === typeof "") as string[];
  const getCountryCities = async (country: string) => {
    const requestData = await fetchData(`city/getCities/${country}`);
    if (!requestData.isSuccess) return;
    setCities(requestData.data);
  }

  const getFilteredPosts = async () => {
    const requestData = await fetchData(`posts/GetFilteredPosts?country=${selectedCountry}&city=${selectedCity}
    &status=${1}&type=${propertyType}&maxPrice=${maxPrice}&minPrice=${minPrice}&noRooms=${noRooms}&pageNumber=${1}`)
    props.setFilteredPosts(requestData.posts);
  }


  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={3}>
          <MultipleSelect names={countries} labelText='Countries' handleChange={(parameter: string[]) => {
            getCountryCities(parameter[0]);
            setSelectedCountry(parameter[0]);
          }} />
        </Grid>
        <Grid item md={3}>
          <MultipleSelect names={cities} labelText='Cities' handleChange={(parameter: string[]) => {
            setSelectedCity(parameter[0])
          }} />
        </Grid>
        <Grid item md={3}>
          <MultipleSelect names={countries} labelText='Property status' handleChange={null} />
        </Grid>
        <Grid item md={3}>
          <MultipleSelect names={propertyTypes} labelText='Property Type' handleChange={(param: string[]) => {
            console.log(propertyTypes.indexOf(param[0]));
            setPropertyType(propertyTypes.indexOf(param[0]));
          }} />
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
            <Input type='number' placeholder='Min' onChange={e => {
              setMinPrice(parseFloat(e.target.value))
            }} />
            <Typography paddingLeft={1} paddingRight={1}>
              —
            </Typography>
            <Input type='number' placeholder={'Max'} onChange={e => {
              setMaxPrice(parseFloat(e.target.value));
            }} />
          </Box>
        </Grid>
        {showNoRoomsInput && (
          <Grid item md={3}>
            <Typography>Number of rooms</Typography>
            <Input type='text' id='rows-per-page' onChange={e => {
              setNoRooms(parseInt(e.target.value))
            }}></Input>
          </Grid>
        )}
        <Grid item md={3}>
          <Button variant='contained' sx={{ width: '80%', marginTop: '1em' }}
            onClick={getFilteredPosts}>Filter</Button>
        </Grid>
      </Grid>
    </>
  )
}

export default Filters
