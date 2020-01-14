package main

import(
	"unsafe"
)

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
	SigScanAddress unsafe.Pointer
}

func IntPtr(signature Signature) uintptr {
	return signature.GetAddress()
}

func NewSignature() *Signature {
	return &Signature{
		regex: "",
		Key: "",
		Value: "",
		SigScanAddress: unsafe.Pointer(uintptr(0)),
		ASMSignature: false,
	}
}

func (s *Signature) SomeFunc() (uintptr, bool) {
	var baseAddress uintptr
	IsASMSignature := false

	if s.SigScanAddress != nil {
		baseAddress = uintptr(s.SigScanAddress)
		if s.ASMSignature {
			IsASMSignature = true
		}
	} else {
		baseAddress = uintptr(0)
	}
	return baseAddress, IsASMSignature
}

func (s *Signature) Offset() int {
	return len(s.Value) / 2
}

func (s *Signature) GetAddress() uintptr {
	return uintptr(s.SigScanAddress)
}
