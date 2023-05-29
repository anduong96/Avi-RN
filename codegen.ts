import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  generates: {
    './src/generated/server.gql.ts': {
      schema: 'http://localhost:3000/graphql',
      documents: 'src/graphql/server/**/*.gql',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        useIndexSignature: true,
        withMutationFn: true,
        withRefetchFn: true,
        enumsAsConst: true,
        scalars: {
          DateTime: 'Date',
        },
        namingConvention: {
          default: 'change-case#pascalCase',
          enumValues: 'keep',
        },
      },
    },
    './src/generated/cms.gql.ts': {
      schema:
        'https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/clg8hix5b1wdd01uj23zq2ql5/master',
      documents: 'src/graphql/cms/**/*.gql',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        useIndexSignature: true,
        withMutationFn: true,
        withRefetchFn: true,
        enumsAsConst: true,
        scalars: {
          DateTime: 'Date',
        },
        namingConvention: {
          default: 'change-case#pascalCase',
          enumValues: 'keep',
        },
      },
    },
  },
};

export default config;
