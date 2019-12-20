const path = require('path');
//const edge = require('electron-edge-js');
    
export class FFXIVStream {
    private baseNetAppPath: string;
    private namespace: string;
    private baseDll: string;

    constructor() {
        process.env.EDGE_USE_CORECLR = '1';
        
        // if(version !== 'standard') {
        //     process.env.EDGE_APP_ROOT = baseNetAppPath;
        // }
        
        // this.baseGoPath = path.join(__dirname, '/lib/');
        // this.namespace = 'FFXIVAPP.Memory';
        // this.baseDll = path.join(this.baseNetAppPath, this.namespace + '.dll');
        // 
        // console.log(this.baseNetAppPath);
        // console.log(this.baseDll);

        // var getFFXIVProc = edge.func(this.baseDll);
    }
}
    
/*
    process.env.EDGE_USE_CORECLR = '1';
    if(version !== 'standard') {
        process.env.EDGE_APP_ROOT = baseNetAppPath;
    }
    
    console.log(baseNetAppPath);
    
    var edge = require('electron-edge-js');
    
    var baseDll = path.join(baseNetAppPath, namespace + '.dll');
    
    console.log(baseDll);
    
    var localTypeName = namespace + '.LocalMethods';
    var externalTypeName = namespace + '.ExternalMethods';
    var getAppDomainDirectory = edge.func({
        assemblyFile: baseDll,
        typeName: localTypeName,
        methodName: 'GetAppDomainDirectory'
    });

    var getCurrentTime = edge.func({
        assemblyFile: baseDll,
        typeName: localTypeName,
        methodName: 'GetCurrentTime'
    });

    var useDynamicInput = edge.func({
        assemblyFile: baseDll,
        typeName: localTypeName,
        methodName: 'UseDynamicInput'
    });

    var getPerson = edge.func({
        assemblyFile: baseDll,
        typeName: externalTypeName,
        methodName: 'GetPersonInfo'
    });

    window.onload = function() {
        getAppDomainDirectory('', function(error, result) {
            if (error) throw error;
            document.getElementById("GetAppDomainDirectory").innerHTML = result;
        });

        getCurrentTime('', function(error, result) {
            if (error) throw error;
            document.getElementById("GetCurrentTime").innerHTML = result;
        });

        useDynamicInput('Node.Js', function(error, result) {
            if (error) throw error;
            document.getElementById("UseDynamicInput").innerHTML = result;
        });

        getPerson('', function(error, result) {
            //if (error) throw JSON.stringify(error);
            document.getElementById("GetPersonInfo").innerHTML = result;
        });

    };
*/