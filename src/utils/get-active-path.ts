import { closest } from "fastest-levenshtein";

export default function getActivePath(
  path: string,
  paths: string[],
  ignorePaths?: string[],
) {
  const closestPath = closest(path, paths.concat(ignorePaths || []));
  const index = paths.indexOf(closestPath);

  return { active: closestPath, activeIndex: index };
}
