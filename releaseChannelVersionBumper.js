

exports.readVersion = (contents) => {
  return (
    JSON.parse(contents).builds?.android?.release?.releaseChannel
  );
}

exports.writeVersion = (contents, version) => {
  const parsedContent = JSON.parse(contents);

  if (parsedContent.builds?.android?.release?.releaseChannel) {
    parsedContent.builds.android.release.releaseChannel = version
  }

  if (parsedContent.builds?.ios?.release?.releaseChannel) {
    parsedContent.builds.ios.release.releaseChannel = version
  }

  return (JSON.stringify(parsedContent, null, 2));
};
