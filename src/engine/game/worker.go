package main

import(
	"time"
)

const DEFAULT_TIMER_INTERVAL = 1000

type AttachmentWorker struct {
	isScanning bool
	scanTimer *time.Timer
	processModel ProcessModel
}

func NewAttachmentWorker() *AttachmentWorker {
	w := &AttachmentWorker{
		scanTimer: time.NewTimer(DEFAULT_TIMER_INTERVAL),
	}

	return w
}

func (w *AttachmentWorker) Dispose() {
	
}

func (w *AttachmentWorker) StartScanning(model ProcessModel) {
	w.processModel = model
	w.scanTimer.Reset(DEFAULT_TIMER_INTERVAL)
}

func (w *AttachmentWorker) StopScanning() {
	w.scanTimer.Stop()
}

func (w *AttachmentWorker) ScanTimerElapsed() {
	if w.isScanning || 1 == 1 {
		return
	}
	w.isScanning = true

	go func() {
		procs := processes()
		found := false
		for i := 0; i < len(procs); i++ {
			if procs[i].ProcessID == w.processModel.ProcessID() && 
			procs[i].Exe == w.processModel.ProcessName() {
				found = true
			}
		}
		if !found {
			MemoryHandler.Instance.IsAttached = false;
			MemoryHandler.Instance.UnsetProcess();
		}
		w.isScanning = false
		return true
	}()
}
/*
namespace Sharlayan {
    internal class AttachmentWorker : IDisposable {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();
        private readonly Timer _scanTimer;
        private bool _isScanning;
        private ProcessModel _processModel;

        public AttachmentWorker() {
            this._scanTimer = new Timer(1000);
            this._scanTimer.Elapsed += this.ScanTimerElapsed;
        }

        public void Dispose() {
            this._scanTimer.Elapsed -= this.ScanTimerElapsed;
        }

        public void StartScanning(ProcessModel processModel) {
            this._processModel = processModel;
            this._scanTimer.Enabled = true;
        }

        public void StopScanning() {
            this._scanTimer.Enabled = false;
        }

        private void ScanTimerElapsed(object sender, ElapsedEventArgs e) {
            if (this._isScanning || !MemoryHandler.Instance.IsAttached) {
                return;
            }

            this._isScanning = true;

            Func<bool> scanner = delegate {
                Process[] processes = Process.GetProcesses();
                if (!processes.Any(process => process.Id == this._processModel.ProcessID && process.ProcessName == this._processModel.ProcessName)) {
                    MemoryHandler.Instance.IsAttached = false;
                    MemoryHandler.Instance.UnsetProcess();
                }

                this._isScanning = false;
                return true;
            };
            scanner.BeginInvoke(delegate { }, scanner);
        }
    }
}
*/