import { FieldError, FormState } from 'react-hook-form';
import { IFormRegisterFirst } from '../../../../../widgets/forms/register-steps/interface';

export interface IRegistrationUsernameHelper {
  isTouchedLogin: boolean;
  value: string;
  loginFocus: boolean;
  isDirtyLogin: boolean;
  formState: FormState<IFormRegisterFirst>;
  fieldState: { invalid: boolean; isDirty: boolean; isTouched: boolean; error?: FieldError | undefined };
}
