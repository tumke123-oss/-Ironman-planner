
import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "ironman-hamburg-planner-v2";

const startPlanning = [
  {
    id: 1,
    naam: "Week 1",
    periode: "1 mei – 3 mei",
    fase: "Race-specifiek",
    dagen: [
      { id: "w1-vr", dag: "Vrijdag", datum: "1 mei", focus: "Lange zwemprikkel", swim: { actief: true, km: 5, uren: 1.55, pace: 110, intervals: [{ naam: "8x500m", aantal: 8, afstand: 500, pace: 110, rust: 40 }] }, bike: { actief: false, km: 0, uren: 0, watt: 0, intervals: [] }, run: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] } },
      { id: "w1-za", dag: "Zaterdag", datum: "2 mei", focus: "200 km bike rustig + voeding testen", swim: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] }, bike: { actief: true, km: 200, uren: 6, watt: 200, intervals: [{ naam: "Duur", aantal: 1, duur: 360, watt: 200, rust: 0 }] }, run: { actief: true, km: 4, uren: 0.35, pace: 320, intervals: [{ naam: "Optionele brick", aantal: 1, afstand: 4, pace: 320, rust: 0 }] } },
      { id: "w1-zo", dag: "Zondag", datum: "3 mei", focus: "Lopen op vermoeide benen", swim: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] }, bike: { actief: false, km: 0, uren: 0, watt: 0, intervals: [] }, run: { actief: true, km: 16, uren: 1.45, pace: 325, intervals: [{ naam: "Easy duurloop", aantal: 1, afstand: 16, pace: 325, rust: 0 }] } },
    ],
  },
  {
    id: 2,
    naam: "Week 2",
    periode: "4 mei – 10 mei",
    fase: "Race-specifiek",
    dagen: [
      { id: "w2-ma", dag: "Maandag", datum: "4 mei", focus: "Herstelrit", swim: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] }, bike: { actief: true, km: 30, uren: 1, watt: 185, intervals: [{ naam: "Herstel", aantal: 1, duur: 60, watt: 185, rust: 0 }] }, run: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] } },
      { id: "w2-di", dag: "Dinsdag", datum: "5 mei", focus: "Zwem + rustige loop", swim: { actief: true, km: 3.4, uren: 1.05, pace: 110, intervals: [{ naam: "6x400m", aantal: 6, afstand: 400, pace: 110, rust: 30 }] }, bike: { actief: false, km: 0, uren: 0, watt: 0, intervals: [] }, run: { actief: true, km: 8, uren: 0.7, pace: 315, intervals: [{ naam: "Easy", aantal: 1, afstand: 8, pace: 315, rust: 0 }] } },
      { id: "w2-wo", dag: "Woensdag", datum: "6 mei", focus: "IM-bike power", swim: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] }, bike: { actief: true, km: 55, uren: 1.65, watt: 205, intervals: [{ naam: "20m", aantal: 1, duur: 20, watt: 190, rust: 0 }, { naam: "40m", aantal: 1, duur: 40, watt: 205, rust: 0 }, { naam: "30m", aantal: 1, duur: 30, watt: 215, rust: 0 }] }, run: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] } },
      { id: "w2-do", dag: "Donderdag", datum: "7 mei", focus: "Korte brick", swim: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] }, bike: { actief: true, km: 45, uren: 1.25, watt: 205, intervals: [{ naam: "IM tempo", aantal: 1, duur: 75, watt: 205, rust: 0 }] }, run: { actief: true, km: 6, uren: 0.52, pace: 310, intervals: [{ naam: "Brick", aantal: 1, afstand: 6, pace: 310, rust: 0 }] } },
      { id: "w2-vr", dag: "Vrijdag", datum: "8 mei", focus: "Steady swim", swim: { actief: true, km: 3.7, uren: 1.15, pace: 111, intervals: [{ naam: "3x1000m", aantal: 3, afstand: 1000, pace: 111, rust: 45 }] }, bike: { actief: false, km: 0, uren: 0, watt: 0, intervals: [] }, run: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] } },
      { id: "w2-za", dag: "Zaterdag", datum: "9 mei", focus: "Lange brick", swim: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] }, bike: { actief: true, km: 150, uren: 4.7, watt: 205, intervals: [{ naam: "Duur", aantal: 1, duur: 282, watt: 205, rust: 0 }] }, run: { actief: true, km: 8, uren: 0.7, pace: 310, intervals: [{ naam: "Brick", aantal: 1, afstand: 8, pace: 310, rust: 0 }] } },
      { id: "w2-zo", dag: "Zondag", datum: "10 mei", focus: "Lange duurloop", swim: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] }, bike: { actief: false, km: 0, uren: 0, watt: 0, intervals: [] }, run: { actief: true, km: 20, uren: 1.8, pace: 325, intervals: [{ naam: "Duur", aantal: 1, afstand: 20, pace: 325, rust: 0 }] } },
    ],
  },
  {
    id: 3,
    naam: "Week 3",
    periode: "11 mei – 17 mei",
    fase: "Laatste grote week",
    dagen: [
      { id: "w3-ma", dag: "Maandag", datum: "11 mei", focus: "Bike endurance", swim: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] }, bike: { actief: true, km: 50, uren: 1.5, watt: 198, intervals: [{ naam: "Duur", aantal: 1, duur: 90, watt: 198, rust: 0 }] }, run: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] } },
      { id: "w3-di", dag: "Dinsdag", datum: "12 mei", focus: "Swim + run", swim: { actief: true, km: 3.8, uren: 1.2, pace: 110, intervals: [{ naam: "5x600m", aantal: 5, afstand: 600, pace: 110, rust: 45 }] }, bike: { actief: false, km: 0, uren: 0, watt: 0, intervals: [] }, run: { actief: true, km: 10, uren: 0.87, pace: 315, intervals: [{ naam: "Easy", aantal: 1, afstand: 10, pace: 315, rust: 0 }] } },
      { id: "w3-wo", dag: "Woensdag", datum: "13 mei", focus: "Bike blokken", swim: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] }, bike: { actief: true, km: 55, uren: 1.5, watt: 210, intervals: [{ naam: "20m", aantal: 1, duur: 20, watt: 190, rust: 0 }, { naam: "30m", aantal: 1, duur: 30, watt: 210, rust: 0 }, { naam: "30m", aantal: 1, duur: 30, watt: 220, rust: 0 }] }, run: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] } },
      { id: "w3-do", dag: "Donderdag", datum: "14 mei", focus: "Brick", swim: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] }, bike: { actief: true, km: 65, uren: 2, watt: 205, intervals: [{ naam: "2u IM", aantal: 1, duur: 120, watt: 205, rust: 0 }] }, run: { actief: true, km: 8, uren: 0.68, pace: 310, intervals: [{ naam: "Brick", aantal: 1, afstand: 8, pace: 310, rust: 0 }] } },
      { id: "w3-vr", dag: "Vrijdag", datum: "15 mei", focus: "Lange swim", swim: { actief: true, km: 3.7, uren: 1.15, pace: 112, intervals: [{ naam: "2x1500m", aantal: 2, afstand: 1500, pace: 112, rust: 60 }] }, bike: { actief: false, km: 0, uren: 0, watt: 0, intervals: [] }, run: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] } },
      { id: "w3-za", dag: "Zaterdag", datum: "16 mei", focus: "Laatste grote brick", swim: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] }, bike: { actief: true, km: 170, uren: 5.3, watt: 205, intervals: [{ naam: "Duur", aantal: 1, duur: 318, watt: 205, rust: 0 }] }, run: { actief: true, km: 12, uren: 1.03, pace: 310, intervals: [{ naam: "Brick", aantal: 1, afstand: 12, pace: 310, rust: 0 }] } },
      { id: "w3-zo", dag: "Zondag", datum: "17 mei", focus: "Lange run", swim: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] }, bike: { actief: false, km: 0, uren: 0, watt: 0, intervals: [] }, run: { actief: true, km: 22, uren: 2, pace: 330, intervals: [{ naam: "Duur", aantal: 1, afstand: 22, pace: 330, rust: 0 }] } },
    ],
  },
  {
    id: 4,
    naam: "Week 4",
    periode: "18 mei – 24 mei",
    fase: "Laatste race-specifieke week",
    dagen: [
      { id: "w4-ma", dag: "Maandag", datum: "18 mei", focus: "Rustige bike", swim: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] }, bike: { actief: true, km: 40, uren: 1.25, watt: 190, intervals: [{ naam: "Easy", aantal: 1, duur: 75, watt: 190, rust: 0 }] }, run: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] } },
      { id: "w4-di", dag: "Dinsdag", datum: "19 mei", focus: "Race pace swim + run", swim: { actief: true, km: 3.1, uren: 1, pace: 110, intervals: [{ naam: "8x300m", aantal: 8, afstand: 300, pace: 110, rust: 30 }] }, bike: { actief: false, km: 0, uren: 0, watt: 0, intervals: [] }, run: { actief: true, km: 8, uren: 0.7, pace: 310, intervals: [{ naam: "Easy", aantal: 1, afstand: 8, pace: 310, rust: 0 }] } },
      { id: "w4-wo", dag: "Woensdag", datum: "20 mei", focus: "3x20m bike", swim: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] }, bike: { actief: true, km: 60, uren: 1.75, watt: 215, intervals: [{ naam: "3x20m", aantal: 3, duur: 20, watt: 215, rust: 5 }] }, run: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] } },
      { id: "w4-do", dag: "Donderdag", datum: "21 mei", focus: "Korte brick", swim: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] }, bike: { actief: true, km: 50, uren: 1.5, watt: 205, intervals: [{ naam: "IM", aantal: 1, duur: 90, watt: 205, rust: 0 }] }, run: { actief: true, km: 6, uren: 0.52, pace: 310, intervals: [{ naam: "Brick", aantal: 1, afstand: 6, pace: 310, rust: 0 }] } },
      { id: "w4-vr", dag: "Vrijdag", datum: "22 mei", focus: "Swim", swim: { actief: true, km: 2.5, uren: 0.8, pace: 110, intervals: [{ naam: "4x500m", aantal: 4, afstand: 500, pace: 110, rust: 40 }] }, bike: { actief: false, km: 0, uren: 0, watt: 0, intervals: [] }, run: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] } },
      { id: "w4-za", dag: "Zaterdag", datum: "23 mei", focus: "Laatste langere brick", swim: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] }, bike: { actief: true, km: 130, uren: 4.1, watt: 205, intervals: [{ naam: "Duur", aantal: 1, duur: 246, watt: 205, rust: 0 }] }, run: { actief: true, km: 8, uren: 0.7, pace: 310, intervals: [{ naam: "Brick", aantal: 1, afstand: 8, pace: 310, rust: 0 }] } },
      { id: "w4-zo", dag: "Zondag", datum: "24 mei", focus: "Laatste langere duurloop", swim: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] }, bike: { actief: false, km: 0, uren: 0, watt: 0, intervals: [] }, run: { actief: true, km: 17, uren: 1.55, pace: 325, intervals: [{ naam: "Duur", aantal: 1, afstand: 17, pace: 325, rust: 0 }] } },
    ],
  },
  {
    id: 5,
    naam: "Week 5",
    periode: "25 mei – 31 mei",
    fase: "Taper week 1",
    dagen: [
      { id: "w5-ma", dag: "Maandag", datum: "25 mei", focus: "Taper start", swim: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] }, bike: { actief: true, km: 30, uren: 1, watt: 190, intervals: [{ naam: "Easy", aantal: 1, duur: 60, watt: 190, rust: 0 }] }, run: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] } },
      { id: "w5-di", dag: "Dinsdag", datum: "26 mei", focus: "Race pace gevoel", swim: { actief: true, km: 2.3, uren: 0.75, pace: 110, intervals: [{ naam: "6x300m", aantal: 6, afstand: 300, pace: 110, rust: 30 }] }, bike: { actief: false, km: 0, uren: 0, watt: 0, intervals: [] }, run: { actief: true, km: 8, uren: 0.7, pace: 310, intervals: [{ naam: "Easy", aantal: 1, afstand: 8, pace: 310, rust: 0 }] } },
      { id: "w5-wo", dag: "Woensdag", datum: "27 mei", focus: "Korte bike blokken", swim: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] }, bike: { actief: true, km: 45, uren: 1.3, watt: 215, intervals: [{ naam: "3x10m", aantal: 3, duur: 10, watt: 215, rust: 5 }] }, run: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] } },
      { id: "w5-do", dag: "Donderdag", datum: "28 mei", focus: "Korte brick", swim: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] }, bike: { actief: true, km: 35, uren: 1, watt: 195, intervals: [{ naam: "Easy", aantal: 1, duur: 60, watt: 195, rust: 0 }] }, run: { actief: true, km: 5, uren: 0.43, pace: 310, intervals: [{ naam: "Brick", aantal: 1, afstand: 5, pace: 310, rust: 0 }] } },
      { id: "w5-vr", dag: "Vrijdag", datum: "29 mei", focus: "Relaxed swim", swim: { actief: true, km: 2.5, uren: 0.8, pace: 112, intervals: [{ naam: "6x100m", aantal: 6, afstand: 100, pace: 108, rust: 20 }] }, bike: { actief: false, km: 0, uren: 0, watt: 0, intervals: [] }, run: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] } },
      { id: "w5-za", dag: "Zaterdag", datum: "30 mei", focus: "Taper brick", swim: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] }, bike: { actief: true, km: 60, uren: 1.8, watt: 195, intervals: [{ naam: "Easy", aantal: 1, duur: 108, watt: 195, rust: 0 }] }, run: { actief: true, km: 6, uren: 0.52, pace: 315, intervals: [{ naam: "Brick", aantal: 1, afstand: 6, pace: 315, rust: 0 }] } },
      { id: "w5-zo", dag: "Zondag", datum: "31 mei", focus: "Rustige run", swim: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] }, bike: { actief: false, km: 0, uren: 0, watt: 0, intervals: [] }, run: { actief: true, km: 11, uren: 0.98, pace: 320, intervals: [{ naam: "Easy", aantal: 1, afstand: 11, pace: 320, rust: 0 }] } },
    ],
  },
  {
    id: 6,
    naam: "Week 6",
    periode: "1 juni – 7 juni",
    fase: "Race week",
    dagen: [
      { id: "w6-ma", dag: "Maandag", datum: "1 juni", focus: "Holteronderzoek / rust", swim: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] }, bike: { actief: false, km: 0, uren: 0, watt: 0, intervals: [] }, run: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] } },
      { id: "w6-di", dag: "Dinsdag", datum: "2 juni", focus: "Niet zwemmen", swim: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] }, bike: { actief: true, km: 25, uren: 0.75, watt: 190, intervals: [{ naam: "Optioneel", aantal: 1, duur: 45, watt: 190, rust: 0 }] }, run: { actief: true, km: 6, uren: 0.52, pace: 310, intervals: [{ naam: "Easy", aantal: 1, afstand: 6, pace: 310, rust: 0 }] } },
      { id: "w6-wo", dag: "Woensdag", datum: "3 juni", focus: "Laatste combi", swim: { actief: true, km: 1.3, uren: 0.45, pace: 110, intervals: [{ naam: "4x200m", aantal: 4, afstand: 200, pace: 110, rust: 30 }] }, bike: { actief: true, km: 35, uren: 1, watt: 195, intervals: [{ naam: "3x3m", aantal: 3, duur: 3, watt: 215, rust: 3 }] }, run: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] } },
      { id: "w6-do", dag: "Donderdag", datum: "4 juni", focus: "Kort en los", swim: { actief: true, km: 1.5, uren: 0.5, pace: 115, intervals: [] }, bike: { actief: false, km: 0, uren: 0, watt: 0, intervals: [] }, run: { actief: true, km: 5, uren: 0.45, pace: 320, intervals: [{ naam: "4x20s versnellen", aantal: 4, duur: 0.33, pace: 270, rust: 1 }] } },
      { id: "w6-vr", dag: "Vrijdag", datum: "5 juni", focus: "Laatste fietsprikkel", swim: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] }, bike: { actief: true, km: 25, uren: 0.75, watt: 190, intervals: [{ naam: "3x2m", aantal: 3, duur: 2, watt: 210, rust: 5 }] }, run: { actief: false, km: 0, uren: 0, pace: 0, intervals: [] } },
      { id: "w6-za", dag: "Zaterdag", datum: "6 juni", focus: "Activatie", swim: { actief: true, km: 0.5, uren: 0.17, pace: 120, intervals: [] }, bike: { actief: true, km: 8, uren: 0.2, watt: 170, intervals: [] }, run: { actief: true, km: 2, uren: 0.17, pace: 330, intervals: [] } },
      { id: "w6-zo", dag: "Zondag", datum: "7 juni", focus: "RACE DAY", swim: { actief: true, km: 3.8, uren: 1.17, pace: 112, intervals: [] }, bike: { actief: true, km: 180, uren: 5.1, watt: 202, intervals: [] }, run: { actief: true, km: 42.2, uren: 3.63, pace: 312, intervals: [] } },
    ],
  },
];

