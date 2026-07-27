
// =====================================================================
// MODULE: Logger
// =====================================================================
var Log={
  level:'info',
  _q:[],_t:null,
  _w:function(l,m,d){
    this._q.push({ts:Date.now(),l,m,d});
    if(!this._t)this._t=setTimeout(function(){Log._f()},0);
  },
  _f:function(){
    this._t=null;
    for(var i=0;i<this._q.length;i++){
      var e=this._q[i];
      if(e.l==='debug'&&Log.level!=='debug')continue;
      if(e.l==='info'&&Log.level==='error')continue;
      console[e.l]('[SolarCalc:'+e.l.toUpperCase()+']',e.m,e.d||'');
    }
    this._q=[];
  },
  debug:function(m,d){Log._w('debug',m,d)},
  info:function(m,d){Log._w('info',m,d)},
  warn:function(m,d){Log._w('warn',m,d)},
  error:function(m,d){Log._w('error',m,d)}
};

// =====================================================================
// MODULE: Config
// =====================================================================
var CFG={
  SAFETY:{BREAKER:1.25,PANEL_LOSS:1.25,INVERTER_MARGIN:1.25,VOC_COLD:1.15},
  THRESHOLD:{HV_MIN_KW:30},
  WEATHER:{sunny:1.0,partlyCloudy:1.15,cloudy:1.30},
  DEFAULTS:{psh:5,systemV:48,panelW:550,dod:80,cRate:0.5,weather:1.0},
  BATTERY_VOLT:{12:12,24:24,48:48,'51.2':51.2},
  WIRE_TABLE:[
    {minA:0,maxA:10,mm2:2.5,ohmPerKm:7.410},
    {minA:10,maxA:16,mm2:4,ohmPerKm:4.610},
    {minA:16,maxA:25,mm2:6,ohmPerKm:3.080},
    {minA:25,maxA:35,mm2:10,ohmPerKm:1.830},
    {minA:35,maxA:50,mm2:16,ohmPerKm:1.150},
    {minA:50,maxA:63,mm2:25,ohmPerKm:0.727},
    {minA:63,maxA:80,mm2:35,ohmPerKm:0.524},
    {minA:80,maxA:100,mm2:50,ohmPerKm:0.387},
    {minA:100,maxA:125,mm2:70,ohmPerKm:0.268},
    {minA:125,maxA:160,mm2:95,ohmPerKm:0.193},
    {minA:160,maxA:200,mm2:120,ohmPerKm:0.155}
  ],
  VOLTAGE_DROP_MAX:0.03,
  PARALLEL:{MAX_DIRECT:6,MAX_POWER_W:1250000,SWITCHOVER_MS:20,UNBALANCE_MAX:15}
};

// =====================================================================
// MODULE: DB (Inverter Data)
// =====================================================================
var PANEL_SPECS={
  300:{Vmp:32.5,Voc:39.2,Imp:9.23,Isc:9.78},
  350:{Vmp:34.2,Voc:41.1,Imp:10.24,Isc:10.85},
  450:{Vmp:41.5,Voc:49.8,Imp:10.84,Isc:11.49},
  550:{Vmp:42.8,Voc:51.3,Imp:12.85,Isc:13.62},
  570:{Vmp:43.2,Voc:51.8,Imp:13.19,Isc:13.97},
  600:{Vmp:43.8,Voc:52.5,Imp:13.70,Isc:14.50},
  650:{Vmp:44.5,Voc:53.4,Imp:14.61,Isc:15.45},
  670:{Vmp:44.8,Voc:53.7,Imp:14.96,Isc:15.82},
  700:{Vmp:45.2,Voc:54.2,Imp:15.49,Isc:16.35},
  720:{Vmp:45.5,Voc:54.5,Imp:15.82,Isc:16.69},
  750:{Vmp:45.8,Voc:54.9,Imp:16.38,Isc:17.26},
  780:{Vmp:46.1,Voc:55.3,Imp:16.92,Isc:17.83}
};

