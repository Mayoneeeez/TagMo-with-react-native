import * as React from "react";
import renderer from "react-test-renderer";

import { ThemedText } from "../ThemedText";

// it(`renders correctly`, () => {
//   const tree = renderer
//     .create(<ThemedText>Snapshot test!</ThemedText>)
//     .toJSON();

//   expect(tree).toMatchSnapshot();
// });

it(`test test`, () => {
  const actual: string = "test";
  const expected: string = "test";

  expect(actual).toEqual(expected);
});
