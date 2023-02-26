import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

/** Инф о подключении */
export type Connect = {
  __typename?: 'Connect';
  /** Почта */
  email: Scalars['String'];
  id: Scalars['ID'];
  /** Пароль */
  password: Scalars['String'];
  roles?: Maybe<Array<Role>>;
  /** Статус */
  status: Scalars['String'];
  user: Ru_User;
  /** Чей токен */
  userName: Scalars['String'];
};

export type CreateRoleInput = {
  description: Scalars['String'];
  value: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

export type FindRoleInput = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
  value?: InputMaybe<Scalars['String']>;
};

/** ddd */
export type FindUserInput = {
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
  lastName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  nationality?: InputMaybe<Scalars['String']>;
  patronymicName?: InputMaybe<Scalars['String']>;
};

/** Поиск пользователя по авторизационным данным */
export type FindUserToConnectInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
  password?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  userName?: InputMaybe<Scalars['String']>;
};

/** Поиск пользователя по персональной информации */
export type FindUserToPersonalInput = {
  /** Город */
  city?: InputMaybe<Scalars['String']>;
  /** Страна */
  country?: InputMaybe<Scalars['String']>;
  /** Гражданство */
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  /** Пол */
  gender?: InputMaybe<Scalars['String']>;
  /** Фамилия */
  lastName?: InputMaybe<Scalars['String']>;
  /** Имя */
  name?: InputMaybe<Scalars['String']>;
  /** Гражданство */
  nationality?: InputMaybe<Scalars['String']>;
  /** Отчество */
  patronymicName?: InputMaybe<Scalars['String']>;
};

/** Поиск пользователя по уровню развития */
export type FindUserToProgressInput = {
  /** Место работы */
  employment?: InputMaybe<Scalars['String']>;
  /** Увлечения */
  hobbies?: InputMaybe<Scalars['String']>;
  /** Место учебы */
  placeOfStudy?: InputMaybe<Scalars['String']>;
  /** Владение языками */
  workingLanguages?: InputMaybe<Scalars['String']>;
};

/** Поиск пользователя по социальной информации */
export type FindUserToSocialInput = {
  /** Чаты */
  chats: Scalars['String'];
  /** Друзья */
  friends: Scalars['String'];
  /** Подписчики */
  subscribers: Scalars['String'];
  /** Подписки */
  subscription: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Выйти */
  authSignOut: Scalars['Boolean'];
  /** Зарегистрироваться */
  authSignUp: Ru_User;
  /** Удалить пользователя */
  removeUser: Scalars['Float'];
  /** Создать роль */
  rolesCreate: Role;
  /** Удалить роль */
  rolesDelete: Scalars['Boolean'];
  /** Создать пользователя */
  usersCreate: Ru_User;
  /** Удалить у пользователя имеющуюся роль */
  usersRemoveRole: Scalars['Boolean'];
  /** Обновить данные пользователя */
  usersUpdate: Ru_User;
  /** Дать пользователю новую роль */
  usersUpdateGiveNewRole: Scalars['Boolean'];
};


export type MutationAuthSignUpArgs = {
  user: CreateUserInput;
};


export type MutationRemoveUserArgs = {
  id: Scalars['Float'];
};


export type MutationRolesCreateArgs = {
  params: CreateRoleInput;
};


export type MutationRolesDeleteArgs = {
  params: FindRoleInput;
};


export type MutationUsersCreateArgs = {
  user: CreateUserInput;
};


export type MutationUsersRemoveRoleArgs = {
  roleId: Scalars['Float'];
  userId: Scalars['Float'];
};


export type MutationUsersUpdateArgs = {
  connect?: InputMaybe<FindUserToConnectInput>;
  id: Scalars['Float'];
  personal?: InputMaybe<FindUserToPersonalInput>;
  progress?: InputMaybe<FindUserToProgressInput>;
  social?: InputMaybe<FindUserToSocialInput>;
};


