create table Companies (
companyId integer not null primary key,
companyName text,
companyAddress text,
companyUrl text
);

insert into Companies(companyName, companyAddress, companyUrl) values 
('Blue Wren','288 Rocky Bay Rd, Deep Bay, Tas, 7112','http://bluewrenberrygardens.com'),
('Mitre10','Kingston','http://mitre10.com.au'),
('Phoenix Seeds','NotEntered','NotEntered'),
('All Rare Herbs','NotEntered','NotEntered'),
('DT Brown','NotEntered','NotEntered'),
('Southern Harvest','NotEntered','N')
;