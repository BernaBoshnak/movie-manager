import { useState, useRef } from 'react'
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap'

type FileUploadProps = {
  setMovies: React.Dispatch<React.SetStateAction<Set<string>>>
}

const FileUpload = ({ setMovies }: FileUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File>()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = () => {
    if (fileInputRef.current && fileInputRef.current.files) {
      setSelectedFile(fileInputRef.current.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const fileContent = e.target?.result as string
        const movieTitlesArr = fileContent
          .split('\n')
          .map((title) => title.trim())
        setMovies(new Set(movieTitlesArr))
      }

      reader.readAsText(selectedFile)
    }
  }

  return (
    <Form onSubmit={handleSubmit} data-testid="upload-form">
      <FormGroup className="mb-3">
        <FormLabel
          htmlFor="form-file"
          className="d-block bg-primary-subtle border border-primary-subtle rounded-start rounded-end mb-4 fs-3 text-center text-primary cursor-pointer"
        >
          Upload <strong>*.txt</strong> file
        </FormLabel>
        <FormControl
          type="file"
          name="file"
          ref={fileInputRef}
          id="form-file"
          accept=".txt"
          onChange={handleFileChange}
          className="d-none"
        />
      </FormGroup>
      <div className="text-center">
        <Button
          type="submit"
          variant="primary"
          className="px-4 fs-5"
          disabled={!selectedFile}
        >
          Submit
        </Button>
      </div>
    </Form>
  )
}

export default FileUpload