const disciplineLabels = { swim: "Zwemmen", bike: "Fietsen", run: "Lopen" };

function secNaarPace(sec, type = "run") {
  if (!sec) return "-";
  const min = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return type === "swim" ? `${min}:${String(s).padStart(2, "0")}/100m` : `${min}:${String(s).padStart(2, "0")}/km`;
}

function urenNaarTekst(waarde) {
  const uur = Math.floor(waarde);
  const min = Math.round((waarde - uur) * 60);
  if (uur === 0) return `${min}m`;
  return `${uur}u ${String(min).padStart(2, "0")}m`;
}

function rond(value, decimals = 1) {
  return Number(value.toFixed(decimals));
}

function dagTotals(dag) {
  return { km: dag.swim.km + dag.bike.km + dag.run.km, uren: dag.swim.uren + dag.bike.uren + dag.run.uren, load: Math.round(dag.swim.uren * 45 + dag.bike.uren * 55 + dag.run.uren * 70) };
}

function weekTotals(week) {
  return week.dagen.reduce((acc, dag) => {
    const d = dagTotals(dag);
    acc.swimKm += dag.swim.km; acc.swimUren += dag.swim.uren;
    acc.bikeKm += dag.bike.km; acc.bikeUren += dag.bike.uren;
    acc.runKm += dag.run.km; acc.runUren += dag.run.uren;
    acc.km += d.km; acc.uren += d.uren; acc.load += d.load;
    return acc;
  }, { swimKm: 0, swimUren: 0, bikeKm: 0, bikeUren: 0, runKm: 0, runUren: 0, km: 0, uren: 0, load: 0 });
}

