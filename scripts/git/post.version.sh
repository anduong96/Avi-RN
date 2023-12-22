echo "Updating ios & android file versions"
react-native-version

echo "Pushing changes to git"
git add -A
git commit -m \"chore(release): $npm_package_version\"
git push --follow-tags origin HEAD
