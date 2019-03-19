#!/bin/bash

pkg="$1"
type="$2"
message="$3"

if [ -z "$pkg" ]
then
  echo "Package name expected as argument"
  exit 1
fi

if git status | grep "packages/$pkg"
then
  echo ''

  if [ -z "$type" ]
  then
    echo "No commit type provided"
    exit 1
  fi

  if [ -z "$message" ]
  then
    echo "No message provided"
    exit 1
  fi

  git add "packages/$pkg"
  git commit -m "$type($pkg): $message"
else
  echo "Nothing to commit"
fi
