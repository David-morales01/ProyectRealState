import {useEditableControls,ButtonGroup,EditableInput,IconButton,Flex,Editable,EditablePreview,Input} from '@chakra-ui/react'
import {CheckIcon,CloseIcon,EditIcon} from '@chakra-ui/icons'

export default function CustomControl() { 
    function EditableControls() {
      const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps,
      } = useEditableControls()
  
      return isEditing ? (
        <ButtonGroup justifyContent='center' size='sm'>
          <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
          <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
        </ButtonGroup>
      ) : (
        <Flex justifyContent='center'>
          <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
        </Flex>
      )
    }
  
    return (
      <Editable
        textAlign='center'
        defaultValue='Rasengan ⚡️'
        fontSize='2xl'
        isPreviewFocusable={false}
      >
        <EditablePreview /> 
        
        <Input as={EditableInput} />
        <EditableControls />
      </Editable>
    )
  }