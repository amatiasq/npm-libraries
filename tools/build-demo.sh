#!/bin/bash

npx parcel build \
  --public-url . \
  --no-cache \
  -d "docs/$1" \
  "packages/$1/demo/index.html"
