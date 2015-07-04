create table Seeds 
(
seedId integer not null primary key autoincrement,
seedVarietyName text,
seedTypeId integer references SeedTypes(seedTypeId),
seedVarietyNote text
);

insert into Seeds (seedId, seedVarietyName, seedTypeId, seedVarietyNote) values 
(1,'Bolero Apple',3,'dwarf apple trees'),
(2,'Hawthorn',5,'ornamental'),
(3,'Anise',4,'NotEntered'),
(4,'Basil',4,'NotEntered'),
(5,'Basil Sweet',4,'NotEntered'),
(6,'Bilberry',4,'NotEntered'),
(7,'Chives',4,'NotEntered'),
(8,'Costmay',4,'NotEntered'),
(9,'Indigo Blue',4,'NotEntered'),
(10,'Lavender',4,'NotEntered'),
(11,'Chamomile Lawn',4,'NotEntered'),
(12,'Motherwort Siberian',4,'NotEntered'),
(13,'Parsley',4,'NotEntered')
;