import React, { useState, useCallback } from 'react';
import { Input } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { isEmpty } from 'lodash';

import useAddReport from '../../hooks/useAddReport';

import FormModal from '../FormModal';

import showTransactionMessage from '../../utils/showTransactionMessage';

const EventReportForm = ({
  event,
  ...props
}) => {
  const [ description, setDescription ] = useState("");

  const [ addReport, { loading: addReportLoading } ] = useAddReport();

  const handleSendReport = useCallback(async () => {
    showTransactionMessage(
      {
        message: "Sending report",
        confirmation: "Report sent, thank you!"
      },
      () => (
        addReport({
          variables: {
            input: {
              subjectId: event.id,
              subjectType: "Event",
              description
            }
          }
        })
      )
    )
  }, [description]);

  return (
    <FormModal
      saveLabel="Send report"
      description="Please tell us more..."
      onSave={handleSendReport}
      title={`Report event`}
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

export default React.memo(EventReportForm);
