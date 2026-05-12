import React from "react";
import { render, screen } from "@testing-library/react";

import ProductDetailsPage from "../ProductDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders productDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProductDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("productDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("productDetails-add-button")).toBeInTheDocument();
});
