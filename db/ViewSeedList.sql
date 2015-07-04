drop view viewseedlist;
create view ViewSeedList as 
select
	SeedTypes.seedTypeId
	,SeedTypes.seedTypeName
	,Seeds.seedId
	,Seeds.seedVarietyName
	,count(SeedPackets.packetId) as seedPacketCount
	,ifnull(sum(SeedPackets.seedCount),0) as totalSeedCount
from SeedTypes 
join Seeds 
using (seedTypeId)
left outer join SeedPackets
using (seedId)
group by
	seedTypeId,
	seedTypeName,
	seedId,
	seedVarietyName;
