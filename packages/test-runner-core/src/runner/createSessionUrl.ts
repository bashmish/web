import path from 'path';
import { TestRunnerCoreConfig } from '../config/TestRunnerCoreConfig';
import { PARAM_SESSION_ID, PARAM_DEBUG } from '../browser-launcher/constants';
import { BasicTestSession } from '../test-session/BasicTestSession';

const toBrowserPathRegExp = new RegExp(path.sep === '\\' ? '\\\\' : path.sep, 'g');

export function toBrowserPath(filePath: string) {
  return filePath.replace(toBrowserPathRegExp, '/');
}

export function createSessionUrl(
  config: TestRunnerCoreConfig,
  session: BasicTestSession,
  debug: boolean,
) {
  let browserPath: string;

  if (session.testFile.endsWith('.html')) {
    const resolvedPath = path.resolve(session.testFile);
    const relativePath = path.relative(config.rootDir, resolvedPath);
    browserPath = `/${toBrowserPath(relativePath)}`;
  } else {
    browserPath = '/';
  }
  const params = `?${PARAM_SESSION_ID}=${session.id}${debug ? `&${PARAM_DEBUG}=true` : ''}`;

  return `${config.protocol}//${config.hostname}:${config.port}${browserPath}${params}`;
}
