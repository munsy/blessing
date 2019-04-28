class CureData {
  constructor() {
    this.Path = {};
    this.Path.CureDefault = process.env.APPDATA + "\\cure";
    this.Path.CureTemp = "";
    this.Path.CureTemp = this.Path.CureDefault + "\\.temp";
    this.Path.ActDefault = "C:\\Advanced Combat Tracker";
    this.Path.Act = "";
    this.Path.Act = this.Path.ActDefault;
    this.Path.ActZip = this.Path.CureTemp + "\\act.zip"
    this.Path.ActDownloadURL = "https://advancedcombattracker.com/includes/page-download.php?id=57"

    this.Install = {};
    this.Install.ErrData = {}
    this.Install.Error = false;
    this.Install.Act = false;
    this.Install.Addon = false;
    this.Install.Installing = false;
  
    this.Install.Progress = {};
    this.Install.Progress.CurrentFile = "";
    this.Install.Progress.TotalFiles = 0;
    this.Install.Progress.Current = 0;
    this.Install.Progress.Total = 0;
  }
}

module.exports = CureData;