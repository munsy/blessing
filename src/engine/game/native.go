package main

import "syscall"

var (
	kernel32 = syscall.MustLoadDLL("kernel32.dll")
	OpenProcess = kernel32.MustFindProc("OpenProcess")
	ReadProcessMemory = kernel32.MustFindProc("ReadProcessMemory")
)
