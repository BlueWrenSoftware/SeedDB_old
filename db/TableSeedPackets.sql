create table SeedPackets (
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
