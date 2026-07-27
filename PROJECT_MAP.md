# PROJECT_MAP.md — حاسبة أنظمة الطاقة الشمسية
> Last Updated: 2026-07-27 | Version: 2.18.0 | Engineer: سليم السقاف | 770338777

---

## [TECH_STACK]
| Layer | Technology | Version |
|-------|-----------|---------|
| Markup | HTML5 (UTF-8, RTL) | - |
| Styling | CSS3 (Custom Properties, Grid, Flexbox, @media print A4) | - |
| Logic | Vanilla JavaScript (IIFE modular layers) | ES5-compatible |
| Runtime | Browser (Chrome 118+, Firefox 119+, Safari 17+, Edge 118+) | - |
| Build | Node.js (for `build.mjs` pipeline) | 22.14 LTS |
| Charts | SVG (programmatic — no libraries) | Zero-dependency |

**Zero external dependencies. Single-file application: `index.html`.**

---

## [DATA_FILES]
| File | Purpose | Status |
|------|---------|--------|
| `inverters-catalog.json` | Master inverter datasheet (60 models, 5 mfrs, LV + HV) | ✅ Source of truth |
| `load-profile.json` | 24h hourly load curve for sample project | ✅ Created |
| `cost-assumptions.json` | Default economic parameters ($/W, tariff $0.47/kWh, degradation 0.5%/yr) | ✅ Created |
| `build.mjs` | Build pipeline: catalog → INVERTER_DB injection → PROJECT_MAP.md update | ✅ Working |

---

## [SYSTEM_FLOW]
```
User ──→ Form (14 inputs + Load Profile file upload)
           ├─ Basic: daily kWh, daytime kWh, maxLoad kW, PSH, Vsys, panel W, DoD%
           ├─ Load Profile: upload JSON or apply sample
           └─ Advanced: LV/HV override, inverter model, battery chem, C-rate,
                         MPPT range/current, cable length, temp, cost assumptions
                  │
                  ▼
           Validation (8 checks → error box if invalid)
                   │
         ┌─────────┴─────────┐
         ▼                   ▼
    Engine L1-L3         Intelligence Layer
    (Pure Functions)     (Compatibility, Warnings, Recs)
         │                   │
         ▼                   │
    L3-P: Parallel Config    │
    (Master/Slave, STS)      │
         │                   │
         ▼                   │
    Engine L4-L6              │
    (Battery, Wire, Eco)      │
         │                   │
         ▼                   ▼
    Results UI ────────► Intelligence Box
    (7 card grids)     (ok/warning/error items)
         │
         ▼
    Print Report (A4 PDF)
    ├─ Executive Summary
    ├─ Project Data Table
    ├─ Load Profile Chart (SVG Bar)
    ├─ Cost Distribution Chart (SVG Pie)
    ├─ Engineering Recommendation
    └─ Engineer Stamp (سليم السقاف | 770338777)
```

---

## [ARCHITECTURE]

### Single-File Layered Modules
```
index.html
├── <meta charset="UTF-8">          — UTF-8 ensures Arabic text (fixes mojibake)
├── <style>                         — Screen CSS (RTL, Grid, Variables, Components)
├── <style media="print">           — Print CSS (@page A4, colors, hide UI)
├── <body>
│   ├── Header (title + engineer info)
│   ├── Form Card (basic inputs + load profile + advanced accordion)
│   ├── Results Section (7 grids: summary, panels, battery, inverter, MPPT,
│   │                     wiring, economic, intelligence, string viz, chart)
│   └── Print Report Container (generated dynamically via JS)
└── <script>                        — 8 IIFE modules (no global pollution)
    ├── [Config]      → Constants, Safety Factors, Wire Table, Thresholds
    ├── [Logger]      → Async non-blocking (debug/info/warn/error)
    ├── [DB]          → PANEL_SPECS + INVERTER_DB (60 models) + getInverterById()
    ├── [Engine]      → 6 layers: loadProfile(), panels(), inverter(),
    │                    battery(), wiring(), outputs()
    ├── [Intelligence]→ checkCompatibility(), generateWarnings(), recommendations()
    ├── [UI]          → populateDropdown(), validateInputs(), renderResults(),
    │                    renderMPPT(), renderStringViz(), renderWiring(),
    │                    renderEconomic(), renderIntelligence(), renderLoadChart()
    ├── [Print]       → generatePrintReport(), generateBarChart(), generatePieChart()
    └── [Main]        → init(), handleCalculate(), handleLoadProfile(), handlePrint()
```

### Engine Layers (L1-L6)
| Layer | Function | Input | Output |
|-------|----------|-------|--------|
| L1 Load Profile | `calcLoadProfile()` | daily, daytime, maxLoad kW | systemType (LV/HV), nighttime, critical load |
| L2 Panel Sizing | `calcPanels()` | PSH, panelW, weather, Vsys, invSpec | panelCount, strings, MPPT per-channel config |
| L3 Inverter | `calcInverter()` | maxLoad, panels total | recommended W, MPPT compatibility check |
| L3-P Parallel | `calcParallelConfig()` | invSpec, numParallel, lp | topology (master/slave), STS requirement, load share %, failover mode |
| L4 Battery | `calcBattery()` | nighttime kWh, chemistry, DoD, C-rate, Vsys | Ah, kWh, cells S/P config, charge/discharge A |
| L5 Wiring | `calcWiring()` | panel/battery currents, cable length, temp | breaker A, wire mm² (IEC 60364), VD% (ohmPerKm per gauge) |
| L6 Outputs + Economics | `calcOutputs()` | all prior layers + cost assumptions | total cost, LCOE, NPV, ROI years (simple + adjusted), CO₂ avoided |

### Safety Factors (IEC Standards)
| Factor | Value | Application |
|--------|-------|-------------|
| Breaker sizing (PV) | 1.25 × Isc × strings per MPPT | IEC 60364 (PV string current, not DC bus) |
| Breaker sizing (Bat) | 1.25 × P_inv / V_bat | IEC 60364 (Battery breaker) |
| Panel loss | 1.25 × (daily / PSH) | Dust, temp, mismatch, wiring losses (20% effective) |
| Inverter margin | 1.25 × max load | Surge/starting loads, headroom |
| String Voc (cold) | 1.15 × panel Voc | Low-temperature voltage correction (configurable via CFG.SAFETY.VOC_COLD) |

### LV/HV Auto-Detection
| Load Threshold | Default System Type |
|----------------|--------------------|
| < 30 kW max load | LV (12/24/48/51.2V) |
| ≥ 30 kW max load | HV (200-800V DC bus) |
| Manual override | LV/HV radio buttons in Advanced |

---

## [DESIGN_SYSTEM]
| Token | Usage |
|-------|-------|
| `--primary: #f59e0b` | Solar orange — button, accents |
| `--secondary: #10b981` | Green — results, success |
| `--hv-primary: #7c3aed` | Purple — HV sections |
| `--mppt-1: #0ea5e9` | Blue — MPPT channel 1 |
| `--mppt-2: #f97316` | Orange — MPPT channel 2 |

---

## [ORPHANS & PENDING]
> ✅ All Phase 7 milestones (G1-G5) complete. Phase 8 foundation laid (6-layer engine, intelligence, SVG charts, external data files, build pipeline). Zero orphans.

---

