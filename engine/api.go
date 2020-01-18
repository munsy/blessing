package main

import(
	"path/filepath"
	"net/http"
	"time"

	"github.com/orcaman/concurrent-map"
)

const(
	ACTIONS_FILE = "actions.json"
	ACTIONS_FILE_URL = "https://raw.githubusercontent.com/FFXIVAPP/sharlayan-resources/master/xivdatabase/{patchVersion}/actions.json"
)

type Api struct {
	client *http.Client
}

func (a *Api) GetActions(Actions cmap.ConcurrentMap, patchVersion string) (cmap.ConcurrentMap, error) {
	dir, err := os.Getwd()
	if nil != err {
		return nil, err
	}

	file := filepath.Join(dir, ACTIONS_FILE);
    
    if _, err = os.Stat(file); os.IsExist(err) && MemoryHandler.Instance.UseLocalCache {
        EnsureDictionaryValues(actions, file);
    } else {
        APIResponseToDictionary(actions, file, ACTIONS_FILE_URL);
    }
}

/*
public static IEnumerable<Signature> GetSignatures(ProcessModel processModel, string patchVersion = "latest") {
    var architecture = processModel.IsWin64 ? "x64" : "x86";
    var file = Path.Combine(Directory.GetCurrentDirectory(), $"signatures-{architecture}.json");
    if (File.Exists(file) && MemoryHandler.Instance.UseLocalCache) {
        var json = FileResponseToJSON(file);
        return JsonConvert.DeserializeObject<IEnumerable<Signature>>(json, Constants.SerializerSettings);
    }
    else {
        var json = APIResponseToJSON($"https://raw.githubusercontent.com/FFXIVAPP/sharlayan-resources/master/signatures/{patchVersion}/{architecture}.json");
        IEnumerable<Signature> resolved = JsonConvert.DeserializeObject<IEnumerable<Signature>>(json, Constants.SerializerSettings);

        File.WriteAllText(file, JsonConvert.SerializeObject(resolved, Formatting.Indented, Constants.SerializerSettings), Encoding.GetEncoding(932));

        return resolved;
    }
}

public static void GetStatusEffects(ConcurrentDictionary<uint, StatusItem> statusEffects, string patchVersion = "latest") {
    var file = Path.Combine(Directory.GetCurrentDirectory(), "statuses.json");
    if (File.Exists(file) && MemoryHandler.Instance.UseLocalCache) {
        EnsureDictionaryValues(statusEffects, file);
    } else {
        APIResponseToDictionary(statusEffects, file, $"https://raw.githubusercontent.com/FFXIVAPP/sharlayan-resources/master/xivdatabase/{patchVersion}/statuses.json");
    }
}

public static StructuresContainer GetStructures(ProcessModel processModel, string patchVersion = "latest") {
    var architecture = processModel.IsWin64
                           ? "x64"
                           : "x86";
    var file = Path.Combine(Directory.GetCurrentDirectory(), $"structures-{architecture}.json");
    if (File.Exists(file) && MemoryHandler.Instance.UseLocalCache) {
        return EnsureClassValues<StructuresContainer>(file);
    }

    return APIResponseToClass<StructuresContainer>(file, $"https://raw.githubusercontent.com/FFXIVAPP/sharlayan-resources/master/structures/{patchVersion}/{architecture}.json");
}

public static void GetZones(ConcurrentDictionary<uint, MapItem> mapInfos, string patchVersion = "latest") {
    // These ID's link to offset 7 in the old JSON values.
    // eg: "map id = 4" would be 148 in offset 7.
    // This is known as the TerritoryType value
    // - It maps directly to SaintCoins map.csv against TerritoryType ID
    var file = Path.Combine(Directory.GetCurrentDirectory(), "zones.json");
    if (File.Exists(file) && MemoryHandler.Instance.UseLocalCache) {
        EnsureDictionaryValues(mapInfos, file);
    } else {
        APIResponseToDictionary(mapInfos, file, $"https://raw.githubusercontent.com/FFXIVAPP/sharlayan-resources/master/xivdatabase/{patchVersion}/zones.json");
    }
}

private static T APIResponseToClass<T>(string file, string uri) {
    var json = APIResponseToJSON(uri);
    var resolved = JsonConvert.DeserializeObject<T>(json, Constants.SerializerSettings);

    File.WriteAllText(file, JsonConvert.SerializeObject(resolved, Formatting.Indented, Constants.SerializerSettings), Encoding.UTF8);

    return resolved;
}

private static void APIResponseToDictionary<T>(ConcurrentDictionary<uint, T> dictionary, string file, string uri) {
    var json = APIResponseToJSON(uri);
    ConcurrentDictionary<uint, T> resolved = JsonConvert.DeserializeObject<ConcurrentDictionary<uint, T>>(json, Constants.SerializerSettings);

    foreach (KeyValuePair<uint, T> kvp in resolved) {
        dictionary.AddOrUpdate(kvp.Key, kvp.Value, (k, v) => kvp.Value);
    }

    File.WriteAllText(file, JsonConvert.SerializeObject(dictionary, Formatting.Indented, Constants.SerializerSettings), Encoding.UTF8);
}

private static string APIResponseToJSON(string uri) {
    return _webClient.DownloadString(uri);
}

private static T EnsureClassValues<T>(string file) {
    var json = FileResponseToJSON(file);
    return JsonConvert.DeserializeObject<T>(json, Constants.SerializerSettings);
}

private static void EnsureDictionaryValues<T>(ConcurrentDictionary<uint, T> dictionary, string file) {
    var json = FileResponseToJSON(file);
    ConcurrentDictionary<uint, T> resolved = JsonConvert.DeserializeObject<ConcurrentDictionary<uint, T>>(json, Constants.SerializerSettings);

    foreach (KeyValuePair<uint, T> kvp in resolved) {
        dictionary.AddOrUpdate(kvp.Key, kvp.Value, (k, v) => kvp.Value);
    }
}
*/

func (a *Api) toJson(file string) {
/*
	using (var streamReader = new StreamReader(file)) {
        return streamReader.ReadToEnd();
    }
*/	
}

func NewApi() *Api {
	return &Api{
		client: &http.Client{
			Timeout: 5 * time.Second
		}
	}
}
