#!/usr/bin/env bash

set -eo pipefail

name=$1

if [[ -z "$name" ]]; then
  >&2 echo "Usage: yarn run new-package [name]"
  exit 1
fi

lerna create @actions/$name
cp packages/toolkit/tsconfig.json packages/$name/tsconfig.json