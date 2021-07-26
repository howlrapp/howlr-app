

exports.readVersion = (contents) => {
  return (
    JSON.parse(contents).expo?.extra?.appVersion
  );
}

exports.writeVersion = (contents, version) => {
  const parsedContent = JSON.parse(contents);
  if (parsedContent.expo?.extra?.appVersion) {
    parsedContent.expo.extra.appVersion = Number(version.split('.')[0]) * 1000
  }

  return (JSON.stringify(parsedContent, null, 2));
};