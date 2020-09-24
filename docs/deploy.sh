#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# SSH
# git push -f git@github.com:willhunt/silvia.git master:gh-pages
# HTTP
git push -f https://github.com/willhunt/silvia.git master:gh-pages

cd -