## [CHANGELOG]
| Date | Version | Change |
|------|---------|--------|
| 2026-07-25 | 2.1.0 | **Rebuilt from scratch** — Clean UTF-8 Arabic, 28-model inverter catalog (23 LV + 5 HV), 6-layer unified engine, intelligence layer, SVG charts, load-profile.json/cost-assumptions.json external data files, build pipeline fix, PROJECT_MAP.md restructure |
| 2026-07-25 | 2.2.0 | **Engineering Corrections (6-Point Verification)** — Fixed criticalLoad unit mismatch (kW vs kWh), eliminated ghost strings in MPPT distribution, corrected PV breaker to use string Isc×strings, added real ohmPerKm to wire table (IEC 60228), tied annual savings to battery chemistry (LiFePO4 96%, Lead-Acid 85%), added safe default R=0.727 Ω/km |
| 2026-07-25 | 2.3.0 | **Inverter Catalog Expansion** — Added Deye SUN-(3-6)K-SG04LP1-EU single-phase LV series (4 models: 3K/3.6K/5K/6K). Total catalog: 32 models, 8 series, 5 manufacturers |
| 2026-07-26 | 2.4.0 | **Inverter Catalog Expansion + Build Fix** — Added Deye SUN-(3-12)K-SG05LP3-EU-SM2 3-phase LV series (7 models: 3K-12K). Fixed build.mjs per-model `maxInputCurrentPerMppt`/`maxIscPerMppt` override. Total: 39 models, 9 series, 5 manufacturers |
| 2026-07-26 | 2.5.0 | **Inverter Catalog Expansion** — Added Deye SUN-(14-20)K-SG05LP3-EU-SM2 3-phase LV large series (5 models: 14K-20K, 36A PV, 70A passthrough, 2 battery inputs). Total: 44 models, 10 series, 5 manufacturers |
| 2026-07-26 | 2.6.0 | **Megarevo G2S Spec Update** — Corrected MPPT range 80-500V → 100-430V (per official website). Updated surge 110%/600s → 150%/0.1s (peak). Added vendorExtras: maxDcInputVoltage 550V, startVoltage 100V, ratedPvVoltage 360V |
| 2026-07-26 | 2.7.0 | **Economic Analysis Engine** — Added LCOE, NPV, adjusted payback (with degradation) to L6 calcOutputs(). Updated default tariff 0.08 → 0.47 $/kWh. 5 economic cards: Cost, ROI (simple+adjusted), LCOE, NPV, CO2. Print report includes full economic analysis table |
| 2026-07-26 | 2.8.0 | **Inverter Catalog Expansion** — Added Solis S6-EH3P(29.9-50)K-H 3-phase HV series (4 models: 29.9K/30K/40K/50K, 3-4 MPPT, 40A/MPPT, 160% surge, IP66, 4000m altitude). Total: 48 models, 11 series, 5 manufacturers |
| 2026-07-26 | 2.9.0 | **Inverter Catalog Expansion** — Added Solis S6-EH3P(75-125)K10-NV-YD-H 3-phase HV utility-scale series (5 models: 75K/80K/99.9K/100K/125K, 10 MPPT, 42A/MPPT, 20 strings, 200A charge, 250A passthrough, IP66, 170kg, WiFi+LAN+BT). Total: 53 models, 12 series, 5 manufacturers |
| 2026-07-27 | 2.10.0 | **Solis S6-EH1P(3-8)K-L-PLUS Spec Correction** — Fixed efficiency 97.5%→96.2%, EU 96.5%→96.1%, batDischarge 94.9%→93.8%, batChargeAc 94.5%→93.9%. Fixed dimensions d:227→253mm, weight:22.2→23kg. Deleted model solis-4k6 (not in official datasheet). Added ratedOutputA220 per-model (220V/230V dual). Corrected MPPT current for 3-6K: 32A→16A. Updated build.mjs for ratedOutputA220. Total: 52 models, 12 series |
| 2026-07-27 | 2.11.0 | **Inverter Catalog Expansion** — Added Solis S6-EH1P(9.9-18)K03-NV-YD-L 1-phase LV series (5 models: 9.9K/12K/14K/16K/18K, 3 MPPT, 40-42A/MPPT, 6 strings, 208-320A charge, IP66, 55.5kg, 160% PV oversizing, AI TOU, VPP, SG-ready, AFCI integrated). Total: 57 models, 13 series |
| 2026-07-27 | 2.12.0 | **Inverter Catalog Expansion** — Added Solis S6-EH3P(12-20)K-H 3-phase HV 4-MPPT series (3 models: 12K/15K/20K, 4 MPPT, 20A/MPPT, 4 strings, 50A charge, 200%/160% surge, IP66, 35.2kg, peak shaving, unbalanced load). Total: 60 models, 14 series |
| 2026-07-27 | 2.13.0 | **Engine String/MPPT Audit** — Fixed critical bug: `totalVmp` was summing voltage across parallel strings (physically impossible). Fixed `PANEL_LOSS` 1.20→1.25 (true 20% losses). Added `VOC_COLD:1.15` configurable (was hardcoded 1.20). Added allocation integrity check: warns when MPPT capacity truncates panels below required count. Added `allocatedPanels` field to L2 output. Fixed Intelligence Chinese text. Fixed `lookupWire` fallback to smallest wire. Deleted unused `savings` variable |
| 2026-07-27 | 2.14.0 | **Parallel Inverter Configuration** — Added L3-P layer: Master/Slave topology for HV hybrid inverters. Scalability: N≤6 direct parallel, N>6 requires STS cabinet. Hard limit 1.25MW. Dynamic load sharing (equal distribution). Failover: <20ms switchover, auto master election for N>3. UI input for parallel count, Intelligence warnings, economic cost × N. Total: 60 models, 14 series |
| 2026-07-27 | 2.15.0 | **Auto-Sizing Algorithm for Parallel Inverters** — Added automatic N calculation: N_load=⌈peakLoad/ratedKW⌉, N_pv=⌈totalPV/maxPVPower⌉, N=max(N_load,N_pv). parallelCount=0 triggers auto-calculation. Intelligence shows sizing equations + Master/Slave topology description. renderResults shows per-equation breakdown. Updated validation to allow 0 (auto) |
| 2026-07-27 | 2.16.0 | **Dynamic Parallel Config per Inverter Model** — `calcParallelConfig` now reads `invSpec.parallel` (6/10/16 per model) instead of hardcoded `MAX_DIRECT=6`. Added DC resource distribution: `perInverterPVkw`, `perInverterPanelCount`, `perInverterBatteryKwh`. STS warning shows model name + actual limit. UI input max raised to 16. renderResults shows PV/battery per inverter |
| 2026-07-27 | 2.17.0 | **MPPT Distribution Root Fix (Ghost Panels + Kirchhoff)** — Replaced broken MPPT distribution with Greedy Allocation + Remaining Counter. Fixed ghost panels: allocatedPanels never exceeds panelCount. Added 3-phase orphan fallback: empty MPPT slots first, then combine-with-last. Iterative PPS search (max→min) for exact allocation. Updated L3 to use per-MPPT panelsPerString for voltage checks. Strings on same MPPT guaranteed equal (Math.floor). |
| 2026-07-27 | 2.18.0 | **Parallel-Aware Panel Distribution** — Reordered pipeline: L3-P runs before L2. calcPanels receives parallelConfig.numInverters. Distributes panelCount/N per inverter. Added singleInverterCapacity, panelsPerInverter, invertersNeeded to L2 output. Smart orphan warning suggests parallel inverters. |

---

## [INVERTER_CATALOG] — Unified Manufacturer Datasource
> Auto-generated from `inverters-catalog.json` on 2026-07-27

