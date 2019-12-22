package main

import(
    "encoding/binary"
    "errors"
    "fmt"
    "strings"
    "unsafe"
)

const UINTPTR_SIZE = unsafe.Sizeof(uintptr(0))

type Block struct {
    Length int
    Start int
}

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

type MemoryHandler struct {
    IsNewInstance bool
    IsAttached bool
    ScanCount int
    GameLanguage string
    ProcessHandle uintptr
    ProcessModel ProcessModel
    UseLocalCache bool
    
    Structures []Structure
    ExceptionEvent []ExceptionEvent
    SignaturesFoundEvent []SignaturesFoundEvent

    instance *MemoryHandler
}

func (m *MemoryHandler) GetInstance() *MemoryHandler {
    return m.instance
}

func (m *MemoryHandler) Peek(address uintptr, buffer []byte) ([]byte, bool) {
    a := uintptr(m.instance.ProcessHandle)
    b := uintptr(address)
    c := uintptr(unsafe.Pointer(&buffer))
    d := uintptr(len(buffer))
    var e uintptr
    ReadProcessMemory.Call(a, b, c, d, e)
    
    return (*[unsafe.Sizeof(uintptr(0))]byte)(unsafe.Pointer(c))[:], (e > 0)
}

func (m *MemoryHandler) GetByte(address uintptr, offset int) byte {
    data := make([]byte, 1)
    // var addr64 = (*uint64)(unsafe.Pointer(uintptr(address) + offset))
    var addr64 = *(*int)(unsafe.Pointer(uintptr(address) + uintptr(offset)))
    if data, ok := m.Peek(uintptr(addr64), data); ok {
        return data[0] //, data)
    }
    panic(errors.New("peek failure"))
}

func (m *MemoryHandler) GetByteArray(address uintptr, length int) []byte {
    data := make([]byte, length)
    if data, ok := m.Peek(address, data); ok {
        return data
    }
    panic(errors.New("peek failure"))
}

func (m *MemoryHandler) GetInt16(address uintptr, offset int) int16 {
    data := make([]byte, 2)
    if data, ok := m.Peek(address, data); ok {
        return int16(binary.BigEndian.Uint16(data))
    }
    panic(errors.New("peek failure"))
}

func (m *MemoryHandler) GetInt32(address uintptr, offset int) int32 {
    data := make([]byte, 4)
    if data, ok := m.Peek(address, data); ok {
        return int32(binary.BigEndian.Uint32(data))
    }
    panic(errors.New("peek failure"))
}

func (m *MemoryHandler) GetInt64(address uintptr, offset int) int64 {
    data := make([]byte, 8)
    if data, ok := m.Peek(address, data); ok {
        return int64(binary.BigEndian.Uint64(data))
    }
    panic(errors.New("peek failure"))
}

func (m *MemoryHandler) GetPlatformInt(address uintptr, offset int) int {
    var data []byte 
    if m.ProcessModel.IsWin64() {
        data = make([]byte, 8)
    } else {
        data = make([]byte, 4)
    }
    if data, ok := m.Peek(address, data); ok {
        //return int16(binary.BigEndian.Uint16(data))
        if m.ProcessModel.IsWin64() {
            return int(binary.BigEndian.Uint64(data))
        }
        return int(binary.BigEndian.Uint32(data))
    }
    panic(errors.New("peek failure"))
}

func (m *MemoryHandler) GetPlatformIntFromBytes(source []byte/*, index int*/) int {
    if(m.ProcessModel.IsWin64()) {
        return int(binary.BigEndian.Uint64(source))
    }
    return int(binary.BigEndian.Uint32(source))
}

func (m *MemoryHandler) GetPlatformUInt(address uintptr, offset int) uint {
    var data []byte 
    if m.ProcessModel.IsWin64() {
        data = make([]byte, 8)
    } else {
        data = make([]byte, 4)
    }
    if data, ok := m.Peek(address, data); ok {
        //return int16(binary.BigEndian.Uint16(data))
        if m.ProcessModel.IsWin64() {
            return uint(binary.BigEndian.Uint64(data))
        }
        return uint(binary.BigEndian.Uint32(data))
    }
    panic(errors.New("peek failure"))
}

func (m *MemoryHandler) GetPlatformUIntFromBytes(source []byte/*, index int*/) uint {
    if(m.ProcessModel.IsWin64()) {
        return uint(binary.BigEndian.Uint64(source))
    }
    return uint(binary.BigEndian.Uint32(source))
}

