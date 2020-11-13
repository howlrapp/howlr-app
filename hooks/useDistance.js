import useViewer from './useViewer';

const useDistance = (distance, defaultDistanceUnit) => {
  const { distanceUnit: viewerDistanceUnit } = useViewer();
  const distanceUnit = defaultDistanceUnit || viewerDistanceUnit;

  if (distance === 0) {
    return ("Near you");
  }

  if (distanceUnit === 'miles') {
    return (
      `${Math.ceil(distance * 0.621371)} ${distanceUnit}`
    );
  }

  return (
    `${distance} ${distanceUnit}`
  )
}

export default useDistance;
