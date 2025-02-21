import { render } from "@testing-library/react";
import { describe, test } from "vitest";
import ColorModeIconDropdown from "../../components/ColorModeIconDropdown";

describe("Light/Dark theme change button tests", () => {
  test("Icon renders", () =>{
    render(<ColorModeIconDropdown />);
  });

  // needed test:
  // dropdown menu shows on icon click - text Light, text Dark, text System
  // on dropdown click: color scheme mode is changed
});