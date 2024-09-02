import mongoose from 'mongoose'
import { TErrorIssue, TErrorResponse } from '../ErrorInterface/TErrorResponse'


const handleCastError = (err: mongoose.Error.CastError): TErrorResponse => {
  const issues: TErrorIssue[] = [
    {
      path: err.path,
      message: err.message,
    },
  ]

  return {
    statusCode: 400,
    status: 'error',
    message: 'Cast Error',
    issues,
  }
}

export default handleCastError