import { AlertCircle } from "lucide-react"

interface ErrorMessageProps {
  message: string
  details?: string
}

export default function ErrorMessage({ message, details }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="text-center text-destructive max-w-md">
        <AlertCircle className="h-8 w-8 mx-auto mb-4" />
        <p className="font-medium">{message}</p>
        {details && (
          <p className="text-sm mt-2 text-muted-foreground">{details}</p>
        )}
      </div>
    </div>
  )
}