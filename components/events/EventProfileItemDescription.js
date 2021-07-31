import React from 'react';

import ProfileItem from '../ProfileItem';

const EventProfileItemDescription = ({ event, ...props }) => (
  <ProfileItem
    value={event.description}
    label="Description and useful information"
    {...props}
  />
)

export default React.memo(EventProfileItemDescription);
