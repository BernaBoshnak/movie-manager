import React, { createContext, useContext, useMemo, useState } from 'react'
import { Alert } from 'react-bootstrap'

type TErrorContext<T = string | null> = {
  error: T
  setError: React.Dispatch<React.SetStateAction<T>>
}
const ErrorContext = createContext<TErrorContext | undefined>(undefined)

const ErrorContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [error, setError] = useState<TErrorContext['error']>(null)

  const contextValue: TErrorContext = useMemo(
    () => ({
      error,
      setError,
    }),
    [error],
  )

  return (
    <ErrorContext.Provider value={contextValue}>
      {error && (
        <Alert
          variant="danger"
          className="text-center py-1"
          onClose={() => setError(null)}
          dismissible
        >
          <Alert.Heading>Error</Alert.Heading>
          <div data-testid="error-message">{error}</div>
        </Alert>
      )}
      {children}
    </ErrorContext.Provider>
  )
}

export const useErrorContext = () => {
  const context = useContext(ErrorContext)

  if (!context) {
    throw new Error(
      'useErrorContext must be used within an ErrorContextProvider',
    )
  }

  return context
}

export default ErrorContextProvider
