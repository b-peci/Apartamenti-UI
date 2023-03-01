// ** React Imports
import { forwardRef, Fragment, ReactElement, Ref } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Slide, { SlideProps } from '@mui/material/Slide'
import DialogContentText from '@mui/material/DialogContentText'

const Transition = forwardRef(function Transition(
  props: SlideProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

interface DialogProps {
  open: boolean;
  handleClose: (isConfirmed : boolean) => void;
  title: string;
  text: string;
}

const DialogTransition = (props : DialogProps) => {
  // ** State


  return (
    <Fragment>
      <Dialog
        open={props.open}
        keepMounted
        onClose={props.handleClose}
        TransitionComponent={Transition}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            {
              props.text
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={() => props.handleClose(false)}>Disagree</Button>
          <Button onClick={() => props.handleClose(true)}>Agree</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DialogTransition
