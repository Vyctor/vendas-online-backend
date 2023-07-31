import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export default class CreateUserDTO {
  @IsString({
    message: 'Informe um nome válido',
  })
  name: string;
  @IsString({
    message: 'Informe um e-mail válido',
  })
  @IsEmail({
    allow_display_name: true,
    ignore_max_length: true,
  })
  email: string;
  @IsString({
    message: 'Informe um CPF válido',
  })
  cpf: string;
  @IsString({
    message: 'Informe um telefone válido',
  })
  @IsPhoneNumber('BR', {
    message: 'Informe um telefone válido',
  })
  phone: string;
  @IsStrongPassword({
    minLength: 4,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  })
  password: string;
}
