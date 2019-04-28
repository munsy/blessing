class CureInstaller {
  constructor() {
    this.ErrData = {}
    this.Error = false;
    this.Act = false;
    this.Addon = false;
    this.Installing = false;
  
    this.Progress = {};
    this.Progress.CurrentFile = "";
    this.Progress.TotalFiles = 0;
    this.Progress.Current = 0;
    this.Progress.Total = 0;
  }
}

module.exports = CureInstaller;