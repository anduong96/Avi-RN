import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  generates: {
    './src/generated/cms.gql.ts': {
      config: {
        enumsAsConst: true,
        namingConvention: {
          default: 'change-case#pascalCase',
          enumValues: 'keep',
        },
        scalars: {
          DateTime: 'Date',
        },
        useIndexSignature: true,
        withHooks: true,
        withMutationFn: true,
        withRefetchFn: true,
      },
      documents: 'src/graphql/cms/**/*.gql',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      schema:
        'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clq5vbkc727ot01um853p7kfo/master',
    },
    './src/generated/server.gql.ts': {
      config: {
        enumsAsConst: true,
        namingConvention: {
          default: 'change-case#pascalCase',
          enumValues: 'keep',
        },
        scalars: {
          DateTime: 'Date',
        },
        useIndexSignature: true,
        withHooks: true,
        withMutationFn: true,
        withRefetchFn: true,
      },
      documents: 'src/graphql/server/**/*.gql',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      schema: 'http://localhost:3000/graphql',
    },
  },
};

export default config;
