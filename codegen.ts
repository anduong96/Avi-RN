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
        'https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/clg8hix5b1wdd01uj23zq2ql5/master',
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
