package main

import(
	"fmt"
	"strings"
)

type MEMORY_BASIC_INFORMATION struct {
    BaseAddress uintptr
    AllocationBase uintptr
    AllocationProtect uint
    RegionSize uintptr
    State uint
    Protect uint
    Type uint
}

func (m MEMORY_BASIC_INFORMATION) String() string {
    var sb strings.Builder

    sb.WriteString(fmt.Sprintf("BaseAddress:%v\r\n", m.BaseAddress))
    sb.WriteString(fmt.Sprintf("AllocationBase:%v\r\n", m.AllocationBase))
    sb.WriteString(fmt.Sprintf("AllocationProtect:%v\r\n", m.AllocationProtect))
    sb.WriteString(fmt.Sprintf("RegionSize:%v\r\n", m.RegionSize))
    sb.WriteString(fmt.Sprintf("State:%v\r\n", m.State))
    sb.WriteString(fmt.Sprintf("Protect:%v\r\n", m.Protect))
    sb.WriteString(fmt.Sprintf("Type:%v\r\n", m.Type))

    return sb.String();
}