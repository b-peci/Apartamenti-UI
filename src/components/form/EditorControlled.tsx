// ** Component Import
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'
import { EditorProp } from './Editors'



const EditorControlled = (props : EditorProp) => {
  // ** State

  return <ReactDraftWysiwyg editorState={props.value} onEditorStateChange={data => props.updateState(data)} />
}

export default EditorControlled