### Summary
| Metric | Value |
|--------|-------|
| Manufacturers | 5 |
| Series | 14 |
| **Total Models** | **60** |
| Type Distribution | LV: 43, HV: 17 |
| Phase Distribution | 1φ: 26, 3φ: 34 |

### Manufacturers & Models
| Brand | Series | Models | Type | Phase | Battery | MPPT Range | Max Charge A | Efficiency |
|-------|--------|--------|------|-------|---------|------------|--------------|------------|
| Solis (Ginlong) | S6-EH1P(3-8)K-L-PLUS | 5 | LV | 1-phase | 40-60V | 90-435V | 70/80/112/135/190A | 96.2% |
| Solis (Ginlong) | S6-EH1P(9-10)K-L-PLUS(21A) | 2 | LV | 1-phase | 40-60V | 90-435V | 210/210A | 97.5% |
| Solis (Ginlong) | S6-EH1P(9.9-18)K03-NV-YD-L | 5 | LV | 1-phase | 40-60V | 100-450V | 208/250/290/290/320A | 97.6% |
| Solis (Ginlong) — HV Series | S6-EH3P(15-30)K-H | 3 | HV | 3-phase | 120-600V | 200-850V | 240/320/480A | 98.3% |
| Solis (Ginlong) — HV Series | S6-EH3P(12-20)K-H (4-MPPT) | 3 | HV | 3-phase | 120-800V | 200-850V | 50/50/50A | 97.7% |
| Solis (Ginlong) — HV Series | S6-EH3P(29.9-50)K-H | 4 | HV | 3-phase | 150-800V | 150-850V | 140/140/140/140A | 97.8% |
| Solis (Ginlong) — HV Series | S6-EH3P(75-125)K10-NV-YD-H | 5 | HV | 3-phase | 300-950V | 150-950V | 200/200/200/200/200A | 97.5% |
| Voltronic Power | Axpert Ultra | 2 | LV | 1-phase | 40-63V | 90-450V | 150/150A | 93.0% |
| Megarevo (Revo) | G2S Series | 8 | LV | 1-phase | 40-58V | 100-430V | 60/72/80/92/100/120/160/200A | 98.0% |
| Deye | SUN-(5-12)K-SG04LP3-EU | 5 | LV | 3-phase | 40-60V | 200-650V | 120/150/190/210/240A | 97.6% |
| Deye | SUN-(30-50)K-SG01HP3-EU-HV | 2 | HV | 3-phase | 180-700V | 200-800V | 450/600A | 98.2% |
| Deye | SUN-(3-6)K-SG04LP1-EU | 4 | LV | 1-phase | 40-60V | 150-425V | 70/90/120/135A | 97.6% |
| Deye | SUN-(3-12)K-SG05LP3-EU-SM2 | 7 | LV | 3-phase | 40-60V | 200-650V | 70/95/120/135/190/210/240A | 97.6% |
| Deye | SUN-(14-20)K-SG05LP3-EU-SM2 | 5 | LV | 3-phase | 40-60V | 160-650V | 260/280/300/330/350A | 97.6% |

### Source URLs (Official Manufacturer Datasheets)
| Manufacturer | URL |
|--------------|-----|
| Solis | https://www.solisinverters.com/dataFile/2c9fafbf8d3b8bd3018d58b55ca60137 |
| Voltronic (Axpert) | https://voltronicpower.com/en-US/Product/Detail/Axpert-Ultra-8KW-11KW |
| Megarevo (G2S) | https://www.megarevo.com/g2s-series-energy-storage-inverter.html |
| Deye | https://www.deyeinverter.com/deyeinverter/2024/10/21/datasheet_sun-5-12k-sg04lp3_241021_en.pdf |

### Ingestion Pipeline
```bash
# 1. Edit inverters-catalog.json (source of truth)
# 2. Run build
node build.mjs
# 3. index.html INVERTER_DB updated + PROJECT_MAP.md documented
```

> **No manual editing of index.html INVERTER_DB required.** Single source: `inverters-catalog.json`.


---

## [INVERTER_CATALOG] — Unified Manufacturer Datasource
> Auto-generated from `inverters-catalog.json` on 2026-07-27

### Summary
| Metric | Value |
|--------|-------|
| Manufacturers | 5 |
| Series | 14 |
| **Total Models** | **60** |
| Type Distribution | LV: 43, HV: 17 |
| Phase Distribution | 1φ: 26, 3φ: 34 |

### Manufacturers & Models
| Brand | Series | Models | Type | Phase | Battery | MPPT Range | Max Charge A | Efficiency |
|-------|--------|--------|------|-------|---------|------------|--------------|------------|
| Solis (Ginlong) | S6-EH1P(3-8)K-L-PLUS | 5 | LV | 1-phase | 40-60V | 90-435V | 70/80/112/135/190A | 96.2% |
| Solis (Ginlong) | S6-EH1P(9-10)K-L-PLUS(21A) | 2 | LV | 1-phase | 40-60V | 90-435V | 210/210A | 97.5% |
| Solis (Ginlong) | S6-EH1P(9.9-18)K03-NV-YD-L | 5 | LV | 1-phase | 40-60V | 100-450V | 208/250/290/290/320A | 97.6% |
| Solis (Ginlong) — HV Series | S6-EH3P(15-30)K-H | 3 | HV | 3-phase | 120-600V | 200-850V | 240/320/480A | 98.3% |
| Solis (Ginlong) — HV Series | S6-EH3P(12-20)K-H (4-MPPT) | 3 | HV | 3-phase | 120-800V | 200-850V | 50/50/50A | 97.7% |
| Solis (Ginlong) — HV Series | S6-EH3P(29.9-50)K-H | 4 | HV | 3-phase | 150-800V | 150-850V | 140/140/140/140A | 97.8% |
| Solis (Ginlong) — HV Series | S6-EH3P(75-125)K10-NV-YD-H | 5 | HV | 3-phase | 300-950V | 150-950V | 200/200/200/200/200A | 97.5% |
| Voltronic Power | Axpert Ultra | 2 | LV | 1-phase | 40-63V | 90-450V | 150/150A | 93.0% |
| Megarevo (Revo) | G2S Series | 8 | LV | 1-phase | 40-58V | 100-430V | 60/72/80/92/100/120/160/200A | 98.0% |
| Deye | SUN-(5-12)K-SG04LP3-EU | 5 | LV | 3-phase | 40-60V | 200-650V | 120/150/190/210/240A | 97.6% |
| Deye | SUN-(30-50)K-SG01HP3-EU-HV | 2 | HV | 3-phase | 180-700V | 200-800V | 450/600A | 98.2% |
| Deye | SUN-(3-6)K-SG04LP1-EU | 4 | LV | 1-phase | 40-60V | 150-425V | 70/90/120/135A | 97.6% |
| Deye | SUN-(3-12)K-SG05LP3-EU-SM2 | 7 | LV | 3-phase | 40-60V | 200-650V | 70/95/120/135/190/210/240A | 97.6% |
| Deye | SUN-(14-20)K-SG05LP3-EU-SM2 | 5 | LV | 3-phase | 40-60V | 160-650V | 260/280/300/330/350A | 97.6% |

### Source URLs (Official Manufacturer Datasheets)
| Manufacturer | URL |
|--------------|-----|
| Solis | https://www.solisinverters.com/dataFile/2c9fafbf8d3b8bd3018d58b55ca60137 |
| Voltronic (Axpert) | https://voltronicpower.com/en-US/Product/Detail/Axpert-Ultra-8KW-11KW |
| Megarevo (G2S) | https://www.megarevo.com/g2s-series-energy-storage-inverter.html |
| Deye | https://www.deyeinverter.com/deyeinverter/2024/10/21/datasheet_sun-5-12k-sg04lp3_241021_en.pdf |

