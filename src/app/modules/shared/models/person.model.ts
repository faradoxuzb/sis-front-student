
import { Constants } from 'app/config/constants';
import { TypeModel } from './type.model';


export interface IPerson {
  id: number;
  first_name: string;
  last_name: string;
  middle_name: string;
}

export interface Person extends IPerson {
  id: number;
  address: string;
  actual_address: string;
  email: string;
  phone: string;
  extra_phone: string | null;
  gender: keyof typeof Constants.GENDERS;
  birth_date: string;
  pnfl_number: string;
  identity_number: string;
  identity_serial: string;
  citizenship: TypeModel;
}