function risicoWeek(week) {
  const t = weekTotals(week);
  const loopAandeel = t.uren > 0 ? t.runUren / t.uren : 0;
  if (t.uren > 18 || t.runKm > 55 || loopAandeel > 0.34) return { titel: "Hoog", className: "risk high", tekst: "Veel belasting. Herstel extra bewaken." };
  if (t.uren > 13 || t.bikeKm > 280 || t.runKm > 42) return { titel: "Stevig", className: "risk medium", tekst: "Race-specifieke belasting. Goed monitoren." };
  return { titel: "Controle", className: "risk ok", tekst: "Goed beheersbaar." };
}

function Slider({ label, value, min, max, step, suffix = "", onChange, display }) {
  return <div className="slider-block">
    <div className="slider-head"><label>{label}</label><span>{display ?? `${value}${suffix}`}</span></div>
    <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
  </div>;
}

function DisciplineEditor({ type, data, onChange }) {
  const isSwim = type === "swim", isBike = type === "bike";
  return <div className="panel soft">
    <div className="panel-title">
      <h4>{disciplineLabels[type]}</h4>
      <label className="toggle"><input type="checkbox" checked={data.actief} onChange={(e) => onChange({ ...data, actief: e.target.checked })} /> actief</label>
    </div>
    {data.actief ? <div className="grid2">
      <Slider label="Afstand" value={data.km} min={0} max={isBike ? 220 : isSwim ? 8 : 45} step={isBike ? 5 : isSwim ? 0.1 : 0.5} suffix=" km" onChange={(v) => onChange({ ...data, km: v })} />
      <Slider label="Uren" value={data.uren} min={0} max={isBike ? 7 : isSwim ? 2.5 : 4.5} step={0.05} display={urenNaarTekst(data.uren)} onChange={(v) => onChange({ ...data, uren: v })} />
      {isSwim && <Slider label="Basis tempo" value={data.pace} min={95} max={135} step={1} display={secNaarPace(data.pace, "swim")} onChange={(v) => onChange({ ...data, pace: v })} />}
      {isBike && <Slider label="Basis watt" value={data.watt} min={120} max={260} step={1} suffix="W" onChange={(v) => onChange({ ...data, watt: v })} />}
      {type === "run" && <Slider label="Basis pace" value={data.pace} min={260} max={390} step={1} display={secNaarPace(data.pace, "run")} onChange={(v) => onChange({ ...data, pace: v })} />}
    </div> : <p className="muted">Geen training gepland.</p>}
  </div>;
}

