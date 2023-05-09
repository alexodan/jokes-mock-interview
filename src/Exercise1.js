import React from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
// import { useQuery } from 'react-query';

function useMyQuery(keys, callback, { enabled }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState(undefined);

  const refetch = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await callback();
      setData(response);
    } catch (e) {
      console.error("An error occurred:", e);
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [keys[1]]); // Note: this ain't right

  useDeepCompareEffect(() => {
    if (enabled) {
      refetch();
    }
  }, [keys, enabled, refetch]);

  return {
    isLoading,
    error,
    data,
    refetch,
  };
}

async function fetchProgrammingJoke(input) {
  const endpoint = input
    ? `https://v2.jokeapi.dev/joke/Programming?contains=${input}`
    : "https://v2.jokeapi.dev/joke/Programming";
  const response = await fetch(endpoint);
  const data = await response.json();

  if (data.error) {
    const errorMessage = `${data.message}. ${data.causedBy.join(".")}`;
    return errorMessage;
  }

  if (data.type === "single") {
    return data.joke;
  }
  if (data.type === "twopart") {
    return `${data.setup} ... ${data.delivery}`;
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
      {/* Note: Label added for accessibility with visibility hidden */}
      <label htmlFor="joke" style={{ visibility: "hidden" }}>
        Search joke
      </label>
      <input id="joke" type="text" value={input} onChange={handleChange} />
      <br />
      <br />
      <button onClick={refetch}>Get joke</button>
      <br />
      <br />
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{JSON.stringify(error)}</div>
      ) : (
        <div data-testid="joke-result">{JSON.stringify(data)}</div>
      )}
    </div>
  );
}
