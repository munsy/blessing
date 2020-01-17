package main

import(
	"github.com/orcaman/concurrent-map"
)

type Localization struct {
	Chinese string
	English string
	French string
	German string
	Japanese string
	Korean string
}

func (l Localization) Matches(s string) bool {
	return l.Chinese == s || l.English == s || l.French == s || l.German == s || l.Japanese == s || l.Korean == s 
}

type ActionItem struct {
	ActionCategory int
	ActionCombo int
	ActionData int
	ActionProcStatus int
	ActionTimelineHit int
	ActionTimelineUse int
	CanTargetDead int
	CanTargetFriendly int
	CanTargetHostile int
	CanTargetParty int
	CanTargetSelf int
	CastRange int
	CastTime float64
	ClassJob int
	ClassJobCategory int
	Cost int
	CostCP int
	CostHP interface{}
	CostMP interface{}
	CostTP interface{}
	Duration float64
	EffectRange int
	HasNoInitialResult bool
	Icon int
	IsDamageOverTime bool
	IsHealingOverTime bool
	IsInGame int
	IsPvp int
	IsTargetArea int
	IsTrait int
	Level int
	Name Localization
	OverTimePotency int
	Potency int
	RecastTime float64
	SpellGroup int
	StatusGainSelf int
	StatusRequired int
	Type int
}

type ActionLookup struct {
	Actions cmap.ConcurrentMap
	DefaultActionInfo struct {
		Name Localization
		Loading bool
	}
}

func (a *ActionLookup) DamageOverTimeActions(patchVersion string) []ActionItem {
	if patchVersion == "" {
		patchVersion = "latest"
	}

    results := make([]ActionItem, 0)

    if a.DefaultActionInfo.Loading {
        return results
    }

    if !a.Actions.IsEmpty() {
    	for _, v := range(a.Actions.Items()) {
    		if item, ok := v.(ActionItem); ok && item.IsDamageOverTime {
    			results = append(results, item)
    		}
    	}
    }

    a.Resolve(patchVersion)
    return results
}

func (a *ActionLookup) GetActionInfo(name, patchVersion string) ActionItem {
	if patchVersion == "" {
		patchVersion = "latest"
	}

    if a.DefaultActionInfo.Loading {
        return a.DefaultActionInfo
    }

	if !a.Actions.IsEmpty() {
	   	for _, v := range(a.Actions.Items()) {
			if item, ok := v.(ActionItem); ok && item.Name.Matches(name) {
				return item.Name
			}
		}
	}

   a.Resolve(patchVersion)
   return a.DefaultActionInfo
}

func (a *ActionLookup) GetActionInfoByID(id uint, patchVersion string) ActionItem {
	if patchVersion == "" {
		patchVersion = "latest"
	}

    if a.DefaultActionInfo.Loading {
        return a.DefaultActionInfo
    }

    if !a.Actions.IsEmpty() {
    	if a.Actions.Has(string(id)) {
    		action, ok := a.Actions.Get(string(id))
    		if ok {
    			return action
    		}
    	}
    	return a.DefaultActionInfo
	}

	a.Resolve(patchVersion)
	return DefaultActionInfo
}

func (a *ActionLookup) HealingOverTimeActions(patchVersion string) []ActionItem {
	if patchVersion == "" {
		patchVersion = "latest"
	}

    results := make([]ActionItem, 0)

    if a.DefaultActionInfo.Loading {
        return results
    }

    if !a.Actions.IsEmpty() {
    	for _, v := range(a.Actions.Items()) {
    		if item, ok := v.(ActionItem); ok && item.IsHealingOverTime {
    			results = append(results, item)
    		}
    	}
	    return results
	}

	a.Resolve(patchVersion)
	return results
}

func (a *ActionLookup) Resolve(patchVersion string) {
    if patchVersion == "" {
		patchVersion = "latest"
	}

	if a.DefaultActionInfo.Loading {
        return
    }

    a.DefaultActionInfo.Loading = true
    APIHelper.GetActions(a.Actions, patchVersion)
    a.DefaultActionInfo.Loading = false
}