### Ingestion Pipeline
```bash
# 1. Edit inverters-catalog.json (source of truth)
# 2. Run build
node build.mjs
# 3. index.html INVERTER_DB updated + PROJECT_MAP.md documented
```

> **No manual editing of index.html INVERTER_DB required.** Single source: `inverters-catalog.json`.


---

## [INVERTER_CATALOG] — Unified Manufacturer Datasource
> Auto-generated from `inverters-catalog.json` on 2026-07-27

### Summary
| Metric | Value |
|--------|-------|
| Manufacturers | 5 |
| Series | 14 |
| **Total Models** | **60** |
| Type Distribution | LV: 43, HV: 17 |
| Phase Distribution | 1φ: 26, 3φ: 34 |

### Manufacturers & Models
| Brand | Series | Models | Type | Phase | Battery | MPPT Range | Max Charge A | Efficiency |
|-------|--------|--------|------|-------|---------|------------|--------------|------------|
| Solis (Ginlong) | S6-EH1P(3-8)K-L-PLUS | 5 | LV | 1-phase | 40-60V | 90-435V | 70/80/112/135/190A | 96.2% |
| Solis (Ginlong) | S6-EH1P(9-10)K-L-PLUS(21A) | 2 | LV | 1-phase | 40-60V | 90-435V | 210/210A | 97.5% |
| Solis (Ginlong) | S6-EH1P(9.9-18)K03-NV-YD-L | 5 | LV | 1-phase | 40-60V | 100-450V | 208/250/290/290/320A | 97.6% |
| Solis (Ginlong) — HV Series | S6-EH3P(15-30)K-H | 3 | HV | 3-phase | 120-600V | 200-850V | 240/320/480A | 98.3% |
| Solis (Ginlong) — HV Series | S6-EH3P(12-20)K-H (4-MPPT) | 3 | HV | 3-phase | 120-800V | 200-850V | 50/50/50A | 97.7% |
| Solis (Ginlong) — HV Series | S6-EH3P(29.9-50)K-H | 4 | HV | 3-phase | 150-800V | 150-850V | 140/140/140/140A | 97.8% |
| Solis (Ginlong) — HV Series | S6-EH3P(75-125)K10-NV-YD-H | 5 | HV | 3-phase | 300-950V | 150-950V | 200/200/200/200/200A | 97.5% |
| Voltronic Power | Axpert Ultra | 2 | LV | 1-phase | 40-63V | 90-450V | 150/150A | 93.0% |
| Megarevo (Revo) | G2S Series | 8 | LV | 1-phase | 40-58V | 100-430V | 60/72/80/92/100/120/160/200A | 98.0% |
| Deye | SUN-(5-12)K-SG04LP3-EU | 5 | LV | 3-phase | 40-60V | 200-650V | 120/150/190/210/240A | 97.6% |
| Deye | SUN-(30-50)K-SG01HP3-EU-HV | 2 | HV | 3-phase | 180-700V | 200-800V | 450/600A | 98.2% |
| Deye | SUN-(3-6)K-SG04LP1-EU | 4 | LV | 1-phase | 40-60V | 150-425V | 70/90/120/135A | 97.6% |
| Deye | SUN-(3-12)K-SG05LP3-EU-SM2 | 7 | LV | 3-phase | 40-60V | 200-650V | 70/95/120/135/190/210/240A | 97.6% |
| Deye | SUN-(14-20)K-SG05LP3-EU-SM2 | 5 | LV | 3-phase | 40-60V | 160-650V | 260/280/300/330/350A | 97.6% |

### Source URLs (Official Manufacturer Datasheets)
| Manufacturer | URL |
|--------------|-----|
| Solis | https://www.solisinverters.com/dataFile/2c9fafbf8d3b8bd3018d58b55ca60137 |
| Voltronic (Axpert) | https://voltronicpower.com/en-US/Product/Detail/Axpert-Ultra-8KW-11KW |
| Megarevo (G2S) | https://www.megarevo.com/g2s-series-energy-storage-inverter.html |
| Deye | https://www.deyeinverter.com/deyeinverter/2024/10/21/datasheet_sun-5-12k-sg04lp3_241021_en.pdf |

### Ingestion Pipeline
```bash
# 1. Edit inverters-catalog.json (source of truth)
# 2. Run build
node build.mjs
# 3. index.html INVERTER_DB updated + PROJECT_MAP.md documented
```

> **No manual editing of index.html INVERTER_DB required.** Single source: `inverters-catalog.json`.


---

## [INVERTER_CATALOG] — Unified Manufacturer Datasource
> Auto-generated from `inverters-catalog.json` on 2026-07-27

### Summary
| Metric | Value |
|--------|-------|
| Manufacturers | 5 |
| Series | 14 |
| **Total Models** | **60** |
| Type Distribution | LV: 43, HV: 17 |
| Phase Distribution | 1φ: 26, 3φ: 34 |

### Manufacturers & Models
| Brand | Series | Models | Type | Phase | Battery | MPPT Range | Max Charge A | Efficiency |
|-------|--------|--------|------|-------|---------|------------|--------------|------------|
| Solis (Ginlong) | S6-EH1P(3-8)K-L-PLUS | 5 | LV | 1-phase | 40-60V | 90-435V | 70/80/112/135/190A | 96.2% |
| Solis (Ginlong) | S6-EH1P(9-10)K-L-PLUS(21A) | 2 | LV | 1-phase | 40-60V | 90-435V | 210/210A | 97.5% |
| Solis (Ginlong) | S6-EH1P(9.9-18)K03-NV-YD-L | 5 | LV | 1-phase | 40-60V | 100-450V | 208/250/290/290/320A | 97.6% |
| Solis (Ginlong) — HV Series | S6-EH3P(15-30)K-H | 3 | HV | 3-phase | 120-600V | 200-850V | 240/320/480A | 98.3% |
| Solis (Ginlong) — HV Series | S6-EH3P(12-20)K-H (4-MPPT) | 3 | HV | 3-phase | 120-800V | 200-850V | 50/50/50A | 97.7% |
| Solis (Ginlong) — HV Series | S6-EH3P(29.9-50)K-H | 4 | HV | 3-phase | 150-800V | 150-850V | 140/140/140/140A | 97.8% |
| Solis (Ginlong) — HV Series | S6-EH3P(75-125)K10-NV-YD-H | 5 | HV | 3-phase | 300-950V | 150-950V | 200/200/200/200/200A | 97.5% |
| Voltronic Power | Axpert Ultra | 2 | LV | 1-phase | 40-63V | 90-450V | 150/150A | 93.0% |
| Megarevo (Revo) | G2S Series | 8 | LV | 1-phase | 40-58V | 100-430V | 60/72/80/92/100/120/160/200A | 98.0% |
| Deye | SUN-(5-12)K-SG04LP3-EU | 5 | LV | 3-phase | 40-60V | 200-650V | 120/150/190/210/240A | 97.6% |
| Deye | SUN-(30-50)K-SG01HP3-EU-HV | 2 | HV | 3-phase | 180-700V | 200-800V | 450/600A | 98.2% |
| Deye | SUN-(3-6)K-SG04LP1-EU | 4 | LV | 1-phase | 40-60V | 150-425V | 70/90/120/135A | 97.6% |
| Deye | SUN-(3-12)K-SG05LP3-EU-SM2 | 7 | LV | 3-phase | 40-60V | 200-650V | 70/95/120/135/190/210/240A | 97.6% |
| Deye | SUN-(14-20)K-SG05LP3-EU-SM2 | 5 | LV | 3-phase | 40-60V | 160-650V | 260/280/300/330/350A | 97.6% |

