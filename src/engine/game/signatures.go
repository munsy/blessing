package main

const(
	AgroCountKey = "AGRO_COUNT"
	AgroMapKey = "AGROMAP"
	CharacterMapKey = "CHARMAP"
	ChatLogKey = "CHATLOG"
	EnmityCountKey = "ENMITY_COUNT"
	EnmityMapKey = "ENMITYMAP"
	GameMainKey = "GAMEMAIN"
	HotBarKey = "HOTBAR"
	InventoryKey = "INVENTORY"
	MapInformationKey = "MAPINFO"
	PartyCountKey = "PARTYCOUNT"
	PartyMapKey = "PARTYMAP"
	PlayerInformationKey = "PLAYERINFO"
	RecastKey = "RECAST"
	TargetKey = "TARGET"
	ZoneInformationKey = "ZONEINFO"
)

type Signature struct {
	regex string // to-do: regex type?
	ASMSignature bool
	Key string
	Value string
	Offset func()int

}
