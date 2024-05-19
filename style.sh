#!/bin/bash

# Check if Prettier is installed
if ! command -v prettier &> /dev/null
then
    echo "Prettier could not be found"
    echo "Install it with 'npm install --global prettier'"
    exit
fi

# Define the Prettier configuration
# You can adjust this to fit your project's style guide
prettier_config="--single-quote --trailing-comma es5"

# Format all JavaScript and JSX files in the current directory and subdirectories
find . -name "*.js" -o -name "*.jsx" | xargs prettier --write $prettier_config