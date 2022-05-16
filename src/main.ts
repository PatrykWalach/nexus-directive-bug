import * as N from "nexus";

const validate = N.directive({
  name: "validate",
  locations: [
    "INPUT_FIELD_DEFINITION",
    //   "INPUT_OBJECT"
  ],
});

const Input = N.inputObjectType({
  name: "Input",
  //   directives: [validate({})],
  definition(t) {
    t.string("name", {
      directives: [validate({})],
    });
  },
});

import * as path from "path";

export const schema = N.makeSchema({
  types: [Input, validate],

  shouldExitAfterGenerateArtifacts: process.argv.includes(`--nexus-exit`),

  outputs: {
    typegen: path.join(process.cwd(), `generated`, `nexus-types.ts`),
    schema: path.join(process.cwd(), `generated`, `schema.graphql`),
  },
});
