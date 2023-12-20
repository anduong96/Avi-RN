interface SemVer {
  build: string[];
  major: number;
  minor: number;
  patch: number;
  prerelease: string[];
}

export function parseSemVer(versionString: string): SemVer | null {
  const semVerRegex = /^v?(\d+)\.(\d+)\.(\d+)(?:-([\w.-]+))?(?:\+([\w.-]+))?$/;
  const match = versionString.match(semVerRegex);

  if (match) {
    const [, major, minor, patch, prerelease, build] = match;
    return {
      build: build ? build.split('.') : [],
      major: parseInt(major, 10),
      minor: parseInt(minor, 10),
      patch: parseInt(patch, 10),
      prerelease: prerelease ? prerelease.split('.') : [],
    };
  }

  return null;
}

export function isRemoteVersionHigher(
  localVersion: string,
  remoteVersion: string,
): boolean {
  const localSemVer = parseSemVer(localVersion);
  const remoteSemVer = parseSemVer(remoteVersion);

  if (localSemVer && remoteSemVer) {
    return (
      remoteSemVer.major > localSemVer.major ||
      (remoteSemVer.major === localSemVer.major &&
        remoteSemVer.minor > localSemVer.minor) ||
      (remoteSemVer.major === localSemVer.major &&
        remoteSemVer.minor === localSemVer.minor &&
        remoteSemVer.patch > localSemVer.patch)
    );
  }

  // If parsing fails, consider the remote version higher by default
  return false;
}
