/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Establishment = {
  __typename?: 'Establishment';
  address: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  inspections: Array<Inspection>;
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Inspection = {
  __typename?: 'Inspection';
  createdAt: Scalars['String']['output'];
  date: Scalars['String']['output'];
  establishment: Establishment;
  id: Scalars['Int']['output'];
  result: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  violations: Array<Violation>;
};

export type Query = {
  __typename?: 'Query';
  establishment?: Maybe<Establishment>;
  establishments: Array<Establishment>;
  establishmentsBySearchTerm: Array<Establishment>;
};


export type QueryEstablishmentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryEstablishmentsBySearchTermArgs = {
  searchTerm: Scalars['String']['input'];
};

export type Test = {
  __typename?: 'Test';
  test?: Maybe<Scalars['String']['output']>;
};

export type Violation = {
  __typename?: 'Violation';
  code: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  inspection: Inspection;
  points: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};