### Source URLs (Official Manufacturer Datasheets)
| Manufacturer | URL |
|--------------|-----|
| Solis | https://www.solisinverters.com/dataFile/2c9fafbf8d3b8bd3018d58b55ca60137 |
| Voltronic (Axpert) | https://voltronicpower.com/en-US/Product/Detail/Axpert-Ultra-8KW-11KW |
| Megarevo (G2S) | https://www.megarevo.com/g2s-series-energy-storage-inverter.html |
| Deye | https://www.deyeinverter.com/deyeinverter/2024/10/21/datasheet_sun-5-12k-sg04lp3_241021_en.pdf |

### Ingestion Pipeline
```bash
# 1. Edit inverters-catalog.json (source of truth)
# 2. Run build
node build.mjs
# 3. index.html INVERTER_DB updated + PROJECT_MAP.md documented
```

> **No manual editing of index.html INVERTER_DB required.** Single source: `inverters-catalog.json`.


---

## [INVERTER_CATALOG] — Unified Manufacturer Datasource
> Auto-generated from `inverters-catalog.json` on 2026-07-27

### Summary
| Metric | Value |
|--------|-------|
| Manufacturers | 5 |
| Series | 14 |
| **Total Models** | **60** |
| Type Distribution | LV: 43, HV: 17 |
| Phase Distribution | 1φ: 26, 3φ: 34 |

### Manufacturers & Models
| Brand | Series | Models | Type | Phase | Battery | MPPT Range | Max Charge A | Efficiency |
|-------|--------|--------|------|-------|---------|------------|--------------|------------|
| Solis (Ginlong) | S6-EH1P(3-8)K-L-PLUS | 5 | LV | 1-phase | 40-60V | 90-435V | 70/80/112/135/190A | 96.2% |
| Solis (Ginlong) | S6-EH1P(9-10)K-L-PLUS(21A) | 2 | LV | 1-phase | 40-60V | 90-435V | 210/210A | 97.5% |
| Solis (Ginlong) | S6-EH1P(9.9-18)K03-NV-YD-L | 5 | LV | 1-phase | 40-60V | 100-450V | 208/250/290/290/320A | 97.6% |
| Solis (Ginlong) — HV Series | S6-EH3P(15-30)K-H | 3 | HV | 3-phase | 120-600V | 200-850V | 240/320/480A | 98.3% |
| Solis (Ginlong) — HV Series | S6-EH3P(12-20)K-H (4-MPPT) | 3 | HV | 3-phase | 120-800V | 200-850V | 50/50/50A | 97.7% |
| Solis (Ginlong) — HV Series | S6-EH3P(29.9-50)K-H | 4 | HV | 3-phase | 150-800V | 150-850V | 140/140/140/140A | 97.8% |
| Solis (Ginlong) — HV Series | S6-EH3P(75-125)K10-NV-YD-H | 5 | HV | 3-phase | 300-950V | 150-950V | 200/200/200/200/200A | 97.5% |
| Voltronic Power | Axpert Ultra | 2 | LV | 1-phase | 40-63V | 90-450V | 150/150A | 93.0% |
| Megarevo (Revo) | G2S Series | 8 | LV | 1-phase | 40-58V | 100-430V | 60/72/80/92/100/120/160/200A | 98.0% |
| Deye | SUN-(5-12)K-SG04LP3-EU | 5 | LV | 3-phase | 40-60V | 200-650V | 120/150/190/210/240A | 97.6% |
| Deye | SUN-(30-50)K-SG01HP3-EU-HV | 2 | HV | 3-phase | 180-700V | 200-800V | 450/600A | 98.2% |
| Deye | SUN-(3-6)K-SG04LP1-EU | 4 | LV | 1-phase | 40-60V | 150-425V | 70/90/120/135A | 97.6% |
| Deye | SUN-(3-12)K-SG05LP3-EU-SM2 | 7 | LV | 3-phase | 40-60V | 200-650V | 70/95/120/135/190/210/240A | 97.6% |
| Deye | SUN-(14-20)K-SG05LP3-EU-SM2 | 5 | LV | 3-phase | 40-60V | 160-650V | 260/280/300/330/350A | 97.6% |

### Source URLs (Official Manufacturer Datasheets)
| Manufacturer | URL |
|--------------|-----|
| Solis | https://www.solisinverters.com/dataFile/2c9fafbf8d3b8bd3018d58b55ca60137 |
| Voltronic (Axpert) | https://voltronicpower.com/en-US/Product/Detail/Axpert-Ultra-8KW-11KW |
| Megarevo (G2S) | https://www.megarevo.com/g2s-series-energy-storage-inverter.html |
| Deye | https://www.deyeinverter.com/deyeinverter/2024/10/21/datasheet_sun-5-12k-sg04lp3_241021_en.pdf |

### Ingestion Pipeline
```bash
# 1. Edit inverters-catalog.json (source of truth)
# 2. Run build
node build.mjs
# 3. index.html INVERTER_DB updated + PROJECT_MAP.md documented
```

> **No manual editing of index.html INVERTER_DB required.** Single source: `inverters-catalog.json`.


---

## [INVERTER_CATALOG] — Unified Manufacturer Datasource
> Auto-generated from `inverters-catalog.json` on 2026-07-27

### Summary
| Metric | Value |
|--------|-------|
| Manufacturers | 5 |
| Series | 14 |
| **Total Models** | **60** |
| Type Distribution | LV: 43, HV: 17 |
| Phase Distribution | 1φ: 26, 3φ: 34 |

### Manufacturers & Models
| Brand | Series | Models | Type | Phase | Battery | MPPT Range | Max Charge A | Efficiency |
|-------|--------|--------|------|-------|---------|------------|--------------|------------|
| Solis (Ginlong) | S6-EH1P(3-8)K-L-PLUS | 5 | LV | 1-phase | 40-60V | 90-435V | 70/80/112/135/190A | 96.2% |
| Solis (Ginlong) | S6-EH1P(9-10)K-L-PLUS(21A) | 2 | LV | 1-phase | 40-60V | 90-435V | 210/210A | 97.5% |
| Solis (Ginlong) | S6-EH1P(9.9-18)K03-NV-YD-L | 5 | LV | 1-phase | 40-60V | 100-450V | 208/250/290/290/320A | 97.6% |
| Solis (Ginlong) — HV Series | S6-EH3P(15-30)K-H | 3 | HV | 3-phase | 120-600V | 200-850V | 240/320/480A | 98.3% |
| Solis (Ginlong) — HV Series | S6-EH3P(12-20)K-H (4-MPPT) | 3 | HV | 3-phase | 120-800V | 200-850V | 50/50/50A | 97.7% |
| Solis (Ginlong) — HV Series | S6-EH3P(29.9-50)K-H | 4 | HV | 3-phase | 150-800V | 150-850V | 140/140/140/140A | 97.8% |
| Solis (Ginlong) — HV Series | S6-EH3P(75-125)K10-NV-YD-H | 5 | HV | 3-phase | 300-950V | 150-950V | 200/200/200/200/200A | 97.5% |
| Voltronic Power | Axpert Ultra | 2 | LV | 1-phase | 40-63V | 90-450V | 150/150A | 93.0% |
| Megarevo (Revo) | G2S Series | 8 | LV | 1-phase | 40-58V | 100-430V | 60/72/80/92/100/120/160/200A | 98.0% |
| Deye | SUN-(5-12)K-SG04LP3-EU | 5 | LV | 3-phase | 40-60V | 200-650V | 120/150/190/210/240A | 97.6% |
| Deye | SUN-(30-50)K-SG01HP3-EU-HV | 2 | HV | 3-phase | 180-700V | 200-800V | 450/600A | 98.2% |
| Deye | SUN-(3-6)K-SG04LP1-EU | 4 | LV | 1-phase | 40-60V | 150-425V | 70/90/120/135A | 97.6% |
| Deye | SUN-(3-12)K-SG05LP3-EU-SM2 | 7 | LV | 3-phase | 40-60V | 200-650V | 70/95/120/135/190/210/240A | 97.6% |
| Deye | SUN-(14-20)K-SG05LP3-EU-SM2 | 5 | LV | 3-phase | 40-60V | 160-650V | 260/280/300/330/350A | 97.6% |

