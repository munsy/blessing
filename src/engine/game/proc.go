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
	if p.proc == nil {
		return -1
	}
	return int(p.process.Pid)
}

func (p *ProcessModel) ProcessName() string {
	if p.proc == nil {
		return ""
	}
	name, err := p.proc.Name()

	if nil != err {
		panic(err)
	}
	return name
}
