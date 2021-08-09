import React, { useState, useCallback } from 'react';
import { Input } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { isEmpty } from 'lodash';

import useAddReport from '../../hooks/useAddReport';

import FormModal from '../FormModal';

import showTransactionLoader from '../../utils/showTransactionLoader';

const UserReportForm = ({
  user,
  ...props
}) => {
  const [ description, setDescription ] = useState("");

  const [ addReport, { loading: addReportLoading } ] = useAddReport();

  const handleSendReport = useCallback(async () => {
    showTransactionLoader(() => (
        addReport({
          variables: {
            input: {
              subjectId: user.id,
              subjectType: "User",
              description
            }
          }
        })
      ), { confirmation: "Report sent, thank you!" }
    )
  }, [description]);

  return (
    <FormModal
      saveLabel="Send"
      description="Please tell us more..."
      onSave={handleSendReport}
      title={`Report ${user?.name}`}
      invalid={isEmpty(description)}
      {...props}
    >
      <Input
        multiline={true}
        textStyle={styles.input}
        initialValue={description}
        onChangeText={setDescription}
        disabled={addReportLoading}
      />
    </FormModal>
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 64,
  }
});

export default React.memo(UserReportForm);
