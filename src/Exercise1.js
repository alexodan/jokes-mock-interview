import React from "react";
import useDeepCompareEffect from "use-deep-compare-effect";

/**
 * API Specs
 * https://v2.jokeapi.dev/
 * Example: https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw
 *
 * Challenge:
 * Part 1:
 * - Go through the current API and fetch
 * - Implement loading and error states
 * - Implement simplified useQuery from scratch
 *
 * Part 2.1:
 * Create a search input to find a joke by a certain word.
 *
 * Part 2.2
 * Search for the joke on change with debounce.
 *
 * Part 3.
 * Let's test this!
 */

function useMyQuery(keys, callback, options) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState(undefined);

  const { enabled } = options;

  const refetch = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await callback();
      setData(response);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useDeepCompareEffect(() => {
    if (enabled) {
      refetch();
    }
  }, [keys, enabled, refetch]);

  return {
    isLoading,
    error,
    data,
    refetch
  };
}

async function fetchProgrammingJoke(queryParams) {
  const endpoint = queryParams
    ? `https://v2.jokeapi.dev/joke/Programming?contains=${queryParams}`
    : "https://v2.jokeapi.dev/joke/Programming";
  const response = await fetch(endpoint).then((r) => r.json());

  if (response.error) {
    const errorMessage = `${response.message}. ${response.causedBy.join(".")}`;
    return errorMessage;
  }

  if (response.type === "single") {
    return response.joke;
  }
  if (response.type === "twopart") {
    return `${response.setup} ... ${response.delivery}`;
  }

  return response;
}

export function Exercise1() {
  const [input, setInput] = React.useState("");
  const { isLoading, error, data, refetch } = useMyQuery(
    ["jokes", input],
    () => fetchProgrammingJoke(input),
    { enabled: !!input }
  );

  const handleChange = (e) => setInput(e.target.value);

  return (
    <div>
      {/* <label htmlFor="joke"></label> */}
      <input
        data-testid="joke-input"
        id="joke"
        type="text"
        value={input}
        onChange={handleChange}
      />
      <br />
      <br />
      <button onClick={refetch}>Get joke</button>
      <br />
      <br />
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>{data}</div>
      )}
    </div>
  );
}
