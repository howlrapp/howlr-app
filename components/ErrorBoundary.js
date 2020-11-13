import React from 'react';
import { useApolloClient } from '@apollo/client';
import * as Updates from 'expo-updates';
import { Layout, CheckBox } from '@ui-kitten/components';

import useAddReport from '../hooks/useAddReport';
import useViewer from '../hooks/useViewer';
import useGetUsersSearchCriteria from '../hooks/useGetUsersSearchCriteria';

import EmptyList from './EmptyList';

class ErrorBoundaryWithApollo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      crashReport: true,
    };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  async handleReloadApp() {
    if (this.state.crashReport) {
      await this.props.onError(this.state.error);
    }
    this.props.apolloClient.resetStore();
    Updates.reloadAsync();
  }

  handleChangeCrashReport() {
    this.setState({ crashReport: !this.state.crashReport })
  }

  render() {
    if (this.state.error) {
      return (
        <Layout>
          <EmptyList
            title="Ooops"
            description="An unexpected error occured :("
            callToAction="Reload app"
            onPressCallToAction={() => this.handleReloadApp()}
          >
            <CheckBox
              checked={this.state.crashReport}
              onChange={() => this.handleChangeCrashReport()}
              style={{ marginTop: 20 }}
            >
              Send crash report
            </CheckBox>
          </EmptyList>
        </Layout>
      )
    }
    return this.props.children;
  }
}

const ErrorBoundary = (props) => {
  const apolloClient = useApolloClient();

  const viewer = useViewer();
  const [ addReport ] = useAddReport();
  const { data: usersSearchCriteriaData } = useGetUsersSearchCriteria();

  const handleError = (error) => {
    // most error should come from buggy usersSearchCriteria
    return (
      addReport({
        variables: {
          input: {
            subjectId: viewer.id,
            subjectType: "User",
            description: `
              error: ${JSON.stringify(error, null, 2)}
              usersSearchCriteriaData: ${JSON.stringify(usersSearchCriteriaData, null, 2)}
              viewer: ${JSON.stringify(viewer, null, 2)}
            `
          }
        }
      })
    )
  }

  return (
    <ErrorBoundaryWithApollo
      apolloClient={apolloClient}
      onError={handleError}
      {...props}
    />
  );
}

export default ErrorBoundary;
