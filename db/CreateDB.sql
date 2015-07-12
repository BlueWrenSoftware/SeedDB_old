PRAGMA foreign_keys=ON;
BEGIN TRANSACTION;
CREATE TABLE SeedTypes (
seedTypeId integer not null primary key autoincrement,
seedTypeName text,
seedDescription text
);
INSERT INTO "SeedTypes" VALUES(1,'flower','update');
INSERT INTO "SeedTypes" VALUES(2,'vegetable','update');
INSERT INTO "SeedTypes" VALUES(3,'fruit','update');
INSERT INTO "SeedTypes" VALUES(4,'herb','update');
INSERT INTO "SeedTypes" VALUES(5,'ornamental','update');
CREATE TABLE Seeds 
(
seedId integer not null primary key autoincrement,
seedVarietyName text,
seedTypeId integer references SeedTypes(seedTypeId),
seedVarietyNote text
);
INSERT INTO "Seeds" VALUES(1,'Bolero Apple',3,'dwarf apple trees');
INSERT INTO "Seeds" VALUES(2,'Hawthorn',5,'ornamental');
INSERT INTO "Seeds" VALUES(3,'Anise',4,'NotEntered');
INSERT INTO "Seeds" VALUES(4,'Basil',4,'NotEntered');
INSERT INTO "Seeds" VALUES(5,'Basil Sweet',4,'NotEntered');
INSERT INTO "Seeds" VALUES(6,'Bilberry',4,'NotEntered');
INSERT INTO "Seeds" VALUES(7,'Chives',4,'NotEntered');
INSERT INTO "Seeds" VALUES(8,'Costmay',4,'NotEntered');
INSERT INTO "Seeds" VALUES(9,'Indigo Blue',4,'NotEntered');
INSERT INTO "Seeds" VALUES(10,'Lavender',4,'NotEntered');
INSERT INTO "Seeds" VALUES(11,'Chamomile Lawn',4,'NotEntered');
INSERT INTO "Seeds" VALUES(12,'Motherwort Siberian',4,'NotEntered');
INSERT INTO "Seeds" VALUES(13,'Parsley',4,'NotEntered');
CREATE TABLE Companies (
companyId integer not null primary key,
companyName text,
companyAddress text,
companyUrl text
);
INSERT INTO "Companies" VALUES(1,'Blue Wren','288 Rocky Bay Rd, Deep Bay, Tas, 7112','http://bluewrenberrygardens.com');
INSERT INTO "Companies" VALUES(2,'Mitre10','Kingston','http://mitre10.com.au');
INSERT INTO "Companies" VALUES(3,'Phoenix Seeds','NotEntered','NotEntered');
INSERT INTO "Companies" VALUES(4,'All Rare Herbs','NotEntered','NotEntered');
INSERT INTO "Companies" VALUES(5,'DT Brown','NotEntered','NotEntered');
INSERT INTO "Companies" VALUES(6,'Southern Harvest','NotEntered','N');
CREATE TABLE SeedPackets (
packetId integer not null primary key autoincrement,
packetCode text,
seedId integer references Seeds(seedId),
companyId integer references Companies(companyId),
datePurchased integer, -- can be date collected
dateUseBy integer,
seedCount integer,
packetTreatment text,
storageLocation text
);
INSERT INTO "SeedPackets" VALUES(1,'bolero1',1,1,0,1,4,'n/a','n/a');
INSERT INTO "SeedPackets" VALUES(2,'bolero6',1,1,0,1,4,'n/a','n/a');
INSERT INTO "SeedPackets" VALUES(3,'hawthorn1',2,1,0,1,4,'n/a','n/a');
INSERT INTO "SeedPackets" VALUES(4,'parsley01',13,5,0,0,50,'NotEntered','NotEntered');
INSERT INTO "SeedPackets" VALUES(5,'parsley02',13,1,0,0,50,'NotEntered','NotEntered');
CREATE TABLE Plantings(
plantingId integer not null primary key autoincrement,
packetId references SeedPackets(packetId),
plantingCode text,
datePlanted integer,
dateGerminated integer,
numberPlanted integer,
numberGerminated integer,
areaPlanted text,
plantingNote text,
germinationNote text,
generalNote
);
INSERT INTO "Plantings" VALUES(1,1,'trees1',0,1,4,4,'Front of house','trees were mulched','leaves appeared in spring','flowered and beared fruit after 2 years');
INSERT INTO "Plantings" VALUES(2,3,'trees2',0,1,4,3,'Hill accross creek','trees were mulched','leaves appeared in spring on three trees only','not flowered yet');
DELETE FROM sqlite_sequence;
INSERT INTO "sqlite_sequence" VALUES('SeedTypes',5);
INSERT INTO "sqlite_sequence" VALUES('Seeds',13);
INSERT INTO "sqlite_sequence" VALUES('SeedPackets',5);
INSERT INTO "sqlite_sequence" VALUES('Plantings',2);
CREATE VIEW ViewSeedList as 
select
	SeedTypes.seedTypeId
	,SeedTypes.seedTypeName
	,Seeds.seedId
	,Seeds.seedVarietyName
	,Seeds.seedVarietyNote
	,count(SeedPackets.packetId) as seedPacketCount
	,ifnull(sum(SeedPackets.seedCount),0) as totalSeedCount
