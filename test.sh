#!/bin/bash -e

export RES_REPO=sit_repo
export RES_PARAMS=$1

setupTestEnv() {
  echo "Starting Testing Env setup" $RES_REPO
  pushd /build/IN/$RES_REPO/gitRepo
  npm install
  popd

  pushd /build/IN/$RES_PARAMS
  export API_URL=$(jq -r '.version.propertyBag.params.API_URL' version.json)
  export API_TOKEN=$(jq -r '.version.propertyBag.params.API_TOKEN' version.json)
  echo $API_URL
  popd
  echo "Completed Testing Env setup" $RES_REPO
}

test(){
  pushd /build/IN/$RES_REPO/gitRepo
  multi="xunit=shippable/testresults/test.xml json=shippable/testresults/test.json" npm run-script test-core
  popd
}
main() {
  setupTestEnv
  test
}

main
