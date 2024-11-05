import React from "react"
import {screen, render} from "@testing-library/react"

import {IntegrationTypesTest} from "./integration-types-test";

describe("IntegrationTypesTest", () => {
    it("should render the component", () => {
        render(<IntegrationTypesTest contentLanguage="en_US" message="World"/>);

        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    })
})
