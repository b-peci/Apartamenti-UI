// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import PageHeader from 'src/@core/components/page-header'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import FileUploaderMultiple from 'src/components/form/FileUploader'
import MultipleSelect from 'src/components/MultipleSelect'
import MenuItem from '@mui/material/MenuItem'
import { Button, FormControl, InputLabel } from '@mui/material'
import Editors from 'src/components/form/Editors'
import { useState, useEffect } from 'react';
import PropertyType from 'src/enums/PropertyType'
import { ContentState, convertFromHTML, EditorState } from 'draft-js'
import { fetchDataWithConfig, postDataWithConfig } from 'src/@core/utils/axios'
import { FileDto } from 'src/models/fileDto'
import { stateToHTML } from 'draft-js-export-html'
import toast from 'react-hot-toast'
import { GetStaticPaths } from 'next/types'

export const DEFAULT_GUID_VALUE = "00000000-0000-0000-0000-000000000000";

const AddPost = ({ postId }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<number>(0);
  const [isForSelling, setIsForSelling] = useState(false);
  const [isForRenting, setIsForRenting] = useState(false);
  const [space, setSpace] = useState(0);
  const [price, setPrice] = useState(0);
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [noRooms, setNoRooms] = useState(0);
  const [description, setDescription] = useState<EditorState>(EditorState.createEmpty())
  const [fileBase64, setFileBast64] = useState<FileDto[]>([]);
  const [initialFiles, setInitialFiles] = useState<File[]>([]);

  useEffect(() => {
    if (postId !== 0) {
      fetchDataWithConfig(`posts/GetPostToEditById/${postId}`, { withCredentials: true })
        .then(res => {
          if (res.status === 200 && res.data.isSuccess) {
            const response = res.data.data;
            setTitle(response.title);
            setType(response.propertyType);
            setIsForRenting(response.isForRenting);
            setIsForSelling(response.isForSelling);
            setSpace(response.space);
            setPrice(response.price);
            setNoRooms(response.noRooms);
            const descriptionValue = convertFromHTML(response.description);
            const content = ContentState.createFromBlockArray(descriptionValue.contentBlocks, descriptionValue.entityMap);
            setDescription(EditorState.createWithContent(content));
            setFileBast64(response.files)
            if (response.isForRenting) setSelectedValues(["For Rent"]);
            if (response.isForSelling) setSelectedValues(arr => [...arr, "For"])
            response.files.forEach(async (element: FileDto, index: number) => {
              const base64 = `data:image/${element.extension};base64, ${element.base64Content}`;
              const fileConverted = await convertBase64ToFile(base64, `image ${++index}.${element.extension}`);
              setInitialFiles(arr => [...arr, fileConverted]);
            })
          }
        }).catch(() => {
          toast.error("Could not get post detail " +
            "if problem persists please contact administrator", {
            duration: 2000
          })
        })
    }
  }, [postId])


  const convertBase64ToFile = async (dataUrl: string, fileName: string): Promise<File> => {

    const res: Response = await fetch(dataUrl);
    const blob: Blob = await res.blob();
    return new File([blob], fileName, { type: 'image/png' });
  }

  const addPostRequest = async () => {


    const editorContent = description.getCurrentContent();

    const addPostData = {
      postId: postId,
      title: title,
      type: type,
      isForSelling: isForSelling,
      isForRenting: isForRenting,
      space: space,
      price: price,
      noRooms: noRooms,
      description: stateToHTML(editorContent),
      Base64EncodedImages: fileBase64
    };
    toast.loading("Saving Data");
    const postDataPromise = await postDataWithConfig(`posts/${postId === DEFAULT_GUID_VALUE ? "AddPost" : "UpdatePost"}`, addPostData, { withCredentials: true });
    toast.dismiss();
    return postDataPromise.status === 200 ? toast.success("Data saved successfully") : toast.error("Could not save");
  }

  const toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  return (
    <DropzoneWrapper>
      <Grid container spacing={6} className='match-height'>
        <PageHeader
          title={
            <Typography variant='h5'>
              Add Posts
            </Typography>
          }
        />
        <Grid item xs={12}>
          <FileUploaderMultiple setFileData={(files: File[]) => {
            setFileBast64([]);
            files.forEach(async element => {
              const base64 = await toBase64(element) as string;
              const objFile: FileDto = {
                base64Content: base64.split(',')[1],
                extension: element.name.split('.')[1]
              };
              setFileBast64(arr => [...arr, objFile]);
            })
          }}
            initialFileData={initialFiles} />
        </Grid>
        <Grid item md={6}>
          <TextField value={title} required onChange={e => setTitle(e.currentTarget.value)} fullWidth id='form-props-required' label='Title' />
        </Grid>
        <Grid item md={6}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-outlined-label'>Type</InputLabel>
            <Select
              label='Age'
              value={type}
              id='demo-simple-select-outlined'
              labelId='demo-simple-select-outlined-label'
              onChange={e => setType(e.target.value as number)}
            >
              <MenuItem value={PropertyType.None}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={PropertyType.Apartment}>Apartment</MenuItem>
              <MenuItem value={PropertyType.House}>House</MenuItem>
              <MenuItem value={PropertyType.Shop}>Shop</MenuItem>
              <MenuItem value={PropertyType.Land}>Land</MenuItem>
              <MenuItem value={PropertyType.Office}>Office</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={6}>
          <MultipleSelect
            names={['For Rent', 'For Sale']}
            labelText="Status"
            saveNames={(names: string[]) => {
              setIsForSelling(names.includes("For Sale"));
              setIsForRenting(names.includes("For Rent"));
            }}
            preSelectedNames={selectedValues} />
        </Grid>
        <Grid item md={2}>
          <TextField value={space} onChange={e => setSpace(parseInt(e.currentTarget.value))} type='number' label='Space' id='form-props-number' />
        </Grid>
        <Grid item md={2}>
          <TextField value={price} onChange={e => setPrice(parseInt(e.currentTarget.value))} type='number' label='Price' id='form-props-number' />
        </Grid>
        <Grid item md={2}>
          <TextField value={noRooms} onChange={e => setNoRooms(parseInt(e.currentTarget.value))} type='number' label='No rooms' id='form-props-number' />
        </Grid>
        <Grid item md={12}>
          <Typography textAlign={'center'} py={2}>Description</Typography>
          <Editors value={description} updateState={(value: EditorState) => {
            setDescription(value);
          }} />
        </Grid>
        <Grid item justifyContent={'center'} alignContent={'center'} alignItems='center' alignSelf={'center'} md={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={addPostRequest} variant='contained'>Submit</Button>
          </Box>
        </Grid>
      </Grid>
    </DropzoneWrapper>
  )
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  }
}

export async function getStaticProps({ params }) {
  const { postId } = params
  return {
    props: {
      postId
    }
  }
}

export default AddPost
