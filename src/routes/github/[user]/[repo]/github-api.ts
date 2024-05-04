import type { paths } from "@octokit/openapi-types";

type OrgRepoResponse =
  paths["/repos/{owner}/{repo}"]["get"]["responses"]["200"]["content"]["application/json"];

export type Fetch = typeof fetch;

export class GithubApi {
  constructor(
    private token: string | undefined,
    private fetch: Fetch ,
    private delay: (ms: number) => Promise<void> = delay
  ) {}

  async getRepository(user: string, repo: string) {
    const headers: HeadersInit = {
      "User-Agent": "Qwik Workshop",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (this.token) {
      headers["Authorization"] = "Bearer " + this.token;
    }

    const response = this.fetch(
      `https://api.github.com/repos/${user}/${repo}`,
      {
        headers,
      }
    );
    return Promise.race([
      this.delay(4000).then(() => ({
        response: "timeout",
      })),
      response.then((response) => {
        return response.json();
      }),
    ]);
  }

  async getRepositories(user: string) {
    let page = 1;
    const repositories: OrgRepoResponse[] = [];
    while (true) {
      const response = await this.fetch(
        `https://api.github.com/users/${user}/repos?per_page=30&page=${page}`,
        {
          headers: {
            "User-Agent": "Qwik Workshop",
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );
      const json = await response.json();
      repositories.push(...json);
      if (json.length < 30) {
        break;
      }
      page++;
    }
    return repositories;
  }
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
