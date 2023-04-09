#!/bin/bash
git checkout main
git pull
npm install
node deploy-commands.mjs
