package main

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

type ChatLogPointers struct {
	LogEnd int
	LogNext int
	LogStart int
	OffsetArrayEnd int
	OffsetArrayPos int
	OffsetArrayStart int
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
