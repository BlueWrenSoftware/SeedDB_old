create table Seeds 
(
seedId integer not null primary key autoincrement,
seedVarietyName text,
seedTypeId integer references SeedTypes(seedTypeId),
seedVarietyNote text
);

insert into Seeds (seedId, seedVarietyName, seedTypeId, seedVarietyNote) values 
(1,'Bolero Apple',3,'dwarf apple trees');