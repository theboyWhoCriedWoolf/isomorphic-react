#!/bin/bash
find "$1" -type f -name "*.css" | while read x; 
	do cleancss $x -o $x; 
	echo "$(tput setaf 2) minifying - $x";
	tput sgr0;
done