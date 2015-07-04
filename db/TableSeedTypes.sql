create table SeedTypes (
seedTypeId integer not null primary key autoincrement,
seedTypeName text,
seedDescription text
);

insert into SeedTypes(seedTypeId, seedTypeName, seedDescription) values 
(1,'flower','update'),
(2,'vegetable','update'),
(3,'fruit','update'),
(4,'herb','update'),
(5,'ornamental','update');