from SeedTypes 
join Seeds 
using (seedTypeId)
left outer join SeedPackets
using (seedId)
group by
	seedTypeId,
	seedId;
CREATE VIEW schema as select * from sqlite_master;
CREATE VIEW ViewPacketsList as 
select
	SeedTypes.seedTypeId,
	SeedTypes.seedTypeName,
	Seeds.seedId,
	Seeds.seedVarietyName,
	SeedPackets.packetId,
	SeedPackets.packetCode,
	SeedPackets.companyId,
	SeedPackets.datePurchased,
	SeedPackets.dateUseBy,
	SeedPackets.seedCount,
	SeedPackets.packetTreatment,
	SeedPackets.storageLocation,
	Companies.companyId,
	Companies.companyName,
	Companies.companyAddress,
	Companies.companyUrl,
	--Plantings.numberPlanted,
	--Plantings.numberGerminated,
	ifnull(sum(Plantings.numberPlanted),0) as totalPlanted,
	ifnull(sum(Plantings.numberGerminated),0) as totalGerminated,
	ifnull(((sum(cast(Plantings.numberGerminated as real))/sum(cast(Plantings.numberPlanted as real)))*100),0) as percentGerminated
from SeedTypes 
join Seeds 
using (seedTypeId)
join SeedPackets
using (seedId)
join Companies
using (companyId)
left outer join Plantings
using (packetId)
group by
SeedTypes.seedTypeId,
	SeedTypes.seedTypeName,
	Seeds.seedId,
	Seeds.seedVarietyName,
	SeedPackets.packetId,
	SeedPackets.packetCode,
	SeedPackets.companyId,
	SeedPackets.datePurchased,
	SeedPackets.dateUseBy,
	SeedPackets.seedCount,
	SeedPackets.packetTreatment,
	SeedPackets.storageLocation,
	Companies.companyId,
	Companies.companyName,
	Companies.companyAddress,
	Companies.companyUrl
;
CREATE VIEW test as 
select 	
	SeedPackets.packetId, SeedPackets.packetCode, SeedPackets.datePurchased, SeedPackets.dateUseBy, 
	SeedPackets.seedCount, SeedPackets.packetTreatment, SeedPackets.storageLocation,
	Plantings.plantingId, Plantings.plantingCode, Plantings.datePlanted, Plantings.dateGerminated,
	Plantings.numberPlanted, Plantings.numberGerminated, Plantings.areaPlanted, 
	Plantings.plantingNote, Plantings.germinationNote, Plantings.generalNote,
	ifnull(cast(Plantings.numberGerminated as real)/cast(Plantings.numberPlanted as real)*100,0.0) as percentGerminated
from Seedpackets
outer left join Plantings
using (packetId);
COMMIT;
