class CurePaths {
  constructor() {
    if (process.platform !== 'win32') {
      return;
    }
    this.CureDefault = process.env.APPDATA + "\\cure";
    this.CureTemp = "";
    this.CureTemp = this.CureDefault + "\\.temp";
    this.ActDefault = "C:\\Advanced Combat Tracker";
    this.Act = "";
    this.Act = this.ActDefault;
    this.ActZip = this.CureTemp + "\\act.zip"
    this.ActDownloadURL = "https://advancedcombattracker.com/includes/page-download.php?id=57"
  }
}

module.exports = CurePaths;