func (m *MemoryHandler) GetStaticAddress(offset int) uintptr {
    return uintptr(m.instance.ProcessModel.Process().Startstack + uint64(offset))
}

func (m *MemoryHandler) GetString(address uintptr, offset, size int) string {
    bytes := make([]byte, size)
    realSize := 0
    data, ok := m.Peek(uintptr(int(address) + offset), bytes)
    if ok {
        for i := 0; i < size; i++ {
            if data[i] != 0 {
                continue
            }
            realSize = i
            break
        }
    }
    return string(data[realSize:size])
}

func (m *MemoryHandler) GetStructure(address uintptr, offset int) {
/*
    var lpNumberOfBytesRead uintptr
    buffer := Marshal.AllocCoTaskMem(Marshal.SizeOf(typeof(T)));
    UnsafeNativeMethods.ReadProcessMemory(this.ProcessModel.Process.Handle, address + offset, buffer, new IntPtr(Marshal.SizeOf(typeof(T))), out lpNumberOfBytesRead);
    var retValue = (T) Marshal.PtrToStructure(buffer, typeof(T));
    Marshal.FreeCoTaskMem(buffer);
    return retValue;
*/
}


func (m *MemoryHandler) GetUInt16(address uintptr, offset int) uint16 {
    data := make([]byte, 2)
    if data, ok := m.Peek(address, data); ok {
        return binary.BigEndian.Uint16(data)
    }
    panic(errors.New("peek failure"))
}

func (m *MemoryHandler) GetUInt32(address uintptr, offset int) uint32 {
    data := make([]byte, 4)
    if data, ok := m.Peek(address, data); ok {
        return binary.BigEndian.Uint32(data)
    }
    panic(errors.New("peek failure"))
}

func (m *MemoryHandler) GetUInt64(address uintptr, offset int) uint64 {
    data := make([]byte, 8)
    if data, ok := m.Peek(address, data); ok {
        return binary.BigEndian.Uint64(data)
    }
    panic(errors.New("peek failure"))
}

func (m *MemoryHandler) ReadPointer(address uintptr, offset int) uintptr {
    if m.ProcessModel.IsWin64() {
        win64 := make([]byte, 8)
        if data, ok := m.Peek(uintptr(int(address) + offset), win64); ok {
            return uintptr(binary.BigEndian.Uint64(data))
        }
    }
    win32 := make([]byte, 4)
    if data, ok := m.Peek(uintptr(int(address) + offset), win32); ok {
        return uintptr(binary.BigEndian.Uint32(data))
    }
    return uintptr(0)
}

func (m *MemoryHandler) ResolvePointerPath(path []int, baseAddress uintptr, IsASMSignature bool) uintptr {
    nextAddress := baseAddress
    for i := 0; i < len(path); i++ {
        baseAddress = uintptr(int(nextAddress) + path[i])
        if baseAddress == uintptr(0) {
            return uintptr(0)
        }
        if IsASMSignature {
            nextAddress = baseAddress + m.GetInstance().GetInt32(baseAddress, 0) + 4
            IsASMSignature = false
        } else {
            nextAddress = m.GetInstance().ReadPointer(baseAddress, 0)
        }
    }
    return baseAddress
}

