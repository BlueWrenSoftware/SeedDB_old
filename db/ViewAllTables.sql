drop view AllTables;
CREATE VIEW AllTables AS
SELECT--A
	--SeedTypes fields
	seedTypeId,seedTypeName, seedDescription,
	--Seeds fields
	seedId, seedVarietyName, seedVarietyNote,
	--SeedPackets fields
	packetId, packetCode, companyId, datePurchased, dateUseBy, seedCount, packetTreatment, storageLocation,
	--Company fields
	companyName, companyAddress, companyUrl,
	--Plantings fields
	plantingId, plantingCode, datePlanted, dateGerminated, numberPlanted, numberGerminated, 
	areaPlanted, plantingNote, germinationNote, generalNote, percentGerminated
FROM--A

	(SELECT--B
		--Seeds fields
		seedId, seedVarietyName, seedTypeId, seedVarietyNote, 
		--SeedPackets fields
		packetId, packetCode, companyId, datePurchased, dateUseBy, seedCount, packetTreatment, storageLocation,
		--Company fields
		companyName, companyAddress, companyUrl,
		--Plantings fields
		plantingId, plantingCode, datePlanted, dateGerminated, numberPlanted, numberGerminated, 
		areaPlanted, plantingNote, germinationNote, generalNote, percentGerminated
	FROM--B 
		Seeds
	LEFT OUTER JOIN--B
		
		(SELECT--C
			--SeedPackets fields
			packetId, seedId, companyId, packetCode, datePurchased, dateUseBy, 
			seedCount, packetTreatment, storageLocation,
			--Company fields
			companyName, companyAddress, companyUrl,
			--Plantings fields
			plantingId, plantingCode, datePlanted, dateGerminated,
			numberPlanted, numberGerminated, areaPlanted, 
			plantingNote, germinationNote, generalNote,
			IFNULL(CAST(numberGerminated AS REAL)/CAST(numberPlanted AS REAL)*100,0.0) AS percentGerminated
		FROM--C
		
			(SELECT--D
				--SeedPackets fields
				packetId, seedId, companyId, packetCode, datePurchased, dateUseBy, 
				seedCount, packetTreatment, storageLocation,
				--Company fields
				companyName, companyAddress, companyUrl
			FROM--D
				COMPANIES
			LEFT OUTER JOIN--D 
				SeedPackets
			USING--D
				(companyId)
				)--end D
		
		LEFT OUTER JOIN--C
			Plantings
		USING--C
			(packetId)
		)--end C
	USING--B 
		(seedId)
		)--end B
		
LEFT OUTER JOIN--A
	SeedTypes
USING--A
	(seedTypeId)--end A
;
