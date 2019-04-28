class CureInstaller {
  constructor() {
    this.ErrData = {}
    this.Error = false;
    this.Act = false;
    this.Addon = false;
    this.Installing = false;
  
    this.Status = {};
    this.Status.Step = 0;
    this.Status.CurrentMessage = "";

    this.Status.Progress = {};
    this.Status.Progress.CurrentFile = "";
    this.Status.Progress.TotalFiles = 0;
    this.Status.Progress.Current = 0;
    this.Status.Progress.Total = 0;
  }
}

module.exports = CureInstaller;