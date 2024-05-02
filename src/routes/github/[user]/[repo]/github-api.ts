
import type { paths } from "@octokit/openapi-types";

type OrgRepoResponse =
  paths["/repos/{owner}/{repo}"]["get"]["responses"]["200"]["content"]["application/json"];

export class GithubApi {
  constructor(private token: string |undefined) {}

  async getRepository(user: string, repo: string) {
    
  const headers: HeadersInit = {
    "User-Agent": "Qwik Workshop",
    "X-GitHub-Api-Version": "2022-11-28",
  };
    if (this.token) {
        headers["Authorization"] =
          "Bearer " + this.token;
      }
    
      const response = await fetch(`https://api.github.com/repos/${user}/${repo}`, {
        headers,
      });
      const repository = (await response.json()) as OrgRepoResponse;
      return repository;
  }
}