function IntervalEditor({ type, intervals, onChange }) {
  const isBike = type === "bike", isSwim = type === "swim";
  const update = (i, field, value) => onChange(intervals.map((it, idx) => idx === i ? { ...it, [field]: value } : it));
  const add = () => onChange([...intervals, isBike ? { naam: "Nieuw blok", aantal: 1, duur: 10, watt: 200, rust: 3 } : isSwim ? { naam: "Nieuw blok", aantal: 4, afstand: 200, pace: 110, rust: 30 } : { naam: "Nieuw blok", aantal: 1, afstand: 5, pace: 315, rust: 0 }]);
  const remove = (i) => onChange(intervals.filter((_, idx) => idx !== i));

  return <div className="panel">
    <div className="panel-title"><h4>Intervalblokken {disciplineLabels[type]}</h4><button onClick={add} className="mini primary">+ blok</button></div>
    {intervals.length === 0 ? <p className="muted">Geen intervalblokken.</p> : <div className="interval-list">
      {intervals.map((it, i) => <div className="interval" key={i}>
        <div className="interval-head"><input value={it.naam || ""} onChange={(e) => update(i, "naam", e.target.value)} /><button className="mini" onClick={() => remove(i)}>weg</button></div>
        <div className="grid2">
          <Slider label="Aantal" value={it.aantal ?? 1} min={1} max={20} step={1} suffix="x" onChange={(v) => update(i, "aantal", v)} />
          {isBike ? <Slider label="Duur blok" value={it.duur ?? 10} min={1} max={120} step={1} suffix=" min" onChange={(v) => update(i, "duur", v)} /> : isSwim ? <Slider label="Afstand blok" value={it.afstand ?? 200} min={50} max={1500} step={50} suffix="m" onChange={(v) => update(i, "afstand", v)} /> : <Slider label="Afstand blok" value={it.afstand ?? 5} min={0.2} max={25} step={0.1} suffix=" km" onChange={(v) => update(i, "afstand", v)} />}
          {isBike ? <Slider label="Watt" value={it.watt ?? 200} min={120} max={280} step={1} suffix="W" onChange={(v) => update(i, "watt", v)} /> : <Slider label="Tempo" value={it.pace ?? (isSwim ? 110 : 315)} min={isSwim ? 95 : 250} max={isSwim ? 140 : 390} step={1} display={secNaarPace(it.pace ?? (isSwim ? 110 : 315), isSwim ? "swim" : "run")} onChange={(v) => update(i, "pace", v)} />}
          <Slider label="Rust" value={it.rust ?? 0} min={0} max={isSwim ? 90 : 10} step={isSwim ? 5 : 0.5} suffix={isSwim ? " sec" : " min"} onChange={(v) => update(i, "rust", v)} />
        </div>
      </div>)}
    </div>}
  </div>;
}