export type MutationUsersUpdateGiveNewRoleArgs = {
  id: Scalars['Float'];
  rolesInput: UpdateUserRolesInput;
};

export type Query = {
  __typename?: 'Query';
  /** Войти */
  authSignIn: Ru_User;
  /** Получить всех пользователей */
  getAllUsers: Array<Ru_User>;
  /** Получить 1 пользователя */
  getOneUser: Ru_User;
  /** Найти все роли */
  rolesFindAll: Array<Role>;
  /** Найти роль */
  rolesFindOne: Role;
  testing_getAllUsers: Array<User>;
  testing_getOneUser: User;
};


export type QueryAuthSignInArgs = {
  signInInput: SignInInput;
};


export type QueryGetAllUsersArgs = {
  connect?: InputMaybe<FindUserToConnectInput>;
  id?: InputMaybe<Scalars['Float']>;
  personal?: InputMaybe<FindUserToPersonalInput>;
  progress?: InputMaybe<FindUserToProgressInput>;
  social?: InputMaybe<FindUserToSocialInput>;
};


export type QueryGetOneUserArgs = {
  connect?: InputMaybe<FindUserToConnectInput>;
  id?: InputMaybe<Scalars['Float']>;
  personal?: InputMaybe<FindUserToPersonalInput>;
  progress?: InputMaybe<FindUserToProgressInput>;
  social?: InputMaybe<FindUserToSocialInput>;
};


export type QueryRolesFindOneArgs = {
  params: FindRoleInput;
};


export type QueryTesting_GetAllUsersArgs = {
  where?: InputMaybe<FindUserInput>;
};


export type QueryTesting_GetOneUserArgs = {
  id: Scalars['Float'];
};

export type Role = {
  __typename?: 'Role';
  /** Описание роли */
  description: Scalars['String'];
  id: Scalars['ID'];
  users?: Maybe<Array<Ru_User>>;
  /** Название роли */
  value: Scalars['String'];
};

/** Персональная информация (ru) */
export type Ru_Personal = {
  __typename?: 'RU_Personal';
  /** Город */
  city?: Maybe<Scalars['String']>;
  /** Страна */
  country?: Maybe<Scalars['String']>;
  /** Гражданство */
  dateOfBirth?: Maybe<Scalars['DateTime']>;
  /** Пол */
  gender?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Фамилия */
  lastName?: Maybe<Scalars['String']>;
  /** Имя */
  name?: Maybe<Scalars['String']>;
  /** Гражданство */
  nationality?: Maybe<Scalars['String']>;
  /** Отчество */
  patronymicName?: Maybe<Scalars['String']>;
  user: Ru_User;
};

/** Социальная информация (ru) */
export type Ru_Progress = {
  __typename?: 'RU_Progress';
  /** Место работы */
  employment?: Maybe<Scalars['String']>;
  /** Увлечения */
  hobbies?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Место учебы */
  placeOfStudy?: Maybe<Scalars['String']>;
  user: Ru_User;
  /** Владение языками */
  workingLanguages?: Maybe<Scalars['String']>;
};

/** Социальная информация (ru) */
export type Ru_Social = {
  __typename?: 'RU_Social';
  /** Чаты */
  chats?: Maybe<Scalars['String']>;
  /** Друзья */
  friends?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Подписчики */
  subscribers?: Maybe<Scalars['String']>;
  /** Подписки */
  subscription?: Maybe<Scalars['String']>;
  user: Ru_User;
};

/** Пользователь (ru) */
export type Ru_User = {
  __typename?: 'RU_User';
  connect: Connect;
  id: Scalars['ID'];
  personal?: Maybe<Ru_Personal>;
  progress?: Maybe<Ru_Progress>;
  social?: Maybe<Ru_Social>;
};

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UpdateUserRolesInput = {
  role: Scalars['String'];
};

/** Пользователь */
export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  personal: UserPersonal;
};

