create table Plantings(
plantingId integer not null primary key autoincrement,
packetId references SeedPackets(packetId),
plantingCode text,
datePlanted integer,
dateGerminated integer,
numberPlanted integer,
numberGerminated integer,
areaPlanted text,
plantingNotes text,
germinationNotes text,
generalNotes
);

insert into Plantings(
packetId, 
plantingCode,
datePlanted,
dateGerminated,
numberPlanted,
numberGerminated,
areaPlanted,
plantingNotes,
germinationNotes,
generalNotes) values 
(1,
'trees1',
0,
1,
4,
4,
'Front of house',
'trees were mulched',
'leaves appeared in spring',
'flowered and beared fruit after 2 years');