### Source URLs (Official Manufacturer Datasheets)
| Manufacturer | URL |
|--------------|-----|
| Solis | https://www.solisinverters.com/dataFile/2c9fafbf8d3b8bd3018d58b55ca60137 |
| Voltronic (Axpert) | https://voltronicpower.com/en-US/Product/Detail/Axpert-Ultra-8KW-11KW |
| Megarevo (G2S) | https://www.megarevo.com/g2s-series-energy-storage-inverter.html |
| Deye | https://www.deyeinverter.com/deyeinverter/2024/10/21/datasheet_sun-5-12k-sg04lp3_241021_en.pdf |

### Ingestion Pipeline
```bash
# 1. Edit inverters-catalog.json (source of truth)
# 2. Run build
node build.mjs
# 3. index.html INVERTER_DB updated + PROJECT_MAP.md documented
```

> **No manual editing of index.html INVERTER_DB required.** Single source: `inverters-catalog.json`.


---

## [INVERTER_CATALOG] — Unified Manufacturer Datasource
> Auto-generated from `inverters-catalog.json` on 2026-07-27

### Summary
| Metric | Value |
|--------|-------|
| Manufacturers | 5 |
| Series | 14 |
| **Total Models** | **60** |
| Type Distribution | LV: 43, HV: 17 |
| Phase Distribution | 1φ: 26, 3φ: 34 |

### Manufacturers & Models
| Brand | Series | Models | Type | Phase | Battery | MPPT Range | Max Charge A | Efficiency |
|-------|--------|--------|------|-------|---------|------------|--------------|------------|
| Solis (Ginlong) | S6-EH1P(3-8)K-L-PLUS | 5 | LV | 1-phase | 40-60V | 90-435V | 70/80/112/135/190A | 96.2% |
| Solis (Ginlong) | S6-EH1P(9-10)K-L-PLUS(21A) | 2 | LV | 1-phase | 40-60V | 90-435V | 210/210A | 97.5% |
| Solis (Ginlong) | S6-EH1P(9.9-18)K03-NV-YD-L | 5 | LV | 1-phase | 40-60V | 100-450V | 208/250/290/290/320A | 97.6% |
| Solis (Ginlong) — HV Series | S6-EH3P(15-30)K-H | 3 | HV | 3-phase | 120-600V | 200-850V | 240/320/480A | 98.3% |
| Solis (Ginlong) — HV Series | S6-EH3P(12-20)K-H (4-MPPT) | 3 | HV | 3-phase | 120-800V | 200-850V | 50/50/50A | 97.7% |
| Solis (Ginlong) — HV Series | S6-EH3P(29.9-50)K-H | 4 | HV | 3-phase | 150-800V | 150-850V | 140/140/140/140A | 97.8% |
| Solis (Ginlong) — HV Series | S6-EH3P(75-125)K10-NV-YD-H | 5 | HV | 3-phase | 300-950V | 150-950V | 200/200/200/200/200A | 97.5% |
| Voltronic Power | Axpert Ultra | 2 | LV | 1-phase | 40-63V | 90-450V | 150/150A | 93.0% |
| Megarevo (Revo) | G2S Series | 8 | LV | 1-phase | 40-58V | 100-430V | 60/72/80/92/100/120/160/200A | 98.0% |
| Deye | SUN-(5-12)K-SG04LP3-EU | 5 | LV | 3-phase | 40-60V | 200-650V | 120/150/190/210/240A | 97.6% |
| Deye | SUN-(30-50)K-SG01HP3-EU-HV | 2 | HV | 3-phase | 180-700V | 200-800V | 450/600A | 98.2% |
| Deye | SUN-(3-6)K-SG04LP1-EU | 4 | LV | 1-phase | 40-60V | 150-425V | 70/90/120/135A | 97.6% |
| Deye | SUN-(3-12)K-SG05LP3-EU-SM2 | 7 | LV | 3-phase | 40-60V | 200-650V | 70/95/120/135/190/210/240A | 97.6% |
| Deye | SUN-(14-20)K-SG05LP3-EU-SM2 | 5 | LV | 3-phase | 40-60V | 160-650V | 260/280/300/330/350A | 97.6% |

### Source URLs (Official Manufacturer Datasheets)
| Manufacturer | URL |
|--------------|-----|
| Solis | https://www.solisinverters.com/dataFile/2c9fafbf8d3b8bd3018d58b55ca60137 |
| Voltronic (Axpert) | https://voltronicpower.com/en-US/Product/Detail/Axpert-Ultra-8KW-11KW |
| Megarevo (G2S) | https://www.megarevo.com/g2s-series-energy-storage-inverter.html |
| Deye | https://www.deyeinverter.com/deyeinverter/2024/10/21/datasheet_sun-5-12k-sg04lp3_241021_en.pdf |

### Ingestion Pipeline
```bash
# 1. Edit inverters-catalog.json (source of truth)
# 2. Run build
node build.mjs
# 3. index.html INVERTER_DB updated + PROJECT_MAP.md documented
```

> **No manual editing of index.html INVERTER_DB required.** Single source: `inverters-catalog.json`.


---

## [INVERTER_CATALOG] — Unified Manufacturer Datasource
> Auto-generated from `inverters-catalog.json` on 2026-07-27

### Summary
| Metric | Value |
|--------|-------|
| Manufacturers | 5 |
| Series | 14 |
| **Total Models** | **60** |
| Type Distribution | LV: 43, HV: 17 |
| Phase Distribution | 1φ: 26, 3φ: 34 |