function workoutTekst(dag) {
  const out = [];
  if (dag.swim.actief) {
    out.push("Swim", `- ${dag.swim.km}km totaal`, `- basis ${secNaarPace(dag.swim.pace, "swim")}`);
    dag.swim.intervals.forEach(i => out.push(`- ${i.aantal ?? 1}x${i.afstand ?? 0}m ${secNaarPace(i.pace ?? dag.swim.pace, "swim")} pace, ${i.rust ?? 0}s rust`));
    out.push("");
  }
  if (dag.bike.actief) {
    out.push("Bike", `- ${dag.bike.km}km / ${urenNaarTekst(dag.bike.uren)}`, `- basis ${dag.bike.watt}W`);
    dag.bike.intervals.forEach(i => out.push(`- ${i.aantal ?? 1}x${i.duur ?? 0}m ${i.watt ?? dag.bike.watt}W, ${i.rust ?? 0}m easy`));
    out.push("");
  }
  if (dag.run.actief) {
    out.push("Run", `- ${dag.run.km}km / ${urenNaarTekst(dag.run.uren)}`, `- basis ${secNaarPace(dag.run.pace, "run")}`);
    dag.run.intervals.forEach(i => out.push(`- ${i.aantal ?? 1}x${i.duur ? `${i.duur}m` : `${i.afstand ?? 0}km`} ${secNaarPace(i.pace ?? dag.run.pace, "run")} pace, ${i.rust ?? 0}m rust`));
  }
  return out.filter((line, idx, arr) => !(line === "" && arr[idx-1] === "")).join("\n").trim() || "Rustdag";
}

