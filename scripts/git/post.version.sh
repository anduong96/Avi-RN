#!/bin/bash
echo "Updating ios & android file versions"

if [ -e "package.json" ]; then
    build_gradle_path="android/app/build.gradle"
    ios_info_plist_path="ios/Avi/Info.plist"
    new_version=$(node -p -e "require('./package.json').version")
    echo "Version: $new_version"
    sed -i '' "s/versionName \"[0-9.]*\"/versionName \"$new_version\"/" $build_gradle_path
    /usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString $new_version" "$ios_info_plist_path"

else
    echo "Error: package.json not found in the current directory."
fi

echo "Pushing changes to git"
git add -A
git commit -m \"chore\(release\): $npm_package_version\"
git push --follow-tags origin HEAD