// ===== REAL INVERTER DATABASE (Auto-generated from inverters-catalog.json) =====
var INVERTER_DB = [
  {
    id: 'solis-3k',
    brand: 'Solis (Ginlong)',
    series: 'S6-EH1P(3-8)K-L-PLUS',
    model: 'S6-EH1P3K-L-PLUS',
    ratedW: 3000,
    type: 'LV',
    phase: '1-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 6000,
    mpptRange: { min: 90, max: 435 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 16,
    maxIscPerMPPT: 20,
    maxStringsPerMPPT: {"mppt1":1,"mppt2":1},
    maxStrings: 2,
    maxChargeCurrent: 70,
    maxDischargeCurrent: 70,
    maxChargePower: 3000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 13.1,
    ratedOutputA220: 13.7,
    maxOutputA: 13.7,
    maxAcPassthroughA: 35,
    maxEff: 0.962,
    euEff: 0.961,
    batChargeEffPv: 0.953,
    batChargeEffAc: 0.939,
    batDischargeEff: 0.938,
    surgePower: 6000,
    surgeTimeSec: 10,
    switchTimeMs: 4,
    ip: 'IP66',
    cooling: 'Natural+Fan',
    topology: 'HF-Isolation(Bat)',
    dims: { w: 335, h: 560, d: 253 },
    weight: 23,
    tempRange: [-40, 60],
    altitude: 3000,
    comm: ["CAN","RS485"],
    display: 'LCD+BT+APP',
    wifiOpt: true,
    lanOpt: false,
    gprsOpt: true,
    certs: ["IEC62109","EN50549","NRS097","IEC61727"],
    parallel: 6,
    vendorExtras: {}
  },
  {
    id: 'solis-3k6',
    brand: 'Solis (Ginlong)',
    series: 'S6-EH1P(3-8)K-L-PLUS',
    model: 'S6-EH1P3.6K-L-PLUS',
    ratedW: 3680,
    type: 'LV',
    phase: '1-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 7200,
    mpptRange: { min: 90, max: 435 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 16,
    maxIscPerMPPT: 20,
    maxStringsPerMPPT: {"mppt1":1,"mppt2":1},
    maxStrings: 2,
    maxChargeCurrent: 80,
    maxDischargeCurrent: 80,
    maxChargePower: 3680,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 15.7,
    ratedOutputA220: 16.4,
    maxOutputA: 16.4,
    maxAcPassthroughA: 35,
    maxEff: 0.962,
    euEff: 0.961,
    batChargeEffPv: 0.953,
    batChargeEffAc: 0.939,
    batDischargeEff: 0.938,
    surgePower: 7360,
    surgeTimeSec: 10,
    switchTimeMs: 4,
    ip: 'IP66',
    cooling: 'Natural+Fan',
    topology: 'HF-Isolation(Bat)',
    dims: { w: 335, h: 560, d: 253 },
    weight: 23,
    tempRange: [-40, 60],
    altitude: 3000,
    comm: ["CAN","RS485"],
    display: 'LCD+BT+APP',
    wifiOpt: true,
    lanOpt: false,
    gprsOpt: true,
    certs: ["IEC62109","EN50549","NRS097","IEC61727"],
    parallel: 6,
    vendorExtras: {}
  },
  {
    id: 'solis-5k',
    brand: 'Solis (Ginlong)',
    series: 'S6-EH1P(3-8)K-L-PLUS',
    model: 'S6-EH1P5K-L-PLUS',
    ratedW: 5000,
    type: 'LV',
    phase: '1-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 10000,
    mpptRange: { min: 90, max: 435 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 16,
    maxIscPerMPPT: 20,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2},
    maxStrings: 4,
    maxChargeCurrent: 112,
    maxDischargeCurrent: 112,
    maxChargePower: 5000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 21.8,
    ratedOutputA220: 22.8,
    maxOutputA: 22.8,
    maxAcPassthroughA: 40,
    maxEff: 0.962,
    euEff: 0.961,
    batChargeEffPv: 0.953,
    batChargeEffAc: 0.939,
    batDischargeEff: 0.938,
    surgePower: 10000,
    surgeTimeSec: 10,
    switchTimeMs: 4,
    ip: 'IP66',
    cooling: 'Natural+Fan',
    topology: 'HF-Isolation(Bat)',
    dims: { w: 335, h: 560, d: 253 },
    weight: 23,
    tempRange: [-40, 60],
    altitude: 3000,
    comm: ["CAN","RS485"],
    display: 'LCD+BT+APP',
    wifiOpt: true,
    lanOpt: false,
    gprsOpt: true,
    certs: ["IEC62109","EN50549","NRS097","IEC61727"],
    parallel: 6,
    vendorExtras: {}
  },
  {
    id: 'solis-6k',
    brand: 'Solis (Ginlong)',
    series: 'S6-EH1P(3-8)K-L-PLUS',
    model: 'S6-EH1P6K-L-PLUS',
    ratedW: 6000,
    type: 'LV',
    phase: '1-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 12000,
    mpptRange: { min: 90, max: 435 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 16,
    maxIscPerMPPT: 20,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2},
    maxStrings: 4,
    maxChargeCurrent: 135,
    maxDischargeCurrent: 135,
    maxChargePower: 6000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 26.1,
    ratedOutputA220: 27.3,
    maxOutputA: 27.3,
    maxAcPassthroughA: 40,
    maxEff: 0.962,
    euEff: 0.961,
    batChargeEffPv: 0.953,
    batChargeEffAc: 0.939,
    batDischargeEff: 0.938,
    surgePower: 12000,
    surgeTimeSec: 10,
    switchTimeMs: 4,
    ip: 'IP66',
    cooling: 'Natural+Fan',
    topology: 'HF-Isolation(Bat)',
    dims: { w: 335, h: 560, d: 253 },
    weight: 23,
    tempRange: [-40, 60],
    altitude: 3000,
    comm: ["CAN","RS485"],
    display: 'LCD+BT+APP',
    wifiOpt: true,
    lanOpt: false,
    gprsOpt: true,
    certs: ["IEC62109","EN50549","NRS097","IEC61727"],
    parallel: 6,
    vendorExtras: {}
  },
  {
    id: 'solis-8k',
    brand: 'Solis (Ginlong)',
    series: 'S6-EH1P(3-8)K-L-PLUS',
    model: 'S6-EH1P8K-L-PLUS',
    ratedW: 8000,
    type: 'LV',
    phase: '1-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 16000,
    mpptRange: { min: 90, max: 435 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 32,
    maxIscPerMPPT: 40,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2},
    maxStrings: 4,
    maxChargeCurrent: 190,
    maxDischargeCurrent: 190,
    maxChargePower: 8000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 34.8,
    ratedOutputA220: 36.4,
    maxOutputA: 36.4,
    maxAcPassthroughA: 50,
    maxEff: 0.962,
    euEff: 0.961,
    batChargeEffPv: 0.953,
    batChargeEffAc: 0.939,
    batDischargeEff: 0.938,
    surgePower: 16000,
    surgeTimeSec: 10,
    switchTimeMs: 4,
    ip: 'IP66',
    cooling: 'Natural+Fan',
    topology: 'HF-Isolation(Bat)',
    dims: { w: 335, h: 560, d: 253 },
    weight: 23,
    tempRange: [-40, 60],
    altitude: 3000,
    comm: ["CAN","RS485"],
    display: 'LCD+BT+APP',
    wifiOpt: true,
    lanOpt: false,
    gprsOpt: true,
    certs: ["IEC62109","EN50549","NRS097","IEC61727"],
    parallel: 6,
    vendorExtras: {}
  },
  {
    id: 'solis-9k',
    brand: 'Solis (Ginlong)',
    series: 'S6-EH1P(9-10)K-L-PLUS(21A)',
    model: 'S6-EH1P9K-L-PLUS',
    ratedW: 9000,
    type: 'LV',
    phase: '1-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 18000,
    mpptRange: { min: 90, max: 435 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 21,
    maxIscPerMPPT: 30,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2},
    maxStrings: 4,
    maxChargeCurrent: 210,
    maxDischargeCurrent: 210,
    maxChargePower: 9000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 39.1,
    maxOutputA: 39.1,
    maxAcPassthroughA: 50,
    maxEff: 0.975,
    euEff: 0.965,
    batChargeEffPv: 0.953,
    batChargeEffAc: 0.945,
    batDischargeEff: 0.949,
    surgePower: 18000,
    surgeTimeSec: 10,
    switchTimeMs: 4,
    ip: 'IP66',
    cooling: 'Fan',
    topology: 'HF-Isolation(Bat)',
    dims: { w: 335, h: 560, d: 227 },
    weight: 23,
    tempRange: [-40, 60],
    altitude: 3000,
    comm: ["CAN","RS485"],
    display: '7in-LCD+BT+APP',
    wifiOpt: true,
    lanOpt: false,
    gprsOpt: true,
    certs: ["IEC62109","EN50549","NRS097","IEC61727"],
    parallel: 6,
    vendorExtras: {}
  },
  {
    id: 'solis-10k',
    brand: 'Solis (Ginlong)',
    series: 'S6-EH1P(9-10)K-L-PLUS(21A)',
    model: 'S6-EH1P10K-L-PLUS',
    ratedW: 10000,
    type: 'LV',
    phase: '1-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 20000,
    mpptRange: { min: 90, max: 435 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 21,
    maxIscPerMPPT: 30,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2},
    maxStrings: 4,
    maxChargeCurrent: 210,
    maxDischargeCurrent: 210,
    maxChargePower: 10000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 43.5,
    maxOutputA: 43.5,
    maxAcPassthroughA: 50,
    maxEff: 0.975,
    euEff: 0.965,
    batChargeEffPv: 0.953,
    batChargeEffAc: 0.945,
    batDischargeEff: 0.949,
    surgePower: 20000,
    surgeTimeSec: 10,
    switchTimeMs: 4,
    ip: 'IP66',
    cooling: 'Fan',
    topology: 'HF-Isolation(Bat)',
    dims: { w: 335, h: 560, d: 227 },
    weight: 23,
    tempRange: [-40, 60],
    altitude: 3000,
    comm: ["CAN","RS485"],
    display: '7in-LCD+BT+APP',
    wifiOpt: true,
    lanOpt: false,
    gprsOpt: true,
    certs: ["IEC62109","EN50549","NRS097","IEC61727"],
    parallel: 6,
    vendorExtras: {}
  },
  {
    id: 'solis-nv-9k9',
    brand: 'Solis (Ginlong)',
    series: 'S6-EH1P(9.9-18)K03-NV-YD-L',
    model: 'S6-EH1P9.9K03-NV-YD-L',
    ratedW: 9900,
    type: 'LV',
    phase: '1-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 19800,
    mpptRange: { min: 100, max: 450 },
    mpptCount: 3,
    maxInputCurrentPerMPPT: 40,
    maxIscPerMPPT: 50,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2,"mppt3":2},
    maxStrings: 6,
    maxChargeCurrent: 208,
    maxDischargeCurrent: 208,
    maxChargePower: 9900,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 43.1,
    ratedOutputA220: 45,
    maxOutputA: 45,
    maxAcPassthroughA: 65,
    maxEff: 0.976,
    euEff: 0.97,
    batChargeEffPv: 0.94,
    batChargeEffAc: 0.943,
    batDischargeEff: 0.935,
    surgePower: 19800,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP66',
    cooling: 'Intelligent-Fan',
    topology: 'Transformerless',
    dims: { w: 459, h: 845, d: 313 },
    weight: 55.5,
    tempRange: [-25, 60],
    altitude: 4000,
    comm: ["RS485","WiFi","LAN","Bluetooth"],
    display: '7in-LCD+BT+APP',
    wifiOpt: false,
    lanOpt: false,
    gprsOpt: true,
    certs: ["IEC62109","IEC62116","IEC61727","EN50549","NRS097"],
    parallel: 16,
    vendorExtras: {"maxPvVoltage":550,"ratedPvVoltage":380,"startVoltage":100,"pvOversizing":"160%","afciIntegrated":true,"sgReadyHeatPump":true,"aiTOU":true,"vppIntegration":true,"noiseTypical":"<65dB(A)"}
  },
  {
    id: 'solis-nv-12k',
    brand: 'Solis (Ginlong)',
    series: 'S6-EH1P(9.9-18)K03-NV-YD-L',
    model: 'S6-EH1P12K03-NV-YD-L',
    ratedW: 12000,
    type: 'LV',
    phase: '1-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 24000,
    mpptRange: { min: 100, max: 450 },
    mpptCount: 3,
    maxInputCurrentPerMPPT: 40,
    maxIscPerMPPT: 50,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2,"mppt3":2},
    maxStrings: 6,
    maxChargeCurrent: 250,
    maxDischargeCurrent: 250,
    maxChargePower: 12000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 52.2,
    ratedOutputA220: 54.5,
    maxOutputA: 54.5,
    maxAcPassthroughA: 78,
    maxEff: 0.976,
    euEff: 0.97,
    batChargeEffPv: 0.94,
    batChargeEffAc: 0.943,
    batDischargeEff: 0.935,
    surgePower: 24000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP66',
    cooling: 'Intelligent-Fan',
    topology: 'Transformerless',
    dims: { w: 459, h: 845, d: 313 },
    weight: 55.5,
    tempRange: [-25, 60],
    altitude: 4000,
    comm: ["RS485","WiFi","LAN","Bluetooth"],
    display: '7in-LCD+BT+APP',
    wifiOpt: false,
    lanOpt: false,
    gprsOpt: true,
    certs: ["IEC62109","IEC62116","IEC61727","EN50549","NRS097"],
    parallel: 16,
    vendorExtras: {"maxPvVoltage":550,"ratedPvVoltage":380,"startVoltage":100,"pvOversizing":"160%","afciIntegrated":true,"sgReadyHeatPump":true,"aiTOU":true,"vppIntegration":true,"noiseTypical":"<65dB(A)"}
  },
  {
    id: 'solis-nv-14k',
    brand: 'Solis (Ginlong)',
    series: 'S6-EH1P(9.9-18)K03-NV-YD-L',
    model: 'S6-EH1P14K03-NV-YD-L',
    ratedW: 14000,
    type: 'LV',
    phase: '1-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 28000,
    mpptRange: { min: 100, max: 450 },
    mpptCount: 3,
    maxInputCurrentPerMPPT: 40,
    maxIscPerMPPT: 50,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2,"mppt3":2},
    maxStrings: 6,
    maxChargeCurrent: 290,
    maxDischargeCurrent: 290,
    maxChargePower: 14000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 60.9,
    ratedOutputA220: 63.6,
    maxOutputA: 63.6,
    maxAcPassthroughA: 92,
    maxEff: 0.976,
    euEff: 0.97,
    batChargeEffPv: 0.94,
    batChargeEffAc: 0.943,
    batDischargeEff: 0.935,
    surgePower: 28000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP66',
    cooling: 'Intelligent-Fan',
    topology: 'Transformerless',
    dims: { w: 459, h: 845, d: 313 },
    weight: 55.5,
    tempRange: [-25, 60],
    altitude: 4000,
    comm: ["RS485","WiFi","LAN","Bluetooth"],
    display: '7in-LCD+BT+APP',
    wifiOpt: false,
    lanOpt: false,
    gprsOpt: true,
    certs: ["IEC62109","IEC62116","IEC61727","EN50549","NRS097"],
    parallel: 16,
    vendorExtras: {"maxPvVoltage":550,"ratedPvVoltage":380,"startVoltage":100,"pvOversizing":"160%","afciIntegrated":true,"sgReadyHeatPump":true,"aiTOU":true,"vppIntegration":true,"noiseTypical":"<65dB(A)"}
  },
  {
    id: 'solis-nv-16k',
    brand: 'Solis (Ginlong)',
    series: 'S6-EH1P(9.9-18)K03-NV-YD-L',
    model: 'S6-EH1P16K03-NV-YD-L',
    ratedW: 16000,
    type: 'LV',
    phase: '1-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 32000,
    mpptRange: { min: 100, max: 450 },
    mpptCount: 3,
    maxInputCurrentPerMPPT: 40,
    maxIscPerMPPT: 50,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2,"mppt3":2},
    maxStrings: 6,
    maxChargeCurrent: 290,
    maxDischargeCurrent: 290,
    maxChargePower: 16000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 69.6,
    ratedOutputA220: 72.7,
    maxOutputA: 72.7,
    maxAcPassthroughA: 104,
    maxEff: 0.976,
    euEff: 0.97,
    batChargeEffPv: 0.94,
    batChargeEffAc: 0.943,
    batDischargeEff: 0.935,
    surgePower: 32000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP66',
    cooling: 'Intelligent-Fan',
    topology: 'Transformerless',
    dims: { w: 459, h: 845, d: 313 },
    weight: 55.5,
    tempRange: [-25, 60],
    altitude: 4000,
    comm: ["RS485","WiFi","LAN","Bluetooth"],
    display: '7in-LCD+BT+APP',
    wifiOpt: false,
    lanOpt: false,
    gprsOpt: true,
    certs: ["IEC62109","IEC62116","IEC61727","EN50549","NRS097"],
    parallel: 16,
    vendorExtras: {"maxPvVoltage":550,"ratedPvVoltage":380,"startVoltage":100,"pvOversizing":"160%","afciIntegrated":true,"sgReadyHeatPump":true,"aiTOU":true,"vppIntegration":true,"noiseTypical":"<65dB(A)"}
  },
  {
    id: 'solis-nv-18k',
    brand: 'Solis (Ginlong)',
    series: 'S6-EH1P(9.9-18)K03-NV-YD-L',
    model: 'S6-EH1P18K03-NV-YD-L',
    ratedW: 18000,
    type: 'LV',
    phase: '1-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 36000,
    mpptRange: { min: 100, max: 450 },
    mpptCount: 3,
    maxInputCurrentPerMPPT: 42,
    maxIscPerMPPT: 50,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2,"mppt3":2},
    maxStrings: 6,
    maxChargeCurrent: 320,
    maxDischargeCurrent: 320,
    maxChargePower: 18000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 78.2,
    ratedOutputA220: 81.8,
    maxOutputA: 81.8,
    maxAcPassthroughA: 118,
    maxEff: 0.976,
    euEff: 0.97,
    batChargeEffPv: 0.94,
    batChargeEffAc: 0.943,
    batDischargeEff: 0.935,
    surgePower: 36000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP66',
    cooling: 'Intelligent-Fan',
    topology: 'Transformerless',
    dims: { w: 459, h: 845, d: 313 },
    weight: 55.5,
    tempRange: [-25, 60],
    altitude: 4000,
    comm: ["RS485","WiFi","LAN","Bluetooth"],
    display: '7in-LCD+BT+APP',
    wifiOpt: false,
    lanOpt: false,
    gprsOpt: true,
    certs: ["IEC62109","IEC62116","IEC61727","EN50549","NRS097"],
    parallel: 16,
    vendorExtras: {"maxPvVoltage":550,"ratedPvVoltage":380,"startVoltage":100,"pvOversizing":"160%","afciIntegrated":true,"sgReadyHeatPump":true,"aiTOU":true,"vppIntegration":true,"noiseTypical":"<65dB(A)"}
  },
  {
    id: 'solis-hv-15k',
    brand: 'Solis (Ginlong) — HV Series',
    series: 'S6-EH3P(15-30)K-H',
    model: 'S6-EH3P15K-H',
    ratedW: 15000,
    type: 'HV',
    phase: '3-phase',
    batteryV: { min: 120, max: 600 },
    batteryType: 'Li-ion',
    maxPVPower: 22500,
    mpptRange: { min: 200, max: 850 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 26,
    maxIscPerMPPT: 35,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2},
    maxStrings: 4,
    maxChargeCurrent: 240,
    maxDischargeCurrent: 240,
    maxChargePower: 15000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 21.7,
    maxOutputA: 21.7,
    maxAcPassthroughA: 80,
    maxEff: 0.983,
    euEff: 0.975,
    batChargeEffPv: 0.97,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 22500,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP66',
    cooling: 'Smart-Air',
    topology: 'Transformerless',
    dims: { w: 520, h: 680, d: 270 },
    weight: 48,
    tempRange: [-25, 60],
    altitude: 3000,
    comm: ["CAN","RS485","WiFi"],
    display: 'LCD+APP',
    wifiOpt: true,
    lanOpt: true,
    gprsOpt: false,
    certs: ["IEC62109","EN50549","VDE4105","CEI0-21"],
    parallel: 6,
    vendorExtras: {}
  },
  {
    id: 'solis-hv-20k',
    brand: 'Solis (Ginlong) — HV Series',
    series: 'S6-EH3P(15-30)K-H',
    model: 'S6-EH3P20K-H',
    ratedW: 20000,
    type: 'HV',
    phase: '3-phase',
    batteryV: { min: 120, max: 600 },
    batteryType: 'Li-ion',
    maxPVPower: 30000,
    mpptRange: { min: 200, max: 850 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 26,
    maxIscPerMPPT: 35,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2},
    maxStrings: 4,
    maxChargeCurrent: 320,
    maxDischargeCurrent: 320,
    maxChargePower: 20000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 28.9,
    maxOutputA: 28.9,
    maxAcPassthroughA: 80,
    maxEff: 0.983,
    euEff: 0.975,
    batChargeEffPv: 0.97,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 30000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP66',
    cooling: 'Smart-Air',
    topology: 'Transformerless',
    dims: { w: 520, h: 680, d: 270 },
    weight: 48,
    tempRange: [-25, 60],
    altitude: 3000,
    comm: ["CAN","RS485","WiFi"],
    display: 'LCD+APP',
    wifiOpt: true,
    lanOpt: true,
    gprsOpt: false,
    certs: ["IEC62109","EN50549","VDE4105","CEI0-21"],
    parallel: 6,
    vendorExtras: {}
  },
  {
    id: 'solis-hv-30k',
    brand: 'Solis (Ginlong) — HV Series',
    series: 'S6-EH3P(15-30)K-H',
    model: 'S6-EH3P30K-H',
    ratedW: 30000,
    type: 'HV',
    phase: '3-phase',
    batteryV: { min: 120, max: 600 },
    batteryType: 'Li-ion',
    maxPVPower: 45000,
    mpptRange: { min: 200, max: 850 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 26,
    maxIscPerMPPT: 35,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2},
    maxStrings: 4,
    maxChargeCurrent: 480,
    maxDischargeCurrent: 480,
    maxChargePower: 30000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 43.5,
    maxOutputA: 43.5,
    maxAcPassthroughA: 80,
    maxEff: 0.983,
    euEff: 0.975,
    batChargeEffPv: 0.97,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 45000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP66',
    cooling: 'Smart-Air',
    topology: 'Transformerless',
    dims: { w: 520, h: 680, d: 270 },
    weight: 48,
    tempRange: [-25, 60],
    altitude: 3000,
    comm: ["CAN","RS485","WiFi"],
    display: 'LCD+APP',
    wifiOpt: true,
    lanOpt: true,
    gprsOpt: false,
    certs: ["IEC62109","EN50549","VDE4105","CEI0-21"],
    parallel: 6,
    vendorExtras: {}
  },
  {
    id: 'solis-hv-12k-4m',
    brand: 'Solis (Ginlong) — HV Series',
    series: 'S6-EH3P(12-20)K-H (4-MPPT)',
    model: 'S6-EH3P12K-H',
    ratedW: 12000,
    type: 'HV',
    phase: '3-phase',
    batteryV: { min: 120, max: 800 },
    batteryType: 'Li-ion',
    maxPVPower: 24000,
    mpptRange: { min: 200, max: 850 },
    mpptCount: 4,
    maxInputCurrentPerMPPT: 20,
    maxIscPerMPPT: 30,
    maxStringsPerMPPT: {"mppt1":1,"mppt2":1,"mppt3":1,"mppt4":1},
    maxStrings: 4,
    maxChargeCurrent: 50,
    maxDischargeCurrent: 50,
    maxChargePower: 12000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 17.3,
    ratedOutputA220: 18.2,
    maxOutputA: 18.2,
    maxAcPassthroughA: 18,
    maxEff: 0.977,
    euEff: 0.975,
    batChargeEffPv: 0.985,
    batChargeEffAc: 0.972,
    batDischargeEff: 0.972,
    surgePower: 24000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP66',
    cooling: 'Intelligent-Fan',
    topology: 'Transformerless',
    dims: { w: 563, h: 546, d: 250 },
    weight: 35.2,
    tempRange: [-25, 60],
    altitude: 2000,
    comm: ["CAN","RS485","Ethernet","WiFi"],
    display: '7in-LCD+BT+APP',
    wifiOpt: false,
    lanOpt: true,
    gprsOpt: true,
    certs: ["IEC62109","IEC62116","IEC61727","EN50549","VDE4105"],
    parallel: 6,
    vendorExtras: {"maxPvVoltage":1000,"ratedPvVoltage":600,"startVoltage":160,"pvOversizing":"200%","maxPhaseImbalancePercent":100,"maxPowerPerPhasePercent_12_15k":50,"maxPowerPerPhasePercent_20k":40,"surgeOverload_20k":"160%/10s","peakShaving":true,"unbalancedLoadSupport":true,"selfConsumption":"25W","noiseTypical":"<65dB(A)"}
  },
  {
    id: 'solis-hv-15k-4m',
    brand: 'Solis (Ginlong) — HV Series',
    series: 'S6-EH3P(12-20)K-H (4-MPPT)',
    model: 'S6-EH3P15K-H',
    ratedW: 15000,
    type: 'HV',
    phase: '3-phase',
    batteryV: { min: 120, max: 800 },
    batteryType: 'Li-ion',
    maxPVPower: 30000,
    mpptRange: { min: 200, max: 850 },
    mpptCount: 4,
    maxInputCurrentPerMPPT: 20,
    maxIscPerMPPT: 30,
    maxStringsPerMPPT: {"mppt1":1,"mppt2":1,"mppt3":1,"mppt4":1},
    maxStrings: 4,
    maxChargeCurrent: 50,
    maxDischargeCurrent: 50,
    maxChargePower: 15000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 21.7,
    ratedOutputA220: 22.8,
    maxOutputA: 22.8,
    maxAcPassthroughA: 23,
    maxEff: 0.977,
    euEff: 0.975,
    batChargeEffPv: 0.985,
    batChargeEffAc: 0.972,
    batDischargeEff: 0.972,
    surgePower: 30000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP66',
    cooling: 'Intelligent-Fan',
    topology: 'Transformerless',
    dims: { w: 563, h: 546, d: 250 },
    weight: 35.2,
    tempRange: [-25, 60],
    altitude: 2000,
    comm: ["CAN","RS485","Ethernet","WiFi"],
    display: '7in-LCD+BT+APP',
    wifiOpt: false,
    lanOpt: true,
    gprsOpt: true,
    certs: ["IEC62109","IEC62116","IEC61727","EN50549","VDE4105"],
    parallel: 6,
    vendorExtras: {"maxPvVoltage":1000,"ratedPvVoltage":600,"startVoltage":160,"pvOversizing":"200%","maxPhaseImbalancePercent":100,"maxPowerPerPhasePercent_12_15k":50,"maxPowerPerPhasePercent_20k":40,"surgeOverload_20k":"160%/10s","peakShaving":true,"unbalancedLoadSupport":true,"selfConsumption":"25W","noiseTypical":"<65dB(A)"}
  },
  {
    id: 'solis-hv-20k-4m',
    brand: 'Solis (Ginlong) — HV Series',
    series: 'S6-EH3P(12-20)K-H (4-MPPT)',
    model: 'S6-EH3P20K-H',
    ratedW: 20000,
    type: 'HV',
    phase: '3-phase',
    batteryV: { min: 120, max: 800 },
    batteryType: 'Li-ion',
    maxPVPower: 40000,
    mpptRange: { min: 200, max: 850 },
    mpptCount: 4,
    maxInputCurrentPerMPPT: 20,
    maxIscPerMPPT: 30,
    maxStringsPerMPPT: {"mppt1":1,"mppt2":1,"mppt3":1,"mppt4":1},
    maxStrings: 4,
    maxChargeCurrent: 50,
    maxDischargeCurrent: 50,
    maxChargePower: 20000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 28.9,
    ratedOutputA220: 30.4,
    maxOutputA: 30.4,
    maxAcPassthroughA: 30,
    maxEff: 0.977,
    euEff: 0.975,
    batChargeEffPv: 0.985,
    batChargeEffAc: 0.972,
    batDischargeEff: 0.972,
    surgePower: 32000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP66',
    cooling: 'Intelligent-Fan',
    topology: 'Transformerless',
    dims: { w: 563, h: 546, d: 250 },
    weight: 35.2,
    tempRange: [-25, 60],
    altitude: 2000,
    comm: ["CAN","RS485","Ethernet","WiFi"],
    display: '7in-LCD+BT+APP',
    wifiOpt: false,
    lanOpt: true,
    gprsOpt: true,
    certs: ["IEC62109","IEC62116","IEC61727","EN50549","VDE4105"],
    parallel: 6,
    vendorExtras: {"maxPvVoltage":1000,"ratedPvVoltage":600,"startVoltage":160,"pvOversizing":"200%","maxPhaseImbalancePercent":100,"maxPowerPerPhasePercent_12_15k":50,"maxPowerPerPhasePercent_20k":40,"surgeOverload_20k":"160%/10s","peakShaving":true,"unbalancedLoadSupport":true,"selfConsumption":"25W","noiseTypical":"<65dB(A)"}
  },
  {
    id: 'solis-hv-29k9',
    brand: 'Solis (Ginlong) — HV Series',
    series: 'S6-EH3P(29.9-50)K-H',
    model: 'S6-EH3P29.9K-H',
    ratedW: 29900,
    type: 'HV',
    phase: '3-phase',
    batteryV: { min: 150, max: 800 },
    batteryType: 'Li-ion',
    maxPVPower: 59800,
    mpptRange: { min: 150, max: 850 },
    mpptCount: 3,
    maxInputCurrentPerMPPT: 40,
    maxIscPerMPPT: 60,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2,"mppt3":2},
    maxStrings: 6,
    maxChargeCurrent: 140,
    maxDischargeCurrent: 140,
    maxChargePower: 32100,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 45.4,
    maxOutputA: 45.4,
    maxAcPassthroughA: 91.2,
    maxEff: 0.978,
    euEff: 0.974,
    batChargeEffPv: 0.985,
    batChargeEffAc: 0.975,
    batDischargeEff: 0.975,
    surgePower: 47840,
    surgeTimeSec: 2,
    switchTimeMs: 10,
    ip: 'IP66',
    cooling: 'Intelligent-Fan',
    topology: 'Transformerless',
    dims: { w: 530, h: 880, d: 290 },
    weight: 73,
    tempRange: [-25, 60],
    altitude: 4000,
    comm: ["CAN","RS485","Ethernet"],
    display: 'LCD+BT+APP',
    wifiOpt: true,
    lanOpt: true,
    gprsOpt: true,
    certs: ["IEC62109","EN50549","VDE4105","CEI0-21"],
    parallel: 10,
    vendorExtras: {"maxPvVoltage":1000,"ratedPvVoltage":600,"startVoltage":180,"batteryPorts":2,"maxChargePerPort":70,"generatorSupport":true,"generatorRange":"10-50kVA","backupOverload":"160% / 2s","pvOversizing":"200%"}
  },
  {
    id: 'solis-hv-30k-h2',
    brand: 'Solis (Ginlong) — HV Series',
    series: 'S6-EH3P(29.9-50)K-H',
    model: 'S6-EH3P30K-H',
    ratedW: 30000,
    type: 'HV',
    phase: '3-phase',
    batteryV: { min: 150, max: 800 },
    batteryType: 'Li-ion',
    maxPVPower: 60000,
    mpptRange: { min: 150, max: 850 },
    mpptCount: 3,
    maxInputCurrentPerMPPT: 40,
    maxIscPerMPPT: 60,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2,"mppt3":2},
    maxStrings: 6,
    maxChargeCurrent: 140,
    maxDischargeCurrent: 140,
    maxChargePower: 33000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 45.6,
    maxOutputA: 45.6,
    maxAcPassthroughA: 91.2,
    maxEff: 0.978,
    euEff: 0.974,
    batChargeEffPv: 0.985,
    batChargeEffAc: 0.975,
    batDischargeEff: 0.975,
    surgePower: 48000,
    surgeTimeSec: 2,
    switchTimeMs: 10,
    ip: 'IP66',
    cooling: 'Intelligent-Fan',
    topology: 'Transformerless',
    dims: { w: 530, h: 880, d: 290 },
    weight: 73,
    tempRange: [-25, 60],
    altitude: 4000,
    comm: ["CAN","RS485","Ethernet"],
    display: 'LCD+BT+APP',
    wifiOpt: true,
    lanOpt: true,
    gprsOpt: true,
    certs: ["IEC62109","EN50549","VDE4105","CEI0-21"],
    parallel: 10,
    vendorExtras: {"maxPvVoltage":1000,"ratedPvVoltage":600,"startVoltage":180,"batteryPorts":2,"maxChargePerPort":70,"generatorSupport":true,"generatorRange":"10-50kVA","backupOverload":"160% / 2s","pvOversizing":"200%"}
  },
  {
    id: 'solis-hv-40k-h2',
    brand: 'Solis (Ginlong) — HV Series',
    series: 'S6-EH3P(29.9-50)K-H',
    model: 'S6-EH3P40K-H',
    ratedW: 40000,
    type: 'HV',
    phase: '3-phase',
    batteryV: { min: 150, max: 800 },
    batteryType: 'Li-ion',
    maxPVPower: 80000,
    mpptRange: { min: 150, max: 850 },
    mpptCount: 3,
    maxInputCurrentPerMPPT: 40,
    maxIscPerMPPT: 60,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2,"mppt3":2},
    maxStrings: 6,
    maxChargeCurrent: 140,
    maxDischargeCurrent: 140,
    maxChargePower: 44000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 60.8,
    maxOutputA: 60.8,
    maxAcPassthroughA: 152,
    maxEff: 0.978,
    euEff: 0.974,
    batChargeEffPv: 0.985,
    batChargeEffAc: 0.975,
    batDischargeEff: 0.975,
    surgePower: 64000,
    surgeTimeSec: 2,
    switchTimeMs: 10,
    ip: 'IP66',
    cooling: 'Intelligent-Fan',
    topology: 'Transformerless',
    dims: { w: 530, h: 880, d: 290 },
    weight: 73,
    tempRange: [-25, 60],
    altitude: 4000,
    comm: ["CAN","RS485","Ethernet"],
    display: 'LCD+BT+APP',
    wifiOpt: true,
    lanOpt: true,
    gprsOpt: true,
    certs: ["IEC62109","EN50549","VDE4105","CEI0-21"],
    parallel: 10,
    vendorExtras: {"maxPvVoltage":1000,"ratedPvVoltage":600,"startVoltage":180,"batteryPorts":2,"maxChargePerPort":70,"generatorSupport":true,"generatorRange":"10-50kVA","backupOverload":"160% / 2s","pvOversizing":"200%"}
  },
  {
    id: 'solis-hv-50k-h2',
    brand: 'Solis (Ginlong) — HV Series',
    series: 'S6-EH3P(29.9-50)K-H',
    model: 'S6-EH3P50K-H',
    ratedW: 50000,
    type: 'HV',
    phase: '3-phase',
    batteryV: { min: 150, max: 800 },
    batteryType: 'Li-ion',
    maxPVPower: 96000,
    mpptRange: { min: 150, max: 850 },
    mpptCount: 4,
    maxInputCurrentPerMPPT: 40,
    maxIscPerMPPT: 60,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2,"mppt3":2,"mppt4":2},
    maxStrings: 8,
    maxChargeCurrent: 140,
    maxDischargeCurrent: 140,
    maxChargePower: 55000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 76,
    maxOutputA: 76,
    maxAcPassthroughA: 152,
    maxEff: 0.978,
    euEff: 0.974,
    batChargeEffPv: 0.985,
    batChargeEffAc: 0.975,
    batDischargeEff: 0.975,
    surgePower: 80000,
    surgeTimeSec: 2,
    switchTimeMs: 10,
    ip: 'IP66',
    cooling: 'Intelligent-Fan',
    topology: 'Transformerless',
    dims: { w: 530, h: 880, d: 290 },
    weight: 73,
    tempRange: [-25, 60],
    altitude: 4000,
    comm: ["CAN","RS485","Ethernet"],
    display: 'LCD+BT+APP',
    wifiOpt: true,
    lanOpt: true,
    gprsOpt: true,
    certs: ["IEC62109","EN50549","VDE4105","CEI0-21"],
    parallel: 10,
    vendorExtras: {"maxPvVoltage":1000,"ratedPvVoltage":600,"startVoltage":180,"batteryPorts":2,"maxChargePerPort":70,"generatorSupport":true,"generatorRange":"10-50kVA","backupOverload":"160% / 2s","pvOversizing":"200%"}
  },
  {
    id: 'solis-hv-75k-nv',
    brand: 'Solis (Ginlong) — HV Series',
    series: 'S6-EH3P(75-125)K10-NV-YD-H',
    model: 'S6-EH3P75K10-NV-YD-H',
    ratedW: 75000,
    type: 'HV',
    phase: '3-phase',
    batteryV: { min: 300, max: 950 },
    batteryType: 'Li-ion',
    maxPVPower: 150000,
    mpptRange: { min: 150, max: 950 },
    mpptCount: 10,
    maxInputCurrentPerMPPT: 42,
    maxIscPerMPPT: 60,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2,"mppt3":2,"mppt4":2,"mppt5":2,"mppt6":2,"mppt7":2,"mppt8":2,"mppt9":2,"mppt10":2},
    maxStrings: 20,
    maxChargeCurrent: 200,
    maxDischargeCurrent: 200,
    maxChargePower: 75000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 114,
    maxOutputA: 114,
    maxAcPassthroughA: 250,
    maxEff: 0.975,
    euEff: 0.972,
    batChargeEffPv: 0.982,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 120000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP66',
    cooling: 'Intelligent-Redundant-Fan',
    topology: 'Transformerless',
    dims: { w: 1174, h: 814, d: 400 },
    weight: 170,
    tempRange: [-25, 60],
    altitude: 3000,
    comm: ["WiFi","LAN","Bluetooth","CAN","RS485","DRM"],
    display: '7in-LCD+BT+APP',
    wifiOpt: false,
    lanOpt: false,
    gprsOpt: true,
    certs: ["IEC62109","EN50549","VDE4105","CEI0-21"],
    parallel: 16,
    vendorExtras: {"maxPvVoltage":1000,"ratedPvVoltage":600,"startVoltage":180,"batteryPorts":2,"bmsPorts":2,"maxChargePerPort":100,"generatorSupport":true,"threeInOneInterface":"PV+Wind+Diesel","pvOversizing":"200%","maxStringInputCurrent":21,"maxShortCircuitCurrentPerMppt":60,"batteryVoltageRange":"300-950V","batteryCapacityRange":"100-314Ah","surgeOverload_75_100k":"160%/10s, 200%/200ms off-grid","surgeOverload_125k":"140%/10s, 160%/200ms off-grid","maxPowerPerPhasePercent":33,"afciOptional":true,"selfConsumption":"45W","maxInputPowerAC_75k":150000,"maxInputPowerAC_80k":160000,"maxInputPowerAC_99k9":173200,"maxInputPowerAC_100k":173200,"maxInputPowerAC_125k":173200}
  },
  {
    id: 'solis-hv-80k-nv',
    brand: 'Solis (Ginlong) — HV Series',
    series: 'S6-EH3P(75-125)K10-NV-YD-H',
    model: 'S6-EH3P80K10-NV-YD-H',
    ratedW: 80000,
    type: 'HV',
    phase: '3-phase',
    batteryV: { min: 300, max: 950 },
    batteryType: 'Li-ion',
    maxPVPower: 160000,
    mpptRange: { min: 150, max: 950 },
    mpptCount: 10,
    maxInputCurrentPerMPPT: 42,
    maxIscPerMPPT: 60,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2,"mppt3":2,"mppt4":2,"mppt5":2,"mppt6":2,"mppt7":2,"mppt8":2,"mppt9":2,"mppt10":2},
    maxStrings: 20,
    maxChargeCurrent: 200,
    maxDischargeCurrent: 200,
    maxChargePower: 80000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 121.6,
    maxOutputA: 121.6,
    maxAcPassthroughA: 250,
    maxEff: 0.975,
    euEff: 0.972,
    batChargeEffPv: 0.982,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 128000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP66',
    cooling: 'Intelligent-Redundant-Fan',
    topology: 'Transformerless',
    dims: { w: 1174, h: 814, d: 400 },
    weight: 170,
    tempRange: [-25, 60],
    altitude: 3000,
    comm: ["WiFi","LAN","Bluetooth","CAN","RS485","DRM"],
    display: '7in-LCD+BT+APP',
    wifiOpt: false,
    lanOpt: false,
    gprsOpt: true,
    certs: ["IEC62109","EN50549","VDE4105","CEI0-21"],
    parallel: 16,
    vendorExtras: {"maxPvVoltage":1000,"ratedPvVoltage":600,"startVoltage":180,"batteryPorts":2,"bmsPorts":2,"maxChargePerPort":100,"generatorSupport":true,"threeInOneInterface":"PV+Wind+Diesel","pvOversizing":"200%","maxStringInputCurrent":21,"maxShortCircuitCurrentPerMppt":60,"batteryVoltageRange":"300-950V","batteryCapacityRange":"100-314Ah","surgeOverload_75_100k":"160%/10s, 200%/200ms off-grid","surgeOverload_125k":"140%/10s, 160%/200ms off-grid","maxPowerPerPhasePercent":33,"afciOptional":true,"selfConsumption":"45W","maxInputPowerAC_75k":150000,"maxInputPowerAC_80k":160000,"maxInputPowerAC_99k9":173200,"maxInputPowerAC_100k":173200,"maxInputPowerAC_125k":173200}
  },
  {
    id: 'solis-hv-99k9-nv',
    brand: 'Solis (Ginlong) — HV Series',
    series: 'S6-EH3P(75-125)K10-NV-YD-H',
    model: 'S6-EH3P99.9K10-NV-YD-H',
    ratedW: 99900,
    type: 'HV',
    phase: '3-phase',
    batteryV: { min: 300, max: 950 },
    batteryType: 'Li-ion',
    maxPVPower: 200000,
    mpptRange: { min: 150, max: 950 },
    mpptCount: 10,
    maxInputCurrentPerMPPT: 42,
    maxIscPerMPPT: 60,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2,"mppt3":2,"mppt4":2,"mppt5":2,"mppt6":2,"mppt7":2,"mppt8":2,"mppt9":2,"mppt10":2},
    maxStrings: 20,
    maxChargeCurrent: 200,
    maxDischargeCurrent: 200,
    maxChargePower: 99900,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 151.8,
    maxOutputA: 151.8,
    maxAcPassthroughA: 250,
    maxEff: 0.975,
    euEff: 0.972,
    batChargeEffPv: 0.982,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 159840,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP66',
    cooling: 'Intelligent-Redundant-Fan',
    topology: 'Transformerless',
    dims: { w: 1174, h: 814, d: 400 },
    weight: 170,
    tempRange: [-25, 60],
    altitude: 3000,
    comm: ["WiFi","LAN","Bluetooth","CAN","RS485","DRM"],
    display: '7in-LCD+BT+APP',
    wifiOpt: false,
    lanOpt: false,
    gprsOpt: true,
    certs: ["IEC62109","EN50549","VDE4105","CEI0-21"],
    parallel: 16,
    vendorExtras: {"maxPvVoltage":1000,"ratedPvVoltage":600,"startVoltage":180,"batteryPorts":2,"bmsPorts":2,"maxChargePerPort":100,"generatorSupport":true,"threeInOneInterface":"PV+Wind+Diesel","pvOversizing":"200%","maxStringInputCurrent":21,"maxShortCircuitCurrentPerMppt":60,"batteryVoltageRange":"300-950V","batteryCapacityRange":"100-314Ah","surgeOverload_75_100k":"160%/10s, 200%/200ms off-grid","surgeOverload_125k":"140%/10s, 160%/200ms off-grid","maxPowerPerPhasePercent":33,"afciOptional":true,"selfConsumption":"45W","maxInputPowerAC_75k":150000,"maxInputPowerAC_80k":160000,"maxInputPowerAC_99k9":173200,"maxInputPowerAC_100k":173200,"maxInputPowerAC_125k":173200}
  },
  {
    id: 'solis-hv-100k-nv',
    brand: 'Solis (Ginlong) — HV Series',
    series: 'S6-EH3P(75-125)K10-NV-YD-H',
    model: 'S6-EH3P100K10-NV-YD-H',
    ratedW: 100000,
    type: 'HV',
    phase: '3-phase',
    batteryV: { min: 300, max: 950 },
    batteryType: 'Li-ion',
    maxPVPower: 200000,
    mpptRange: { min: 150, max: 950 },
    mpptCount: 10,
    maxInputCurrentPerMPPT: 42,
    maxIscPerMPPT: 60,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2,"mppt3":2,"mppt4":2,"mppt5":2,"mppt6":2,"mppt7":2,"mppt8":2,"mppt9":2,"mppt10":2},
    maxStrings: 20,
    maxChargeCurrent: 200,
    maxDischargeCurrent: 200,
    maxChargePower: 100000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 151.9,
    maxOutputA: 151.9,
    maxAcPassthroughA: 250,
    maxEff: 0.975,
    euEff: 0.972,
    batChargeEffPv: 0.982,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 160000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP66',
    cooling: 'Intelligent-Redundant-Fan',
    topology: 'Transformerless',
    dims: { w: 1174, h: 814, d: 400 },
    weight: 170,
    tempRange: [-25, 60],
    altitude: 3000,
    comm: ["WiFi","LAN","Bluetooth","CAN","RS485","DRM"],
    display: '7in-LCD+BT+APP',
    wifiOpt: false,
    lanOpt: false,
    gprsOpt: true,
    certs: ["IEC62109","EN50549","VDE4105","CEI0-21"],
    parallel: 16,
    vendorExtras: {"maxPvVoltage":1000,"ratedPvVoltage":600,"startVoltage":180,"batteryPorts":2,"bmsPorts":2,"maxChargePerPort":100,"generatorSupport":true,"threeInOneInterface":"PV+Wind+Diesel","pvOversizing":"200%","maxStringInputCurrent":21,"maxShortCircuitCurrentPerMppt":60,"batteryVoltageRange":"300-950V","batteryCapacityRange":"100-314Ah","surgeOverload_75_100k":"160%/10s, 200%/200ms off-grid","surgeOverload_125k":"140%/10s, 160%/200ms off-grid","maxPowerPerPhasePercent":33,"afciOptional":true,"selfConsumption":"45W","maxInputPowerAC_75k":150000,"maxInputPowerAC_80k":160000,"maxInputPowerAC_99k9":173200,"maxInputPowerAC_100k":173200,"maxInputPowerAC_125k":173200}
  },
  {
    id: 'solis-hv-125k-nv',
    brand: 'Solis (Ginlong) — HV Series',
    series: 'S6-EH3P(75-125)K10-NV-YD-H',
    model: 'S6-EH3P125K10-NV-YD-H',
    ratedW: 125000,
    type: 'HV',
    phase: '3-phase',
    batteryV: { min: 300, max: 950 },
    batteryType: 'Li-ion',
    maxPVPower: 250000,
    mpptRange: { min: 150, max: 950 },
    mpptCount: 10,
    maxInputCurrentPerMPPT: 42,
    maxIscPerMPPT: 60,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2,"mppt3":2,"mppt4":2,"mppt5":2,"mppt6":2,"mppt7":2,"mppt8":2,"mppt9":2,"mppt10":2},
    maxStrings: 20,
    maxChargeCurrent: 200,
    maxDischargeCurrent: 200,
    maxChargePower: 125000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 189.9,
    maxOutputA: 189.9,
    maxAcPassthroughA: 250,
    maxEff: 0.975,
    euEff: 0.972,
    batChargeEffPv: 0.982,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 200000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP66',
    cooling: 'Intelligent-Redundant-Fan',
    topology: 'Transformerless',
    dims: { w: 1174, h: 814, d: 400 },
    weight: 170,
    tempRange: [-25, 60],
    altitude: 3000,
    comm: ["WiFi","LAN","Bluetooth","CAN","RS485","DRM"],
    display: '7in-LCD+BT+APP',
    wifiOpt: false,
    lanOpt: false,
    gprsOpt: true,
    certs: ["IEC62109","EN50549","VDE4105","CEI0-21"],
    parallel: 16,
    vendorExtras: {"maxPvVoltage":1000,"ratedPvVoltage":600,"startVoltage":180,"batteryPorts":2,"bmsPorts":2,"maxChargePerPort":100,"generatorSupport":true,"threeInOneInterface":"PV+Wind+Diesel","pvOversizing":"200%","maxStringInputCurrent":21,"maxShortCircuitCurrentPerMppt":60,"batteryVoltageRange":"300-950V","batteryCapacityRange":"100-314Ah","surgeOverload_75_100k":"160%/10s, 200%/200ms off-grid","surgeOverload_125k":"140%/10s, 160%/200ms off-grid","maxPowerPerPhasePercent":33,"afciOptional":true,"selfConsumption":"45W","maxInputPowerAC_75k":150000,"maxInputPowerAC_80k":160000,"maxInputPowerAC_99k9":173200,"maxInputPowerAC_100k":173200,"maxInputPowerAC_125k":173200}
  },
  {
    id: 'axpert-8k',
    brand: 'Voltronic Power',
    series: 'Axpert Ultra',
    model: 'Axpert Ultra 8K',
    ratedW: 8000,
    type: 'LV',
    phase: '1-phase',
    batteryV: { min: 40, max: 63 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 10000,
    mpptRange: { min: 90, max: 450 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 27,
    maxIscPerMPPT: 40,
    maxStringsPerMPPT: {"mppt1":1,"mppt2":1},
    maxStrings: 2,
    maxChargeCurrent: 150,
    maxDischargeCurrent: 150,
    maxChargePower: 8000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 34.8,
    maxOutputA: 34.8,
    maxAcPassthroughA: 60,
    maxEff: 0.93,
    euEff: 0.93,
    batChargeEffPv: 0.93,
    batChargeEffAc: 0.93,
    batDischargeEff: 0.93,
    surgePower: 16000,
    surgeTimeSec: 5,
    switchTimeMs: 10,
    ip: 'IP20',
    cooling: 'Fan',
    topology: 'LF-Isolation',
    dims: { w: 438, h: 554, d: 145 },
    weight: 18.4,
    tempRange: [-10, 50],
    altitude: 2000,
    comm: ["USB","RS232","RS485","WiFi","CAN","BTS"],
    display: '2.8in-Color-LCD',
    wifiOpt: true,
    lanOpt: false,
    gprsOpt: false,
    certs: ["CE"],
    parallel: 6,
    vendorExtras: {"dualOutput":true,"ctSensor":true,"acInputUpsRange":[170,280],"acInputApplianceRange":[90,280],"gfciOptional":true,"afciOptional":true,"rapidShutdownOptional":true,"startVoltageV":80}
  },
  {
    id: 'axpert-11k',
    brand: 'Voltronic Power',
    series: 'Axpert Ultra',
    model: 'Axpert Ultra 11K',
    ratedW: 11000,
    type: 'LV',
    phase: '1-phase',
    batteryV: { min: 40, max: 63 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 12000,
    mpptRange: { min: 90, max: 450 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 27,
    maxIscPerMPPT: 40,
    maxStringsPerMPPT: {"mppt1":1,"mppt2":1},
    maxStrings: 2,
    maxChargeCurrent: 150,
    maxDischargeCurrent: 150,
    maxChargePower: 11000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 47.8,
    maxOutputA: 47.8,
    maxAcPassthroughA: 60,
    maxEff: 0.93,
    euEff: 0.93,
    batChargeEffPv: 0.93,
    batChargeEffAc: 0.93,
    batDischargeEff: 0.93,
    surgePower: 22000,
    surgeTimeSec: 5,
    switchTimeMs: 10,
    ip: 'IP20',
    cooling: 'Fan',
    topology: 'LF-Isolation',
    dims: { w: 438, h: 554, d: 145 },
    weight: 18.4,
    tempRange: [-10, 50],
    altitude: 2000,
    comm: ["USB","RS232","RS485","WiFi","CAN","BTS"],
    display: '2.8in-Color-LCD',
    wifiOpt: true,
    lanOpt: false,
    gprsOpt: false,
    certs: ["CE"],
    parallel: 6,
    vendorExtras: {"dualOutput":true,"ctSensor":true,"acInputUpsRange":[170,280],"acInputApplianceRange":[90,280],"gfciOptional":true,"afciOptional":true,"rapidShutdownOptional":true,"startVoltageV":80}
  },
  {
    id: 'g2s-3k',
    brand: 'Megarevo (Revo)',
    series: 'G2S Series',
    model: 'R3KL1DA-G2S',
    ratedW: 3000,
    type: 'LV',
    phase: '1-phase',
    batteryV: { min: 40, max: 58 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 4500,
    mpptRange: { min: 100, max: 430 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 16,
    maxIscPerMPPT: 24,
    maxStringsPerMPPT: {"mppt1":1,"mppt2":1},
    maxStrings: 2,
    maxChargeCurrent: 60,
    maxDischargeCurrent: 60,
    maxChargePower: 3000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 13,
    maxOutputA: 14.3,
    maxAcPassthroughA: 39,
    maxEff: 0.98,
    euEff: 0.965,
    batChargeEffPv: 0.96,
    batChargeEffAc: 0.96,
    batDischargeEff: 0.96,
    surgePower: 4500,
    surgeTimeSec: 0.1,
    switchTimeMs: 20,
    ip: 'IP65',
    cooling: 'Natural',
    topology: 'Non-Isolated',
    dims: { w: 476, h: 477, d: 215 },
    weight: 20.5,
    tempRange: [-25, 60],
    altitude: 2000,
    comm: ["RS485","CAN"],
    display: 'LCD(opt)',
    wifiOpt: true,
    lanOpt: true,
    gprsOpt: true,
    certs: ["IEC62109","IEC61000","EN50549","NRS097"],
    parallel: 6,
    vendorExtras: {"parallelMax":6,"acCoupling":true,"generatorPortOptional":true,"maxDcInputVoltage":550,"startVoltage":100,"ratedPvVoltage":360}
  },
  {
    id: 'g2s-3k6',
    brand: 'Megarevo (Revo)',
    series: 'G2S Series',
    model: 'R3K6L1DA-G2S',
    ratedW: 3680,
    type: 'LV',
    phase: '1-phase',
    batteryV: { min: 40, max: 58 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 5400,
    mpptRange: { min: 100, max: 430 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 16,
    maxIscPerMPPT: 24,
    maxStringsPerMPPT: {"mppt1":1,"mppt2":1},
    maxStrings: 2,
    maxChargeCurrent: 72,
    maxDischargeCurrent: 72,
    maxChargePower: 3680,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 16,
    maxOutputA: 16,
    maxAcPassthroughA: 39,
    maxEff: 0.98,
    euEff: 0.965,
    batChargeEffPv: 0.96,
    batChargeEffAc: 0.96,
    batDischargeEff: 0.96,
    surgePower: 5520,
    surgeTimeSec: 0.1,
    switchTimeMs: 20,
    ip: 'IP65',
    cooling: 'Natural',
    topology: 'Non-Isolated',
    dims: { w: 476, h: 477, d: 215 },
    weight: 20.5,
    tempRange: [-25, 60],
    altitude: 2000,
    comm: ["RS485","CAN"],
    display: 'LCD(opt)',
    wifiOpt: true,
    lanOpt: true,
    gprsOpt: true,
    certs: ["IEC62109","IEC61000","EN50549","NRS097"],
    parallel: 6,
    vendorExtras: {"parallelMax":6,"acCoupling":true,"generatorPortOptional":true,"maxDcInputVoltage":550,"startVoltage":100,"ratedPvVoltage":360}
  },
  {
    id: 'g2s-4k',
    brand: 'Megarevo (Revo)',
    series: 'G2S Series',
    model: 'R4KL1DA-G2S',
    ratedW: 4000,
    type: 'LV',
    phase: '1-phase',
    batteryV: { min: 40, max: 58 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 6000,
    mpptRange: { min: 100, max: 430 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 16,
    maxIscPerMPPT: 24,
    maxStringsPerMPPT: {"mppt1":1,"mppt2":1},
    maxStrings: 2,
    maxChargeCurrent: 80,
    maxDischargeCurrent: 80,
    maxChargePower: 4000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 17.4,
    maxOutputA: 19.1,
    maxAcPassthroughA: 39,
    maxEff: 0.98,
    euEff: 0.965,
    batChargeEffPv: 0.96,
    batChargeEffAc: 0.96,
    batDischargeEff: 0.96,
    surgePower: 6000,
    surgeTimeSec: 0.1,
    switchTimeMs: 20,
    ip: 'IP65',
    cooling: 'Natural',
    topology: 'Non-Isolated',
    dims: { w: 476, h: 477, d: 215 },
    weight: 20.5,
    tempRange: [-25, 60],
    altitude: 2000,
    comm: ["RS485","CAN"],
    display: 'LCD(opt)',
    wifiOpt: true,
    lanOpt: true,
    gprsOpt: true,
    certs: ["IEC62109","IEC61000","EN50549","NRS097"],
    parallel: 6,
    vendorExtras: {"parallelMax":6,"acCoupling":true,"generatorPortOptional":true,"maxDcInputVoltage":550,"startVoltage":100,"ratedPvVoltage":360}
  },
  {
    id: 'g2s-4k6',
    brand: 'Megarevo (Revo)',
    series: 'G2S Series',
    model: 'R4K6L1DA-G2S',
    ratedW: 4600,
    type: 'LV',
    phase: '1-phase',
    batteryV: { min: 40, max: 58 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 6900,
    mpptRange: { min: 100, max: 430 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 16,
    maxIscPerMPPT: 24,
    maxStringsPerMPPT: {"mppt1":1,"mppt2":1},
    maxStrings: 2,
    maxChargeCurrent: 92,
    maxDischargeCurrent: 92,
    maxChargePower: 4600,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 20,
    maxOutputA: 20,
    maxAcPassthroughA: 39,
    maxEff: 0.98,
    euEff: 0.965,
    batChargeEffPv: 0.96,
    batChargeEffAc: 0.96,
    batDischargeEff: 0.96,
    surgePower: 6900,
    surgeTimeSec: 0.1,
    switchTimeMs: 20,
    ip: 'IP65',
    cooling: 'Natural',
    topology: 'Non-Isolated',
    dims: { w: 476, h: 477, d: 215 },
    weight: 20.5,
    tempRange: [-25, 60],
    altitude: 2000,
    comm: ["RS485","CAN"],
    display: 'LCD(opt)',
    wifiOpt: true,
    lanOpt: true,
    gprsOpt: true,
    certs: ["IEC62109","IEC61000","EN50549","NRS097"],
    parallel: 6,
    vendorExtras: {"parallelMax":6,"acCoupling":true,"generatorPortOptional":true,"maxDcInputVoltage":550,"startVoltage":100,"ratedPvVoltage":360}
  },
  {
    id: 'g2s-5k',
    brand: 'Megarevo (Revo)',
    series: 'G2S Series',
    model: 'R5KL1DA-G2S',
    ratedW: 5000,
    type: 'LV',
    phase: '1-phase',
    batteryV: { min: 40, max: 58 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 7500,
    mpptRange: { min: 100, max: 430 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 16,
    maxIscPerMPPT: 24,
    maxStringsPerMPPT: {"mppt1":1,"mppt2":1},
    maxStrings: 2,
    maxChargeCurrent: 100,
    maxDischargeCurrent: 100,
    maxChargePower: 5000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 21.7,
    maxOutputA: 21.7,
    maxAcPassthroughA: 39,
    maxEff: 0.98,
    euEff: 0.965,
    batChargeEffPv: 0.96,
    batChargeEffAc: 0.96,
    batDischargeEff: 0.96,
    surgePower: 7500,
    surgeTimeSec: 0.1,
    switchTimeMs: 20,
    ip: 'IP65',
    cooling: 'Natural',
    topology: 'Non-Isolated',
    dims: { w: 476, h: 477, d: 215 },
    weight: 20.5,
    tempRange: [-25, 60],
    altitude: 2000,
    comm: ["RS485","CAN"],
    display: 'LCD(opt)',
    wifiOpt: true,
    lanOpt: true,
    gprsOpt: true,
    certs: ["IEC62109","IEC61000","EN50549","NRS097"],
    parallel: 6,
    vendorExtras: {"parallelMax":6,"acCoupling":true,"generatorPortOptional":true,"maxDcInputVoltage":550,"startVoltage":100,"ratedPvVoltage":360}
  },
  {
    id: 'g2s-6k',
    brand: 'Megarevo (Revo)',
    series: 'G2S Series',
    model: 'R6KL1DA-G2S',
    ratedW: 6000,
    type: 'LV',
    phase: '1-phase',
    batteryV: { min: 40, max: 58 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 9000,
    mpptRange: { min: 100, max: 430 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 16,
    maxIscPerMPPT: 24,
    maxStringsPerMPPT: {"mppt1":1,"mppt2":1},
    maxStrings: 2,
    maxChargeCurrent: 120,
    maxDischargeCurrent: 120,
    maxChargePower: 6000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 26.1,
    maxOutputA: 28.7,
    maxAcPassthroughA: 39,
    maxEff: 0.98,
    euEff: 0.965,
    batChargeEffPv: 0.96,
    batChargeEffAc: 0.96,
    batDischargeEff: 0.96,
    surgePower: 9000,
    surgeTimeSec: 0.1,
    switchTimeMs: 20,
    ip: 'IP65',
    cooling: 'Natural',
    topology: 'Non-Isolated',
    dims: { w: 476, h: 477, d: 215 },
    weight: 20.7,
    tempRange: [-25, 60],
    altitude: 2000,
    comm: ["RS485","CAN"],
    display: 'LCD(opt)',
    wifiOpt: true,
    lanOpt: true,
    gprsOpt: true,
    certs: ["IEC62109","IEC61000","EN50549","NRS097"],
    parallel: 6,
    vendorExtras: {"parallelMax":6,"acCoupling":true,"generatorPortOptional":true,"maxDcInputVoltage":550,"startVoltage":100,"ratedPvVoltage":360}
  },
  {
    id: 'g2s-8k',
    brand: 'Megarevo (Revo)',
    series: 'G2S Series',
    model: 'R8KL1DA-G2S',
    ratedW: 8000,
    type: 'LV',
    phase: '1-phase',
    batteryV: { min: 40, max: 58 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 12000,
    mpptRange: { min: 100, max: 430 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 16,
    maxIscPerMPPT: 24,
    maxStringsPerMPPT: {"mppt1":1,"mppt2":2},
    maxStrings: 3,
    maxChargeCurrent: 160,
    maxDischargeCurrent: 160,
    maxChargePower: 8000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 34.8,
    maxOutputA: 38.3,
    maxAcPassthroughA: 43,
    maxEff: 0.98,
    euEff: 0.965,
    batChargeEffPv: 0.956,
    batChargeEffAc: 0.956,
    batDischargeEff: 0.956,
    surgePower: 12000,
    surgeTimeSec: 0.1,
    switchTimeMs: 20,
    ip: 'IP65',
    cooling: 'Fan',
    topology: 'Non-Isolated',
    dims: { w: 476, h: 477, d: 215 },
    weight: 25.8,
    tempRange: [-25, 60],
    altitude: 2000,
    comm: ["RS485","CAN"],
    display: 'LCD(opt)',
    wifiOpt: true,
    lanOpt: true,
    gprsOpt: true,
    certs: ["IEC62109","IEC61000","EN50549","NRS097"],
    parallel: 6,
    vendorExtras: {"parallelMax":6,"acCoupling":true,"generatorPort":true}
  },
  {
    id: 'g2s-10k',
    brand: 'Megarevo (Revo)',
    series: 'G2S Series',
    model: 'R10KL1DA-G2S',
    ratedW: 10000,
    type: 'LV',
    phase: '1-phase',
    batteryV: { min: 40, max: 58 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 15000,
    mpptRange: { min: 100, max: 430 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 16,
    maxIscPerMPPT: 24,
    maxStringsPerMPPT: {"mppt1":1,"mppt2":2},
    maxStrings: 3,
    maxChargeCurrent: 200,
    maxDischargeCurrent: 200,
    maxChargePower: 10000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 43.5,
    maxOutputA: 43.5,
    maxAcPassthroughA: 43,
    maxEff: 0.98,
    euEff: 0.965,
    batChargeEffPv: 0.956,
    batChargeEffAc: 0.956,
    batDischargeEff: 0.956,
    surgePower: 15000,
    surgeTimeSec: 0.1,
    switchTimeMs: 20,
    ip: 'IP65',
    cooling: 'Fan',
    topology: 'Non-Isolated',
    dims: { w: 476, h: 477, d: 215 },
    weight: 25.8,
    tempRange: [-25, 60],
    altitude: 2000,
    comm: ["RS485","CAN"],
    display: 'LCD(opt)',
    wifiOpt: true,
    lanOpt: true,
    gprsOpt: true,
    certs: ["IEC62109","IEC61000","EN50549","NRS097"],
    parallel: 6,
    vendorExtras: {"parallelMax":6,"acCoupling":true,"generatorPort":true}
  },
  {
    id: 'deye-5k',
    brand: 'Deye',
    series: 'SUN-(5-12)K-SG04LP3-EU',
    model: 'SUN-5K-SG04LP3-EU',
    ratedW: 5000,
    type: 'LV',
    phase: '3-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 10000,
    mpptRange: { min: 200, max: 650 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 13,
    maxIscPerMPPT: 17,
    maxStringsPerMPPT: {"mppt1":1,"mppt2":1},
    maxStrings: 2,
    maxChargeCurrent: 120,
    maxDischargeCurrent: 120,
    maxChargePower: 5000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 7.6,
    maxOutputA: 8.4,
    maxAcPassthroughA: 45,
    maxEff: 0.976,
    euEff: 0.97,
    batChargeEffPv: 0.97,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 10000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP65',
    cooling: 'Smart-Air',
    topology: 'Non-Iso(PV)/Iso(Bat)',
    dims: { w: 422, h: 658, d: 254 },
    weight: 38,
    tempRange: [-40, 60],
    altitude: 2000,
    comm: ["RS485","CAN"],
    display: 'LED+APP',
    wifiOpt: true,
    lanOpt: true,
    gprsOpt: false,
    certs: ["IEC62109","IEC61727","EN50549","NRS097","VDE4105","CEI0-21"],
    parallel: 10,
    vendorExtras: {"parallelMax":10,"dieselGeneratorSupport":true,"acCoupling":true,"fullLoadVoltageRange":[350,650],"maxDcInputVoltage":800,"startVoltage":160,"ratedPvVoltage":550,"unbalancedOutputPercent":50}
  },
  {
    id: 'deye-6k',
    brand: 'Deye',
    series: 'SUN-(5-12)K-SG04LP3-EU',
    model: 'SUN-6K-SG04LP3-EU',
    ratedW: 6000,
    type: 'LV',
    phase: '3-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 12000,
    mpptRange: { min: 200, max: 650 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 17,
    maxIscPerMPPT: 22,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":1},
    maxStrings: 3,
    maxChargeCurrent: 150,
    maxDischargeCurrent: 150,
    maxChargePower: 6000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 8.4,
    maxOutputA: 10,
    maxAcPassthroughA: 45,
    maxEff: 0.976,
    euEff: 0.97,
    batChargeEffPv: 0.97,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 12000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP65',
    cooling: 'Smart-Air',
    topology: 'Non-Iso(PV)/Iso(Bat)',
    dims: { w: 422, h: 658, d: 254 },
    weight: 38,
    tempRange: [-40, 60],
    altitude: 2000,
    comm: ["RS485","CAN"],
    display: 'LED+APP',
    wifiOpt: true,
    lanOpt: true,
    gprsOpt: false,
    certs: ["IEC62109","IEC61727","EN50549","NRS097","VDE4105","CEI0-21"],
    parallel: 10,
    vendorExtras: {"parallelMax":10,"dieselGeneratorSupport":true,"acCoupling":true,"fullLoadVoltageRange":[350,650],"maxDcInputVoltage":800,"startVoltage":160,"ratedPvVoltage":550,"unbalancedOutputPercent":50}
  },
  {
    id: 'deye-8k',
    brand: 'Deye',
    series: 'SUN-(5-12)K-SG04LP3-EU',
    model: 'SUN-8K-SG04LP3-EU',
    ratedW: 8000,
    type: 'LV',
    phase: '3-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 16000,
    mpptRange: { min: 200, max: 650 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 17,
    maxIscPerMPPT: 22,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":1},
    maxStrings: 3,
    maxChargeCurrent: 190,
    maxDischargeCurrent: 190,
    maxChargePower: 8000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 11,
    maxOutputA: 13.4,
    maxAcPassthroughA: 45,
    maxEff: 0.976,
    euEff: 0.97,
    batChargeEffPv: 0.97,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 16000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP65',
    cooling: 'Smart-Air',
    topology: 'Non-Iso(PV)/Iso(Bat)',
    dims: { w: 422, h: 658, d: 254 },
    weight: 38,
    tempRange: [-40, 60],
    altitude: 2000,
    comm: ["RS485","CAN"],
    display: 'LED+APP',
    wifiOpt: true,
    lanOpt: true,
    gprsOpt: false,
    certs: ["IEC62109","IEC61727","EN50549","NRS097","VDE4105","CEI0-21"],
    parallel: 10,
    vendorExtras: {"parallelMax":10,"dieselGeneratorSupport":true,"acCoupling":true,"fullLoadVoltageRange":[350,650],"maxDcInputVoltage":800,"startVoltage":160,"ratedPvVoltage":550,"unbalancedOutputPercent":50}
  },
  {
    id: 'deye-10k',
    brand: 'Deye',
    series: 'SUN-(5-12)K-SG04LP3-EU',
    model: 'SUN-10K-SG04LP3-EU',
    ratedW: 10000,
    type: 'LV',
    phase: '3-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 20000,
    mpptRange: { min: 200, max: 650 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 17,
    maxIscPerMPPT: 22,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":1},
    maxStrings: 3,
    maxChargeCurrent: 210,
    maxDischargeCurrent: 210,
    maxChargePower: 10000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 13,
    maxOutputA: 16.7,
    maxAcPassthroughA: 45,
    maxEff: 0.976,
    euEff: 0.97,
    batChargeEffPv: 0.97,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 20000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP65',
    cooling: 'Smart-Air',
    topology: 'Non-Iso(PV)/Iso(Bat)',
    dims: { w: 422, h: 658, d: 254 },
    weight: 38,
    tempRange: [-40, 60],
    altitude: 2000,
    comm: ["RS485","CAN"],
    display: 'LED+APP',
    wifiOpt: true,
    lanOpt: true,
    gprsOpt: false,
    certs: ["IEC62109","IEC61727","EN50549","NRS097","VDE4105","CEI0-21"],
    parallel: 10,
    vendorExtras: {"parallelMax":10,"dieselGeneratorSupport":true,"acCoupling":true,"fullLoadVoltageRange":[350,650],"maxDcInputVoltage":800,"startVoltage":160,"ratedPvVoltage":550,"unbalancedOutputPercent":50}
  },
  {
    id: 'deye-12k',
    brand: 'Deye',
    series: 'SUN-(5-12)K-SG04LP3-EU',
    model: 'SUN-12K-SG04LP3-EU',
    ratedW: 12000,
    type: 'LV',
    phase: '3-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 24000,
    mpptRange: { min: 200, max: 650 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 17,
    maxIscPerMPPT: 22,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":1},
    maxStrings: 3,
    maxChargeCurrent: 240,
    maxDischargeCurrent: 240,
    maxChargePower: 12000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 13,
    maxOutputA: 20,
    maxAcPassthroughA: 45,
    maxEff: 0.976,
    euEff: 0.97,
    batChargeEffPv: 0.97,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 24000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP65',
    cooling: 'Smart-Air',
    topology: 'Non-Iso(PV)/Iso(Bat)',
    dims: { w: 422, h: 658, d: 254 },
    weight: 38,
    tempRange: [-40, 60],
    altitude: 2000,
    comm: ["RS485","CAN"],
    display: 'LED+APP',
    wifiOpt: true,
    lanOpt: true,
    gprsOpt: false,
    certs: ["IEC62109","IEC61727","EN50549","NRS097","VDE4105","CEI0-21"],
    parallel: 10,
    vendorExtras: {"parallelMax":10,"dieselGeneratorSupport":true,"acCoupling":true,"fullLoadVoltageRange":[350,650],"maxDcInputVoltage":800,"startVoltage":160,"ratedPvVoltage":550,"unbalancedOutputPercent":50}
  },
  {
    id: 'deye-hv-30k',
    brand: 'Deye',
    series: 'SUN-(30-50)K-SG01HP3-EU-HV',
    model: 'SUN-30K-SG01HP3-EU-HV',
    ratedW: 30000,
    type: 'HV',
    phase: '3-phase',
    batteryV: { min: 180, max: 700 },
    batteryType: 'Li-ion',
    maxPVPower: 45000,
    mpptRange: { min: 200, max: 800 },
    mpptCount: 3,
    maxInputCurrentPerMPPT: 30,
    maxIscPerMPPT: 40,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2,"mppt3":1},
    maxStrings: 5,
    maxChargeCurrent: 450,
    maxDischargeCurrent: 450,
    maxChargePower: 30000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 43.5,
    maxOutputA: 43.5,
    maxAcPassthroughA: 100,
    maxEff: 0.982,
    euEff: 0.975,
    batChargeEffPv: 0.97,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 45000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP65',
    cooling: 'Smart-Air+Fan',
    topology: 'Transformerless',
    dims: { w: 620, h: 800, d: 310 },
    weight: 68,
    tempRange: [-25, 60],
    altitude: 3000,
    comm: ["CAN","RS485","WiFi"],
    display: 'LCD+APP',
    wifiOpt: true,
    lanOpt: true,
    gprsOpt: false,
    certs: ["IEC62109","EN50549","VDE4105","CEI0-21"],
    parallel: 10,
    vendorExtras: {"dieselGeneratorSupport":true,"acCoupling":true,"fullLoadVoltageRange":[350,650],"maxDcInputVoltage":880,"startVoltage":180,"ratedPvVoltage":600}
  },
  {
    id: 'deye-hv-40k',
    brand: 'Deye',
    series: 'SUN-(30-50)K-SG01HP3-EU-HV',
    model: 'SUN-40K-SG01HP3-EU-HV',
    ratedW: 40000,
    type: 'HV',
    phase: '3-phase',
    batteryV: { min: 180, max: 700 },
    batteryType: 'Li-ion',
    maxPVPower: 60000,
    mpptRange: { min: 200, max: 800 },
    mpptCount: 3,
    maxInputCurrentPerMPPT: 30,
    maxIscPerMPPT: 40,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2,"mppt3":2},
    maxStrings: 6,
    maxChargeCurrent: 600,
    maxDischargeCurrent: 600,
    maxChargePower: 40000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 58,
    maxOutputA: 58,
    maxAcPassthroughA: 100,
    maxEff: 0.982,
    euEff: 0.975,
    batChargeEffPv: 0.97,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 60000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP65',
    cooling: 'Smart-Air+Fan',
    topology: 'Transformerless',
    dims: { w: 620, h: 800, d: 310 },
    weight: 68,
    tempRange: [-25, 60],
    altitude: 3000,
    comm: ["CAN","RS485","WiFi"],
    display: 'LCD+APP',
    wifiOpt: true,
    lanOpt: true,
    gprsOpt: false,
    certs: ["IEC62109","EN50549","VDE4105","CEI0-21"],
    parallel: 10,
    vendorExtras: {"dieselGeneratorSupport":true,"acCoupling":true,"fullLoadVoltageRange":[350,650],"maxDcInputVoltage":880,"startVoltage":180,"ratedPvVoltage":600}
  },
  {
    id: 'deye-sp-3k',
    brand: 'Deye',
    series: 'SUN-(3-6)K-SG04LP1-EU',
    model: 'SUN-3K-SG04LP1-EU-SM1',
    ratedW: 3000,
    type: 'LV',
    phase: '1-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 4800,
    mpptRange: { min: 150, max: 425 },
    mpptCount: 1,
    maxInputCurrentPerMPPT: 18,
    maxIscPerMPPT: 27,
    maxStringsPerMPPT: {"mppt1":1},
    maxStrings: 1,
    maxChargeCurrent: 70,
    maxDischargeCurrent: 70,
    maxChargePower: 3000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 13.1,
    maxOutputA: 14.4,
    maxAcPassthroughA: 35,
    maxEff: 0.976,
    euEff: 0.965,
    batChargeEffPv: 0.97,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 6000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP65',
    cooling: 'Natural',
    topology: 'Non-Iso(PV)/Iso(Bat)',
    dims: { w: 376, h: 470, d: 242 },
    weight: 17.6,
    tempRange: [-40, 60],
    altitude: 2000,
    comm: ["WiFi","RS485","CAN"],
    display: 'LCD',
    wifiOpt: false,
    lanOpt: false,
    gprsOpt: false,
    certs: ["IEC62109","IEC61727","IEC62116","EN50549","NRS097","CEI0-21","VDE4105","G99"],
    parallel: 16,
    vendorExtras: {"dieselGeneratorSupport":true,"acCoupling":true,"maxDcInputVoltage":500,"startVoltage":125,"ratedPvVoltage":370}
  },
  {
    id: 'deye-sp-3k6',
    brand: 'Deye',
    series: 'SUN-(3-6)K-SG04LP1-EU',
    model: 'SUN-3.6K-SG04LP1-EU-SM2',
    ratedW: 3600,
    type: 'LV',
    phase: '1-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 5760,
    mpptRange: { min: 150, max: 425 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 18,
    maxIscPerMPPT: 27,
    maxStringsPerMPPT: {"mppt1":1,"mppt2":1},
    maxStrings: 2,
    maxChargeCurrent: 90,
    maxDischargeCurrent: 90,
    maxChargePower: 3600,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 15.7,
    maxOutputA: 17.3,
    maxAcPassthroughA: 40,
    maxEff: 0.976,
    euEff: 0.965,
    batChargeEffPv: 0.97,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 7200,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP65',
    cooling: 'Natural',
    topology: 'Non-Iso(PV)/Iso(Bat)',
    dims: { w: 376, h: 470, d: 242 },
    weight: 19,
    tempRange: [-40, 60],
    altitude: 2000,
    comm: ["WiFi","RS485","CAN"],
    display: 'LCD',
    wifiOpt: false,
    lanOpt: false,
    gprsOpt: false,
    certs: ["IEC62109","IEC61727","IEC62116","EN50549","NRS097","CEI0-21","VDE4105","G99"],
    parallel: 16,
    vendorExtras: {"dieselGeneratorSupport":true,"acCoupling":true,"maxDcInputVoltage":500,"startVoltage":125,"ratedPvVoltage":370}
  },
  {
    id: 'deye-sp-5k',
    brand: 'Deye',
    series: 'SUN-(3-6)K-SG04LP1-EU',
    model: 'SUN-5K-SG04LP1-EU-SM2',
    ratedW: 5000,
    type: 'LV',
    phase: '1-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 8000,
    mpptRange: { min: 150, max: 425 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 18,
    maxIscPerMPPT: 27,
    maxStringsPerMPPT: {"mppt1":1,"mppt2":1},
    maxStrings: 2,
    maxChargeCurrent: 120,
    maxDischargeCurrent: 120,
    maxChargePower: 5000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 21.8,
    maxOutputA: 24,
    maxAcPassthroughA: 40,
    maxEff: 0.976,
    euEff: 0.965,
    batChargeEffPv: 0.97,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 10000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP65',
    cooling: 'Natural',
    topology: 'Non-Iso(PV)/Iso(Bat)',
    dims: { w: 376, h: 470, d: 242 },
    weight: 19,
    tempRange: [-40, 60],
    altitude: 2000,
    comm: ["WiFi","RS485","CAN"],
    display: 'LCD',
    wifiOpt: false,
    lanOpt: false,
    gprsOpt: false,
    certs: ["IEC62109","IEC61727","IEC62116","EN50549","NRS097","CEI0-21","VDE4105","G99"],
    parallel: 16,
    vendorExtras: {"dieselGeneratorSupport":true,"acCoupling":true,"maxDcInputVoltage":500,"startVoltage":125,"ratedPvVoltage":370}
  },
  {
    id: 'deye-sp-6k',
    brand: 'Deye',
    series: 'SUN-(3-6)K-SG04LP1-EU',
    model: 'SUN-6K-SG04LP1-EU-SM2',
    ratedW: 6000,
    type: 'LV',
    phase: '1-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 9600,
    mpptRange: { min: 150, max: 425 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 18,
    maxIscPerMPPT: 27,
    maxStringsPerMPPT: {"mppt1":1,"mppt2":1},
    maxStrings: 2,
    maxChargeCurrent: 135,
    maxDischargeCurrent: 135,
    maxChargePower: 6000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 26.1,
    maxOutputA: 28.7,
    maxAcPassthroughA: 40,
    maxEff: 0.976,
    euEff: 0.965,
    batChargeEffPv: 0.97,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 12000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP65',
    cooling: 'Natural',
    topology: 'Non-Iso(PV)/Iso(Bat)',
    dims: { w: 376, h: 470, d: 242 },
    weight: 19,
    tempRange: [-40, 60],
    altitude: 2000,
    comm: ["WiFi","RS485","CAN"],
    display: 'LCD',
    wifiOpt: false,
    lanOpt: false,
    gprsOpt: false,
    certs: ["IEC62109","IEC61727","IEC62116","EN50549","NRS097","CEI0-21","VDE4105","G99"],
    parallel: 16,
    vendorExtras: {"dieselGeneratorSupport":true,"acCoupling":true,"maxDcInputVoltage":500,"startVoltage":125,"ratedPvVoltage":370}
  },
  {
    id: 'deye-3p-3k',
    brand: 'Deye',
    series: 'SUN-(3-12)K-SG05LP3-EU-SM2',
    model: 'SUN-3K-SG05LP3-EU-SM2',
    ratedW: 3000,
    type: 'LV',
    phase: '3-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 4500,
    mpptRange: { min: 200, max: 650 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 20,
    maxIscPerMPPT: 30,
    maxStringsPerMPPT: {"mppt1":1,"mppt2":1},
    maxStrings: 2,
    maxChargeCurrent: 70,
    maxDischargeCurrent: 70,
    maxChargePower: 3000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 4.6,
    maxOutputA: 5,
    maxAcPassthroughA: 45,
    maxEff: 0.976,
    euEff: 0.97,
    batChargeEffPv: 0.97,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 6000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP65',
    cooling: 'Intelligent-Air',
    topology: 'Non-Iso(PV)/Iso(Bat)',
    dims: { w: 386, h: 660, d: 250 },
    weight: 35.2,
    tempRange: [-40, 60],
    altitude: 3000,
    comm: ["WiFi","RS485","CAN"],
    display: 'LCD',
    wifiOpt: false,
    lanOpt: false,
    gprsOpt: false,
    certs: ["IEC62109","IEC61727","IEC62116","EN50549","NRS097","CEI0-21","VDE4105","G99"],
    parallel: 10,
    vendorExtras: {"dieselGeneratorSupport":true,"acCoupling":true,"maxDcInputVoltage":800,"startVoltage":160,"ratedPvVoltage":550,"unbalancedOutputPercent":50}
  },
  {
    id: 'deye-3p-4k',
    brand: 'Deye',
    series: 'SUN-(3-12)K-SG05LP3-EU-SM2',
    model: 'SUN-4K-SG05LP3-EU-SM2',
    ratedW: 4000,
    type: 'LV',
    phase: '3-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 6400,
    mpptRange: { min: 200, max: 650 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 20,
    maxIscPerMPPT: 30,
    maxStringsPerMPPT: {"mppt1":1,"mppt2":1},
    maxStrings: 2,
    maxChargeCurrent: 95,
    maxDischargeCurrent: 95,
    maxChargePower: 4000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 6.1,
    maxOutputA: 6.7,
    maxAcPassthroughA: 45,
    maxEff: 0.976,
    euEff: 0.97,
    batChargeEffPv: 0.97,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 8000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP65',
    cooling: 'Intelligent-Air',
    topology: 'Non-Iso(PV)/Iso(Bat)',
    dims: { w: 386, h: 660, d: 250 },
    weight: 35.2,
    tempRange: [-40, 60],
    altitude: 3000,
    comm: ["WiFi","RS485","CAN"],
    display: 'LCD',
    wifiOpt: false,
    lanOpt: false,
    gprsOpt: false,
    certs: ["IEC62109","IEC61727","IEC62116","EN50549","NRS097","CEI0-21","VDE4105","G99"],
    parallel: 10,
    vendorExtras: {"dieselGeneratorSupport":true,"acCoupling":true,"maxDcInputVoltage":800,"startVoltage":160,"ratedPvVoltage":550,"unbalancedOutputPercent":50}
  },
  {
    id: 'deye-3p-5k',
    brand: 'Deye',
    series: 'SUN-(3-12)K-SG05LP3-EU-SM2',
    model: 'SUN-5K-SG05LP3-EU-SM2',
    ratedW: 5000,
    type: 'LV',
    phase: '3-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 8000,
    mpptRange: { min: 200, max: 650 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 20,
    maxIscPerMPPT: 30,
    maxStringsPerMPPT: {"mppt1":1,"mppt2":1},
    maxStrings: 2,
    maxChargeCurrent: 120,
    maxDischargeCurrent: 120,
    maxChargePower: 5000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 7.6,
    maxOutputA: 8.4,
    maxAcPassthroughA: 45,
    maxEff: 0.976,
    euEff: 0.97,
    batChargeEffPv: 0.97,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 10000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP65',
    cooling: 'Intelligent-Air',
    topology: 'Non-Iso(PV)/Iso(Bat)',
    dims: { w: 386, h: 660, d: 250 },
    weight: 35.2,
    tempRange: [-40, 60],
    altitude: 3000,
    comm: ["WiFi","RS485","CAN"],
    display: 'LCD',
    wifiOpt: false,
    lanOpt: false,
    gprsOpt: false,
    certs: ["IEC62109","IEC61727","IEC62116","EN50549","NRS097","CEI0-21","VDE4105","G99"],
    parallel: 10,
    vendorExtras: {"dieselGeneratorSupport":true,"acCoupling":true,"maxDcInputVoltage":800,"startVoltage":160,"ratedPvVoltage":550,"unbalancedOutputPercent":50}
  },
  {
    id: 'deye-3p-6k',
    brand: 'Deye',
    series: 'SUN-(3-12)K-SG05LP3-EU-SM2',
    model: 'SUN-6K-SG05LP3-EU-SM2',
    ratedW: 6000,
    type: 'LV',
    phase: '3-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 9600,
    mpptRange: { min: 200, max: 650 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 20,
    maxIscPerMPPT: 30,
    maxStringsPerMPPT: {"mppt1":1,"mppt2":1},
    maxStrings: 2,
    maxChargeCurrent: 135,
    maxDischargeCurrent: 135,
    maxChargePower: 6000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 9.1,
    maxOutputA: 10,
    maxAcPassthroughA: 45,
    maxEff: 0.976,
    euEff: 0.97,
    batChargeEffPv: 0.97,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 12000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP65',
    cooling: 'Intelligent-Air',
    topology: 'Non-Iso(PV)/Iso(Bat)',
    dims: { w: 386, h: 660, d: 250 },
    weight: 35.2,
    tempRange: [-40, 60],
    altitude: 3000,
    comm: ["WiFi","RS485","CAN"],
    display: 'LCD',
    wifiOpt: false,
    lanOpt: false,
    gprsOpt: false,
    certs: ["IEC62109","IEC61727","IEC62116","EN50549","NRS097","CEI0-21","VDE4105","G99"],
    parallel: 10,
    vendorExtras: {"dieselGeneratorSupport":true,"acCoupling":true,"maxDcInputVoltage":800,"startVoltage":160,"ratedPvVoltage":550,"unbalancedOutputPercent":50}
  },
  {
    id: 'deye-3p-8k',
    brand: 'Deye',
    series: 'SUN-(3-12)K-SG05LP3-EU-SM2',
    model: 'SUN-8K-SG05LP3-EU-SM2',
    ratedW: 8000,
    type: 'LV',
    phase: '3-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 12800,
    mpptRange: { min: 200, max: 650 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 26,
    maxIscPerMPPT: 39,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2},
    maxStrings: 4,
    maxChargeCurrent: 190,
    maxDischargeCurrent: 190,
    maxChargePower: 8000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 12.2,
    maxOutputA: 13.4,
    maxAcPassthroughA: 45,
    maxEff: 0.976,
    euEff: 0.97,
    batChargeEffPv: 0.97,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 16000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP65',
    cooling: 'Intelligent-Air',
    topology: 'Non-Iso(PV)/Iso(Bat)',
    dims: { w: 386, h: 660, d: 250 },
    weight: 35.2,
    tempRange: [-40, 60],
    altitude: 3000,
    comm: ["WiFi","RS485","CAN"],
    display: 'LCD',
    wifiOpt: false,
    lanOpt: false,
    gprsOpt: false,
    certs: ["IEC62109","IEC61727","IEC62116","EN50549","NRS097","CEI0-21","VDE4105","G99"],
    parallel: 10,
    vendorExtras: {"dieselGeneratorSupport":true,"acCoupling":true,"maxDcInputVoltage":800,"startVoltage":160,"ratedPvVoltage":550,"unbalancedOutputPercent":50}
  },
  {
    id: 'deye-3p-10k',
    brand: 'Deye',
    series: 'SUN-(3-12)K-SG05LP3-EU-SM2',
    model: 'SUN-10K-SG05LP3-EU-SM2',
    ratedW: 10000,
    type: 'LV',
    phase: '3-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 16000,
    mpptRange: { min: 200, max: 650 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 26,
    maxIscPerMPPT: 39,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2},
    maxStrings: 4,
    maxChargeCurrent: 210,
    maxDischargeCurrent: 210,
    maxChargePower: 10000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 15.2,
    maxOutputA: 16.7,
    maxAcPassthroughA: 45,
    maxEff: 0.976,
    euEff: 0.97,
    batChargeEffPv: 0.97,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 20000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP65',
    cooling: 'Intelligent-Air',
    topology: 'Non-Iso(PV)/Iso(Bat)',
    dims: { w: 386, h: 660, d: 250 },
    weight: 35.2,
    tempRange: [-40, 60],
    altitude: 3000,
    comm: ["WiFi","RS485","CAN"],
    display: 'LCD',
    wifiOpt: false,
    lanOpt: false,
    gprsOpt: false,
    certs: ["IEC62109","IEC61727","IEC62116","EN50549","NRS097","CEI0-21","VDE4105","G99"],
    parallel: 10,
    vendorExtras: {"dieselGeneratorSupport":true,"acCoupling":true,"maxDcInputVoltage":800,"startVoltage":160,"ratedPvVoltage":550,"unbalancedOutputPercent":50}
  },
  {
    id: 'deye-3p-12k',
    brand: 'Deye',
    series: 'SUN-(3-12)K-SG05LP3-EU-SM2',
    model: 'SUN-12K-SG05LP3-EU-SM2',
    ratedW: 12000,
    type: 'LV',
    phase: '3-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 19200,
    mpptRange: { min: 200, max: 650 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 26,
    maxIscPerMPPT: 39,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2},
    maxStrings: 4,
    maxChargeCurrent: 240,
    maxDischargeCurrent: 240,
    maxChargePower: 12000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 18.2,
    maxOutputA: 20,
    maxAcPassthroughA: 45,
    maxEff: 0.976,
    euEff: 0.97,
    batChargeEffPv: 0.97,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 24000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP65',
    cooling: 'Intelligent-Air',
    topology: 'Non-Iso(PV)/Iso(Bat)',
    dims: { w: 386, h: 660, d: 250 },
    weight: 35.2,
    tempRange: [-40, 60],
    altitude: 3000,
    comm: ["WiFi","RS485","CAN"],
    display: 'LCD',
    wifiOpt: false,
    lanOpt: false,
    gprsOpt: false,
    certs: ["IEC62109","IEC61727","IEC62116","EN50549","NRS097","CEI0-21","VDE4105","G99"],
    parallel: 10,
    vendorExtras: {"dieselGeneratorSupport":true,"acCoupling":true,"maxDcInputVoltage":800,"startVoltage":160,"ratedPvVoltage":550,"unbalancedOutputPercent":50}
  },
  {
    id: 'deye-3p-14k',
    brand: 'Deye',
    series: 'SUN-(14-20)K-SG05LP3-EU-SM2',
    model: 'SUN-14K-SG05LP3-EU-SM2',
    ratedW: 14000,
    type: 'LV',
    phase: '3-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 22400,
    mpptRange: { min: 160, max: 650 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 36,
    maxIscPerMPPT: 54,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2},
    maxStrings: 4,
    maxChargeCurrent: 260,
    maxDischargeCurrent: 260,
    maxChargePower: 14000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 21.3,
    maxOutputA: 23.4,
    maxAcPassthroughA: 70,
    maxEff: 0.976,
    euEff: 0.97,
    batChargeEffPv: 0.97,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 28000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP65',
    cooling: 'Intelligent-Air',
    topology: 'Non-Iso(PV)/Iso(Bat)',
    dims: { w: 456, h: 750, d: 268.5 },
    weight: 51.9,
    tempRange: [-40, 60],
    altitude: 3000,
    comm: ["WiFi","RS485","CAN"],
    display: 'LCD',
    wifiOpt: false,
    lanOpt: false,
    gprsOpt: false,
    certs: ["IEC62109","IEC61727","IEC62116","EN50549","NRS097","CEI0-21","VDE4105","G99"],
    parallel: 10,
    vendorExtras: {"dieselGeneratorSupport":true,"acCoupling":true,"maxDcInputVoltage":800,"startVoltage":160,"ratedPvVoltage":550,"unbalancedOutputPercent":50,"batteryInputs":2}
  },
  {
    id: 'deye-3p-15k',
    brand: 'Deye',
    series: 'SUN-(14-20)K-SG05LP3-EU-SM2',
    model: 'SUN-15K-SG05LP3-EU-SM2',
    ratedW: 15000,
    type: 'LV',
    phase: '3-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 24000,
    mpptRange: { min: 160, max: 650 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 36,
    maxIscPerMPPT: 54,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2},
    maxStrings: 4,
    maxChargeCurrent: 280,
    maxDischargeCurrent: 280,
    maxChargePower: 15000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 22.8,
    maxOutputA: 25,
    maxAcPassthroughA: 70,
    maxEff: 0.976,
    euEff: 0.97,
    batChargeEffPv: 0.97,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 30000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP65',
    cooling: 'Intelligent-Air',
    topology: 'Non-Iso(PV)/Iso(Bat)',
    dims: { w: 456, h: 750, d: 268.5 },
    weight: 51.9,
    tempRange: [-40, 60],
    altitude: 3000,
    comm: ["WiFi","RS485","CAN"],
    display: 'LCD',
    wifiOpt: false,
    lanOpt: false,
    gprsOpt: false,
    certs: ["IEC62109","IEC61727","IEC62116","EN50549","NRS097","CEI0-21","VDE4105","G99"],
    parallel: 10,
    vendorExtras: {"dieselGeneratorSupport":true,"acCoupling":true,"maxDcInputVoltage":800,"startVoltage":160,"ratedPvVoltage":550,"unbalancedOutputPercent":50,"batteryInputs":2}
  },
  {
    id: 'deye-3p-16k',
    brand: 'Deye',
    series: 'SUN-(14-20)K-SG05LP3-EU-SM2',
    model: 'SUN-16K-SG05LP3-EU-SM2',
    ratedW: 16000,
    type: 'LV',
    phase: '3-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 25600,
    mpptRange: { min: 160, max: 650 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 36,
    maxIscPerMPPT: 54,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2},
    maxStrings: 4,
    maxChargeCurrent: 300,
    maxDischargeCurrent: 300,
    maxChargePower: 16000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 24.3,
    maxOutputA: 26.7,
    maxAcPassthroughA: 70,
    maxEff: 0.976,
    euEff: 0.97,
    batChargeEffPv: 0.97,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 32000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP65',
    cooling: 'Intelligent-Air',
    topology: 'Non-Iso(PV)/Iso(Bat)',
    dims: { w: 456, h: 750, d: 268.5 },
    weight: 51.9,
    tempRange: [-40, 60],
    altitude: 3000,
    comm: ["WiFi","RS485","CAN"],
    display: 'LCD',
    wifiOpt: false,
    lanOpt: false,
    gprsOpt: false,
    certs: ["IEC62109","IEC61727","IEC62116","EN50549","NRS097","CEI0-21","VDE4105","G99"],
    parallel: 10,
    vendorExtras: {"dieselGeneratorSupport":true,"acCoupling":true,"maxDcInputVoltage":800,"startVoltage":160,"ratedPvVoltage":550,"unbalancedOutputPercent":50,"batteryInputs":2}
  },
  {
    id: 'deye-3p-18k',
    brand: 'Deye',
    series: 'SUN-(14-20)K-SG05LP3-EU-SM2',
    model: 'SUN-18K-SG05LP3-EU-SM2',
    ratedW: 18000,
    type: 'LV',
    phase: '3-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 28800,
    mpptRange: { min: 160, max: 650 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 36,
    maxIscPerMPPT: 54,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2},
    maxStrings: 4,
    maxChargeCurrent: 330,
    maxDischargeCurrent: 330,
    maxChargePower: 18000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 27.3,
    maxOutputA: 30,
    maxAcPassthroughA: 70,
    maxEff: 0.976,
    euEff: 0.97,
    batChargeEffPv: 0.97,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 36000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP65',
    cooling: 'Intelligent-Air',
    topology: 'Non-Iso(PV)/Iso(Bat)',
    dims: { w: 456, h: 750, d: 268.5 },
    weight: 51.9,
    tempRange: [-40, 60],
    altitude: 3000,
    comm: ["WiFi","RS485","CAN"],
    display: 'LCD',
    wifiOpt: false,
    lanOpt: false,
    gprsOpt: false,
    certs: ["IEC62109","IEC61727","IEC62116","EN50549","NRS097","CEI0-21","VDE4105","G99"],
    parallel: 10,
    vendorExtras: {"dieselGeneratorSupport":true,"acCoupling":true,"maxDcInputVoltage":800,"startVoltage":160,"ratedPvVoltage":550,"unbalancedOutputPercent":50,"batteryInputs":2}
  },
  {
    id: 'deye-3p-20k',
    brand: 'Deye',
    series: 'SUN-(14-20)K-SG05LP3-EU-SM2',
    model: 'SUN-20K-SG05LP3-EU-SM2',
    ratedW: 20000,
    type: 'LV',
    phase: '3-phase',
    batteryV: { min: 40, max: 60 },
    batteryType: 'Li-ion/Lead-acid',
    maxPVPower: 32000,
    mpptRange: { min: 160, max: 650 },
    mpptCount: 2,
    maxInputCurrentPerMPPT: 36,
    maxIscPerMPPT: 54,
    maxStringsPerMPPT: {"mppt1":2,"mppt2":2},
    maxStrings: 4,
    maxChargeCurrent: 350,
    maxDischargeCurrent: 350,
    maxChargePower: 20000,
    ratedGridV: 230,
    ratedGridFreq: 50,
    ratedOutputA: 30.4,
    maxOutputA: 33.4,
    maxAcPassthroughA: 70,
    maxEff: 0.976,
    euEff: 0.97,
    batChargeEffPv: 0.97,
    batChargeEffAc: 0.97,
    batDischargeEff: 0.97,
    surgePower: 40000,
    surgeTimeSec: 10,
    switchTimeMs: 10,
    ip: 'IP65',
    cooling: 'Intelligent-Air',
    topology: 'Non-Iso(PV)/Iso(Bat)',
    dims: { w: 456, h: 750, d: 268.5 },
    weight: 51.9,
    tempRange: [-40, 60],
    altitude: 3000,
    comm: ["WiFi","RS485","CAN"],
    display: 'LCD',
    wifiOpt: false,
    lanOpt: false,
    gprsOpt: false,
    certs: ["IEC62109","IEC61727","IEC62116","EN50549","NRS097","CEI0-21","VDE4105","G99"],
    parallel: 10,
    vendorExtras: {"dieselGeneratorSupport":true,"acCoupling":true,"maxDcInputVoltage":800,"startVoltage":160,"ratedPvVoltage":550,"unbalancedOutputPercent":50,"batteryInputs":2}
  },
];

function getInverterById(id) {
  for (var i = 0; i < INVERTER_DB.length; i++) {
    if (INVERTER_DB[i].id === id) return INVERTER_DB[i];
  }
  return null;
}
// ===== END INVERTER_DB =====

// =====================================================================
// MODULE: Engine (6 Layers — Pure Functions)
// =====================================================================

// L1: Load Profile Analysis
function calcLoadProfile(ld) {
  var r = { maxLoad: ld.maxLoad || 0, dailyKwh: ld.dailyConsumption || 0, daytimeKwh: ld.daytimeConsumption || 0 };
  r.nighttimeKwh = Math.max(0, r.dailyKwh - r.daytimeKwh);
  r.criticalLoad = r.maxLoad > 0 ? r.maxLoad * 0.5 : r.dailyKwh * 0.15 / 24;
  r.systemType = (r.maxLoad >= CFG.THRESHOLD.HV_MIN_KW || r.dailyKwh >= 200) ? 'HV' : 'LV';
  Log.info('L1 Load Profile', r);
  return r;
}

// L2: Panel Sizing (Parallel-Aware)
function calcPanels(lp, opts) {
  var psh = opts.psh || CFG.DEFAULTS.psh;
  var panelW = opts.panelW || CFG.DEFAULTS.panelW;
  var weather = opts.weather || 1.0;
  var loss = CFG.SAFETY.PANEL_LOSS;
  var requiredKwh = lp.dailyKwh / psh * loss * weather;
  var panelCount = Math.ceil(requiredKwh / (panelW / 1000));
  var totalPanelKW = panelCount * panelW / 1000;
  var spec = PANEL_SPECS[panelW] || { Vmp: 42, Voc: 50, Imp: 12, Isc: 13 };
  
  var sysV = opts.systemVoltage || 48;
  var sysType = lp.systemType;
  
  var inv = opts.inverterSpec || null;
  var mpptVmin = (inv && inv.mpptRange) ? inv.mpptRange.min : (sysType === 'HV' ? 200 : 150);
  var mpptVmax = (inv && inv.mpptRange) ? inv.mpptRange.max : (sysType === 'HV' ? 850 : 500);
  var maxImp = (inv && inv.maxInputCurrentPerMPPT) ? inv.maxInputCurrentPerMPPT : (sysType === 'HV' ? 26 : 32);
  var maxIsc = (inv && inv.maxIscPerMPPT) ? inv.maxIscPerMPPT : (sysType === 'HV' ? 40 : 40);
  
  var maxPPS = Math.floor(mpptVmax / (spec.Voc * CFG.SAFETY.VOC_COLD));
  var minPPS = Math.ceil(mpptVmin / spec.Vmp);
  if (maxPPS < minPPS) maxPPS = minPPS;
  if (maxPPS < 1) maxPPS = 1;
  
  var mpptCount = (inv && inv.mpptCount) ? inv.mpptCount : 2;
  var maxStringsPerMPPT = Math.floor(maxImp / spec.Imp);
  if (maxStringsPerMPPT < 1) maxStringsPerMPPT = 1;

  var singleInverterCapacity = mpptCount * maxStringsPerMPPT * maxPPS;
  var effectiveParallel = (opts.parallelCount && opts.parallelCount > 0) ? opts.parallelCount : 1;
  var panelsPerInverter = Math.ceil(panelCount / effectiveParallel);
  var invertersNeeded = Math.ceil(panelCount / singleInverterCapacity);
  if (panelsPerInverter > singleInverterCapacity && effectiveParallel === 1) {
    panelsPerInverter = singleInverterCapacity;
  }
  
  var panelsForDistribution = panelsPerInverter;
  var panelsPerString = maxPPS;
  for (var tryPPS = maxPPS; tryPPS >= minPPS; tryPPS--) {
    var testRem = panelsForDistribution;
    for (var t = 0; t < mpptCount; t++) {
      var ts = Math.min(Math.floor(testRem / tryPPS), maxStringsPerMPPT);
      testRem -= ts * tryPPS;
    }
    if (testRem === 0) { panelsPerString = tryPPS; break; }
  }
  
  var remaining = panelsForDistribution;
  var mppt = [];
  var stringsTotal = 0;
  for (var j = 0; j < mpptCount; j++) {
    var sIn = 0;
    var pIn = 0;
    if (remaining > 0) {
      sIn = Math.min(Math.floor(remaining / panelsPerString), maxStringsPerMPPT);
      pIn = sIn * panelsPerString;
      remaining -= pIn;
    }
    stringsTotal += sIn;
    var tVmp = panelsPerString * spec.Vmp;
    var tVoc = panelsPerString * spec.Voc * CFG.SAFETY.VOC_COLD;
    var tImp = sIn * spec.Imp;
    var warns = [];
    if (sIn > 0) {
      if (tVoc > mpptVmax) warns.push('Voc مرتفع ('+tVoc.toFixed(0)+'V > '+mpptVmax+'V)');
      if (tVmp < mpptVmin) warns.push('Vmp منخفض ('+tVmp.toFixed(0)+'V < '+mpptVmin+'V)');
      if (tImp > maxImp) warns.push('تيار مرتفع ('+tImp.toFixed(1)+'A > '+maxImp+'A)');
    }
    mppt.push({
      channel: j+1, strings: sIn, panelsPerString: panelsPerString,
      panelsTotal: pIn, totalVmp: tVmp, totalVoc: tVoc, totalImp: tImp,
      totalPower: pIn * panelW, mpptVmin: mpptVmin, mpptVmax: mpptVmax,
      maxImp: maxImp, warnings: warns
    });
  }
  
  var allocatedPanels = panelsForDistribution - remaining;
  if (remaining > 0) {
    var resolved = false;
    for (var li = mpptCount - 1; li >= 0; li--) {
      if (mppt[li].strings === 0) {
        for (var tp = panelsPerString; tp >= minPPS; tp--) {
          if (remaining % tp === 0 && remaining / tp <= maxStringsPerMPPT) {
            mppt[li].panelsPerString = tp;
            mppt[li].strings = remaining / tp;
            mppt[li].panelsTotal = remaining;
            mppt[li].totalVmp = tp * spec.Vmp;
            mppt[li].totalVoc = tp * spec.Voc * CFG.SAFETY.VOC_COLD;
            mppt[li].totalImp = mppt[li].strings * spec.Imp;
            mppt[li].totalPower = remaining * panelW;
            var tw2 = [];
            if (mppt[li].totalVoc > mpptVmax) tw2.push('Voc مرتفع ('+mppt[li].totalVoc.toFixed(0)+'V > '+mpptVmax+'V)');
            if (mppt[li].totalVmp < mpptVmin) tw2.push('Vmp منخفض ('+mppt[li].totalVmp.toFixed(0)+'V < '+mpptVmin+'V)');
            if (mppt[li].totalImp > maxImp) tw2.push('تيار مرتفع ('+mppt[li].totalImp.toFixed(1)+'A > '+maxImp+'A)');
            mppt[li].warnings = tw2;
            remaining = 0;
            resolved = true;
            break;
          }
        }
        if (resolved) break;
      }
    }
    if (!resolved) {
      for (var li = mpptCount - 1; li >= 0; li--) {
        if (mppt[li].strings > 0) {
          var combined = mppt[li].panelsTotal + remaining;
          for (var tp = panelsPerString; tp >= minPPS; tp--) {
            if (combined % tp === 0 && combined / tp <= maxStringsPerMPPT) {
              mppt[li].panelsPerString = tp;
              mppt[li].strings = combined / tp;
              mppt[li].panelsTotal = combined;
              mppt[li].totalVmp = tp * spec.Vmp;
              mppt[li].totalVoc = tp * spec.Voc * CFG.SAFETY.VOC_COLD;
              mppt[li].totalImp = mppt[li].strings * spec.Imp;
              mppt[li].totalPower = combined * panelW;
              var tw3 = [];
              if (mppt[li].totalVoc > mpptVmax) tw3.push('Voc مرتفع ('+mppt[li].totalVoc.toFixed(0)+'V > '+mpptVmax+'V)');
              if (mppt[li].totalVmp < mpptVmin) tw3.push('Vmp منخفض ('+mppt[li].totalVmp.toFixed(0)+'V < '+mpptVmin+'V)');
              if (mppt[li].totalImp > maxImp) tw3.push('تيار مرتفع ('+mppt[li].totalImp.toFixed(1)+'A > '+maxImp+'A)');
              mppt[li].warnings = tw3;
              remaining = 0;
              resolved = true;
              break;
            }
          }
          break;
        }
      }
    }
    if (!resolved && remaining > 0 && remaining < minPPS && panelsPerString + 1 <= maxPPS) {
      var need = remaining;
      for (var pi = 0; pi < mpptCount && need > 0; pi++) {
        if (mppt[pi].strings <= 0) continue;
        var newPPS = panelsPerString + 1;
        var absorb = mppt[pi].strings;
        mppt[pi].panelsPerString = newPPS;
        mppt[pi].panelsTotal = mppt[pi].strings * newPPS;
        mppt[pi].totalVmp = newPPS * spec.Vmp;
        mppt[pi].totalVoc = newPPS * spec.Voc * CFG.SAFETY.VOC_COLD;
        mppt[pi].totalPower = mppt[pi].panelsTotal * panelW;
        var tw4 = [];
        if (mppt[pi].totalVoc > mpptVmax) tw4.push('Voc مرتفع ('+mppt[pi].totalVoc.toFixed(0)+'V > '+mpptVmax+'V)');
        if (mppt[pi].totalVmp < mpptVmin) tw4.push('Vmp منخفض ('+mppt[pi].totalVmp.toFixed(0)+'V < '+mpptVmin+'V)');
        if (mppt[pi].totalImp > maxImp) tw4.push('تيار مرتفع ('+mppt[pi].totalImp.toFixed(1)+'A > '+maxImp+'A)');
        mppt[pi].warnings = tw4;
        need -= absorb;
      }
      if (need <= 0) { remaining = 0; resolved = true; }
    }
  }
  allocatedPanels = panelsForDistribution - remaining;
  stringsTotal = 0;
  for (var st = 0; st < mppt.length; st++) { stringsTotal += mppt[st].strings; }
  if (remaining > 0) {
    Log.warn('L2 Allocation: ' + allocatedPanels + '/' + panelsForDistribution + ' panels (' + remaining + ' orphans)');
    mppt[0].warnings.push('⚠️ '+remaining+' لوح لا يمكن توزيعهم — العاكس الواحد يدعم ' + singleInverterCapacity + ' لوحاً كحد أقصى.');
  }
  if (invertersNeeded > 1 && effectiveParallel === 1) {
    mppt[0].warnings.push('💡 يُشترط '+invertersNeeded+' عواكس متوازية لتوزيع '+panelCount+' لوحاً (سعة العاكس الواحد: '+singleInverterCapacity+' لوحاً).');
  }
  
  var r = {
    panelCount: panelCount,
    allocatedPanels: allocatedPanels,
    panelW: panelW,
    totalPanelKW: totalPanelKW,
    panelsPerString: panelsPerString,
    stringsTotal: stringsTotal,
    mpptCount: mpptCount,
    mppt: mppt,
    spec: spec,
    requiredKwh: requiredKwh,
    singleInverterCapacity: singleInverterCapacity,
    effectiveParallel: effectiveParallel,
    panelsPerInverter: panelsPerInverter,
    invertersNeeded: invertersNeeded
  };
  Log.info('L2 Panel Sizing', r);
  return r;
}

// L3: Inverter Selection
function calcInverter(lp, panels, opts) {
  var maxLoadW = lp.maxLoad * 1000;
  var invMargin = CFG.SAFETY.INVERTER_MARGIN;
  var inverterMinW = Math.ceil(maxLoadW * invMargin);
  var inverterRecW = Math.ceil(inverterMinW * 1.1); // Recommended: 10% extra headroom
  var totalPanelW = panels.totalPanelKW * 1000;
  var invSpec = opts.inverterSpec || null;
  var sysType = lp.systemType;
  
  var r = {
    maxLoadW: maxLoadW,
    inverterMinW: inverterMinW,
    inverterRecW: inverterRecW,
    totalPanelW: totalPanelW,
    systemType: sysType,
    selectedInverter: null,
    mpptCompatible: true,
    warnings: []
  };
  
  if (invSpec) {
    r.selectedInverter = invSpec;
    r.inverterRatedW = invSpec.ratedW;
    r.inverterMaxPV = invSpec.maxPVPower || invSpec.ratedW * 2;
    
    // Check: inverter rating >= inverterMinW
    if (invSpec.ratedW < inverterMinW) {
      r.warnings.push('⚠️ قدرة العاكس ('+invSpec.ratedW+'W) أقل من الحد الأدنى المطلوب ('+inverterMinW+'W)');
      r.mpptCompatible = false;
    }
    
    // Check: PV power compatibility (per-inverter for parallel systems)
    var effectiveParallel = panels.effectiveParallel || 1;
    var perInverterPVW = totalPanelW / effectiveParallel;
    var maxPVPerInv = invSpec.maxPVPower || invSpec.ratedW * 2;
    if (perInverterPVW > maxPVPerInv) {
      r.warnings.push('⚠️ قدرة الألواح/عاكس ('+perInverterPVW.toFixed(0)+'W) تتجاوز قدرة PV القصوى للعاكس الواحد ('+maxPVPerInv+'W)');
      r.mpptCompatible = false;
    }
    
    // Check MPPT per-channel
    var panelSpec = panels.spec;
    for (var i = 0; i < panels.mppt.length; i++) {
      var ch = panels.mppt[i];
      if (ch.strings <= 0) continue;
      var stringVoc = ch.panelsPerString * panelSpec.Voc * CFG.SAFETY.VOC_COLD;
      var stringVmp = ch.panelsPerString * panelSpec.Vmp;
      var stringIsc = ch.strings * panelSpec.Isc;
      
      if (stringVoc > invSpec.mpptRange.max) {
        r.warnings.push('⚠️ MPPT'+ch.channel+': Voc السلسلة ('+stringVoc.toFixed(0)+'V) > نطاق MPPT ('+invSpec.mpptRange.max+'V)');
        r.mpptCompatible = false;
      }
      if (stringIsc > (invSpec.maxIscPerMPPT || 40)) {
        r.warnings.push('⚠️ MPPT'+ch.channel+': Isc ('+stringIsc.toFixed(1)+'A) > أقصى Isc ('+(invSpec.maxIscPerMPPT||40)+'A)');
        r.mpptCompatible = false;
      }
    }
  } else {
    r.inverterRatedW = inverterRecW;
    r.inverterMaxPV = totalPanelW * 1.3;
  }
  
  Log.info('L3 Inverter Selection', r);
  return r;
}

// L3-P: Parallel Configuration (Master/Slave Topology + Auto-Sizing)
function calcParallelConfig(invSpec, numParallel, lp, totalPanelKW, panelW) {
  var r = {
    numInverters: numParallel, topology: 'standalone', masterIndex: 0,
    perInverterKW: 0, totalCapacityKW: 0, perInverterLoadShare: 100,
    requiresSTS: false, requiresElection: false, switchoverMs: CFG.PARALLEL.SWITCHOVER_MS,
    phaseConfig: 'single-phase', unbalanceTolerance: 0,
    autoSized: false, nLoad: 1, nPV: 1, sizingEquation: '',
    slaveCount: 0, masterLabel: '', slaveLabel: '',
    maxDirect: CFG.PARALLEL.MAX_DIRECT, maxParallel: CFG.PARALLEL.MAX_DIRECT,
    perInverterPVkw: 0, perInverterPanelCount: 0, perInverterBatteryKwh: 0,
    warnings: [], constraints: []
  };
  if (!invSpec) { r.warnings.push('⚠️ لم يتم اختيار موديل عاكس — لا يمكن حساب العدد.'); return r; }

  r.maxDirect = invSpec.parallel || CFG.PARALLEL.MAX_DIRECT;
  r.maxParallel = r.maxDirect;

  var ratedKW = invSpec.ratedW / 1000;
  var maxPVkw = (invSpec.maxPVPower || invSpec.ratedW * 2) / 1000;

  if (numParallel <= 0) {
    r.autoSized = true;
    r.nLoad = Math.max(1, Math.ceil(lp.maxLoad / ratedKW));
    r.nPV = Math.max(1, Math.ceil((totalPanelKW || 0) / maxPVkw));
    numParallel = Math.max(r.nLoad, r.nPV, 1);
    r.sizingEquation = 'N = max(⌈'+lp.maxLoad.toFixed(1)+'/'+ratedKW.toFixed(1)+'⌉, ⌈'+(totalPanelKW||0).toFixed(1)+'/'+maxPVkw.toFixed(1)+'⌉) = max('+r.nLoad+', '+r.nPV+') = '+numParallel;
    r.numInverters = numParallel;
  }

  if (numParallel <= 1) { Log.info('L3-P: Single inverter (standalone)', r); return r; }

  if (numParallel > r.maxDirect) {
    r.requiresSTS = true;
    r.warnings.push('⚠️ عدد العواكس ('+numParallel+') يتجاوز الحد الأقصى لهذا الموديل ('+invSpec.model+': '+r.maxDirect+' أجهزة). يُشترط خزانة توزيع طاقة متزامنة (STS) أو تقسيم المشروع إلى شبكات مصغرة منفصلة.');
    r.constraints.push('STS_REQUIRED');
  }

  var singleKW = ratedKW;
  r.totalCapacityKW = singleKW * numParallel;
  r.perInverterKW = singleKW;

  if (r.totalCapacityKW > CFG.PARALLEL.MAX_POWER_W / 1000) {
    r.warnings.push('❌ القدرة الإجمالية ('+r.totalCapacityKW.toFixed(0)+'kW) تتجاوز الحد الأقصى (1250kW). يُنصح باختيار عاكس بقدرة أساسية أعلى أو تقسيم المشروع.');
    r.constraints.push('POWER_LIMIT_EXCEEDED');
  } else if (r.totalCapacityKW > 1000) {
    r.warnings.push('⚠️ القدرة الإجمالية ('+r.totalCapacityKW.toFixed(0)+'kW) تقترب من حد الشبكة المصغرة (1250kW).');
  }

  r.topology = 'master-slave';
  r.masterIndex = 0;
  r.slaveCount = numParallel - 1;
  r.masterLabel = '1 Master ('+singleKW.toFixed(1)+'kW)';
  r.slaveLabel = r.slaveCount + ' Slave' + (r.slaveCount > 1 ? 's' : '') + ' ('+singleKW.toFixed(1)+'kW)';
  r.perInverterLoadShare = Math.round(100 / numParallel * 10) / 10;

  r.perInverterPVkw = (totalPanelKW || 0) / numParallel;
  r.perInverterPanelCount = Math.ceil((totalPanelKW || 0) * 1000 / (panelW || 720) / numParallel);
  r.perInverterBatteryKwh = lp.nighttimeKwh / numParallel;

  var perInvLoad = lp.maxLoad / numParallel;
  if (perInvLoad > singleKW) {
    r.warnings.push('⚠️ الحمل/عاكس ('+perInvLoad.toFixed(1)+'kW) يتجاوز القدرة الاسمية ('+singleKW.toFixed(1)+'kW).');
    r.constraints.push('OVERLOAD_PER_INVERTER');
  }

  if (invSpec.phase === '3-phase') {
    r.phaseConfig = 'three-phase';
    r.unbalanceTolerance = CFG.PARALLEL.UNBALANCE_MAX;
  }

  r.failoverMode = numParallel > 3 ? 'auto-election' : 'manual-failover';
  r.requiresElection = numParallel > 3;

  Log.info('L3-P: ' + numParallel + ' inverters, ' + r.topology + ', maxDirect=' + r.maxDirect, r);
  return r;
}

// L4: Battery Design
function calcBattery(lp, opts) {
  var nighttimeKwh = lp.nighttimeKwh;
  var dod = (opts.dod || CFG.DEFAULTS.dod) / 100;
  var sysV = opts.systemVoltage || 48;
  var sysType = lp.systemType;
  var chemistry = opts.batteryChemistry || 'LiFePO4';
  var cRate = opts.cRate || CFG.DEFAULTS.cRate;
  
  // HV battery uses higher voltage
  var batteryV = (sysType === 'HV') ? 400 : (CFG.BATTERY_VOLT[sysV] || 48);
  var cellV = (chemistry === 'LiFePO4') ? 3.2 : 2.0;
  var cellAh = (chemistry === 'LiFePO4') ? 100 : 200;
  
  var requiredAh = Math.ceil((nighttimeKwh * 1000) / (batteryV * dod));
  var requiredKwh = Math.ceil(requiredAh * batteryV / 1000 * 10) / 10;
  
  // Cells configuration
  var cellsInSeries = Math.ceil(batteryV / cellV);
  var parallelStrings = Math.max(1, Math.ceil(requiredAh / cellAh));
  var totalCells = cellsInSeries * parallelStrings;
  var maxChargeA = Math.ceil(requiredAh * cRate);
  var maxDischargeA = Math.ceil(requiredAh * cRate);
  
  // Max inverter charge current
  var inv = opts.inverterSpec || null;
  var maxInvCharge = (inv && inv.maxChargeCurrent) ? inv.maxChargeCurrent : maxChargeA;
  var chargeCurrent = Math.min(maxChargeA, maxInvCharge);
  
  var r = {
    nighttimeKwh: nighttimeKwh, dod: dod, batteryV: batteryV,
    requiredAh: requiredAh, requiredKwh: requiredKwh,
    chemistry: chemistry, cellV: cellV, cellAh: cellAh,
    cellsInSeries: cellsInSeries, parallelStrings: parallelStrings,
    totalCells: totalCells, maxChargeA: maxChargeA, maxDischargeA: maxDischargeA,
    chargeCurrent: chargeCurrent, systemType: sysType
  };
  Log.info('L4 Battery Design', r);
  return r;
}

// L5: Wiring & Protection
function calcWiring(panels, battery, inv, opts) {
  var sysV = opts.systemVoltage || 48;
  var sysType = inv ? inv.systemType : 'LV';
  var cableLength = opts.cableLength || 15;
  var ambientTemp = opts.ambientTemp || 35;
  var voltageDropMax = CFG.VOLTAGE_DROP_MAX;
  
  // PV Breaker
  var totalPanelW = panels.totalPanelKW * 1000;
  var vSys = (sysType === 'HV') ? 400 : (CFG.BATTERY_VOLT[sysV] || 48);
  var pvCurrent = panels.stringsTotal * panels.spec.Imp;
  var pvBreakerA = Math.ceil(pvCurrent * CFG.SAFETY.BREAKER);
  
  // Battery Breaker
  var invRatedW = inv ? (inv.inverterRatedW || 0) : (panels.totalPanelKW * 1000);
  var batCurrent = invRatedW / (battery.batteryV || vSys);
  var batBreakerA = Math.ceil(batCurrent * CFG.SAFETY.BREAKER);
  
  // Cable Sizing (IEC 60364)
  var wirePv = lookupWire(pvBreakerA);
  var wireBat = lookupWire(batBreakerA);
  
  // Temp correction factor (IEC 60364 table)
  var tempFactor = (ambientTemp <= 30) ? 1.0 : (ambientTemp <= 35) ? 0.94 : (ambientTemp <= 40) ? 0.87 : 0.78;
  var wirePvAdj = lookupWire(pvBreakerA / tempFactor);
  var wireBatAdj = lookupWire(batBreakerA / tempFactor);
  
  // Voltage drop check
  var pvResistance = wirePvAdj ? wirePvAdj.ohmPerKm : 0.727;
  var batResistance = wireBatAdj ? wireBatAdj.ohmPerKm : 0.727;
  var pvDropPercent = (2 * cableLength / 1000 * pvResistance * pvCurrent / vSys) * 100;
  var batDropPercent = (2 * cableLength / 1000 * batResistance * batCurrent / (battery.batteryV || vSys)) * 100;
  var dropWarnings = [];
  if (pvDropPercent > voltageDropMax * 100) dropWarnings.push('⚠️ هبوط الجهد PV عالي: '+pvDropPercent.toFixed(2)+'%');
  if (batDropPercent > voltageDropMax * 100) dropWarnings.push('⚠️ هبوط الجهد بطارية عالي: '+batDropPercent.toFixed(2)+'%');
  
  var r = {
    vSys: vSys, pvCurrent: pvCurrent, pvBreakerA: pvBreakerA,
    batCurrent: batCurrent, batBreakerA: batBreakerA,
    wirePv: wirePv, wireBat: wireBat, tempFactor: tempFactor,
    cableLength: cableLength, ambientTemp: ambientTemp,
    pvDropPercent: pvDropPercent, batDropPercent: batDropPercent,
    dropWarnings: dropWarnings, systemType: sysType
  };
  Log.info('L5 Wiring & Protection', r);
  return r;
}

function lookupWire(currentA) {
  var tbl = CFG.WIRE_TABLE;
  for (var i = 0; i < tbl.length; i++) {
    if (currentA >= tbl[i].minA && currentA < tbl[i].maxA) return tbl[i];
  }
  return tbl[0] || { minA: 0, maxA: 999, mm2: 2.5 };
}

// L6: Outputs + Economic Report
function calcOutputs(lp, panels, inv, battery, wiring, opts) {
  var parallelN = opts.parallelCount || 1;
  var panelCost = (opts.costPanel || 0.25) * panels.totalPanelKW * 1000;
  var invCost = (opts.costInverter || 0.15) * (inv.inverterRatedW || 0) * parallelN;
  var batCost = (opts.costBattery || 180) * battery.requiredKwh;
  var wiringCost = opts.cableLength * 3.5 + (wiring.pvBreakerA * 25 + wiring.batBreakerA * 25) / 2;
  var installCost = (opts.costPanel || 0.25) * panels.totalPanelKW * 1000 * 0.4;
  var totalCost = panelCost + invCost + batCost + wiringCost + installCost;
  
  var tariff = opts.tariff || 0.47;
  var battEff = (battery.chemistry === 'LiFePO4') ? 0.96 : 0.85;
  var daytimeSavings = lp.daytimeKwh * 365 * tariff;
  var nighttimeSavings = lp.nighttimeKwh * 365 * tariff * battEff;
  var annualSavings = daytimeSavings + nighttimeSavings;
  var roiYears = totalCost / (annualSavings || 1);
  var co2Avoided = lp.dailyKwh * 365 * 0.7;
  
  var years = (opts.analysisYears || 25);
  var discountRate = (opts.discountRate || 0.05);
  var degradation = (opts.degradationAnnual || 0.005);

  var lifetimeEnergy = 0;
  var npv = -totalCost;
  var cumulative = -totalCost;
  var paybackAdj = years;
  for (var y = 1; y <= years; y++) {
    var factor = Math.pow(1 - degradation, y - 1);
    lifetimeEnergy += lp.dailyKwh * 365 * factor;
    var yearlySaving = annualSavings * factor;
    npv += yearlySaving / Math.pow(1 + discountRate, y);
    if (cumulative < 0) {
      cumulative += yearlySaving;
      if (cumulative >= 0) paybackAdj = y;
    }
  }
  var lcoe = totalCost / (lifetimeEnergy || 1);
  var savings25 = annualSavings * ((1 - Math.pow(1 - degradation, years)) / degradation);

  Log.info('L6 Outputs + Economics', { tariff: tariff, lcoe: lcoe, npv: npv, paybackAdj: paybackAdj });
  
  var r = {
    panelCost: panelCost, invCost: invCost, batCost: batCost,
    wiringCost: wiringCost, installCost: installCost, totalCost: totalCost,
    annualSavings: annualSavings, roiYears: roiYears, co2Avoided: co2Avoided,
    tariff: tariff, currency: 'USD',
    lcoe: lcoe, npv: npv, paybackAdjYears: paybackAdj,
    lifetimeEnergy: lifetimeEnergy, savings25Year: savings25,
    years: years, discountRate: discountRate, degradation: degradation
  };
  Log.info('L6 Outputs + Economics', r);
  return r;
}

// =====================================================================
// MODULE: Intelligence
// =====================================================================
function generateIntelligence(lp, panels, inv, battery, wiring, parallelConfig) {
  var items = [];
  
  // AC startup current check
  if (lp.maxLoad > 0) {
    var acFactor = 3; // AC startup = 3x running
    var effectiveStartup = lp.maxLoad * acFactor / 2; // ~50% of loads are AC
    var invCap = inv.inverterRatedW / 1000 || 0;
    if (invCap > 0 && effectiveStartup > invCap) {
      items.push({
        type: 'warning',
        msg: '⚡ بناءً على تيار البدء للمكيفات (3× التيار العادي)، الحمل الفعال '+
              effectiveStartup.toFixed(1)+'kW يقترب من قدرة العاكس ('+invCap.toFixed(1)+'kW). يُنصح بزيادة هامش الأمان من 1.25 إلى 1.40 أو اختيار عاكس بقدرة أعلى.'
      });
    }
  }
  
  // Max load near inverter capacity
  if (inv.inverterRatedW > 0 && lp.maxLoad > 0) {
    var loadRatio = lp.maxLoad * 1000 / inv.inverterRatedW;
    if (loadRatio > 0.85) {
      items.push({
        type: 'warning',
        msg: '⚠️ الحمل الأقصى ('+lp.maxLoad.toFixed(1)+'kW) يقترب من القدرة الاسمية للعاكس ('+
              (inv.inverterRatedW/1000).toFixed(1)+'kW) — يُنصح باختيار عاكس بقدرة أكبر أو توزيع الأحمال.'
      });
    }
  }
  
  // Battery recommendation
  if (battery.chemistry === 'Lead-Acid' && battery.requiredKwh > 10) {
    items.push({
      type: 'recommendation',
      msg: '💡 يمكن تحسين عمر النظام باستخدام LiFePO4 بدلاً من Lead-Acid مع عمر أطول (10+ سنوات مقابل 3-5). '+
           'التكلفة الأولية أعلى ولكن التكلفة الإجمالية للملكية (TCO) أقل بنسبة ~40%.'
    });
  }
  
  // Compatibility warnings
  if (inv.warnings && inv.warnings.length > 0) {
    for (var i = 0; i < inv.warnings.length; i++) {
      items.push({ type: 'error', msg: inv.warnings[i] });
    }
  }
  
  // Wire size recommendation
  if (wiring.pvDropPercent > 3) {
    items.push({
      type: 'recommendation',
      msg: '🔌 هبوط الجهد في كابلات PV ('+wiring.pvDropPercent.toFixed(1)+'%) يتجاوز الحد الموصى به (3%). يُنصح بزيادة مقطع الكابل أو تقليل طول المسافة.'
    });
  }
  
  // HV system recommendation
  if (lp.systemType === 'HV' && inv.selectedInverter && inv.selectedInverter.type === 'LV') {
    items.push({
      type: 'error',
      msg: '❌ العاكس المختار ('+inv.selectedInverter.model+') من نوع LV لا يتوافق مع نظام HV. يُنصح باختيار عاكس HV متوافق مثل Deye SUN-HV أو Solis S6-EH3P.'
    });
  }
  
  // String sizing recommendation
  if (panels.mppt) {
    for (var j = 0; j < panels.mppt.length; j++) {
      var ch = panels.mppt[j];
      if (ch.warnings && ch.warnings.length > 0) {
        for (var k = 0; k < ch.warnings.length; k++) {
          items.push({ type: 'warning', msg: '⚠️ MPPT' + ch.channel + ': ' + ch.warnings[k] });
        }
      }
    }
  }
  
  // Parallel configuration warnings + sizing report
  if (parallelConfig && parallelConfig.numInverters > 1) {
    if (parallelConfig.autoSized) {
      items.push({
        type: 'ok',
        msg: '🔗 حساب تلقائي لعدد العواكس: '+parallelConfig.sizingEquation+'. '+
             'البنية: '+parallelConfig.masterLabel+' + '+parallelConfig.slaveLabel+'.'
      });
    }
    for (var p = 0; p < parallelConfig.warnings.length; p++) {
      items.push({ type: parallelConfig.warnings[p].indexOf('❌') === 0 ? 'error' : 'warning', msg: parallelConfig.warnings[p] });
    }
  }
  
  if (items.length === 0) {
    items.push({
      type: 'ok',
      msg: '✅ جميع المعايير متوافقة. التصميم جاهز للتنفيذ.'
    });
  }
  
  Log.info('Intelligence generated', items);
  return items;
}

// =====================================================================
// MODULE: UI
// =====================================================================
function populateInverterDropdown() {
  var sel = document.getElementById('inverterModel');
  var currentGroups = {};
  for (var i = 0; i < INVERTER_DB.length; i++) {
    var inv = INVERTER_DB[i];
    var groupLabel = inv.brand + ' — ' + inv.series + ' [' + inv.type + ']';
    if (!currentGroups[groupLabel]) {
      currentGroups[groupLabel] = document.createElement('optgroup');
      currentGroups[groupLabel].label = groupLabel;
      sel.appendChild(currentGroups[groupLabel]);
    }
    var opt = document.createElement('option');
    opt.value = inv.id;
    opt.textContent = inv.model + ' (' + (inv.ratedW / 1000).toFixed(1) + 'kW — ' + inv.type + ')';
    currentGroups[groupLabel].appendChild(opt);
  }
}

function applyInverterSpecs(id) {
  if (!id) return;
  var inv = getInverterById(id);
  if (!inv) return;
  document.getElementById('mpptRange').value = inv.mpptRange.min + '-' + inv.mpptRange.max;
  document.getElementById('mpptCurrent').value = inv.maxInputCurrentPerMPPT || 32;
  Log.info('Inverter specs applied', inv.model);
}

function applySampleProfile() {
  var data = {
    dailyConsumption: 10,
    daytimeConsumption: 4,
    maxLoad: 5.5,
    sunHours: 5,
    systemVoltage: '48',
    panelWatt: '550',
    weatherCondition: '1.0',
    dod: 80
  };
  setFormValues(data);
  showLoadProfileSummary({ maxLoad: 5.5, dailyKwh: 10, count: 24 });
  Log.info('Sample profile applied');
}

function handleLoadProfile(evt) {
  var file = evt.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var data = JSON.parse(e.target.result);
      if (!data.hourly || !Array.isArray(data.hourly)) throw new Error('Invalid format');
      
      // Compute aggregate from profile
      var totalKwh = 0;
      var maxKw = 0;
      for (var i = 0; i < data.hourly.length; i++) {
        totalKwh += data.hourly[i].load_kw;
        if (data.hourly[i].load_kw > maxKw) maxKw = data.hourly[i].load_kw;
      }
      // 24h average → daily kWh (hourly data is per hour, sum = daily)
      
      var formData = {
        dailyConsumption: Math.ceil(totalKwh * 10) / 10,
        maxLoad: maxKw,
        sunHours: data.psh || 5,
        dod: data.dod || 80,
        weatherCondition: String(data.weatherFactor || 1.0)
      };
      if (data.systemVoltage) formData.systemVoltage = String(data.systemVoltage);
      if (data.panelW) formData.panelWatt = String(data.panelW);
      setFormValues(formData);
      showLoadProfileSummary({ maxLoad: maxKw, dailyKwh: totalKwh, count: data.hourly.length });
      
      // Store profile data for chart
      window._loadProfileData = data.hourly;
      Log.info('Load profile loaded', { totalKwh: totalKwh, maxKw: maxKw });
    } catch(err) {
      showError('فشل قراءة ملف الأحمال: ' + err.message);
    }
  };
  reader.readAsText(file);
}

function setFormValues(data) {
  if (data.dailyConsumption !== undefined) document.getElementById('dailyConsumption').value = data.dailyConsumption;
  if (data.daytimeConsumption !== undefined) document.getElementById('daytimeConsumption').value = data.daytimeConsumption;
  if (data.maxLoad !== undefined) document.getElementById('maxLoad').value = data.maxLoad;
  if (data.sunHours !== undefined) document.getElementById('sunHours').value = data.sunHours;
  if (data.systemVoltage !== undefined) document.getElementById('systemVoltage').value = data.systemVoltage;
  if (data.panelWatt !== undefined) document.getElementById('panelWatt').value = data.panelWatt;
  if (data.weatherCondition !== undefined) document.getElementById('weatherCondition').value = data.weatherCondition;
  if (data.dod !== undefined) document.getElementById('dod').value = data.dod;
}

function showLoadProfileSummary(profile) {
  var el = document.getElementById('loadProfileSummary');
  el.style.display = 'block';
  el.textContent = '📊 تم تحميل الملف: الحمل الأقصى ' + profile.maxLoad.toFixed(1) + 'kW، الاستهلاك ' + profile.dailyKwh.toFixed(1) + ' kWh/يوم (' + (profile.count || 24) + ' قيمة)';
}

function showError(msg) {
  var el = document.getElementById('errorBox');
  if (typeof msg === 'string') msg = [msg];
  if (Array.isArray(msg) && msg.length > 0) {
    el.innerHTML = '<ul>' + msg.map(function(m){return '<li>'+m+'</li>';}).join('') + '</ul>';
    el.style.display = 'block';
  } else {
    el.style.display = 'none';
  }
}

function clearError() {
  document.getElementById('errorBox').style.display = 'none';
}

function validateInputs() {
  var errors = [];
  var daily = parseFloat(document.getElementById('dailyConsumption').value);
  var daytime = parseFloat(document.getElementById('daytimeConsumption').value) || 0;
  var maxLoad = parseFloat(document.getElementById('maxLoad').value);
  var psh = parseFloat(document.getElementById('sunHours').value);
  var dod = parseFloat(document.getElementById('dod').value);
  var voltage = document.getElementById('systemVoltage').value;
  var panel = document.getElementById('panelWatt').value;
  
  if (!daily || daily <= 0) errors.push('الاستهلاك اليومي مطلوب (رقم موجب)');
  if (!psh || psh <= 0) errors.push('ساعات الشمس الذروة مطلوبة');
  if (!dod || dod <= 0 || dod > 100) errors.push('عمق التفريغ يجب أن يكون بين 1-100%');
  if (!maxLoad || maxLoad <= 0) errors.push('الحمل الأقصى مطلوب');
  if (daytime > daily) errors.push('الاستهلاك النهاري لا يمكن أن يتجاوز الاستهلاك اليومي');
  if (!voltage) errors.push('يرجى اختيار جهد النظام');
  if (!panel) errors.push('يرجى اختيار قدرة اللوح');
  var pCount = parseInt(document.getElementById('parallelCount').value) || 0;
  if (pCount < 0 || pCount > 16) errors.push('عدد العواكس المتوازية يجب أن يكون بين 0 و 16 (0 = حساب تلقائي)');
  
  return errors;
}

function handleCalculate() {
  Log.info('--- Calculation Start ---');
  clearError();
  var errors = validateInputs();
  if (errors.length > 0) {
    showError(errors);
    document.getElementById('resultsSection').classList.remove('show');
    return;
  }
  
  // Gather inputs
  var daily = parseFloat(document.getElementById('dailyConsumption').value);
  var daytime = parseFloat(document.getElementById('daytimeConsumption').value) || 0;
  var maxLoad = parseFloat(document.getElementById('maxLoad').value);
  var psh = parseFloat(document.getElementById('sunHours').value);
  var sysV = document.getElementById('systemVoltage').value;
  var panelW = parseInt(document.getElementById('panelWatt').value);
  var weather = parseFloat(document.getElementById('weatherCondition').value);
  var dod = parseFloat(document.getElementById('dod').value);
  
  // Advanced inputs
  var invType = document.querySelector('input[name="inverterType"]:checked').value;
  var batteryChemistry = document.getElementById('batteryChemistry').value;
  var cRate = parseFloat(document.getElementById('cRate').value) || 0.5;
  var invId = document.getElementById('inverterModel').value;
  var cableLen = parseFloat(document.getElementById('cableLength').value) || 15;
  var ambientT = parseFloat(document.getElementById('ambientTemp').value) || 35;
  var costP = parseFloat(document.getElementById('costPanel').value) || 0.25;
  var costI = parseFloat(document.getElementById('costInverter').value) || 0.15;
  var costB = parseFloat(document.getElementById('costBattery').value) || 180;
  var tariff = parseFloat(document.getElementById('tariff').value) || 0.47;
  var parallelCount = parseInt(document.getElementById('parallelCount').value) || 0;
  
  var invSpec = invId ? getInverterById(invId) : null;
  
  // L1: Load Profile
  var lp = calcLoadProfile({ dailyConsumption: daily, daytimeConsumption: daytime, maxLoad: maxLoad });
  
  // Override system type if manual selected
  if (invType !== 'auto') lp.systemType = invType;
  
  // Update system badge
  var badgeLV = document.getElementById('systemBadgeLV');
  var badgeHV = document.getElementById('systemBadgeHV');
  if (lp.systemType === 'HV') {
    badgeLV.style.display = 'none';
    badgeHV.style.display = 'inline-flex';
  } else {
    badgeLV.style.display = 'inline-flex';
    badgeHV.style.display = 'none';
  }
  
  // 1. Estimation: total panel capacity (no distribution)
  var requiredKwh = lp.dailyKwh / psh * CFG.SAFETY.PANEL_LOSS * weather;
  var estimatedPanelCount = Math.ceil(requiredKwh / (panelW / 1000));
  var estimatedTotalKW = estimatedPanelCount * panelW / 1000;
  
  // 2. L3-P: Parallel first (resolves auto N=0)
  var parallelConfig = calcParallelConfig(invSpec, parallelCount, lp, estimatedTotalKW, panelW);
  
  // 3. L2: Panels per inverter
  var panels = calcPanels(lp, { psh: psh, panelW: panelW, weather: weather, systemVoltage: sysV, inverterSpec: invSpec, parallelCount: parallelConfig.numInverters });
  
  // 4. L3: Inverter
  var inv = calcInverter(lp, panels, { inverterSpec: invSpec });
  
  // L4: Battery
  var battery = calcBattery(lp, { dod: dod, systemVoltage: sysV, batteryChemistry: batteryChemistry, cRate: cRate, inverterSpec: invSpec });
  
  // L5: Wiring
  var wiring = calcWiring(panels, battery, inv, { systemVoltage: sysV, cableLength: cableLen, ambientTemp: ambientT });
  
  // L6: Outputs
  var out = calcOutputs(lp, panels, inv, battery, wiring, { costPanel: costP, costInverter: costI, costBattery: costB, tariff: tariff, cableLength: cableLen, analysisYears: 25, discountRate: 0.05, degradationAnnual: 0.005, parallelCount: parallelCount });
  window._lastOutput = out;
  
  // Intelligence
  var intelligence = generateIntelligence(lp, panels, inv, battery, wiring, parallelConfig);
  
  // Render UI
  renderResults(lp, panels, inv, battery, wiring, out, parallelConfig);
  renderMPPT(panels);
  renderStringViz(panels);
  renderWiring(wiring);
  renderEconomic(out);
  renderIntelligence(intelligence);
  renderLoadChart();
  
  document.getElementById('resultsSection').classList.add('show');
  Log.info('--- Calculation Complete ---');
}

function renderResults(lp, panels, inv, battery, wiring, out, parallelConfig) {
  var grid = document.getElementById('resultsGrid');
  var sysType = lp.systemType;
  var html = '';
  
  // Card 1: System Summary
  html += '<div class="result-card' + (sysType === 'HV' ? ' section-hv' : '') + '">';
  html += '<div class="icon">📋</div><div class="label">ملخص النظام</div>';
  html += '<div class="value">' + sysType + '</div>';
  html += '<div class="unit">' + (sysType === 'HV' ? 'جهد عالي (200-800V)' : 'جهد منخفض (12/24/48V)') + '</div>';
  html += '<div class="detail">الحمل الأقصى: ' + lp.maxLoad.toFixed(2) + ' kW</div>';
  html += '</div>';
  
  // Card 2: Panels
  html += '<div class="result-card"><div class="icon">☀️</div><div class="label">الألواح الشمسية</div>';
  html += '<div class="value">' + panels.panelCount + '</div>';
  html += '<div class="unit">لوح × ' + panels.panelW + 'W = ' + panels.totalPanelKW.toFixed(1) + ' kWp</div>';
  html += '<div class="detail">' + panels.stringsTotal + ' سلاسل، ' + panels.panelsPerString + ' لوح/سلسلة</div>';
  html += '</div>';
  
  // Card 3: Battery
  var batLabel = (battery.chemistry === 'LiFePO4') ? 'LiFePO4' : 'Lead-Acid';
  html += '<div class="result-card"><div class="icon">🔋</div><div class="label">البطارية — ' + batLabel + '</div>';
  html += '<div class="value">' + battery.requiredKwh.toFixed(1) + '</div>';
  html += '<div class="unit">kWh (' + battery.requiredAh + 'Ah @ ' + battery.batteryV + 'V)</div>';
  html += '<div class="detail">' + battery.cellsInSeries + 'S × ' + battery.parallelStrings + 'P = ' + battery.totalCells + ' خلية</div>';
  html += '</div>';
  
  // Card 4: Inverter
  var invName = inv.selectedInverter ? inv.selectedInverter.model : 'مُقترح';
  html += '<div class="result-card' + (sysType === 'HV' ? ' section-hv' : '') + '"><div class="icon">⚡</div><div class="label">العاكس — ' + invName + '</div>';
  html += '<div class="value">' + (inv.inverterRatedW / 1000).toFixed(1) + '</div>';
  html += '<div class="unit">kW (موصى به: ' + (inv.inverterRecW / 1000).toFixed(1) + ' kW)</div>';
  html += '<div class="detail">الحمل الأقصى: ' + inv.maxLoadW.toFixed(0) + 'W × 1.25 = ' + inv.inverterMinW + 'W</div>';
  html += '</div>';
  
  // Card 4-P: Parallel Configuration (if applicable)
  if (parallelConfig && parallelConfig.numInverters > 1) {
    var topoLabel = parallelConfig.requiresSTS ? 'متوازي + STS' : 'متوازي مباشر';
    var autoLabel = parallelConfig.autoSized ? ' (تلقائي)' : ' (يدوي)';
    html += '<div class="result-card section-hv"><div class="icon">🔗</div><div class="label">الربط التفرعي — ' + topoLabel + autoLabel + '</div>';
    html += '<div class="value">' + parallelConfig.numInverters + ' × ' + parallelConfig.perInverterKW.toFixed(1) + 'kW</div>';
    html += '<div class="unit">القدرة الإجمالية: ' + parallelConfig.totalCapacityKW.toFixed(0) + 'kW</div>';
    if (parallelConfig.autoSized) {
      html += '<div class="detail">N_load=⌈'+lp.maxLoad.toFixed(1)+'/'+parallelConfig.perInverterKW.toFixed(1)+'⌉='+parallelConfig.nLoad+' | N_pv=⌈'+(panels.totalPanelKW||0).toFixed(1)+'/'+((invSpec?((invSpec.maxPVPower||invSpec.ratedW*2)/1000):0).toFixed(1))+'⌉='+parallelConfig.nPV+'</div>';
    }
    html += '<div class="detail">البنية: ' + parallelConfig.masterLabel + ' + ' + parallelConfig.slaveLabel + '</div>';
    html += '<div class="detail">تبديل: ≤' + parallelConfig.switchoverMs + 'ms | فشل: ' + parallelConfig.failoverMode + '</div>';
    html += '<div class="detail">PV/عاكس: ' + parallelConfig.perInverterPVkw.toFixed(1) + 'kW | بطارية/عاكس: ' + parallelConfig.perInverterBatteryKwh.toFixed(1) + 'kWh</div>';
    html += '</div>';
  }
  
  // Card 5: Economy
  html += '<div class="result-card"><div class="icon">💰</div><div class="label">التكلفة التقديرية</div>';
  html += '<div class="value">$' + out.totalCost.toFixed(0) + '</div>';
  html += '<div class="unit">ROI: ' + out.roiYears.toFixed(1) + ' سنة</div>';
  html += '<div class="detail">توفير سنوي: $' + out.annualSavings.toFixed(0) + ' | خفض CO₂: ' + out.co2Avoided.toFixed(0) + ' kg/سنة</div>';
  html += '</div>';
  
  grid.innerHTML = html;
}

function renderMPPT(panels) {
  var grid = document.getElementById('mpptGrid');
  if (!panels.mppt || panels.mppt.length === 0) { grid.innerHTML = ''; return; }
  var html = '';
  for (var i = 0; i < panels.mppt.length; i++) {
    var ch = panels.mppt[i];
    var warnHtml = '';
    if (ch.warnings && ch.warnings.length > 0) {
      warnHtml = '<div class="detail" style="color:var(--error);">' + ch.warnings.join('; ') + '</div>';
    }
    html += '<div class="mppt-card mppt-' + (i+1) + '" data-mppt="MPPT ' + (i+1) + '">';
    html += '<div class="mppt-row"><span class="label">السلاسل</span><span class="value">' + ch.strings + '</span></div>';
    html += '<div class="mppt-row"><span class="label">ألواح/سلسلة</span><span class="value">' + ch.panelsPerString + '</span></div>';
    html += '<div class="mppt-row"><span class="label">إجمالي الألواح</span><span class="value">' + ch.panelsTotal + '</span></div>';
    html += '<div class="mppt-row"><span class="label">Vmp الإجمالي</span><span class="value">' + ch.totalVmp.toFixed(0) + 'V</span></div>';
    html += '<div class="mppt-row"><span class="label">Voc الإجمالي (بارد)</span><span class="value">' + ch.totalVoc.toFixed(0) + 'V</span></div>';
    html += '<div class="mppt-row"><span class="label">تيار الدخل</span><span class="value">' + ch.totalImp.toFixed(1) + 'A</span></div>';
    html += '<div class="mppt-row"><span class="label">الاستطاعة</span><span class="value">' + (ch.totalPower/1000).toFixed(2) + ' kW</span></div>';
    html += warnHtml;
    html += '</div>';
  }
  grid.innerHTML = html;
}

function renderStringViz(panels) {
  var container = document.getElementById('stringVizContainer');
  if (!panels.mppt || panels.mppt.length === 0) { container.innerHTML = ''; return; }
  var html = '';
  for (var m = 0; m < panels.mppt.length; m++) {
    var ch = panels.mppt[m];
    if (ch.strings <= 0) continue;
    html += '<div style="margin-bottom:12px;"><strong>MPPT ' + (m+1) + '</strong>: ' + ch.strings + ' سلاسل، ' + ch.panelsPerString + ' لوح/سلسلة</div>';
    for (var s = 0; s < ch.strings; s++) {
      html += '<div class="string-row">';
      html += '<span class="string-label" style="margin:0 4px 0 0;">S' + (s+1) + ':</span>';
      for (var p = 0; p < ch.panelsPerString; p++) {
        html += '<div class="string-module">' + panels.panelW + '</div>';
      }
      html += '</div>';
    }
  }
  html += '<div class="string-summary">إجمالي: ' + panels.panelCount + ' لوح × ' + panels.panelW + 'W = ' + panels.totalPanelKW.toFixed(1) + ' kWp</div>';
  container.innerHTML = html;
}

function renderWiring(wiring) {
  var grid = document.getElementById('wiringGrid');
  var html = '';
  
  // PV Breaker
  html += '<div class="result-card"><div class="icon">🔌</div><div class="label">قاطع PV</div>';
  html += '<div class="value">' + wiring.pvBreakerA + ' A</div>';
  html += '<div class="unit">تيار PV: ' + wiring.pvCurrent.toFixed(1) + 'A × ' + CFG.SAFETY.BREAKER + '</div>';
  html += '<div class="detail">كابل: ' + (wiring.wirePv ? wiring.wirePv.mm2 + ' mm²' : '—') + '</div>';
  html += '</div>';
  
  // Battery Breaker
  html += '<div class="result-card"><div class="icon">🔋</div><div class="label">قاطع البطارية</div>';
  html += '<div class="value">' + wiring.batBreakerA + ' A</div>';
  html += '<div class="unit">تيار البطارية: ' + wiring.batCurrent.toFixed(1) + 'A × ' + CFG.SAFETY.BREAKER + '</div>';
  html += '<div class="detail">كابل: ' + (wiring.wireBat ? wiring.wireBat.mm2 + ' mm²' : '—') + '</div>';
  html += '</div>';
  
  // Voltage Drop
  html += '<div class="result-card"><div class="icon">📏</div><div class="label">هبوط الجهد</div>';
  html += '<div class="value ' + (wiring.pvDropPercent > 3 ? 'error' : '') + '">PV: ' + wiring.pvDropPercent.toFixed(2) + '%</div>';
  html += '<div class="unit">بطارية: ' + wiring.batDropPercent.toFixed(2) + '%</div>';
  html += '<div class="detail">طول الكابل: ' + wiring.cableLength + 'م | درجة حرارة: ' + wiring.ambientTemp + '°م | معامل تصحيح: ' + wiring.tempFactor.toFixed(2) + '</div>';
  html += '</div>';
  
  grid.innerHTML = html;
}

function renderEconomic(out) {
  var grid = document.getElementById('economicGrid');
  var html = '';
  
  html += '<div class="result-card"><div class="icon">🏷️</div><div class="label">تفاصيل التكاليف</div>';
  html += '<div class="value">$' + out.totalCost.toFixed(0) + '</div>';
  html += '<div class="unit">إجمالي التكلفة التقديرية</div>';
  html += '<div class="detail">ألواح: $' + out.panelCost.toFixed(0) + ' | عاكس: $' + out.invCost.toFixed(0) + ' | بطارية: $' + out.batCost.toFixed(0) + '</div>';
  html += '</div>';
  
  html += '<div class="result-card"><div class="icon">📈</div><div class="label">العائد على الاستثمار</div>';
  html += '<div class="value">' + out.paybackAdjYears.toFixed(1) + ' / ' + out.roiYears.toFixed(1) + '</div>';
  html += '<div class="unit">سنة (معدّل / بسيط)</div>';
  html += '<div class="detail">توفير سنوي: $' + out.annualSavings.toFixed(0) + ' | تعرفة: $' + out.tariff.toFixed(3) + '/kWh</div>';
  html += '</div>';
  
  html += '<div class="result-card"><div class="icon">⚡</div><div class="label">تكلفة الطاقة الشمسية</div>';
  html += '<div class="value">$' + out.lcoe.toFixed(3) + '</div>';
  html += '<div class="unit">LCOE ($/kWh)</div>';
  html += '<div class="detail">إنتاج ' + (out.lifetimeEnergy / 1000).toFixed(1) + ' MWh على ' + out.years + ' سنة | تقادم: ' + (out.degradation * 100).toFixed(1) + '%/سنة</div>';
  html += '</div>';
  
  html += '<div class="result-card"><div class="icon">💰</div><div class="label">صافي القيمة الحالية</div>';
  html += '<div class="value">$' + out.npv.toFixed(0) + '</div>';
  html += '<div class="unit">NPV (' + out.years + ' سنة @ ' + (out.discountRate * 100).toFixed(0) + '%)</div>';
  html += '<div class="detail">إجمالي التوفير المعدّل: $' + out.savings25Year.toFixed(0) + '</div>';
  html += '</div>';
  
  html += '<div class="result-card"><div class="icon">🌱</div><div class="label">الأثر البيئي</div>';
  html += '<div class="value">' + out.co2Avoided.toFixed(0) + '</div>';
  html += '<div class="unit">kg CO₂ مخفض سنوياً</div>';
  html += '<div class="detail">ما يعادل زراعة ' + Math.round(out.co2Avoided / 21) + ' شجرة</div>';
  html += '</div>';
  
  grid.innerHTML = html;
}

function renderIntelligence(items) {
  var container = document.getElementById('intelligenceBox');
  if (!items || items.length === 0) { container.innerHTML = ''; return; }
  var html = '<div class="results-title">🧠 التحليل الذكي</div>';
  for (var i = 0; i < items.length; i++) {
    var cls = 'validation-box';
    if (items[i].type === 'ok') cls += ' ok';
    if (items[i].type === 'error') cls += '';
    if (items[i].type === 'warning') cls += '';
    html += '<div class="' + cls + '"><div class="icon">' + (items[i].type === 'ok' ? '✅' : items[i].type === 'warning' ? '⚠️' : '❌') + '</div><span>' + items[i].msg + '</span></div>';
  }
  container.innerHTML = html;
}

function renderLoadChart() {
  var container = document.getElementById('loadChartContainer');
  var profile = window._loadProfileData;
  if (!profile || profile.length === 0) {
    container.innerHTML = '<p style="color:var(--text-light);font-size:.85rem;">قم بتحميل ملف منحنى الأحمال لعرض المخطط البياني</p>';
    return;
  }
  var svg = generateBarChart(profile);
  container.innerHTML = svg;
}

// =====================================================================
// MODULE: Print (Report Generator + SVG Charts)
// =====================================================================
function generateBarChart(data) {
  var w = 700, h = 200, pad = { t: 20, r: 10, b: 30, l: 40 };
  var cw = w - pad.l - pad.r, ch = h - pad.t - pad.b;
  var maxVal = 0;
  for (var i = 0; i < data.length; i++) if (data[i].load_kw > maxVal) maxVal = data[i].load_kw;
  maxVal = Math.ceil(maxVal * 1.1);
  var barW = cw / data.length - 2;
  if (barW < 4) barW = 4;
  
  var bars = '';
  var labels = '';
  for (var j = 0; j < data.length; j++) {
    var x = pad.l + j * (cw / data.length) + 1;
    var bh = (data[j].load_kw / maxVal) * ch;
    var y = pad.t + ch - bh;
    var color = data[j].critical ? '#f59e0b' : '#10b981';
    bars += '<rect x="' + x + '" y="' + y + '" width="' + barW + '" height="' + bh + '" fill="' + color + '" rx="2"/>';
    if (j % 4 === 0) {
      labels += '<text x="' + (x + barW/2) + '" y="' + (h - 5) + '" text-anchor="middle" font-size="8" fill="#6b7280">' + data[j].hour + '</text>';
    }
  }
  
  // Y axis labels
  var yLabels = '';
  for (var k = 0; k <= 4; k++) {
    var val = (maxVal / 4) * k;
    var yy = pad.t + ch - (k / 4) * ch;
    yLabels += '<text x="' + (pad.l - 5) + '" y="' + (yy + 3) + '" text-anchor="end" font-size="8" fill="#6b7280">' + val.toFixed(1) + '</text>';
    yLabels += '<line x1="' + pad.l + '" y1="' + yy + '" x2="' + w + '" y2="' + yy + '" stroke="#e5e7eb" stroke-width="0.5"/>';
  }
  
  return '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg">' +
    '<rect width="100%" height="100%" fill="#fafafa" rx="6"/>' +
    yLabels + bars + labels +
    '<text x="' + (w/2) + '" y="14" text-anchor="middle" font-size="10" font-weight="600" fill="#374151">منحنى الأحمال اليومي (kWh)</text>' +
    '</svg>';
}

function generatePieChart(labels, values, colors, title) {
  var w = 300, h = 220, cx = 100, cy = 110, r = 80;
  var total = 0;
  for (var i = 0; i < values.length; i++) total += values[i];
  var paths = '';
  var angle = -90;
  for (var j = 0; j < values.length; j++) {
    var pct = values[j] / total;
    var a2 = angle + pct * 360;
    var x1 = cx + r * Math.cos(angle * Math.PI / 180);
    var y1 = cy + r * Math.sin(angle * Math.PI / 180);
    var x2 = cx + r * Math.cos(a2 * Math.PI / 180);
    var y2 = cy + r * Math.sin(a2 * Math.PI / 180);
    var large = (pct > 0.5) ? 1 : 0;
    paths += '<path d="M' + cx + ',' + cy + ' L' + x1 + ',' + y1 + ' A' + r + ',' + r + ' 0 ' + large + ',1 ' + x2 + ',' + y2 + ' Z" fill="' + colors[j] + '" stroke="#fff" stroke-width="2"/>';
    angle = a2;
  }
  var legend = '';
  for (var k = 0; k < labels.length; k++) {
    var ly = 10 + k * 20;
    legend += '<rect x="210" y="' + ly + '" width="12" height="12" fill="' + colors[k] + '" rx="2"/>';
    legend += '<text x="228" y="' + (ly + 10) + '" font-size="9" fill="#374151">' + labels[k] + ' (' + Math.round(values[k]/total*100) + '%)</text>';
  }
  return '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg">' +
    '<text x="' + (w/2) + '" y="14" text-anchor="middle" font-size="10" font-weight="600" fill="#374151">' + title + '</text>' +
    paths + legend +
    '</svg>';
}

function handlePrint() {
  // Build print report dynamically before printing
  var report = generatePrintReport();
  document.getElementById('printReport').innerHTML = report;
  // Delay to allow DOM to render
  setTimeout(function() {
    window.print();
  }, 100);
}

function generatePrintReport() {
  var daily = document.getElementById('dailyConsumption').value || '—';
  var daytime = document.getElementById('daytimeConsumption').value || '0';
  var maxLoad = document.getElementById('maxLoad').value || '—';
  var psh = document.getElementById('sunHours').value || '—';
  var sysV = document.getElementById('systemVoltage').value || '—';
  var panelW = document.getElementById('panelWatt').value || '—';
  var weather = document.getElementById('weatherCondition').value || '1.0';
  var dod = document.getElementById('dod').value || '—';
  var invId = document.getElementById('inverterModel').value;
  var invSpec = invId ? getInverterById(invId) : null;
  
  var today = new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
  var weatherLabel = weather === '1.0' ? 'مشمس' : (weather === '1.15' ? 'غائم جزئي' : 'غائم');
  
  var summaryText = 'تم تصميم النظام الشمسي بناءً على استهلاك يومي ' + daily + ' kWh وساعات شمس ذروة ' + psh + '. ' +
    'تم اختيار ' + (invSpec ? invSpec.model : 'عاكس بقدرة مناسبة') + ' مع ألواح بقدرة ' + panelW + 'W. ' +
    'النظام ' + (parseFloat(maxLoad) >= 30 ? 'عال الجهد (HV)' : 'منخفض الجهد (LV)') + '، ' +
    'مع بطارية ' + dod + '% DoD. التصميم مطابق للمعايير الدولية IEC مع عوامل أمان معتمدة.';
  
  var recommendation = 'بناءً على التحليل الهندسي، يُوصى بتنفيذ النظام كما هو موضح في الجداول أدناه.';
  
  // Build chart SVGs
  var profile = window._loadProfileData || [];
  var chartSvg = profile.length > 0 ? generateBarChart(profile) : '<p style="text-align:center;color:#9ca3af;font-size:10pt;">لم يتم تحميل ملف منحنى الأحمال</p>';
  
  var costPie = generatePieChart(
    ['ألواح', 'عاكس', 'بطارية', 'تركيب', 'أخرى'],
    [parseFloat((document.getElementById('costPanel').value || 0.25) * (panelW || 550) * 20 / 10),
     parseFloat((document.getElementById('costInverter').value || 0.15) * 5000),
     parseFloat((document.getElementById('costBattery').value || 180) * 5),
     parseFloat((document.getElementById('costPanel').value || 0.25) * (panelW || 550) * 20 * 0.1),
     200],
    ['#f59e0b','#7c3aed','#10b981','#3b82f6','#9ca3af'],
    'توزيع التكاليف'
  );
  
  return '<div class="print-section">' +
    '<div class="print-header"><div class="print-logo">☀️</div><div class="print-title">تقرير تصميم نظام الطاقة الشمسية</div><div class="print-meta">' + today + ' | المهندس المنسق: سليم السقاف</div></div>' +
    '<div class="print-section"><div class="print-section-title">📋 الملخص التنفيذي</div>' +
    '<div class="print-summary-text">' + summaryText + '</div></div>' +
    '<div class="print-section"><div class="print-section-title">📊 بيانات المشروع</div>' +
    '<div class="print-grid">' +
    '<div class="print-item"><div class="print-item-label">الاستهلاك اليومي</div><div class="print-item-value">' + daily + ' <span class="print-item-unit">kWh</span></div></div>' +
    '<div class="print-item"><div class="print-item-label">الاستهلاك النهاري</div><div class="print-item-value">' + daytime + ' <span class="print-item-unit">kWh</span></div></div>' +
    '<div class="print-item"><div class="print-item-label">الحمل الأقصى</div><div class="print-item-value">' + maxLoad + ' <span class="print-item-unit">kW</span></div></div>' +
    '<div class="print-item"><div class="print-item-label">ساعات الشمس</div><div class="print-item-value">' + psh + ' <span class="print-item-unit">PSH</span></div></div>' +
    '<div class="print-item"><div class="print-item-label">جهد النظام</div><div class="print-item-value">' + sysV + ' <span class="print-item-unit">V</span></div></div>' +
    '<div class="print-item"><div class="print-item-label">قدرة اللوح</div><div class="print-item-value">' + panelW + ' <span class="print-item-unit">W</span></div></div>' +
    '<div class="print-item"><div class="print-item-label">حالة الطقس</div><div class="print-item-value">' + weatherLabel + '</div></div>' +
    '<div class="print-item"><div class="print-item-label">عمق التفريغ</div><div class="print-item-value">' + dod + ' <span class="print-item-unit">%</span></div></div>' +
    '</div></div>' +
    '<div class="print-section"><div class="print-section-title">📈 منحنى الأحمال اليومي</div>' +
    '<div class="print-chart">' + chartSvg + '</div></div>' +
    '<div class="print-section"><div class="print-section-title">💰 توزيع التكاليف</div>' +
    '<div class="print-chart">' + costPie + '</div></div>' +
    '<div class="print-section"><div class="print-section-title">📊 التحليل الاقتصادي</div>' +
    (function() {
      var o = window._lastOutput;
      if (!o) return '<div class="print-summary-text">قم بالحساب أولاً لعرض التحليل الاقتصادي</div>';
      return '<div class="print-grid">' +
      '<div class="print-item"><div class="print-item-label">إجمالي التكلفة</div><div class="print-item-value">$' + o.totalCost.toFixed(0) + '</div></div>' +
      '<div class="print-item"><div class="print-item-label">التوفير السنوي</div><div class="print-item-value">$' + o.annualSavings.toFixed(0) + ' <span class="print-item-unit">/سنة</span></div></div>' +
      '<div class="print-item"><div class="print-item-label">فترة الاسترداد</div><div class="print-item-value">' + o.paybackAdjYears.toFixed(1) + ' <span class="print-item-unit">سنة (معدّل)</span></div></div>' +
      '<div class="print-item"><div class="print-item-label">LCOE</div><div class="print-item-value">$' + o.lcoe.toFixed(3) + ' <span class="print-item-unit">/kWh</span></div></div>' +
      '<div class="print-item"><div class="print-item-label">صافي القيمة الحالية</div><div class="print-item-value">$' + o.npv.toFixed(0) + ' <span class="print-item-unit">NPV</span></div></div>' +
      '<div class="print-item"><div class="print-item-label">إجمالي الطاقة المنتجة</div><div class="print-item-value">' + (o.lifetimeEnergy / 1000).toFixed(1) + ' <span class="print-item-unit">MWh / ' + o.years + ' سنة</span></div></div>' +
      '<div class="print-item"><div class="print-item-label">إجمالي التوفير</div><div class="print-item-value">$' + o.savings25Year.toFixed(0) + ' <span class="print-item-unit">/' + o.years + ' سنة</span></div></div>' +
      '<div class="print-item"><div class="print-item-label">تعرفة الكهرباء</div><div class="print-item-value">$' + o.tariff.toFixed(3) + ' <span class="print-item-unit">/kWh</span></div></div>' +
      '</div>';
    })() +
    '<div class="print-section"><div class="print-section-title">🔧 التوصية الهندسية</div>' +
    '<div class="print-summary-text">' + recommendation + '</div></div>' +
    '<div class="print-section"><div class="print-section-title">👤 ختم المهندس</div>' +
    '<div class="engineer-stamp"><div class="stamp-seal">☀️</div><div class="stamp-name">المهندس المنسق: سليم السقاف</div><div class="stamp-phone">هاتف: 770338777</div><div class="stamp-date">تاريخ التوقيع: ' + today + '</div></div></div>' +
    '<div class="print-footer"><p>☀️ حاسبة أنظمة الطاقة الشمسية — تقرير تصميم هندسي</p><p>تم الإنشاء بواسطة المهندس المنسق: سليم السقاف | 770338777</p></div>' +
    '</div>';
}

// =====================================================================
// MODULE: Main (Initialization & Orchestration)
// =====================================================================
(function init() {
  populateInverterDropdown();
  Log.info('Solar Energy Calculator initialized');
})();