### Manufacturers & Models
| Brand | Series | Models | Type | Phase | Battery | MPPT Range | Max Charge A | Efficiency |
|-------|--------|--------|------|-------|---------|------------|--------------|------------|
| Solis (Ginlong) | S6-EH1P(3-8)K-L-PLUS | 5 | LV | 1-phase | 40-60V | 90-435V | 70/80/112/135/190A | 96.2% |
| Solis (Ginlong) | S6-EH1P(9-10)K-L-PLUS(21A) | 2 | LV | 1-phase | 40-60V | 90-435V | 210/210A | 97.5% |
| Solis (Ginlong) | S6-EH1P(9.9-18)K03-NV-YD-L | 5 | LV | 1-phase | 40-60V | 100-450V | 208/250/290/290/320A | 97.6% |
| Solis (Ginlong) — HV Series | S6-EH3P(15-30)K-H | 3 | HV | 3-phase | 120-600V | 200-850V | 240/320/480A | 98.3% |
| Solis (Ginlong) — HV Series | S6-EH3P(12-20)K-H (4-MPPT) | 3 | HV | 3-phase | 120-800V | 200-850V | 50/50/50A | 97.7% |
| Solis (Ginlong) — HV Series | S6-EH3P(29.9-50)K-H | 4 | HV | 3-phase | 150-800V | 150-850V | 140/140/140/140A | 97.8% |
| Solis (Ginlong) — HV Series | S6-EH3P(75-125)K10-NV-YD-H | 5 | HV | 3-phase | 300-950V | 150-950V | 200/200/200/200/200A | 97.5% |
| Voltronic Power | Axpert Ultra | 2 | LV | 1-phase | 40-63V | 90-450V | 150/150A | 93.0% |
| Megarevo (Revo) | G2S Series | 8 | LV | 1-phase | 40-58V | 100-430V | 60/72/80/92/100/120/160/200A | 98.0% |
| Deye | SUN-(5-12)K-SG04LP3-EU | 5 | LV | 3-phase | 40-60V | 200-650V | 120/150/190/210/240A | 97.6% |
| Deye | SUN-(30-50)K-SG01HP3-EU-HV | 2 | HV | 3-phase | 180-700V | 200-800V | 450/600A | 98.2% |
| Deye | SUN-(3-6)K-SG04LP1-EU | 4 | LV | 1-phase | 40-60V | 150-425V | 70/90/120/135A | 97.6% |
| Deye | SUN-(3-12)K-SG05LP3-EU-SM2 | 7 | LV | 3-phase | 40-60V | 200-650V | 70/95/120/135/190/210/240A | 97.6% |
| Deye | SUN-(14-20)K-SG05LP3-EU-SM2 | 5 | LV | 3-phase | 40-60V | 160-650V | 260/280/300/330/350A | 97.6% |

### Source URLs (Official Manufacturer Datasheets)
| Manufacturer | URL |
|--------------|-----|
| Solis | https://www.solisinverters.com/dataFile/2c9fafbf8d3b8bd3018d58b55ca60137 |
| Voltronic (Axpert) | https://voltronicpower.com/en-US/Product/Detail/Axpert-Ultra-8KW-11KW |
| Megarevo (G2S) | https://www.megarevo.com/g2s-series-energy-storage-inverter.html |
| Deye | https://www.deyeinverter.com/deyeinverter/2024/10/21/datasheet_sun-5-12k-sg04lp3_241021_en.pdf |

### Ingestion Pipeline
```bash
# 1. Edit inverters-catalog.json (source of truth)
# 2. Run build
node build.mjs
# 3. index.html INVERTER_DB updated + PROJECT_MAP.md documented
```

> **No manual editing of index.html INVERTER_DB required.** Single source: `inverters-catalog.json`.


---

## [INVERTER_CATALOG] — Unified Manufacturer Datasource
> Auto-generated from `inverters-catalog.json` on 2026-07-27

### Summary
| Metric | Value |
|--------|-------|
| Manufacturers | 5 |
| Series | 14 |
| **Total Models** | **60** |
| Type Distribution | LV: 43, HV: 17 |
| Phase Distribution | 1φ: 26, 3φ: 34 |

### Manufacturers & Models
| Brand | Series | Models | Type | Phase | Battery | MPPT Range | Max Charge A | Efficiency |
|-------|--------|--------|------|-------|---------|------------|--------------|------------|
| Solis (Ginlong) | S6-EH1P(3-8)K-L-PLUS | 5 | LV | 1-phase | 40-60V | 90-435V | 70/80/112/135/190A | 96.2% |
| Solis (Ginlong) | S6-EH1P(9-10)K-L-PLUS(21A) | 2 | LV | 1-phase | 40-60V | 90-435V | 210/210A | 97.5% |
| Solis (Ginlong) | S6-EH1P(9.9-18)K03-NV-YD-L | 5 | LV | 1-phase | 40-60V | 100-450V | 208/250/290/290/320A | 97.6% |
| Solis (Ginlong) — HV Series | S6-EH3P(15-30)K-H | 3 | HV | 3-phase | 120-600V | 200-850V | 240/320/480A | 98.3% |
| Solis (Ginlong) — HV Series | S6-EH3P(12-20)K-H (4-MPPT) | 3 | HV | 3-phase | 120-800V | 200-850V | 50/50/50A | 97.7% |
| Solis (Ginlong) — HV Series | S6-EH3P(29.9-50)K-H | 4 | HV | 3-phase | 150-800V | 150-850V | 140/140/140/140A | 97.8% |
| Solis (Ginlong) — HV Series | S6-EH3P(75-125)K10-NV-YD-H | 5 | HV | 3-phase | 300-950V | 150-950V | 200/200/200/200/200A | 97.5% |
| Voltronic Power | Axpert Ultra | 2 | LV | 1-phase | 40-63V | 90-450V | 150/150A | 93.0% |
| Megarevo (Revo) | G2S Series | 8 | LV | 1-phase | 40-58V | 100-430V | 60/72/80/92/100/120/160/200A | 98.0% |
| Deye | SUN-(5-12)K-SG04LP3-EU | 5 | LV | 3-phase | 40-60V | 200-650V | 120/150/190/210/240A | 97.6% |
| Deye | SUN-(30-50)K-SG01HP3-EU-HV | 2 | HV | 3-phase | 180-700V | 200-800V | 450/600A | 98.2% |
| Deye | SUN-(3-6)K-SG04LP1-EU | 4 | LV | 1-phase | 40-60V | 150-425V | 70/90/120/135A | 97.6% |
| Deye | SUN-(3-12)K-SG05LP3-EU-SM2 | 7 | LV | 3-phase | 40-60V | 200-650V | 70/95/120/135/190/210/240A | 97.6% |
| Deye | SUN-(14-20)K-SG05LP3-EU-SM2 | 5 | LV | 3-phase | 40-60V | 160-650V | 260/280/300/330/350A | 97.6% |

### Source URLs (Official Manufacturer Datasheets)
| Manufacturer | URL |
|--------------|-----|
| Solis | https://www.solisinverters.com/dataFile/2c9fafbf8d3b8bd3018d58b55ca60137 |
| Voltronic (Axpert) | https://voltronicpower.com/en-US/Product/Detail/Axpert-Ultra-8KW-11KW |
| Megarevo (G2S) | https://www.megarevo.com/g2s-series-energy-storage-inverter.html |
| Deye | https://www.deyeinverter.com/deyeinverter/2024/10/21/datasheet_sun-5-12k-sg04lp3_241021_en.pdf |

### Ingestion Pipeline
```bash
# 1. Edit inverters-catalog.json (source of truth)
# 2. Run build
node build.mjs
# 3. index.html INVERTER_DB updated + PROJECT_MAP.md documented
```

> **No manual editing of index.html INVERTER_DB required.** Single source: `inverters-catalog.json`.


---

## [INVERTER_CATALOG] — Unified Manufacturer Datasource
> Auto-generated from `inverters-catalog.json` on 2026-07-27

### Summary
| Metric | Value |
|--------|-------|
| Manufacturers | 5 |
| Series | 14 |
| **Total Models** | **60** |
| Type Distribution | LV: 43, HV: 17 |
| Phase Distribution | 1φ: 26, 3φ: 34 |