export default function App() {
  const [planning, setPlanning] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || startPlanning; } catch { return startPlanning; }
  });
  const [openDagId, setOpenDagId] = useState("w2-za");
  const [filterWeek, setFilterWeek] = useState("alles");

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(planning)); }, [planning]);

  const totalen = useMemo(() => planning.reduce((acc, week) => {
    const w = weekTotals(week);
    acc.swimKm += w.swimKm; acc.bikeKm += w.bikeKm; acc.runKm += w.runKm; acc.uren += w.uren; acc.km += w.km; acc.load += w.load;
    return acc;
  }, { swimKm: 0, bikeKm: 0, runKm: 0, km: 0, uren: 0, load: 0 }), [planning]);

  const updateDag = (dagId, discipline, data) => setPlanning(old => old.map(week => ({ ...week, dagen: week.dagen.map(dag => dag.id === dagId ? { ...dag, [discipline]: data } : dag) })));
  const updateFocus = (dagId, focus) => setPlanning(old => old.map(week => ({ ...week, dagen: week.dagen.map(dag => dag.id === dagId ? { ...dag, focus } : dag) })));

  function resetPlanning() {
    if (confirm("Planning resetten naar de basisversie?")) {
      setPlanning(startPlanning);
      setOpenDagId("w2-za");
    }
  }

  function exportCSV() {
    const header = ["Week","Periode","Fase","Dag","Datum","Focus","Zwem km","Zwem uren","Zwem pace","Fiets km","Fiets uren","Watt","Loop km","Loop uren","Loop pace","Workout tekst"];
    const rows = planning.flatMap(week => week.dagen.map(dag => [week.naam, week.periode, week.fase, dag.dag, dag.datum, dag.focus, dag.swim.km, dag.swim.uren.toFixed(2), dag.swim.actief ? secNaarPace(dag.swim.pace, "swim") : "", dag.bike.km, dag.bike.uren.toFixed(2), dag.bike.actief ? dag.bike.watt : "", dag.run.km, dag.run.uren.toFixed(2), dag.run.actief ? secNaarPace(dag.run.pace, "run") : "", workoutTekst(dag)]));
    const csv = [header, ...rows].map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "ironman_hamburg_dagplanning_intervals.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify(planning, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "ironman_hamburg_planner_backup.json"; a.click();
    URL.revokeObjectURL(url);
  }

  const zichtbarePlanning = filterWeek === "alles" ? planning : planning.filter(w => String(w.id) === filterWeek);

  return <main className="app">
    <header className="hero">
      <p className="eyebrow">Ironman Hamburg 2026</p>
      <h1>Dagplanner + interval schuifjes</h1>
      <p className="intro">iPhone-ready PWA. Pas per dag afstand, uren, zwemtempo, fietswattage, looptempo en intervalblokken aan. Alles wordt automatisch opgeslagen op je toestel.</p>
      <div className="actions">
        <button onClick={exportCSV} className="btn primary">CSV exporteren</button>
        <button onClick={exportJSON} className="btn">Backup JSON</button>
        <button onClick={resetPlanning} className="btn">Reset</button>
        <select value={filterWeek} onChange={(e) => setFilterWeek(e.target.value)} className="select">
          <option value="alles">Alle weken</option>
          {planning.map(week => <option key={week.id} value={week.id}>{week.naam}</option>)}
        </select>
      </div>
    </header>

    <section className="totals">
      <div><span>Totaal</span><strong>{rond(totalen.km)} km</strong></div>
      <div><span>Uren</span><strong>{urenNaarTekst(totalen.uren)}</strong></div>
      <div><span>Zwem</span><strong>{rond(totalen.swimKm)} km</strong></div>
      <div><span>Bike</span><strong>{rond(totalen.bikeKm)} km</strong></div>
      <div><span>Run</span><strong>{rond(totalen.runKm)} km</strong></div>
    </section>

    {zichtbarePlanning.map(week => {
      const wt = weekTotals(week), check = risicoWeek(week);
      return <section key={week.id} className="week">
        <div className="week-head">
          <div><h2>{week.naam}</h2><p>{week.periode}</p><b>{week.fase}</b></div>
          <div className="week-meta"><strong>{rond(wt.km)} km · {urenNaarTekst(wt.uren)}</strong><span>load {wt.load}</span></div>
          <div className={check.className}><b>Controle: {check.titel}</b><span>{check.tekst}</span></div>
        </div>

        <div className="days">
          {week.dagen.map(dag => {
            const open = openDagId === dag.id, dt = dagTotals(dag);
            return <article key={dag.id} className="day">
              <button className="day-summary" onClick={() => setOpenDagId(open ? "" : dag.id)}>
                <div><h3>{dag.dag} · {dag.datum}</h3><p>{dag.focus}</p></div>
                <div className="chips">
                  {dag.swim.actief && <span>Swim {dag.swim.km}km · {secNaarPace(dag.swim.pace, "swim")}</span>}
                  {dag.bike.actief && <span>Bike {dag.bike.km}km · {dag.bike.watt}W</span>}
                  {dag.run.actief && <span>Run {dag.run.km}km · {secNaarPace(dag.run.pace, "run")}</span>}
                  <span>{rond(dt.km)}km · {urenNaarTekst(dt.uren)}</span>
                </div>
              </button>

              {open && <div className="day-edit">
                <label className="focus-label">Focus van de dag</label>
                <input value={dag.focus} onChange={(e) => updateFocus(dag.id, e.target.value)} className="focus-input" />

                <div className="discipline-grid">
                  <DisciplineEditor type="swim" data={dag.swim} onChange={(data) => updateDag(dag.id, "swim", data)} />
                  <DisciplineEditor type="bike" data={dag.bike} onChange={(data) => updateDag(dag.id, "bike", data)} />
                  <DisciplineEditor type="run" data={dag.run} onChange={(data) => updateDag(dag.id, "run", data)} />
                </div>

                <div className="interval-grid">
                  {dag.swim.actief && <IntervalEditor type="swim" intervals={dag.swim.intervals} onChange={(intervals) => updateDag(dag.id, "swim", { ...dag.swim, intervals })} />}
                  {dag.bike.actief && <IntervalEditor type="bike" intervals={dag.bike.intervals} onChange={(intervals) => updateDag(dag.id, "bike", { ...dag.bike, intervals })} />}
                  {dag.run.actief && <IntervalEditor type="run" intervals={dag.run.intervals} onChange={(intervals) => updateDag(dag.id, "run", { ...dag.run, intervals })} />}
                </div>

                <div className="copybox"><b>Copy/paste workout tekst</b><pre>{workoutTekst(dag)}</pre></div>
              </div>}
            </article>
          })}
        </div>
      </section>
    })}

    <footer className="footer">
      <b>Installeren op iPhone:</b> open de gepubliceerde link in Safari → deelknop → Zet op beginscherm.
    </footer>
  </main>
}
