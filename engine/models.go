package main

import (
	"time"
	
	"github.com/orcaman/concurrent-map"
)

const Unknown byte = 0x0

type ContainerType byte

const(
	HOTBAR_1 ContainerType = iota
	HOTBAR_2
	HOTBAR_3
	HOTBAR_4
	HOTBAR_5
	HOTBAR_6
	HOTBAR_7
	HOTBAR_8
	HOTBAR_9
	HOTBAR_10
	CROSS_HOTBAR_1
	CROSS_HOTBAR_2
	CROSS_HOTBAR_3
	CROSS_HOTBAR_4
	CROSS_HOTBAR_5
	CROSS_HOTBAR_6
	CROSS_HOTBAR_7
	CROSS_HOTBAR_8
	PETBAR
	CROSS_PETBAR
)

type ActionStatus byte

const (
	StatusIdle = 0x01
	StatusDead = 0x02
	StatusSitting = 0x03
	StatusMounted = 0x04
	StatusCrafting = 0x05
	StatusGathering = 0x06
	StatusMelding = 0x07
	StatusSMachine = 0x08
)

type Icon byte

const (
	None Icon = 0x0
	Yoshida = 0x1
	GM = 0x2
	SGM = 0x3
	Clover = 0x4
	DC = 0x5
	Smiley = 0x6
	RedCross = 0x9
	GreyDC = 0xA
	Processing = 0xB
	Busy = 0xC
	Duty = 0xD
	ProcessingYellow = 0xE
	ProcessingGrey = 0xF
	Cutscene = 0x10
	Away = 0x12
	SittingIcon = 0x13
	WrenchYellow = 0x14
	Wrench = 0x15
	Dice = 0x16
	ProcessingGreen = 0x17
	Sword = 0x18
	AllianceLeader = 0x1A
	AllianceBlueLeader = 0x1B
	AllianceBlue = 0x1C
	PartyLeader = 0x1D
	PartyMemberIcon = 0x1E
	DutyFinder = 0x18
	Recruiting = 0x19
	Sprout = 0x1F
	Gil = 0x20
)

type Job byte

const(
	GLD = 0x1
	PGL = 0x2
	MRD = 0x3
	LNC = 0x4
	ARC = 0x5
	CNJ = 0x6
	THM = 0x7
	CPT = 0x8
	BSM = 0x9
	ARM = 0xA
	GSM = 0xB
	LTW = 0xC
	WVR = 0xD
	ALC = 0xE
	CUL = 0xF
	MIN = 0x10
	BTN = 0x11
	FSH = 0x12
	PLD = 0x13
	MNK = 0x14
	WAR = 0x15
	DRG = 0x16
	BRD = 0x17
	WHM = 0x18
	BLM = 0x19
	ACN = 0x1A
	SMN = 0x1B
	SCH = 0x1C
	ROG = 0x1D
	NIN = 0x1E
	MCH = 0x1F
	DRK = 0x20
	AST = 0x21
	SAM = 0x22
	RDM = 0x23
)

type Sex byte

const (
	Male Sex = 0x0
	Female = 0x1
)

type Status byte

const (
	Claimed = 0x01
    Idle = 0x02
    Crafting = 0x05
    UnknownUnSheathed = 0x06
    UnknownSheathed = 0x07
	
)

type TargetType byte

const (
	Own = 0x1
	True = 0x2
	False = 0x4
)

type GetType byte

const (
	PC = 0x01
	Monster = 0x02
	NPC = 0x03
	TreasureCoffer = 0x04
	Aetheryte = 0x05
	Gather = 0x06
	EObj = 0x07
	Mount = 0x08
	Minion = 0x09
)

type Structure struct {
    ActorItem ActorItem
    ChatLogPointers ChatLogPointers
    CurrentPlayer CurrentPlayer
    EnmityItem EnmityItem
    HotBarItem HotBarItem
    InventoryContainer InventoryContainer
    InventoryItem InventoryItem
    PartyMember PartyMember
    RecastItem RecastItem
    StatusItem StatusItem
    TargetInfo TargetInfo
}

type ActionItem struct {
	ActionKey string
	Amount int
	Category int
	CoolDownPercent int
	Icon int
	ID int
	InRange bool
	IsAvailable bool
	IsKeyBindAssigned bool
	IsProcOrCombo bool
	KeyBinds string
	Modifiers []string
	Name string
	RemainingCost int
	Slot int
	Type int
}

type ActionContainer struct {
	ActionItems []ActionItem
	ContainerType ContainerType
}

type ActionResult struct {
	ActionContainers []ActionContainer
}

type ActorItem struct {
	ActionStatus int
	AgroFlags int
	CastingID int
	CastingProgress int
	CastingTargetID int
	CastingTime int
	ClaimedByID int
	CombatFlags int
	CPCurrent int
	CPMax int
	DefaultBaseOffset int
	DefaultStatOffset int
	DefaultStatusEffectOffset int
	DifficultyRank int
	Distance int
	EntityCount int
	Fate int
	GatheringInvisible int
	GatheringStatus int
	GPCurrent int
	GPMax int
	GrandCompany int
	GrandCompanyRank int
	Heading int
	HitBoxRadius int
	HPCurrent int
	HPMax int
	Icon int
	ID int
	IsCasting1 int
	IsCasting2 int
	IsGM int
	Job int
	Level int
	ModelID int
	MPCurrent int
	MPMax int
	Name int
	NPCID1 int
	NPCID2 int
	OwnerID int
	SourceSize int
	Status int
	TargetFlags int
	TargetID int
	TargetType int
	Title int
	TPCurrent int
	Type int
	X int
	Y int
	Z int
}

