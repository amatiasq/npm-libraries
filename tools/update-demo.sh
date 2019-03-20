#!/bin/bash

pkg="$1"

if [ -z "$pkg" ]
then
  echo "Package name expected as argument"
  exit 1
fi

git rm docs/"$pkg"/demo*;
tools/build-demo.sh "$pkg"
git add docs/"$pkg"/demo*
git commit -m "docs($pkg): update gh-pages"
