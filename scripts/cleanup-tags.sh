# Cleanup nightly version tags generated by changsets
git push origin --delete $(git tag -l | grep "\-[a-f0-9]\{7\}$")