### Manufacturers & Models
| Brand | Series | Models | Type | Phase | Battery | MPPT Range | Max Charge A | Efficiency |
|-------|--------|--------|------|-------|---------|------------|--------------|------------|
| Solis (Ginlong) | S6-EH1P(3-8)K-L-PLUS | 5 | LV | 1-phase | 40-60V | 90-435V | 70/80/112/135/190A | 96.2% |
| Solis (Ginlong) | S6-EH1P(9-10)K-L-PLUS(21A) | 2 | LV | 1-phase | 40-60V | 90-435V | 210/210A | 97.5% |
| Solis (Ginlong) | S6-EH1P(9.9-18)K03-NV-YD-L | 5 | LV | 1-phase | 40-60V | 100-450V | 208/250/290/290/320A | 97.6% |
| Solis (Ginlong) — HV Series | S6-EH3P(15-30)K-H | 3 | HV | 3-phase | 120-600V | 200-850V | 240/320/480A | 98.3% |
| Solis (Ginlong) — HV Series | S6-EH3P(12-20)K-H (4-MPPT) | 3 | HV | 3-phase | 120-800V | 200-850V | 50/50/50A | 97.7% |
| Solis (Ginlong) — HV Series | S6-EH3P(29.9-50)K-H | 4 | HV | 3-phase | 150-800V | 150-850V | 140/140/140/140A | 97.8% |
| Solis (Ginlong) — HV Series | S6-EH3P(75-125)K10-NV-YD-H | 5 | HV | 3-phase | 300-950V | 150-950V | 200/200/200/200/200A | 97.5% |
| Voltronic Power | Axpert Ultra | 2 | LV | 1-phase | 40-63V | 90-450V | 150/150A | 93.0% |
| Megarevo (Revo) | G2S Series | 8 | LV | 1-phase | 40-58V | 100-430V | 60/72/80/92/100/120/160/200A | 98.0% |
| Deye | SUN-(5-12)K-SG04LP3-EU | 5 | LV | 3-phase | 40-60V | 200-650V | 120/150/190/210/240A | 97.6% |
| Deye | SUN-(30-50)K-SG01HP3-EU-HV | 2 | HV | 3-phase | 180-700V | 200-800V | 450/600A | 98.2% |
| Deye | SUN-(3-6)K-SG04LP1-EU | 4 | LV | 1-phase | 40-60V | 150-425V | 70/90/120/135A | 97.6% |
| Deye | SUN-(3-12)K-SG05LP3-EU-SM2 | 7 | LV | 3-phase | 40-60V | 200-650V | 70/95/120/135/190/210/240A | 97.6% |
| Deye | SUN-(14-20)K-SG05LP3-EU-SM2 | 5 | LV | 3-phase | 40-60V | 160-650V | 260/280/300/330/350A | 97.6% |

### Source URLs (Official Manufacturer Datasheets)
| Manufacturer | URL |
|--------------|-----|
| Solis | https://www.solisinverters.com/dataFile/2c9fafbf8d3b8bd3018d58b55ca60137 |
| Voltronic (Axpert) | https://voltronicpower.com/en-US/Product/Detail/Axpert-Ultra-8KW-11KW |
| Megarevo (G2S) | https://www.megarevo.com/g2s-series-energy-storage-inverter.html |
| Deye | https://www.deyeinverter.com/deyeinverter/2024/10/21/datasheet_sun-5-12k-sg04lp3_241021_en.pdf |

### Ingestion Pipeline
```bash
# 1. Edit inverters-catalog.json (source of truth)
# 2. Run build
node build.mjs
# 3. index.html INVERTER_DB updated + PROJECT_MAP.md documented
```

> **No manual editing of index.html INVERTER_DB required.** Single source: `inverters-catalog.json`.


---

## [INVERTER_CATALOG] — Unified Manufacturer Datasource
> Auto-generated from `inverters-catalog.json` on 2026-07-27

### Summary
| Metric | Value |
|--------|-------|
| Manufacturers | 5 |
| Series | 14 |
| **Total Models** | **60** |
| Type Distribution | LV: 43, HV: 17 |
| Phase Distribution | 1φ: 26, 3φ: 34 |

### Manufacturers & Models
| Brand | Series | Models | Type | Phase | Battery | MPPT Range | Max Charge A | Efficiency |
|-------|--------|--------|------|-------|---------|------------|--------------|------------|
| Solis (Ginlong) | S6-EH1P(3-8)K-L-PLUS | 5 | LV | 1-phase | 40-60V | 90-435V | 70/80/112/135/190A | 96.2% |
| Solis (Ginlong) | S6-EH1P(9-10)K-L-PLUS(21A) | 2 | LV | 1-phase | 40-60V | 90-435V | 210/210A | 97.5% |
| Solis (Ginlong) | S6-EH1P(9.9-18)K03-NV-YD-L | 5 | LV | 1-phase | 40-60V | 100-450V | 208/250/290/290/320A | 97.6% |
| Solis (Ginlong) — HV Series | S6-EH3P(15-30)K-H | 3 | HV | 3-phase | 120-600V | 200-850V | 240/320/480A | 98.3% |
| Solis (Ginlong) — HV Series | S6-EH3P(12-20)K-H (4-MPPT) | 3 | HV | 3-phase | 120-800V | 200-850V | 50/50/50A | 97.7% |
| Solis (Ginlong) — HV Series | S6-EH3P(29.9-50)K-H | 4 | HV | 3-phase | 150-800V | 150-850V | 140/140/140/140A | 97.8% |
| Solis (Ginlong) — HV Series | S6-EH3P(75-125)K10-NV-YD-H | 5 | HV | 3-phase | 300-950V | 150-950V | 200/200/200/200/200A | 97.5% |
| Voltronic Power | Axpert Ultra | 2 | LV | 1-phase | 40-63V | 90-450V | 150/150A | 93.0% |
| Megarevo (Revo) | G2S Series | 8 | LV | 1-phase | 40-58V | 100-430V | 60/72/80/92/100/120/160/200A | 98.0% |
| Deye | SUN-(5-12)K-SG04LP3-EU | 5 | LV | 3-phase | 40-60V | 200-650V | 120/150/190/210/240A | 97.6% |
| Deye | SUN-(30-50)K-SG01HP3-EU-HV | 2 | HV | 3-phase | 180-700V | 200-800V | 450/600A | 98.2% |
| Deye | SUN-(3-6)K-SG04LP1-EU | 4 | LV | 1-phase | 40-60V | 150-425V | 70/90/120/135A | 97.6% |
| Deye | SUN-(3-12)K-SG05LP3-EU-SM2 | 7 | LV | 3-phase | 40-60V | 200-650V | 70/95/120/135/190/210/240A | 97.6% |
| Deye | SUN-(14-20)K-SG05LP3-EU-SM2 | 5 | LV | 3-phase | 40-60V | 160-650V | 260/280/300/330/350A | 97.6% |

### Source URLs (Official Manufacturer Datasheets)
| Manufacturer | URL |
|--------------|-----|
| Solis | https://www.solisinverters.com/dataFile/2c9fafbf8d3b8bd3018d58b55ca60137 |
| Voltronic (Axpert) | https://voltronicpower.com/en-US/Product/Detail/Axpert-Ultra-8KW-11KW |
| Megarevo (G2S) | https://www.megarevo.com/g2s-series-energy-storage-inverter.html |
| Deye | https://www.deyeinverter.com/deyeinverter/2024/10/21/datasheet_sun-5-12k-sg04lp3_241021_en.pdf |

### Build Pipeline
```bash
node build.mjs
```
- Generates `assets/inverter-db.js` (ESM) from `inverters-catalog.json`
- Generates PWA icons from `icons/icon.svg` via sharp
- Generates `sw.js` with up-to-date precache manifest
