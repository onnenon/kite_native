/drone-eslint.sh
#! /bin/bash

GITHUB_API=https://api.github.com
CI_CONTEXT="stylechecker/tslint"

# Notify GitHub stylechecking has started
echo 'Starting ESLint...'
curl "$GITHUB_API/repos/$DRONE_REPO/statuses/$DRONE_COMMIT?access_token=$GITHUB_TOKEN" \
  -s \
  -H "Content-Type: application/json" \
  -X POST \
  -d "{\"state\": \"pending\", \"description\": \"The TSLint style checking is in progress\", \"target_url\": \"$DRONE_BUILD_LINK\", \"context\": \"$CI_CONTEXT\"}" \
  > /dev/null

# Run TSLint
yarn install
yarn lint
EXIT_CODE=$?

# Notify GitHub according to TSLint exit code
if [ $EXIT_CODE -eq 0 ]
then
  export STATUS="success"
  export DESCRIPTION="TSLint found no style issues"
  echo $DESCRIPTION
else
  export STATUS="failure"
  export DESCRIPTION="TSLint found style issues"
  echo $DESCRIPTION
fi

curl "$GITHUB_API/repos/$DRONE_REPO/statuses/$DRONE_COMMIT?access_token=$GITHUB_TOKEN" \
  -s \
  -H "Content-Type: application/json" \
  -X POST \
  -d "{\"state\": \"$STATUS\", \"description\": \"$DESCRIPTION\", \"target_url\": \"$DRONE_BUILD_LINK \", \"context\": \"$CI_CONTEXT\"}" \
  > /dev/null

exit 0 # don't make the build fail, just notify GitHub