create table Plantings(
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
