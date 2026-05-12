import React from "react";
import { render, screen } from "@testing-library/react";

import SalesDetailsPage from "../SalesDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders salesDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SalesDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("salesDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("salesDetails-add-button")).toBeInTheDocument();
});