/** Персональная инф */
export type UserPersonal = {
  __typename?: 'UserPersonal';
  /** Город */
  city: Scalars['String'];
  /** Страна */
  country: Scalars['String'];
  /** Гражданство */
  dateOfBirth: Scalars['DateTime'];
  /** Пол */
  gender: Scalars['String'];
  id: Scalars['ID'];
  /** Фамилия */
  lastName: Scalars['String'];
  /** Имя */
  name: Scalars['String'];
  /** Гражданство */
  nationality: Scalars['String'];
  /** Отчество */
  patronymicName: Scalars['String'];
  user: User;
};

export type UserInfoConnectFragment = { __typename?: 'Connect', id: string, email: string, roles?: Array<{ __typename?: 'Role', value: string, id: string }> | null };

export type UserInfoSocialFragment = { __typename?: 'RU_Social', chats?: string | null, friends?: string | null, subscribers?: string | null, subscription?: string | null };

export type UserInfoPersonalFragment = { __typename?: 'RU_Personal', city?: string | null, country?: string | null, dateOfBirth?: any | null, gender?: string | null, lastName?: string | null, name?: string | null, nationality?: string | null, patronymicName?: string | null };

export type UserInfoProgressFragment = { __typename?: 'RU_Progress', employment?: string | null, hobbies?: string | null, placeOfStudy?: string | null, workingLanguages?: string | null };

export type GetUserInfoQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Float']>;
}>;


export type GetUserInfoQuery = { __typename?: 'Query', getOneUser: { __typename?: 'RU_User', id: string, connect: { __typename?: 'Connect', id: string, email: string, roles?: Array<{ __typename?: 'Role', value: string, id: string }> | null }, social?: { __typename?: 'RU_Social', chats?: string | null, friends?: string | null, subscribers?: string | null, subscription?: string | null } | null, personal?: { __typename?: 'RU_Personal', city?: string | null, country?: string | null, dateOfBirth?: any | null, gender?: string | null, lastName?: string | null, name?: string | null, nationality?: string | null, patronymicName?: string | null } | null, progress?: { __typename?: 'RU_Progress', employment?: string | null, hobbies?: string | null, placeOfStudy?: string | null, workingLanguages?: string | null } | null } };

export const UserInfoConnectFragmentDoc = gql`
    fragment userInfoConnect on Connect {
  id
  email
  roles {
    value
    id
  }
}
    `;
export const UserInfoSocialFragmentDoc = gql`
    fragment userInfoSocial on RU_Social {
  chats
  friends
  subscribers
  subscription
}
    `;
export const UserInfoPersonalFragmentDoc = gql`
    fragment userInfoPersonal on RU_Personal {
  city
  country
  dateOfBirth
  gender
  lastName
  name
  nationality
  patronymicName
}
    `;
export const UserInfoProgressFragmentDoc = gql`
    fragment userInfoProgress on RU_Progress {
  employment
  hobbies
  placeOfStudy
  workingLanguages
}
    `;
export const GetUserInfoDocument = gql`
    query GetUserInfo($id: Float) {
  getOneUser(id: $id) {
    id
    connect {
      ...userInfoConnect
    }
    social {
      ...userInfoSocial
    }
    personal {
      ...userInfoPersonal
    }
    progress {
      ...userInfoProgress
    }
  }
}
    ${UserInfoConnectFragmentDoc}
${UserInfoSocialFragmentDoc}
${UserInfoPersonalFragmentDoc}
${UserInfoProgressFragmentDoc}`;

/**
 * __useGetUserInfoQuery__
 *
 * To run a query within a React component, call `useGetUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserInfoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
      }
export function useGetUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
        }
export type GetUserInfoQueryHookResult = ReturnType<typeof useGetUserInfoQuery>;
export type GetUserInfoLazyQueryHookResult = ReturnType<typeof useGetUserInfoLazyQuery>;
export type GetUserInfoQueryResult = Apollo.QueryResult<GetUserInfoQuery, GetUserInfoQueryVariables>;