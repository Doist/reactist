# Contributing

Thanks for being willing to contribute!

**Working on your first Pull Request?** You can learn how from this _free_
series [How to Contribute to an Open Source Project on GitHub][egghead]

## Project setup

1.  Fork and clone the repo
2.  Run `npm run setup` to install dependencies and run validations.
3.  Create a branch for your PR with `git checkout -b pr/your-branch-name`

> Tip: Keep your `dev` branch pointing at the original repository and make pull
> requests from branches on your fork. To do this, run:
>
> ```
> git remote add upstream https://github.com/doist/reactist.git
> git fetch upstream
> git branch --set-upstream-to=upstream/dev dev
> ```
>
> This will add the original repository as a "remote" called "upstream," Then
> fetch the git information from that remote, then set your local `dev` branch
> to use the upstream `dev` branch whenever you run `git pull`. Then you can
> make all of your pull request branches based on this `dev` branch.
>
> Whenever you want to update your version of `dev`, do a regular `git pull`.

## Committing and Pushing changes

This repository is setup so that on `git push` it will run all validations
(linting, tests and type checks) and will prevent you from pushing any changes
if any of these checks fail. These steps are also enforced on GitHub preventing
any failing PR to be merged, but are run before pushing for your convenience and
ours. Please do not override this step.

## Help needed

Please checkout the [the open issues][issues].

Also, please watch the repo and respond to questions/bug reports/feature
requests! Thanks!

[egghead]: https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github
[issues]: https://github.com/doist/reactist/issues
