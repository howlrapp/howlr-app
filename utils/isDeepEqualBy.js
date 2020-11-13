import { pick, omit, isEqual } from 'lodash';
import { shallowEqualObjects } from "shallow-equal";

const isDeepEqualBy = (attributes = []) => {
  return (prevProps, nextProps) => {
    const prevAttributesValues = pick(prevProps, attributes);
    const nextAttributesValues = pick(nextProps, attributes);

    const areAttributesEqual = attributes.every((attribute) => (
      isEqual(prevAttributesValues[attribute], nextAttributesValues[attribute])
    ));

    const prevPropsReminder = omit(prevProps, attributes);
    const nextPropsReminder = omit(nextProps, attributes);
    const arePropsEqual = shallowEqualObjects(prevPropsReminder, nextPropsReminder);

    return (arePropsEqual && areAttributesEqual);
  }
}

export default isDeepEqualBy;
