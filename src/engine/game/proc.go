package main

import (
	"os"

	stats "github.com/guillermo/go.procstat"
)

type ProcessModel struct {
	proc *os.Process
	stat *stats.Stat
	win64 bool
}


func (p *ProcessModel) IsWin64() bool {
	return p.win64
}

func (p *ProcessModel) ProcessID() int {
	if p.proc == nil {
		return -1
	}
	return int(p.proc.Pid)
}

func (p *ProcessModel) Process() *stats.Stat {
	if p.stat == nil {
		p.stat = &stats.Stat{Pid: p.proc.Pid}
	}
	return p.stat
}

func (p *ProcessModel) ProcessName() string {
	if p.proc == nil {
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

