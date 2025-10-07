#!/usr/bin/env bash

OUTDIR="/1/kritika/compressedTimeMaps/"
INPDIR="/1/kritika/TM_yearwise"
#compress deeplink

cd ${INPDIR}

for yr in {1996..2002}; do 
	part_files=$(echo $yr/TM_other/x*);  
	for pf in $part_files; do 
		part=$(echo ${pf}| cut -d"x" -f2| sed 's/.\{4\}$//'); 
		#echo $part;

		part_fileslist=$(echo ${yr}/TM_other/*$part*)
		printf '%s' "$part_fileslist" | tr ' ' '\n' > tmpfl${yr}_${part}.txt

		echo "[START] $yr $part"	

		tar -czf ${OUTDIR}/${yr}/nypw_timemaps${yr}_deeplinks_part${part}.tar.gz -T tmpfl${yr}_${part}.txt

		echo "[DONE] $yr $part"	
 
	done; 
done