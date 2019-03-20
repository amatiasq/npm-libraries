#!/bin/bash

pkg="$1"

if [ -z "$pkg" ]
then
  echo "Package name expected as argument"
  exit 1
fi

npx parcel build \
  --public-url . \
  --no-cache \
  -d "docs/$pkg" \
  "packages/$pkg/demo/index.html"
