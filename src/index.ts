import {GithubApiService} from './GithubApiService'
import { User } from './User';
import { Repo } from './Repo';
import * as _ from "lodash";

let svc = new GithubApiService();

if (process.argv.length < 3) {
    console.log(`Please pass a valid username as an argument`)
} else {
    let username = process.argv[2];
    svc.getUserInfo(username, (user: User) => { 
        svc.getRepos(username, (repos: Repo[]) => {
            let sortedRepos = _.sortBy(repos, [(repo: Repo) => repo.forkCount * -1]);
            let filteredRepos = _.take(sortedRepos, 5)
            user.repos = filteredRepos;
            console.log(user);
        })
    }); 
}