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

insert into SeedPackets(
packetCode, 
seedId, 
companyId, 
datePurchased,
dateUseBy, 
seedCount,
packetTreatment,
storageLocation) values 
('bolero1',
1,
1,
0,
1,
4,
'n/a',
'n/a');