import { MultiLanguageField } from "app/modules/shared/models/multi-language-field.model";


export class Constants {
  public static readonly LOCAL_STORAGE_KEYS = {
    access_token: 'access_token',
    refresh_token: 'refresh_token',
    languaage: 'language',
    currentEducationYearId: 'currentEducationYearId',
  };
  public static readonly LANGUAGES: { [key: string]: string } = {
    // : MultiLanguageField
    uz: 'O‘zbekcha',
    en: 'English',
    ru: 'Русский',
  };
  public static readonly DEFAULT_LANGUAGE = 'uz';
  public static readonly GOOGLE_TRANSLATION_FROM: keyof typeof Constants.LANGUAGES =
    'uz';
  public static LanguageList = Object.keys(Constants.LANGUAGES) as Array<
    keyof MultiLanguageField
  >;

  public static readonly PHONE_PREFIX = '+998';
  public static readonly QUERY_PARAMS = {
    pageIndex: 1,
    pageSize: 10,
  };

  public static readonly STUDENT_LANGUAGES = {
    uz: 'Uzbek',
    ru: 'Russian',
    en: 'English',
    ka: 'Karakalpak',
    tg: 'Tajik',
    tk: 'Turkmen',
  };
  public static readonly GENDERS = {
    male: 'Male',
    female: 'Female',
  };
  public static readonly STUDENT_STATUS = {
    '1': 'Aplicant',
    '2': 'Student',
    '3': 'Graduated',
  };
  public static readonly GuardianTypes = {
    father: 'Father',
    mother: 'Mother',
    guardian: 'Guardian',
  };
  public static readonly PERMISSION_SUPER_ADMIN = 'super admin';
  public static readonly WEEK_DAYS = [
    {
      value: 1,
      label: 'Monday',
    },
    {
      value: 2,
      label: 'Tuesday',
    },
    {
      value: 3,
      label: 'Wednesday',
    },
    {
      value: 4,
      label: 'Thursday',
    },
    {
      value: 5,
      label: 'Friday',
    },
    {
      value: 6,
      label: 'Saturday',
    },
    {
      value: 0,
      label: 'Sunday',
    },
  ];
}