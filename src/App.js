import './styles.css';
import { Exercise1 } from './Exercise1';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Jokes</h1>
        <Exercise1 />
      </div>
    </QueryClientProvider>
  );
}
