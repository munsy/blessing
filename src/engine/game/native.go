package main

import "syscall"

const kernel32 = syscall.MustLoadDLL("kernel32.dll")

const OpenProcess = kernel32.MustFindProc("OpenProcess")
const ReadProcessMemory = kernel32.MustFindProc("ReadProcessMemory")
