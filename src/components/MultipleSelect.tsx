// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { FormLabel } from '@mui/material'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}

interface IMultipleSelectProps {
  names: string[]
  labelText: string,
  saveNames: (names : string[]) => void,
  preSelectedNames : string[]
}

const SelectMultiple = (props: IMultipleSelectProps) => {
  // ** State
  const [names, setNames] = useState<string[]>([])
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setNames(event.target.value as string[])
    props.saveNames(event.target.value as string[]);
  }

  useEffect(() => {
    setNames(props.preSelectedNames);
  }, [props.preSelectedNames])


  return (
    <Box>
      <div>
        <FormControl fullWidth>
          <InputLabel id='demo-multiple-checkbox-label'>{props.labelText}</InputLabel>
          <Select
            multiple
            label={props.labelText}
            value={names}
            MenuProps={MenuProps}
            onChange={handleChange}
            renderValue={selected => (selected as unknown as string[]).join(', ')}
          >
            {props.names.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={names.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Box>
  )
}

export default SelectMultiple
