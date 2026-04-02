#!/bin/bash

read -p "motionblur setting(integer): " MBSETTING
options=("grayscale" "invert" "emboss" "motionblur")
images=("feep" "one-does-not-simply" "Penguins" "sunset" "tiny")

npm run build > /dev/null
for image in "${images[@]}"
do
  echo "Running ${image}.ppm tests..."
  for option in "${options[@]}"
  do
    echo "${option}:"
    if [ "$option" = "motionblur" ]; then
        npm run start ImageEditorFiles/source_images/${image}.ppm testResults/my-${option}-${image}.ppm ${option} ${MBSETTING} > /dev/null
    else
        npm run start ImageEditorFiles/source_images/${image}.ppm testResults/my-${option}-${image}.ppm ${option} > /dev/null
    fi
    if diff ./testResults/my-${option}-${image}.ppm ./ImageEditorFiles/key_images/${option}-${image}.ppm > testResults/diff-${option}-${image}.txt; then
        echo "Passed!"
    else
        echo "Test failed. Please check the diff text file corresponding to this test for results."
    fi
  done
  echo ""
done
