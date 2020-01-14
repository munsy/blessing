package main

import "syscall"

var (
	kernel32 = syscall.MustLoadDLL("kernel32.dll")
	OpenProcess = kernel32.MustFindProc("OpenProcess")
	ReadProcessMemory = kernel32.MustFindProc("ReadProcessMemory")

	ProcessHandle uintptr 
)

const PROCESS_ALL_ACCESS = 0x1F0FFF

// Start of unsafe methods

func OpenProcessHandle(processId int) uintptr {
	//kernel32 := syscall.MustLoadDLL("kernel32.dll")
	proc := kernel32.MustFindProc("OpenProcess")
	handle, _, _ := proc.Call(ptr(PROCESS_ALL_ACCESS), ptr(true), ptr(processId))
	return uintptr(handle)
}

func CloseHandle(handle uintptr) {
	proc := kernel32.MustFindProc("CloseHandle")
	proc.Call(handle)
}