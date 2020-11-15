import useViewer from './useViewer';

const DEFAULT_FORMATTER = (distance, unit) => (
  `${distance} ${unit}`
)

const useDistance = (distance, format = DEFAULT_FORMATTER) => {
  const { distanceUnit } = useViewer();

  if (distance === 0) {
    return ("Near you");
  }

  if (distanceUnit === 'miles') {
    return (
      format(Math.ceil(distance * 0.621371), distanceUnit)
    );
  }

  return (
    format(distance, distanceUnit)
  )
}

export default useDistance;
