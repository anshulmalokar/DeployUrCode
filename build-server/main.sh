#!/bin/bash
export GIT_REPO_URL="$GIT_REPO_URL"
git clone "$GIT_REPO_URL" /home/app/output && echo "Cloning process completed successfully"
npm run build
chmod +x /home/app/dist/index.js
npm run start