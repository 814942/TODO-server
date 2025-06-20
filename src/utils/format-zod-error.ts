import { ZodError, ZodIssueCode } from "zod";
import { ErrorDetail } from "../types/error.type";

export function formatZodError(error: ZodError): { message: string; details: ErrorDetail[] } {
  const details: ErrorDetail[] = [];
  let mainMessage = 'Error de validación';

  error.errors.forEach((issue) => {
    const field = issue.path.join('.');
    let message = issue.message;
    let expectedType = '';
    let receivedValue: any = 'no proporcionado';

    switch (issue.code) {
      case ZodIssueCode.invalid_type:
        expectedType = 'expected' in issue ? String(issue.expected) : 'tipo desconocido';
        if ('received' in issue) {
          receivedValue = issue.received === 'undefined' ? 'no proporcionado' : `tipo ${typeof issue.received}`;
        }
        message = `Se esperaba ${expectedType}, pero se recibió ${receivedValue}`;
        break;

      case ZodIssueCode.too_small:
        const min = 'minimum' in issue ? issue.minimum : 'valor';
        const minType = 'type' in issue && issue.type === 'string' ? 'caracteres' : 'elementos';
        message = `El campo debe tener al menos ${min} ${minType}`;
        break;

      case ZodIssueCode.too_big:
        const max = 'maximum' in issue ? issue.maximum : 'valor';
        const maxType = 'type' in issue && issue.type === 'string' ? 'caracteres' : 'elementos';
        message = `El campo debe tener como máximo ${max} ${maxType}`;
        break;

      case ZodIssueCode.invalid_string:
        message = 'Formato inválido';
        if ('validation' in issue && issue.validation) {
          message += `: debe ser un${issue.validation === 'email' ? ' correo electrónico' : ` ${issue.validation}`} válido`;
        }
        break;

      case ZodIssueCode.invalid_enum_value:
        message = 'Valor no permitido';
        if ('options' in issue && Array.isArray(issue.options)) {
          message += `. Valores permitidos: ${issue.options.join(', ')}`;
        }
        break;

      default:
        message = issue.message || 'Error de validación';
    }

    details.push({
      field: field || 'desconocido',
      message,
      ...(receivedValue !== 'no proporcionado' && { received: receivedValue }),
      ...(expectedType && { expected: expectedType })
    });
  });

  // Determinar el mensaje principal
  if (details.length === 1) {
    mainMessage = `Error de validación: ${details[0].message}`;
  } else if (details.length > 1) {
    mainMessage = `Se encontraron ${details.length} errores de validación`;
  }

  return { message: mainMessage, details };
}