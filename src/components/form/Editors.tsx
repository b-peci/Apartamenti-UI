// ** MUI Imports
import Grid from '@mui/material/Grid'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import CardSnippet from 'src/@core/components/card-snippet'

import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import EditorControlled from './EditorControlled'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState } from 'draft-js'

export interface EditorProp {
  value : EditorState,
  updateState : (value: EditorState) => void;
}

const Editors = (prop : EditorProp) => {
  return (
    <EditorWrapper>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12}>
            <EditorControlled value = {prop.value} updateState={prop.updateState} />
        </Grid>
      </Grid>
    </EditorWrapper>
  )
}

export default Editors