type Coordinate struct {
	X float64
	Y float64
}

type ActorItemBase struct {
	m_name string
	Coordinate Coordinate
	CPCurrent int16
	CPMax int16
	HPCurrent int
	HPMax int
	ID uint
	Job Job
	JobID byte
	Level byte
	MPCurrent int
	MPMax int
	StatusItems []StatusItem
	TPCurrent int
	TPMax int
	UUID string
	X float64
	Y float64
	Z float64
}

type ActorResult struct {
	CurrentMonsters cmap.ConcurrentMap
    CurrentNPCs cmap.ConcurrentMap
    CurrentPCs cmap.ConcurrentMap
    NewMonsters cmap.ConcurrentMap
    NewNPCs cmap.ConcurrentMap
    NewPCs cmap.ConcurrentMap
    RemovedMonsters cmap.ConcurrentMap
    RemovedNPCs cmap.ConcurrentMap
    RemovedPCs cmap.ConcurrentMap
}

type ChatLogPointers struct {
	LineCount uint
	LogEnd int
	LogNext int
	LogStart int
	OffsetArrayEnd int
	OffsetArrayPos int
	OffsetArrayStart int
}

type ChatLogItem struct {
	Bytes []byte
	Code string
	Combined string
	JP bool
	Line string
	Raw string
	TimeStamp time.Time
}

type ChatLogResult struct {
	ChatLogItems []ChatLogItem
	PreviousArrayIndex int
	PreviousOffset int
}

type CurrentPlayer struct {
	ACN int
	ACN_CurrentEXP int
	ALC int
	ALC_CurrentEXP int
	ARC int
	ARC_CurrentEXP int
	ARM int
	ARM_CurrentEXP int
	AST int
	AST_CurrentEXP int
	AttackMagicPotency int
	AttackPower int
	BaseDexterity int
	BaseIntelligence int
	BaseMind int
	BasePiety int
	BaseStrength int
	BaseVitality int
	BluntResistance int
	BSM int
	BSM_CurrentEXP int
	BTN int
	BTN_CurrentEXP int
	CNJ int
	CNJ_CurrentEXP int
	Control int
	CPMax int
	CPT int
	CPT_CurrentEXP int
	Craftmanship int
	CriticalHitRate int
	CUL int
	CUL_CurrentEXP int
	Defense int
	Determination int
	Dexterity int
	DirectHit int
	DRK int
	DRK_CurrentEXP int
	EarthResistance int
	FireResistance int
	FSH int
	FSH_CurrentEXP int
	Gathering int
	GLD int
	GLD_CurrentEXP int
	GPMax int
	GSM int
	GSM_CurrentEXP int
	HealingMagicPotency int
	HPMax int
	IceResistance int
	Intelligence int
	JobID int
	LightningResistance int
	LNC int
	LNC_CurrentEXP int
	LTW int
	LTW_CurrentEXP int
	MagicDefense int
	MCH int
	MCH_CurrentEXP int
	MIN int
	MIN_CurrentEXP int
	Mind int
	MPMax int
	MRD int
	MRD_CurrentEXP int
	Perception int
	PGL int
	PGL_CurrentEXP int
	PiercingResistance int
	Piety int
	RDM int
	RDM_CurrentEXP int
	ROG int
	ROG_CurrentEXP int
	SAM int
	SAM_CurrentEXP int
	SkillSpeed int
	SlashingResistance int
	SourceSize int
	SpellSpeed int
	Strength int
	Tenacity int
	THM int
	THM_CurrentEXP int
	TPMax int
	Vitality int
	WaterResistance int
	WindResistance int
	WVR int
	WVR_CurrentEXP int
}

type CurrentPlayerResult struct {
	CurrentPlayer *CurrentPlayer
}

type EnmityItem struct {
	Enmity int
	ID int
	Name int
	SourceSize int
}

type HotBarItem struct {
	ContainerSize int
	ID int
	ItemSize int
	KeyBinds int
	Name int
}

type InventoryContainer struct {
	Amount int
}

type InventoryItem struct {
	Amount int
	Durability int
	GlamourID int
	ID int
	IsHQ int
	SB int
	Slot int
}

type InventoryResult struct {
	InventoryContainers []InventoryContainer
}

type PartyMember struct {
	DefaultStatusEffectOffset int
	HPCurrent int
	HPMax int
	ID int
	Job int
	Level int
	MPCurrent int
	MPMax int
	Name int
	SourceSize int
	X int
	Y int
	Z int
}

type PartyResult struct {
	NewPartyMembers cmap.ConcurrentMap
	PartyMembers cmap.ConcurrentMap
	RemovedPartyMembers cmap.ConcurrentMap
}

type RecastItem struct {
	ActionProc int
	Amount int
	Category int
	ContainerSize int
	CoolDownPercent int
	Icon int
	ID int
	InRange int
	IsAvailable int
	ItemSize int
	RemainingCost int
	Type int
}

type StatusItem struct {
	CasterID int
	Duration int
	Stacks int
	StatusID int
}

type TargetInfo struct {
	Current int
	CurrentID int
	Focus int
	MouseOver int
	Previous int
	Size int
	SourceSize int
}

type TargetResult struct {
	TargetInfo TargetInfo
	TargetsFound bool
}
