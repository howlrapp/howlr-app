import React from 'react';
import { useApolloClient } from '@apollo/client';
import { Layout } from '@ui-kitten/components';

import EmptyList from './EmptyList';

class ErrorBoundaryWithApollo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <Layout>
          <EmptyList
            title="Ooops"
            description="An unexpected error occured :("
          >
          </EmptyList>
        </Layout>
      )
    }
    return this.props.children;
  }
}

const ErrorBoundary = (props) => {
  const apolloClient = useApolloClient();

  return (
    <ErrorBoundaryWithApollo
      apolloClient={apolloClient}
      {...props}
    />
  );
}

export default ErrorBoundary;
