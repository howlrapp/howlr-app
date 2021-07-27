import { round } from 'lodash';

import useViewer from './useViewer';

export const computeDistance = (distance, distanceUnit) => {
  if (distanceUnit === 'miles') {
    const rawValue = Math.ceil(distance * 0.621371);

    return (round(rawValue, -(rawValue.toString().length - 1)))
  } else {
    return (distance);
  }
}

const DEFAULT_FORMATTER = (distance, unit) => (
  `${distance} ${unit}`
)

const useDistance = (distance, format = DEFAULT_FORMATTER) => {
  const { distanceUnit } = useViewer();

  if (distance === 0) {
    return ("Near you");
  }

  const computedDistance = computeDistance(distance, distanceUnit);

  return (
    format(computedDistance, distanceUnit)
  )
}

export default useDistance;
