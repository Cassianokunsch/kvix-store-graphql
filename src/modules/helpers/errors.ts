import { ArgumentValidationError } from 'type-graphql';

interface ErrorNameType {
  [key: string]: { [key: string]: any };
}

interface ErrorValidation {
  [key: string]: any;
}

export const errorName = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  BAD_EMAIL_FORMAT: 'BAD_EMAIL_FORMAT',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  EMAIL_ALREADY_USE: 'EMAIL_ALREADY_USE',
};

const errorType: ErrorNameType = {
  UNAUTHORIZED: {
    message: 'Authentication is needed to get requested response!',
    statusCode: 401,
  },
  BAD_EMAIL_FORMAT: {
    message: 'Bad email format!',
    statusCode: 400,
  },
  INVALID_CREDENTIALS: {
    message: 'Invalid Credentials!',
    statusCode: 400,
  },
  EMAIL_ALREADY_USE: {
    message: 'Email is already in use!',
    statusCode: 400,
  },
};

export const getErrorCode = (errorName: string): ErrorNameType => {
  return errorType[errorName];
};

export const getErrorValidation = (err: ArgumentValidationError): ErrorValidation => {
  const listMessages: string[] = [];
  const listValidationErros = err.validationErrors;
  listValidationErros.forEach(errors => {
    const keys = Object.keys(errors.constraints);
    keys.forEach(key => {
      listMessages.push(errors.constraints[key]);
    });
  });
  return {
    message: listMessages,
    statusCode: 400,
  };
};
