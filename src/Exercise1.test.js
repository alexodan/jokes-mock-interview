import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Exercise1 } from "./Exercise1";

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () =>
//       Promise.resolve({
//         joke: "",
//       }),
//   })
// );

describe("<Exercise1/>", () => {
  beforeEach(() => {
    fetch.mockResponseOnce(
      JSON.stringify({ type: "single", joke: "A joke about developers" })
    );
  });

  // Arrange, act, assert
  it("Search for developer joke", async () => {
    // Arrange
    render(<Exercise1 />);
    const input = screen.getByLabelText("Search joke");
    const inputText = "developer";

    // act
    fireEvent.change(input, { target: { value: "developer" } });

    // assert
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `https://v2.jokeapi.dev/joke/Programming?contains=${inputText}`
      );
      expect(screen.getByTestId("joke-result").textContent).toContain(
        "A joke about developers"
      );
    });
  });
});
