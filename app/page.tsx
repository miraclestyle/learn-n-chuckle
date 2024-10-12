'use client'

import { App } from '@/components/custom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const Home = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)

export default Home
