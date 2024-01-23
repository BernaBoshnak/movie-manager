import { useState, useRef } from 'react'
import { Button, Form } from 'react-bootstrap'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
      <Form.Group className="mb-3 d-block text-center">
        <Form.Label className="lh-1 rounded-4 p-5 border border-primary-subtle fs-1 text-primary cursor-pointer">
          <FontAwesomeIcon icon={faUpload} />
          <Form.Control
            type="file"
            name="file"
            ref={fileInputRef}
            accept=".txt"
            onChange={handleFileChange}
            className="d-none"
          />
          <span className="visually-hidden">Upload file</span>
        </Form.Label>
        <Form.Text muted className="d-block text-center">
          Please upload a text file <strong>*.txt</strong> containing movie
          names, each in a new line for processing.
        </Form.Text>
      </Form.Group>
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
