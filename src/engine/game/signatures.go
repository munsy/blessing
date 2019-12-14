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
	SigScanAddress uintptr
}

func IntPtr(signature Signature) uintptr {
	return signature.GetAddress()
}

func NewSignature() *Signature {
	return &Signature{
		regex: nil,
		Key: "",
		Value: "",
		SigScanAddress: nil,
		ASMSignature: false,
	}
}

func (s *Signature) Offset() int {
	var baseAddress uintptr
	IsASMSignature := false

	if s.SigScanAddress != nil {
		baseAddress = s.SigScanAddress
		if s.ASMSignature {
			IsASMSignature = true
		}
	} else {
		
	}
}

func (s *Signature) Offset() int {
	return len(s.Value) / 2
}

