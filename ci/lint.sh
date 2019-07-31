/drone-eslint.sh
#! /bin/bash

GITHUB_API=https://api.github.com
CI_CONTEXT="stylechecker/eslint"

# Notify GitHub stylechecking has started
echo 'Starting ESLint...'
curl "$GITHUB_API/repos/$DRONE_REPO/statuses/$DRONE_COMMIT?access_token=$GITHUB_TOKEN" \
  -s \
  -H "Content-Type: application/json" \
  -X POST \
  -d "{\"state\": \"pending\", \"description\": \"The ESLint style checking is in progress\", \"target_url\": \"$DRONE_REMOTE_URL\", \"context\": \"$CI_CONTEXT\"}" \
  > /dev/null

# Run TSLint
yarn lint
EXIT_CODE=$?

# Notify GitHub according to ESLint exit code
if [ $EXIT_CODE -eq 0 ]
then
  export STATUS="success"
  export DESCRIPTION="No style issues"
  echo $DESCRIPTION
else
  export STATUS="failure"
  export DESCRIPTION="ESLint found style issues"
  echo $DESCRIPTION
fi

curl "$GITHUB_API/repos/$DRONE_REPO/statuses/$DRONE_COMMIT?access_token=$GITHUB_TOKEN" \
  -s \
  -H "Content-Type: application/json" \
  -X POST \
  -d "{\"state\": \"$STATUS\", \"description\": \"$DESCRIPTION\", \"target_url\": \"$DRONE_REMOTE_URL \", \"context\": \"$CI_CONTEXT\"}" \
  > /dev/null

exit 0 # don't make the build fail, just notify GitHub