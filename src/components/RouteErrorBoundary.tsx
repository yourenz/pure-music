import { useRouteError } from 'react-router-dom'

const RouteErrorBoundary: React.FC = () => {
  const error = useRouteError() as Error
  return (
    <span>{error.message || JSON.stringify(error)}</span>
  )
}
export default RouteErrorBoundary
