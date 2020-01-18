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

func NewApi() *Api {
	return &Api{
		client: &http.Client{
			Timeout: 5 * time.Second
		}
	}
}
