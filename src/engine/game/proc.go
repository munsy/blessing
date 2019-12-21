package main

import (
	"os"
)

type ProcessModel struct {
	process *os.Process
	win64 bool
}

func (p *ProcessModel) IsWin64() bool {
	return p.win64
}

func (p *ProcessModel) ProcessID() int {
	if p.process == nil {
		return -1
	}
	return int(p.process.Pid)
}

func (p *ProcessModel) ProcessName() string {
	if p.process == nil {
		return ""
	}
	return p.getProcessNameById()
}

func (p *ProcessModel) getProcessNameById() string {
	procs, err := processes()
	if err != nil {
		panic(err)
	}

	return findProcessByID(procs, p.ProcessID()).Exe
}

