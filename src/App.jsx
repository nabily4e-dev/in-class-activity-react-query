/** @format */

import { Container } from 'reactstrap'
import FormComponent from './components/Form'
import TableComponent from './components/Table'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <FormComponent />
        <TableComponent />
      </Container>
    </QueryClientProvider>
  )
}