/*
public void SetProcess(ProcessModel processModel, string gameLanguage = "English", string patchVersion = "latest", bool useLocalCache = true, bool scanAllMemoryRegions = false) {
    this.ProcessModel = processModel;
    this.GameLanguage = gameLanguage;
    this.UseLocalCache = useLocalCache;

    this.UnsetProcess();

    try {
        this.ProcessHandle = UnsafeNativeMethods.OpenProcess(UnsafeNativeMethods.ProcessAccessFlags.PROCESS_VM_ALL, false, (uint) this.ProcessModel.ProcessID);
    }
    catch (Exception) {
        this.ProcessHandle = processModel.Process.Handle;
    }
    finally {
        Constants.ProcessHandle = this.ProcessHandle;
        this.IsAttached = true;
    }

    if (this.IsNewInstance) {
        this.IsNewInstance = false;

        ActionLookup.Resolve();
        StatusEffectLookup.Resolve();
        ZoneLookup.Resolve();

        this.ResolveMemoryStructures(processModel, patchVersion);
    }

    this.AttachmentWorker = new AttachmentWorker();
    this.AttachmentWorker.StartScanning(processModel);

    this.SystemModules.Clear();
    this.GetProcessModules();

    Scanner.Instance.Locations.Clear();
    Scanner.Instance.LoadOffsets(Signatures.Resolve(processModel, patchVersion), scanAllMemoryRegions);
}

public IntPtr ResolvePointerPath(IEnumerable<long> path, IntPtr baseAddress, bool IsASMSignature = false) {
    IntPtr nextAddress = baseAddress;
    foreach (var offset in path) {
        try {
            baseAddress = new IntPtr(nextAddress.ToInt64() + offset);
            if (baseAddress == IntPtr.Zero) {
                return IntPtr.Zero;
            }

            if (IsASMSignature) {
                nextAddress = baseAddress + Instance.GetInt32(new IntPtr(baseAddress.ToInt64())) + 4;
                IsASMSignature = false;
            }
            else {
                nextAddress = Instance.ReadPointer(baseAddress);
            }
        }
        catch {
            return IntPtr.Zero;
        }
    }

    return baseAddress;
}

public IntPtr ReadPointer(IntPtr address, long offset = 0) {
    if (this.ProcessModel.IsWin64) {
        byte[] win64 = new byte[8];
        this.Peek(new IntPtr(address.ToInt64() + offset), win64);
        return new IntPtr(BitConverter.TryToInt64(win64, 0));
    }

    byte[] win32 = new byte[4];
    this.Peek(new IntPtr(address.ToInt64() + offset), win32);
    return IntPtr.Add(IntPtr.Zero, BitConverter.TryToInt32(win32, 0));
}

public T GetStructure<T>(IntPtr address, int offset = 0) {
    IntPtr lpNumberOfBytesRead;
    IntPtr buffer = Marshal.AllocCoTaskMem(Marshal.SizeOf(typeof(T)));
    UnsafeNativeMethods.ReadProcessMemory(this.ProcessModel.Process.Handle, address + offset, buffer, new IntPtr(Marshal.SizeOf(typeof(T))), out lpNumberOfBytesRead);
    var retValue = (T) Marshal.PtrToStructure(buffer, typeof(T));
    Marshal.FreeCoTaskMem(buffer);
    return retValue;
}

// procReadProcessMemory.Call(uintptr(handle), uintptr(START_LOOP_BASE_ADDRESS), uintptr(unsafe.Pointer(&data[0])), 2, uintptr(unsafe.Pointer(&length)))

public bool Peek(IntPtr address, byte[] buffer) {
    IntPtr lpNumberOfBytesRead;
    return UnsafeNativeMethods.ReadProcessMemory(Instance.ProcessHandle, address, buffer, new IntPtr(buffer.Length), out lpNumberOfBytesRead);
}

    public class MemoryHandler {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();

        private static Lazy<MemoryHandler> _instance = new Lazy<MemoryHandler>(() => new MemoryHandler());

        private AttachmentWorker AttachmentWorker;

        private bool IsNewInstance = true;

        ~MemoryHandler() {
            this.UnsetProcess();
        }

        public event EventHandler<ExceptionEvent> ExceptionEvent = (sender, args) => { };

        public event EventHandler<SignaturesFoundEvent> SignaturesFoundEvent = (sender, args) => { };

        public static MemoryHandler Instance {
            get {
                return _instance.Value;
            }
        }

        public bool IsAttached { get; set; }

        public long ScanCount { get; set; }

        internal string GameLanguage { get; set; }

        internal IntPtr ProcessHandle { get; set; }

        internal ProcessModel ProcessModel { get; set; }

        internal StructuresContainer Structures { get; set; }

        internal bool UseLocalCache { get; set; }

        private List<ProcessModule> SystemModules { get; set; } = new List<ProcessModule>();

        public byte GetByte(IntPtr address, long offset = 0) {
            byte[] data = new byte[1];
            this.Peek(new IntPtr(address.ToInt64() + offset), data);
            return data[0];
        }

        public byte[] GetByteArray(IntPtr address, int length) {
            byte[] data = new byte[length];
            this.Peek(address, data);
            return data;
        }

        public short GetInt16(IntPtr address, long offset = 0) {
            byte[] value = new byte[2];
            this.Peek(new IntPtr(address.ToInt64() + offset), value);
            return BitConverter.TryToInt16(value, 0);
        }

        public int GetInt32(IntPtr address, long offset = 0) {
            byte[] value = new byte[4];
            this.Peek(new IntPtr(address.ToInt64() + offset), value);
            return BitConverter.TryToInt32(value, 0);
        }

        public long GetInt64(IntPtr address, long offset = 0) {
            byte[] value = new byte[8];
            this.Peek(new IntPtr(address.ToInt64() + offset), value);
            return BitConverter.TryToInt64(value, 0);
        }

        public long GetPlatformInt(IntPtr address, long offset = 0) {
            byte[] bytes = new byte[this.ProcessModel.IsWin64
                                        ? 8
                                        : 4];
            this.Peek(new IntPtr(address.ToInt64() + offset), bytes);
            return this.GetPlatformIntFromBytes(bytes);
        }

        public long GetPlatformIntFromBytes(byte[] source, int index = 0) {
            if (this.ProcessModel.IsWin64) {
                return BitConverter.TryToInt64(source, index);
            }

            return BitConverter.TryToInt32(source, index);
        }

        public long GetPlatformUInt(IntPtr address, long offset = 0) {
            byte[] bytes = new byte[this.ProcessModel.IsWin64
                                        ? 8
                                        : 4];
            this.Peek(new IntPtr(address.ToInt64() + offset), bytes);
            return this.GetPlatformUIntFromBytes(bytes);
        }

        public long GetPlatformUIntFromBytes(byte[] source, int index = 0) {
            if (this.ProcessModel.IsWin64) {
                return (long) BitConverter.TryToUInt64(source, index);
            }

            return BitConverter.TryToUInt32(source, index);
        }

        public IntPtr GetStaticAddress(long offset) {
            return new IntPtr(Instance.ProcessModel.Process.MainModule.BaseAddress.ToInt64() + offset);
        }

        public string GetString(IntPtr address, long offset = 0, int size = 256) {
            byte[] bytes = new byte[size];
            this.Peek(new IntPtr(address.ToInt64() + offset), bytes);
            var realSize = 0;
            for (var i = 0; i < size; i++) {
                if (bytes[i] != 0) {
                    continue;
                }

                realSize = i;
                break;
            }

            Array.Resize(ref bytes, realSize);
            return Encoding.UTF8.GetString(bytes);
        }

        public string GetStringFromBytes(byte[] source, int offset = 0, int size = 256) {
            var safeSize = source.Length - offset;
            if (safeSize < size) {
                size = safeSize;
            }

            byte[] bytes = new byte[size];
            Array.Copy(source, offset, bytes, 0, size);
            var realSize = 0;
            for (var i = 0; i < size; i++) {
                if (bytes[i] != 0) {
                    continue;
                }

                realSize = i;
                break;
            }

            Array.Resize(ref bytes, realSize);
            return Encoding.UTF8.GetString(bytes);
        }

        public T GetStructure<T>(IntPtr address, int offset = 0) {
            IntPtr lpNumberOfBytesRead;
            IntPtr buffer = Marshal.AllocCoTaskMem(Marshal.SizeOf(typeof(T)));
            UnsafeNativeMethods.ReadProcessMemory(this.ProcessModel.Process.Handle, address + offset, buffer, new IntPtr(Marshal.SizeOf(typeof(T))), out lpNumberOfBytesRead);
            var retValue = (T) Marshal.PtrToStructure(buffer, typeof(T));
            Marshal.FreeCoTaskMem(buffer);
            return retValue;
        }

        public ushort GetUInt16(IntPtr address, long offset = 0) {
            byte[] value = new byte[4];
            this.Peek(new IntPtr(address.ToInt64() + offset), value);
            return BitConverter.TryToUInt16(value, 0);
        }

        public uint GetUInt32(IntPtr address, long offset = 0) {
            byte[] value = new byte[4];
            this.Peek(new IntPtr(address.ToInt64() + offset), value);
            return BitConverter.TryToUInt32(value, 0);
        }

        public ulong GetUInt64(IntPtr address, long offset = 0) {
            byte[] value = new byte[8];
            this.Peek(new IntPtr(address.ToInt64() + offset), value);
            return BitConverter.TryToUInt32(value, 0);
        }

        public bool Peek(IntPtr address, byte[] buffer) {
            IntPtr lpNumberOfBytesRead;
            return UnsafeNativeMethods.ReadProcessMemory(Instance.ProcessHandle, address, buffer, new IntPtr(buffer.Length), out lpNumberOfBytesRead);
        }

        public IntPtr ReadPointer(IntPtr address, long offset = 0) {
            if (this.ProcessModel.IsWin64) {
                byte[] win64 = new byte[8];
                this.Peek(new IntPtr(address.ToInt64() + offset), win64);
                return new IntPtr(BitConverter.TryToInt64(win64, 0));
            }

            byte[] win32 = new byte[4];
            this.Peek(new IntPtr(address.ToInt64() + offset), win32);
            return IntPtr.Add(IntPtr.Zero, BitConverter.TryToInt32(win32, 0));
        }

        public IntPtr ResolvePointerPath(IEnumerable<long> path, IntPtr baseAddress, bool IsASMSignature = false) {
            IntPtr nextAddress = baseAddress;
            foreach (var offset in path) {
                try {
                    baseAddress = new IntPtr(nextAddress.ToInt64() + offset);
                    if (baseAddress == IntPtr.Zero) {
                        return IntPtr.Zero;
                    }

                    if (IsASMSignature) {
                        nextAddress = baseAddress + Instance.GetInt32(new IntPtr(baseAddress.ToInt64())) + 4;
                        IsASMSignature = false;
                    }
                    else {
                        nextAddress = Instance.ReadPointer(baseAddress);
                    }
                }
                catch {
                    return IntPtr.Zero;
                }
            }

            return baseAddress;
        }

        public void SetProcess(ProcessModel processModel, string gameLanguage = "English", string patchVersion = "latest", bool useLocalCache = true, bool scanAllMemoryRegions = false) {
            this.ProcessModel = processModel;
            this.GameLanguage = gameLanguage;
            this.UseLocalCache = useLocalCache;

            this.UnsetProcess();

            try {
                this.ProcessHandle = UnsafeNativeMethods.OpenProcess(UnsafeNativeMethods.ProcessAccessFlags.PROCESS_VM_ALL, false, (uint) this.ProcessModel.ProcessID);
            }
            catch (Exception) {
                this.ProcessHandle = processModel.Process.Handle;
            }
            finally {
                Constants.ProcessHandle = this.ProcessHandle;
                this.IsAttached = true;
            }

            if (this.IsNewInstance) {
                this.IsNewInstance = false;

                ActionLookup.Resolve();
                StatusEffectLookup.Resolve();
                ZoneLookup.Resolve();

                this.ResolveMemoryStructures(processModel, patchVersion);
            }

            this.AttachmentWorker = new AttachmentWorker();
            this.AttachmentWorker.StartScanning(processModel);

            this.SystemModules.Clear();
            this.GetProcessModules();

            Scanner.Instance.Locations.Clear();
            Scanner.Instance.LoadOffsets(Signatures.Resolve(processModel, patchVersion), scanAllMemoryRegions);
        }

        public void UnsetProcess() {
            if (this.AttachmentWorker != null) {
                this.AttachmentWorker.StopScanning();
                this.AttachmentWorker.Dispose();
            }

            try {
                if (this.IsAttached) {
                    UnsafeNativeMethods.CloseHandle(Instance.ProcessHandle);
                }
            }
            catch (Exception) {
                // IGNORED
            }
            finally {
                Constants.ProcessHandle = this.ProcessHandle = IntPtr.Zero;
                this.IsAttached = false;
            }
        }

        internal ProcessModule GetModuleByAddress(IntPtr address) {
            try {
                for (var i = 0; i < this.SystemModules.Count; i++) {
                    ProcessModule module = this.SystemModules[i];
                    var baseAddress = this.ProcessModel.IsWin64
                                          ? module.BaseAddress.ToInt64()
                                          : module.BaseAddress.ToInt32();
                    if (baseAddress <= (long) address && baseAddress + module.ModuleMemorySize >= (long) address) {
                        return module;
                    }
                }

                return null;
            }
            catch (Exception) {
                return null;
            }
        }

        internal bool IsSystemModule(IntPtr address) {
            ProcessModule moduleByAddress = this.GetModuleByAddress(address);
            if (moduleByAddress != null) {
                foreach (ProcessModule module in this.SystemModules) {
                    if (module.ModuleName == moduleByAddress.ModuleName) {
                        return true;
                    }
                }
            }

            return false;
        }

        internal void ResolveMemoryStructures(ProcessModel processModel, string patchVersion = "latest") {
            this.Structures = APIHelper.GetStructures(processModel, patchVersion);
        }

        protected internal virtual void RaiseException(Logger logger, Exception e, bool levelIsError = false) {
            this.ExceptionEvent?.Invoke(this, new ExceptionEvent(this, logger, e, levelIsError));
        }

        protected internal virtual void RaiseSignaturesFound(Logger logger, Dictionary<string, Signature> signatures, long processingTime) {
            this.SignaturesFoundEvent?.Invoke(this, new SignaturesFoundEvent(this, logger, signatures, processingTime));
        }

        private void GetProcessModules() {
            ProcessModuleCollection modules = this.ProcessModel.Process.Modules;

            for (var i = 0; i < modules.Count; i++) {
                ProcessModule module = modules[i];
                this.SystemModules.Add(module);
            }
        }

        internal struct MemoryBlock {
            public long Length;

            public long Start;
        }
    }
*/