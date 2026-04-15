#!/bin/bash

# Auto-commit script for Cursor hooks
# Runs after each agent completion to commit changes with descriptive messages

# Read hook input (though we don't need it for this use case)
input=$(cat)

# Check if this is a git repository
if [ ! -d ".git" ]; then
    echo '{"success": false, "message": "Not a git repository"}' 
    exit 0
fi

# Check if there are any changes to commit
if git diff --quiet && git diff --staged --quiet; then
    # No changes to commit
    echo '{"success": true, "message": "No changes to commit"}'
    exit 0
fi

# Initialize git if no commits exist yet
if ! git rev-parse HEAD >/dev/null 2>&1; then
    git add .
    git commit -m "Initial commit: Project setup" >/dev/null 2>&1
    echo '{"success": true, "message": "Created initial commit"}'
    exit 0
fi

# Get a summary of changes for commit message
added_files=$(git diff --cached --name-only --diff-filter=A | wc -l | tr -d ' ')
modified_files=$(git diff --cached --name-only --diff-filter=M | wc -l | tr -d ' ')
deleted_files=$(git diff --cached --name-only --diff-filter=D | wc -l | tr -d ' ')

# Also check unstaged changes
unstaged_added=$(git diff --name-only --diff-filter=A | wc -l | tr -d ' ')
unstaged_modified=$(git diff --name-only --diff-filter=M | wc -l | tr -d ' ')
unstaged_deleted=$(git diff --name-only --diff-filter=D | wc -l | tr -d ' ')

# Add all changes (staged and unstaged)
git add .

# Recalculate after staging all changes
total_added=$(git diff --cached --name-only --diff-filter=A | wc -l | tr -d ' ')
total_modified=$(git diff --cached --name-only --diff-filter=M | wc -l | tr -d ' ')
total_deleted=$(git diff --cached --name-only --diff-filter=D | wc -l | tr -d ' ')

# Generate descriptive commit message
commit_msg="Auto-commit: "
changes=()

if [ "$total_added" -gt 0 ]; then
    if [ "$total_added" -eq 1 ]; then
        changes+=("Add 1 file")
    else
        changes+=("Add $total_added files")
    fi
fi

if [ "$total_modified" -gt 0 ]; then
    if [ "$total_modified" -eq 1 ]; then
        changes+=("Update 1 file")
    else
        changes+=("Update $total_modified files")
    fi
fi

if [ "$total_deleted" -gt 0 ]; then
    if [ "$total_deleted" -eq 1 ]; then
        changes+=("Delete 1 file")
    else
        changes+=("Delete $total_deleted files")
    fi
fi

# Join changes with commas
if [ ${#changes[@]} -eq 0 ]; then
    commit_msg="${commit_msg}Minor changes"
elif [ ${#changes[@]} -eq 1 ]; then
    commit_msg="${commit_msg}${changes[0]}"
elif [ ${#changes[@]} -eq 2 ]; then
    commit_msg="${commit_msg}${changes[0]} and ${changes[1]}"
else
    commit_msg="${commit_msg}$(IFS=', '; echo "${changes[*]:0:$((${#changes[@]}-1))}" | sed 's/,/, /g'), and ${changes[-1]}"
fi

# Get some key file types that were changed for more context
key_files=$(git diff --cached --name-only | grep -E '\.(tsx?|jsx?|py|java|go|rs|cpp|c|h)$' | head -3)
if [ -n "$key_files" ]; then
    file_count=$(echo "$key_files" | wc -l | tr -d ' ')
    if [ "$file_count" -gt 0 ]; then
        commit_msg="${commit_msg} ($(echo "$key_files" | tr '\n' ', ' | sed 's/, $//'))"
    fi
fi

# Commit the changes
if git commit -m "$commit_msg" >/dev/null 2>&1; then
    echo "{\"success\": true, \"message\": \"Committed: $commit_msg\"}"
else
    echo '{"success": false, "message": "Git commit failed"}'
    exit 1
fi

exit 0