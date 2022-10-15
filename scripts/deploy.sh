#!/usr/bin/env sh

yarn build &&
cd build &&
git init &&
git add . &&
git commit -m deploy &&
git remote add origin git@gitee.com:linmumujiayou/epic-react.git &&
git push -u -f origin master &&
cd ..;