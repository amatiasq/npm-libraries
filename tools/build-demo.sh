#!/bin/bash

npx parcel build \
  --public-url npm-libraries \
  --no-cache \
  -d "docs/$1" \
  "packages/$1/demo/index.html"
