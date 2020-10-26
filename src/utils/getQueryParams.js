import queryString from "query-string";

export default function qetQueryParams(string) {
  return queryString.parse(string);
}
