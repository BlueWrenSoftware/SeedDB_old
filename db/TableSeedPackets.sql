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
'n/a'),
('bolero6',
1,
1,
0,
1,
4,
'n/a',
'n/a'),
('hawthorn1',
2,
1,
0,
1,
4,
'n/a',
'n/a'),
('parsley01',13,5,0,0,50,'NotEntered','NotEntered'),
('parsley02',13,1,0,0,50,'NotEntered','NotEntered')
;