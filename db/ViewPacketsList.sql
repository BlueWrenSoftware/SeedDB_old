drop view ViewPacketslist;
create view ViewPacketsList as 
select
	SeedTypes.seedTypeId,
	SeedTypes.seedTypeName,
	Seeds.seedId,
	Seeds.seedVarietyName,
	SeedPackets.packetId,
	SeedPackets.packetCode,
	SeedPackets.companyId,
	SeedPackets.datePurchased,
	SeedPackets.dateUseBy,
	SeedPackets.seedCount,
	Companies.companyName,
	--Plantings.numberPlanted,
	--Plantings.numberGerminated,
	ifnull(sum(Plantings.numberPlanted),0) as totalPlanted,
	ifnull(sum(Plantings.numberGerminated),0) as totalGerminated,
	ifnull(((sum(cast(Plantings.numberGerminated as real))/sum(cast(Plantings.numberPlanted as real)))*100),0) as percentGerminated
from SeedTypes 
join Seeds 
using (seedTypeId)
join SeedPackets
using (seedId)
join Companies
using (companyId)
left outer join Plantings
using (packetId)
group by
	SeedTypes.seedTypeId,
	SeedTypes.seedTypeName,
	Seeds.seedId,
	Seeds.seedVarietyName,
	SeedPackets.packetId,
	SeedPackets.packetCode,
	SeedPackets.companyId,
	SeedPackets.datePurchased,
	SeedPackets.dateUseBy,
	SeedPackets.seedCount,
	Companies.companyName;
	
