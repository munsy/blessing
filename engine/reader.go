package main

type ChatLogReader struct {
    Indexes []int
    ChatLogFirstRun bool
    ChatLogPointers ChatLogPointers
    PreviousArrayIndex int
    PreviousOffset int
}
/*
    public static readonly List<int> Indexes = new List<int>();
    public static ChatLogFirstRun bool  = true;
    public static ChatLogPointers ChatLogPointers ;
    public static PreviousArrayIndex int ;
    public static PreviousOffset int ;
*/
func (r *ChatLogReader) EnsureArrayIndexes() {
    r.Indexes = nil
    for i := 0; i < 1000; i++ {
        r.Indexes = append(r.Indexes, int(MemoryHandler.Instance.GetPlatformUInt(uintptr(ChatLogPointers.OffsetArrayStart + i * 4))))
    }
}

func (r *ChatLogReader) ResolveEntries(offset, length int) [][]byte {
    entries := make([][]byte, length)
    for i := offset; i < length; i++ {
        r.EnsureArrayIndexes()
        currentOffset := r.Indexes[i]
        entries = append(entries, r.ResolveEntry(r.PreviousOffset, currentOffset))
        r.PreviousOffset = currentOffset
    }
    return entries
}

func (r *ChatLogReader) ResolveEntry(offset, length int) []byte {
    return [][]byte(MemoryHandler.Instance.GetByteArray(uintptr(ChatLogPointers.LogStart + offset), length - offset))
}

var ChatReader *ChatLogReader

func CanGetChatLog() bool {
    return Scanner.Instance.Locations.ContainsKey(Signatures.ChatLogKey)
}

func GetChatLog(previousArrayIndex, previousOffset int) *ChatLogResult {
    result := NewChatLogResult()

    if !CanGetChatLog() || !MemoryHandler.Instance.IsAttached {
        return result
    }

    ChatReader.PreviousArrayIndex = previousArrayIndex
    ChatReader.PreviousOffset = previousOffset

    chatPointerMap := uintptr(Scanner.Instance.Locations[ChatLogKey])

    if uint64(chatPointerMap) <= 20 {
        return result
    }

    buffered = make([][]byte, 0)
}

/*
namespace Sharlayan {
    using Sharlayan.Core;
    using Sharlayan.Models;
    using Sharlayan.Models.ReadResults;

    public static partial class Reader {
        public static ChatLogResult GetChatLog(int previousArrayIndex = 0, int previousOffset = 0) {
            var result = new ChatLogResult();

            if (!CanGetChatLog() || !MemoryHandler.Instance.IsAttached) {
                return result;
            }

            ChatLogReader.PreviousArrayIndex = previousArrayIndex;
            ChatLogReader.PreviousOffset = previousOffset;

            var chatPointerMap = (IntPtr) Scanner.Instance.Locations[Signatures.ChatLogKey];

            if (chatPointerMap.ToInt64() <= 20) {
                return result;
            }

            List<List<byte>> buffered = new List<List<byte>>();

            try {
                ChatLogReader.Indexes.Clear();
                ChatLogReader.ChatLogPointers = new ChatLogPointers {
                    LineCount = (uint) MemoryHandler.Instance.GetPlatformUInt(chatPointerMap),
                    OffsetArrayStart = MemoryHandler.Instance.GetPlatformUInt(chatPointerMap, MemoryHandler.Instance.Structures.ChatLogPointers.OffsetArrayStart),
                    OffsetArrayPos = MemoryHandler.Instance.GetPlatformUInt(chatPointerMap, MemoryHandler.Instance.Structures.ChatLogPointers.OffsetArrayPos),
                    OffsetArrayEnd = MemoryHandler.Instance.GetPlatformUInt(chatPointerMap, MemoryHandler.Instance.Structures.ChatLogPointers.OffsetArrayEnd),
                    LogStart = MemoryHandler.Instance.GetPlatformUInt(chatPointerMap, MemoryHandler.Instance.Structures.ChatLogPointers.LogStart),
                    LogNext = MemoryHandler.Instance.GetPlatformUInt(chatPointerMap, MemoryHandler.Instance.Structures.ChatLogPointers.LogNext),
                    LogEnd = MemoryHandler.Instance.GetPlatformUInt(chatPointerMap, MemoryHandler.Instance.Structures.ChatLogPointers.LogEnd)
                };

                ChatLogReader.EnsureArrayIndexes();

                var currentArrayIndex = (ChatLogReader.ChatLogPointers.OffsetArrayPos - ChatLogReader.ChatLogPointers.OffsetArrayStart) / 4;
                if (ChatLogReader.ChatLogFirstRun) {
                    ChatLogReader.ChatLogFirstRun = false;
                    ChatLogReader.PreviousOffset = ChatLogReader.Indexes[(int) currentArrayIndex - 1];
                    ChatLogReader.PreviousArrayIndex = (int) currentArrayIndex - 1;
                }
                else {
                    if (currentArrayIndex < ChatLogReader.PreviousArrayIndex) {
                        buffered.AddRange(ChatLogReader.ResolveEntries(ChatLogReader.PreviousArrayIndex, 1000));
                        ChatLogReader.PreviousOffset = 0;
                        ChatLogReader.PreviousArrayIndex = 0;
                    }

                    if (ChatLogReader.PreviousArrayIndex < currentArrayIndex) {
                        buffered.AddRange(ChatLogReader.ResolveEntries(ChatLogReader.PreviousArrayIndex, (int) currentArrayIndex));
                    }

                    ChatLogReader.PreviousArrayIndex = (int) currentArrayIndex;
                }
            }
            catch (Exception ex) {
                MemoryHandler.Instance.RaiseException(Logger, ex, true);
            }

            foreach (List<byte> bytes in buffered.Where(b => b.Count > 0)) {
                try {
                    ChatLogItem chatLogEntry = ChatEntry.Process(bytes.ToArray());
                    if (Regex.IsMatch(chatLogEntry.Combined, @"[\w\d]{4}::?.+")) {
                        result.ChatLogItems.Add(chatLogEntry);
                    }
                }
                catch (Exception ex) {
                    MemoryHandler.Instance.RaiseException(Logger, ex, true);
                }
            }

            result.PreviousArrayIndex = ChatLogReader.PreviousArrayIndex;
            result.PreviousOffset = ChatLogReader.PreviousOffset;

            return result;
        }
    }
}

*/
