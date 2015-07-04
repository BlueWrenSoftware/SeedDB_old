create table Companies (
companyId integer not null primary key,
companyName text,
companyAddress text,
companyUrl text
);

insert into Companies(companyName, companyAddress, companyUrl) values 
('Mitre10','Kingston','http://mitre10.com.au'),
('Blue Wren','288 Rocky Bay Rd, Deep Bay, Tas, 7112','http://bluewrenberrygardens.com');