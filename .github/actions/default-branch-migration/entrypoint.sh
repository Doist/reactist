#!/bin/sh -l

GITHUB_TOKEN=$1
PREVIOUS_DEFAULT=$2
NEW_DEFAULT=$3
GITHUB_API_URL="https://api.github.com"

echo "Migrating from '$PREVIOUS_DEFAULT' to '$NEW_DEFAULT'"
echo "Repo Name: $GITHUB_REPOSITORY"
echo "Branch/Tag: $GITHUB_REF"

if [ "$GITHUB_REF" != "refs/heads/$PREVIOUS_DEFAULT" ] && [ "$GITHUB_REF" != "refs/heads/$NEW_DEFAULT" ]; then
	echo "Push not to either default branches ($NEW_DEFAULT or $PREVIOUS_DEFAULT)"
	echo "Ignoring push to $GITHUB_REF"
	exit
fi;

# Check the API to see what the current default branch is
CURRENT_DEFAULT=$(curl --silent -u $GITHUB_ACTOR:$GITHUB_TOKEN $GITHUB_API_URL/repos/$GITHUB_REPOSITORY | jq -r .default_branch)
echo "Default branch: $CURRENT_DEFAULT"

if [ "$CURRENT_DEFAULT" = "$NEW_DEFAULT" ]; then
	echo "Default has changed to $NEW_DEFAULT"
	if [ "$GITHUB_REF" = "refs/heads/$PREVIOUS_DEFAULT" ]; then
		echo "ERROR: Push to $PREVIOUS_DEFAULT even though default branch is now $NEW_DEFAULT"
		exit 1
	fi;
	# Check all existing PRs to see if we should change their base
	PRS=$(curl --silent -u $GITHUB_ACTOR:$GITHUB_TOKEN "$GITHUB_API_URL/repos/$GITHUB_REPOSITORY/pulls?base=$PREVIOUS_DEFAULT&state=open")

	# TODO: PATCH /repos/:owner/:repo/pulls/:pull_number
	for row in $(echo $PRS | jq -r 'map(select(.locked == false)) | .[].url'); do
		echo "Attempting to update $row"
		curl --silent --show-error -w "Status Code: %{http_code}\n" --request PATCH --data '{"base": "'$NEW_DEFAULT'"}' -u $GITHUB_ACTOR:$GITHUB_TOKEN "$row"
	done

	exit
fi;

# The default is PREVIOUS_DEFAULT and a push to PREVIOUS_DEFAULT
# so keep NEW_DEFAULT up to date
if [ "$GITHUB_REF" = "refs/heads/$PREVIOUS_DEFAULT" ]; then
	echo "Update $NEW_DEFAULT to match $PREVIOUS_DEFAULT"
	GIT_REPO="https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
	# Specify repo folder as target so it's clear what folder to cd into
	git clone --depth 3 -b $PREVIOUS_DEFAULT $GIT_REPO target
	cd target
	git checkout -b $NEW_DEFAULT $PREVIOUS_DEFAULT
	git push --set-upstream origin $NEW_DEFAULT
	exit
fi;
