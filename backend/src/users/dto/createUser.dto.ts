import { CreateUserInput } from '../../graphql.schema';

export class CreateUserDTO extends CreateUserInput {
  name: string;
  email: string;
  password: string;
}
