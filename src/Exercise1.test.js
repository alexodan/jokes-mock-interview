import { render, screen, fireEvent } from "@testing-library/react";
import { Exercise1 } from "./Exercise1";

describe("<Exercise1/>", () => {
  it.skip("render", () => {
    render(<Exercise1 />);

    expect(screen.getByText("Jokes coming")).toBeDefined();
    // getByTestId sync
    // findByTestId
    // queryBy

    // good for accessibility
    // getByRole('button', { name: 'Get joke' })
    // getByLabel
  });

  // Arrange, act, assert
  it("Search for developer joke", () => {
    // Arrange
    // mock the fetch
    render(<Exercise1 />);
    const input = screen.getByTestId("joke-input");

    // act
    fireEvent(input, {
      target: {
        value: "developer"
      }
    });

    // assert
    // expect(mockFetch).toHaveBeenCalledWith(
    //
    // )
  });
});

// pyramid test
// BDD description, code, test
