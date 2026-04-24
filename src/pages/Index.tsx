import { useState } from "react";
import { calculate, getArcane, ARCANES, type NumerologyResult } from "@/data/numerology";
import { getCitiesForNumber, filterCities, getCompatibilityScore, getCompatibilityLabel, type Climate, type Lifestyle, type Region, type Cost, CITIES } from "@/data/cities";
import { getMessage } from "@/data/messages";

type Section = "calculator" | "arcanes" | "analysis" | "results" | "method" | "cities";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("calculator");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState<NumerologyResult | null>(null);
  const [error, setError] = useState("");
  const [selectedArcane, setSelectedArcane] = useState<number | null>(null);
  const [expandedCity, setExpandedCity] = useState<string | null>(null);
  const [filterClimate, setFilterClimate] = useState<Climate | null>(null);
  const [filterLifestyle, setFilterLifestyle] = useState<Lifestyle | null>(null);
  const [filterRegion, setFilterRegion] = useState<Region | null>(null);
  const [filterCost, setFilterCost] = useState<Cost | null>(null);

  function handleCalculate() {
    const d = parseInt(day), m = parseInt(month), y = parseInt(year);
    if (!d || !m || !y || d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > 2025) {
      setError("Введите корректную дату рождения");
      return;
    }
    setError("");
    const res = calculate(d, m, y);
    setResult(res);
    setExpandedCity(null);
    setActiveSection("results");
  }

  const navItems: { id: Section; label: string }[] = [
    { id: "calculator", label: "Калькулятор" },
    { id: "results", label: "Результаты" },
    { id: "cities", label: "Города" },
    { id: "analysis", label: "Анализ" },
    { id: "arcanes", label: "Арканы" },
    { id: "method", label: "Методика" },
  ];

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />

      {/* Заголовок */}
      <header className="relative z-10 pt-10 pb-6 text-center px-4">
        <div className="animate-float inline-block mb-4">
          <div className="sacred-symbol">☽✦☾</div>
        </div>
        <h1 className="font-cormorant text-5xl md:text-7xl font-light tracking-widest gold-gradient mb-2">
          НУМЕРОЛОГИЯ
        </h1>
        <p className="text-xs tracking-[0.4em] uppercase" style={{ color: "hsl(45,40%,50%)" }}>
          Тайны Арканов · Откровение Чисел
        </p>
        <div className="gold-divider max-w-xl mx-auto mt-6" />
      </header>

      {/* Навигация */}
      <nav className="relative z-10 flex justify-center flex-wrap gap-1 px-4 mb-8">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`nav-item ${activeSection === item.id ? "active" : ""}`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Контент */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 pb-20">

        {/* КАЛЬКУЛЯТОР */}
        {activeSection === "calculator" && (
          <div className="section-enter">
            <div className="mystic-card corner-decoration rounded-2xl p-8 md:p-12 text-center max-w-lg mx-auto">
              <div className="text-4xl mb-4">🔮</div>
              <h2 className="font-cormorant text-3xl font-light gold-text mb-2">Введите дату рождения</h2>
              <p className="text-sm mb-8" style={{ color: "hsl(45,30%,55%)" }}>
                Дата рождения — ключ к вашему нумерологическому коду
              </p>

              <div className="flex gap-3 justify-center mb-6">
                <div className="flex flex-col items-center gap-1">
                  <label className="text-xs tracking-widest uppercase" style={{ color: "hsl(45,40%,50%)" }}>День</label>
                  <input
                    type="number"
                    min="1" max="31"
                    placeholder="ДД"
                    value={day}
                    onChange={e => setDay(e.target.value)}
                    className="mystic-input w-20 text-center text-xl rounded-lg py-3 px-2"
                  />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <label className="text-xs tracking-widest uppercase" style={{ color: "hsl(45,40%,50%)" }}>Месяц</label>
                  <input
                    type="number"
                    min="1" max="12"
                    placeholder="ММ"
                    value={month}
                    onChange={e => setMonth(e.target.value)}
                    className="mystic-input w-20 text-center text-xl rounded-lg py-3 px-2"
                  />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <label className="text-xs tracking-widest uppercase" style={{ color: "hsl(45,40%,50%)" }}>Год</label>
                  <input
                    type="number"
                    min="1900" max="2025"
                    placeholder="ГГГГ"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    className="mystic-input w-28 text-center text-xl rounded-lg py-3 px-2"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm mb-4" style={{ color: "hsl(0,60%,60%)" }}>{error}</p>
              )}

              <button
                onClick={handleCalculate}
                className="mystic-btn w-full py-4 rounded-xl text-sm"
              >
                ✦ Раскрыть тайну чисел ✦
              </button>

              <div className="gold-divider my-8" />

              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { icon: "⚡", label: "Жизненный путь" },
                  { icon: "☽", label: "Число судьбы" },
                  { icon: "✶", label: "Число души" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="text-2xl">{item.icon}</div>
                    <div className="text-xs" style={{ color: "hsl(45,30%,50%)" }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* РЕЗУЛЬТАТЫ */}
        {activeSection === "results" && (
          <div className="section-enter">
            {!result ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">☽</div>
                <p className="gold-text font-cormorant text-xl">Сначала введите дату рождения</p>
                <button onClick={() => setActiveSection("calculator")} className="mystic-btn mt-6 px-8 py-3 rounded-xl text-xs">
                  Перейти к калькулятору
                </button>
              </div>
            ) : (
              <div>
                <h2 className="font-cormorant text-4xl font-light gold-text text-center mb-2">
                  Ваш нумерологический код
                </h2>
                <p className="text-center text-sm mb-8" style={{ color: "hsl(45,30%,55%)" }}>
                  Дата рождения: <span className="gold-text">{result.birthDate}</span>
                </p>

                {/* Главное число */}
                <div className="mystic-card animate-glow-pulse rounded-2xl p-8 text-center mb-6 corner-decoration">
                  <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "hsl(45,40%,50%)" }}>
                    Число Жизненного Пути
                  </p>
                  <div className="arcane-number text-8xl md:text-[10rem] leading-none mb-2">
                    {result.lifePathNumber}
                  </div>
                  <div className="font-cormorant text-3xl gold-text mb-2">
                    {getArcane(result.lifePathNumber).name}
                  </div>
                  <div className="text-sm" style={{ color: "hsl(45,30%,55%)" }}>
                    {getArcane(result.lifePathNumber).title}
                  </div>
                </div>

                {/* Все числа */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Число судьбы", value: result.destinyNumber, icon: "⚡" },
                    { label: "Число души", value: result.soulNumber, icon: "☽" },
                    { label: "Число личности", value: result.personalityNumber, icon: "✦" },
                    { label: "Число зрелости", value: result.maturityNumber, icon: "✶" },
                    { label: "Личный год", value: result.personalYear, icon: "◎" },
                    { label: "Число года рожд.", value: result.yearNumber, icon: "⬟" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="mystic-card rounded-xl p-4 text-center cursor-pointer transition-all"
                      onClick={() => {
                        setSelectedArcane(item.value);
                        setActiveSection("arcanes");
                      }}
                    >
                      <div className="text-xl mb-1">{item.icon}</div>
                      <div className="arcane-number text-4xl mb-1">{item.value}</div>
                      <div className="text-xs" style={{ color: "hsl(45,30%,55%)" }}>{item.label}</div>
                      <div className="text-xs mt-1" style={{ color: "hsl(45,50%,60%)" }}>
                        {getArcane(item.value).name}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Мастер-числа */}
                {result.masterNumbers.length > 0 && (
                  <div className="mystic-card rounded-xl p-5 mb-4" style={{ borderColor: "hsla(45,80%,50%,0.5)" }}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">★</span>
                      <h3 className="font-cormorant text-xl gold-text">Мастер-числа обнаружены</h3>
                    </div>
                    <p className="text-sm" style={{ color: "hsl(45,30%,65%)" }}>
                      В вашей карте присутствуют особые числа:{" "}
                      <span className="gold-text font-semibold">{result.masterNumbers.join(", ")}</span>.
                      Это знак высшего предназначения и особой миссии в этом воплощении.
                    </p>
                  </div>
                )}

                {/* Идеальный город */}
                {(() => {
                  const ideal = CITIES.find(c => c.number === result.lifePathNumber)
                    ?? getCitiesForNumber(result.lifePathNumber)[0];
                  if (!ideal) return null;
                  const score = getCompatibilityScore(ideal.number, result.lifePathNumber);
                  const message = getMessage(result.lifePathNumber, ideal.name);
                  return (
                    <div
                      className="mystic-card rounded-2xl overflow-hidden mt-6 cursor-pointer"
                      style={{ borderColor: "hsla(45,80%,45%,0.6)", boxShadow: "0 0 40px hsla(45,80%,25%,0.25)" }}
                      onClick={() => setActiveSection("cities")}
                    >
                      {/* Заголовок полосы */}
                      <div className="px-6 pt-5 pb-3 flex items-center justify-between"
                        style={{ borderBottom: "1px solid hsla(45,50%,25%,0.3)" }}>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🌍</span>
                          <span className="text-xs uppercase tracking-[0.25em]" style={{ color: "hsl(45,50%,50%)" }}>
                            Идеальный город для переезда
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="arcane-number text-lg">{score}%</span>
                          <span className="text-xs" style={{ color: "hsl(45,50%,45%)" }}>совместимость</span>
                        </div>
                      </div>

                      {/* Тело карточки */}
                      <div className="p-6">
                        <div className="flex items-start gap-5">
                          <div className="text-5xl flex-shrink-0 leading-none mt-1">{ideal.flag}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                              <h3 className="font-cormorant text-4xl font-light gold-text leading-none">{ideal.name}</h3>
                              <span className="text-sm" style={{ color: "hsl(45,30%,50%)" }}>{ideal.country}</span>
                            </div>
                            <p className="text-xs mb-3" style={{ color: "hsl(45,50%,55%)" }}>{ideal.energy}</p>

                            {/* Полоса совместимости */}
                            <div className="h-0.5 rounded-full overflow-hidden mb-5" style={{ background: "hsla(45,30%,15%,0.8)" }}>
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${score}%`,
                                  background: "linear-gradient(90deg, hsl(45,70%,35%), hsl(45,90%,62%))",
                                  boxShadow: "0 0 8px hsla(45,80%,50%,0.5)"
                                }}
                              />
                            </div>

                            {/* Персональное послание */}
                            <div className="rounded-xl p-5 mb-5 relative overflow-hidden"
                              style={{
                                background: "linear-gradient(135deg, hsla(270,30%,8%,0.95), hsla(240,25%,6%,0.95))",
                                border: "1px solid hsla(45,60%,35%,0.4)",
                                boxShadow: "inset 0 0 30px hsla(45,50%,10%,0.5)"
                              }}>
                              {/* Декоративный уголок */}
                              <div className="absolute top-3 left-3 w-4 h-4"
                                style={{ borderTop: "1px solid hsla(45,70%,45%,0.5)", borderLeft: "1px solid hsla(45,70%,45%,0.5)" }} />
                              <div className="absolute bottom-3 right-3 w-4 h-4"
                                style={{ borderBottom: "1px solid hsla(45,70%,45%,0.5)", borderRight: "1px solid hsla(45,70%,45%,0.5)" }} />

                              <p className="text-xs uppercase tracking-[0.3em] mb-3 flex items-center gap-2"
                                style={{ color: "hsl(45,60%,45%)" }}>
                                <span>✦</span> Послание звёзд
                              </p>
                              <p className="text-sm leading-relaxed font-cormorant text-base italic"
                                style={{ color: "hsl(45,50%,80%)", fontStyle: "italic", lineHeight: "1.8" }}>
                                {message}
                              </p>
                            </div>

                            {/* Атмосфера */}
                            <div className="rounded-lg px-4 py-3 mb-4"
                              style={{ background: "hsla(270,25%,7%,0.8)", border: "1px solid hsla(45,40%,18%,0.5)" }}>
                              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "hsl(45,35%,42%)" }}>Атмосфера</p>
                              <p className="text-sm italic" style={{ color: "hsl(45,40%,68%)" }}>"{ideal.vibe}"</p>
                            </div>

                            {/* Бейджи */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {[
                                { icon: ideal.climate === "тепло" ? "☀" : ideal.climate === "умеренно" ? "⛅" : "❄", label: ideal.climate },
                                { icon: "💰", label: ideal.cost },
                                { icon: "🌍", label: ideal.region },
                                ...ideal.lifestyle.map(l => ({ icon: l === "мегаполис" ? "🏙" : l === "у моря" ? "🌊" : l === "в горах" ? "⛰" : "🌿", label: l }))
                              ].map((b, i) => (
                                <span key={i} className="text-xs px-3 py-1 rounded-full flex items-center gap-1"
                                  style={{ background: "hsla(45,40%,14%,0.6)", color: "hsl(45,55%,62%)", border: "1px solid hsla(45,40%,25%,0.4)" }}>
                                  {b.icon} {b.label}
                                </span>
                              ))}
                            </div>

                            <p className="text-xs" style={{ color: "hsl(45,30%,42%)" }}>
                              Нажмите, чтобы увидеть все подходящие города →
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Кнопки */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={() => setActiveSection("cities")}
                    className="mystic-btn flex-1 py-3 rounded-xl text-xs"
                  >
                    🌍 Все города для переезда
                  </button>
                  <button
                    onClick={() => setActiveSection("analysis")}
                    className="flex-1 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold"
                    style={{
                      background: "hsla(240,20%,10%,0.8)",
                      border: "1px solid hsla(45,50%,30%,0.4)",
                      color: "hsl(45,60%,60%)"
                    }}
                  >
                    ✦ Анализ личности
                  </button>
                </div>
                <button
                  onClick={() => { setResult(null); setDay(""); setMonth(""); setYear(""); setActiveSection("calculator"); }}
                  className="w-full mt-3 py-2 text-xs uppercase tracking-widest"
                  style={{ color: "hsl(45,30%,40%)" }}
                >
                  ↺ Новый расчёт
                </button>
              </div>
            )}
          </div>
        )}

        {/* АРКАНЫ */}
        {activeSection === "arcanes" && (
          <div className="section-enter">
            <h2 className="font-cormorant text-4xl font-light gold-text text-center mb-2">
              Великие Арканы
            </h2>
            <p className="text-center text-sm mb-8" style={{ color: "hsl(45,30%,55%)" }}>
              Нумерологические архетипы и их значения
            </p>

            <div className="grid gap-4">
              {Object.values(ARCANES).map(arcane => (
                <div
                  key={arcane.number}
                  className="mystic-card rounded-xl overflow-hidden cursor-pointer transition-all"
                  style={selectedArcane === arcane.number ? { borderColor: "hsl(45,80%,55%)", boxShadow: "0 0 30px hsla(45,80%,30%,0.4)" } : {}}
                  onClick={() => setSelectedArcane(selectedArcane === arcane.number ? null : arcane.number)}
                >
                  <div className="flex items-center gap-4 p-5">
                    <div className="arcane-badge">{arcane.number}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-cormorant text-xl gold-text">{arcane.name}</span>
                        <span className="text-sm" style={{ color: "hsl(45,40%,50%)" }}>— {arcane.title}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {arcane.keywords.slice(0, 3).map(kw => (
                          <span key={kw} className="text-xs px-2 py-0.5 rounded-full"
                            style={{ background: "hsla(45,50%,20%,0.4)", color: "hsl(45,60%,65%)", border: "1px solid hsla(45,50%,30%,0.3)" }}>
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-lg" style={{ color: "hsl(45,50%,50%)" }}>
                      {selectedArcane === arcane.number ? "▲" : "▼"}
                    </div>
                  </div>

                  {selectedArcane === arcane.number && (
                    <div className="px-5 pb-5 pt-0 border-t" style={{ borderColor: "hsla(45,40%,25%,0.3)" }}>
                      <p className="text-sm mb-5 leading-relaxed mt-4" style={{ color: "hsl(45,40%,72%)" }}>
                        {arcane.description}
                      </p>
                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <div className="mb-3">
                            <span className="plus-badge text-xs px-3 py-1 rounded-full">✦ Сильные стороны</span>
                          </div>
                          <ul className="space-y-2">
                            {arcane.strengths.map((s, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "hsl(120,50%,70%)" }}>
                                <span className="mt-1 flex-shrink-0">◆</span> {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="mb-3">
                            <span className="minus-badge text-xs px-3 py-1 rounded-full">✦ Слабые стороны</span>
                          </div>
                          <ul className="space-y-2">
                            {arcane.weaknesses.map((w, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "hsl(0,50%,70%)" }}>
                                <span className="mt-1 flex-shrink-0">◆</span> {w}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-4 text-xs" style={{ color: "hsl(45,40%,50%)" }}>
                        <span>⚡ {arcane.energy}</span>
                        <span>◎ {arcane.lifeAspect}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* АНАЛИЗ */}
        {activeSection === "analysis" && (
          <div className="section-enter">
            {!result ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">⚖</div>
                <p className="gold-text font-cormorant text-xl">Сначала рассчитайте вашу нумерологию</p>
                <button onClick={() => setActiveSection("calculator")} className="mystic-btn mt-6 px-8 py-3 rounded-xl text-xs">
                  К калькулятору
                </button>
              </div>
            ) : (
              <div>
                <h2 className="font-cormorant text-4xl font-light gold-text text-center mb-2">
                  Анализ личности
                </h2>
                <p className="text-center text-sm mb-8" style={{ color: "hsl(45,30%,55%)" }}>
                  На основе вашего числа жизненного пути:{" "}
                  <span className="gold-text font-semibold">{result.lifePathNumber}</span>
                </p>

                {(() => {
                  const arcane = getArcane(result.lifePathNumber);
                  return (
                    <>
                      <div className="mystic-card corner-decoration rounded-2xl p-8 mb-6 text-center">
                        <div className="text-4xl mb-4">{arcane.symbol}</div>
                        <h3 className="font-cormorant text-3xl gold-text mb-1">{arcane.name}</h3>
                        <p className="text-sm mb-4" style={{ color: "hsl(45,40%,55%)" }}>{arcane.title}</p>
                        <div className="gold-divider mb-4" />
                        <p className="leading-relaxed" style={{ color: "hsl(45,40%,75%)", fontSize: "0.95rem" }}>
                          {arcane.description}
                        </p>
                      </div>

                      <div className="mystic-card rounded-xl p-6 mb-6">
                        <h3 className="font-cormorant text-2xl gold-text mb-4 text-center">Ваши ключевые качества</h3>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {arcane.keywords.map(kw => (
                            <span key={kw} className="px-4 py-2 rounded-full text-sm font-medium capitalize"
                              style={{
                                background: "linear-gradient(135deg, hsla(45,70%,20%,0.6), hsla(270,30%,15%,0.6))",
                                border: "1px solid hsla(45,60%,40%,0.4)",
                                color: "hsl(45,70%,70%)"
                              }}>
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5 mb-6">
                        <div className="mystic-card rounded-xl p-6" style={{ borderColor: "hsla(120,50%,30%,0.3)" }}>
                          <h3 className="font-cormorant text-2xl mb-4 flex items-center gap-2" style={{ color: "hsl(120,60%,65%)" }}>
                            <span>✦</span> Ваши плюсы
                          </h3>
                          <ul className="space-y-3">
                            {arcane.strengths.map((s, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <div className="arcane-badge flex-shrink-0" style={{ width: 28, height: 28, minWidth: 28, fontSize: "0.7rem", background: "hsla(120,40%,15%,0.7)", borderColor: "hsla(120,50%,30%,0.5)", color: "hsl(120,60%,65%)" }}>
                                  {i + 1}
                                </div>
                                <span className="text-sm leading-relaxed" style={{ color: "hsl(120,30%,75%)" }}>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mystic-card rounded-xl p-6" style={{ borderColor: "hsla(0,50%,30%,0.3)" }}>
                          <h3 className="font-cormorant text-2xl mb-4 flex items-center gap-2" style={{ color: "hsl(0,60%,65%)" }}>
                            <span>✦</span> Ваши минусы
                          </h3>
                          <ul className="space-y-3">
                            {arcane.weaknesses.map((w, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <div className="arcane-badge flex-shrink-0" style={{ width: 28, height: 28, minWidth: 28, fontSize: "0.7rem", background: "hsla(0,40%,15%,0.7)", borderColor: "hsla(0,50%,30%,0.5)", color: "hsl(0,60%,65%)" }}>
                                  {i + 1}
                                </div>
                                <span className="text-sm leading-relaxed" style={{ color: "hsl(0,30%,75%)" }}>{w}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mystic-card rounded-xl p-5 text-center">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "hsl(45,40%,50%)" }}>Энергия</p>
                            <p className="gold-text font-cormorant text-xl">{arcane.energy}</p>
                          </div>
                          <div>
                            <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "hsl(45,40%,50%)" }}>Сфера жизни</p>
                            <p className="gold-text font-cormorant text-xl">{arcane.lifeAspect}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* ГОРОДА */}
        {activeSection === "cities" && (
          <div className="section-enter">
            {!result ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🌍</div>
                <p className="gold-text font-cormorant text-xl">Сначала введите дату рождения</p>
                <p className="text-sm mt-2 mb-6" style={{ color: "hsl(45,30%,50%)" }}>
                  Чтобы найти ваш город, нужно рассчитать число жизненного пути
                </p>
                <button onClick={() => setActiveSection("calculator")} className="mystic-btn mt-2 px-8 py-3 rounded-xl text-xs">
                  К калькулятору
                </button>
              </div>
            ) : (() => {
              const allCities = getCitiesForNumber(result.lifePathNumber);
              const cities = filterCities(allCities, filterClimate, filterLifestyle, filterRegion, filterCost);
              const expanded = expandedCity ?? cities[0]?.name ?? null;

              const FilterBtn = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
                <button
                  onClick={onClick}
                  className="text-xs px-3 py-1.5 rounded-full transition-all"
                  style={active ? {
                    background: "linear-gradient(135deg, hsl(45,80%,35%), hsl(45,70%,28%))",
                    color: "hsl(45,90%,85%)",
                    border: "1px solid hsl(45,70%,50%)",
                    boxShadow: "0 0 10px hsla(45,80%,40%,0.3)"
                  } : {
                    background: "hsla(240,20%,10%,0.6)",
                    color: "hsl(45,30%,55%)",
                    border: "1px solid hsla(45,30%,22%,0.5)"
                  }}
                >
                  {label}
                </button>
              );

              return (
                <div>
                  <h2 className="font-cormorant text-4xl font-light gold-text text-center mb-2">
                    Ваши города для переезда
                  </h2>
                  <p className="text-center text-sm mb-6" style={{ color: "hsl(45,30%,55%)" }}>
                    Подобраны по вибрации числа жизненного пути:{" "}
                    <span className="gold-text font-semibold">{result.lifePathNumber}</span>
                  </p>

                  {/* ФИЛЬТРЫ */}
                  <div className="mystic-card rounded-xl p-5 mb-6">
                    <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "hsl(45,40%,45%)" }}>
                      ✦ Фильтры
                    </p>

                    <div className="space-y-3">
                      {/* Климат */}
                      <div>
                        <p className="text-xs mb-2" style={{ color: "hsl(45,30%,50%)" }}>🌡 Климат</p>
                        <div className="flex flex-wrap gap-2">
                          <FilterBtn label="Все" active={filterClimate === null} onClick={() => setFilterClimate(null)} />
                          {(["тепло", "умеренно", "холодно"] as Climate[]).map(v => (
                            <FilterBtn key={v} label={v === "тепло" ? "☀ Тепло" : v === "умеренно" ? "⛅ Умеренно" : "❄ Холодно"} active={filterClimate === v} onClick={() => setFilterClimate(filterClimate === v ? null : v)} />
                          ))}
                        </div>
                      </div>

                      {/* Образ жизни */}
                      <div>
                        <p className="text-xs mb-2" style={{ color: "hsl(45,30%,50%)" }}>🏙 Образ жизни</p>
                        <div className="flex flex-wrap gap-2">
                          <FilterBtn label="Все" active={filterLifestyle === null} onClick={() => setFilterLifestyle(null)} />
                          {(["мегаполис", "у моря", "в горах", "спокойный"] as Lifestyle[]).map(v => (
                            <FilterBtn key={v} label={v === "мегаполис" ? "🏙 Мегаполис" : v === "у моря" ? "🌊 У моря" : v === "в горах" ? "⛰ В горах" : "🌿 Спокойный"} active={filterLifestyle === v} onClick={() => setFilterLifestyle(filterLifestyle === v ? null : v)} />
                          ))}
                        </div>
                      </div>

                      {/* Регион */}
                      <div>
                        <p className="text-xs mb-2" style={{ color: "hsl(45,30%,50%)" }}>🌍 Регион</p>
                        <div className="flex flex-wrap gap-2">
                          <FilterBtn label="Все" active={filterRegion === null} onClick={() => setFilterRegion(null)} />
                          {(["Европа", "Азия", "Америка", "Ближний Восток", "СНГ"] as Region[]).map(v => (
                            <FilterBtn key={v} label={v} active={filterRegion === v} onClick={() => setFilterRegion(filterRegion === v ? null : v)} />
                          ))}
                        </div>
                      </div>

                      {/* Стоимость жизни */}
                      <div>
                        <p className="text-xs mb-2" style={{ color: "hsl(45,30%,50%)" }}>💰 Стоимость жизни</p>
                        <div className="flex flex-wrap gap-2">
                          <FilterBtn label="Все" active={filterCost === null} onClick={() => setFilterCost(null)} />
                          {(["дёшево", "средне", "дорого"] as Cost[]).map(v => (
                            <FilterBtn key={v} label={v === "дёшево" ? "💚 Дёшево" : v === "средне" ? "💛 Средне" : "💎 Дорого"} active={filterCost === v} onClick={() => setFilterCost(filterCost === v ? null : v)} />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Сброс */}
                    {(filterClimate || filterLifestyle || filterRegion || filterCost) && (
                      <button
                        onClick={() => { setFilterClimate(null); setFilterLifestyle(null); setFilterRegion(null); setFilterCost(null); }}
                        className="mt-4 text-xs uppercase tracking-widest"
                        style={{ color: "hsl(45,40%,45%)" }}
                      >
                        ↺ Сбросить фильтры
                      </button>
                    )}
                  </div>

                  {/* Результат фильтрации */}
                  {cities.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-3">🔍</div>
                      <p className="font-cormorant text-xl gold-text mb-2">Ни один город не найден</p>
                      <p className="text-sm" style={{ color: "hsl(45,30%,50%)" }}>Попробуйте изменить фильтры</p>
                    </div>
                  ) : (
                    <>
                      <p className="text-xs mb-4 text-center" style={{ color: "hsl(45,25%,45%)" }}>
                        Найдено {cities.length} {cities.length === 1 ? "город" : cities.length < 5 ? "города" : "городов"} · нажмите, чтобы узнать подробнее
                      </p>
                  <div className="grid gap-4">
                    {cities.map((city, idx) => {
                      const score = getCompatibilityScore(city.number, result.lifePathNumber);
                      const isOpen = expanded === city.name;
                      return (
                        <div
                          key={city.name}
                          className="mystic-card rounded-xl overflow-hidden cursor-pointer transition-all"
                          style={isOpen ? { borderColor: "hsl(45,80%,55%)", boxShadow: "0 0 30px hsla(45,80%,30%,0.4)" } : {}}
                          onClick={() => setExpandedCity(isOpen ? null : city.name)}
                        >
                          {/* Шапка карточки */}
                          <div className="flex items-center gap-4 p-5">
                            {/* Номер */}
                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold"
                              style={{ background: "hsla(45,50%,20%,0.5)", color: "hsl(45,70%,60%)", border: "1px solid hsla(45,50%,35%,0.4)" }}>
                              {idx + 1}
                            </div>

                            {/* Флаг + название */}
                            <div className="text-3xl flex-shrink-0">{city.flag}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className="font-cormorant text-2xl gold-text">{city.name}</span>
                                <span className="text-xs" style={{ color: "hsl(45,30%,50%)" }}>{city.country}</span>
                              </div>
                              <div className="text-xs" style={{ color: "hsl(45,40%,55%)" }}>{city.energy}</div>
                            </div>

                            {/* Совместимость */}
                            <div className="flex-shrink-0 text-right">
                              <div className="arcane-number text-2xl leading-none">{score}%</div>
                              <div className="text-xs mt-1" style={{ color: "hsl(45,30%,50%)" }}>
                                {score >= 85 ? "✦✦✦" : score >= 70 ? "✦✦" : "✦"}
                              </div>
                            </div>

                            <div className="text-sm ml-1 flex-shrink-0" style={{ color: "hsl(45,40%,50%)" }}>
                              {isOpen ? "▲" : "▼"}
                            </div>
                          </div>

                          {/* Полоса совместимости */}
                          <div className="px-5 pb-3" style={{ marginTop: -8 }}>
                            <div className="h-0.5 rounded-full overflow-hidden" style={{ background: "hsla(45,30%,20%,0.5)" }}>
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{
                                  width: `${score}%`,
                                  background: score >= 85
                                    ? "linear-gradient(90deg, hsl(45,80%,45%), hsl(45,90%,65%))"
                                    : "linear-gradient(90deg, hsl(45,60%,35%), hsl(45,70%,55%))"
                                }}
                              />
                            </div>
                            <div className="text-xs mt-1" style={{ color: "hsl(45,30%,45%)" }}>
                              {getCompatibilityLabel(score)}
                            </div>
                          </div>

                          {/* Раскрытое содержимое */}
                          {isOpen && (
                            <div className="px-5 pb-6 border-t" style={{ borderColor: "hsla(45,40%,20%,0.3)" }}>
                              {/* Описание */}
                              <p className="text-sm leading-relaxed my-4" style={{ color: "hsl(45,35%,72%)" }}>
                                {city.description}
                              </p>

                              {/* Вайб */}
                              <div className="rounded-lg p-4 mb-4" style={{ background: "hsla(270,25%,8%,0.7)", border: "1px solid hsla(45,40%,20%,0.4)" }}>
                                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "hsl(45,40%,45%)" }}>Атмосфера</p>
                                <p className="text-sm italic" style={{ color: "hsl(45,40%,70%)" }}>"{city.vibe}"</p>
                              </div>

                              {/* Кому подходит */}
                              <div className="mb-4">
                                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "hsl(45,40%,45%)" }}>Идеально для</p>
                                <div className="flex flex-wrap gap-2">
                                  {city.ideal.map(i => (
                                    <span key={i} className="text-xs px-3 py-1 rounded-full"
                                      style={{ background: "hsla(45,50%,18%,0.5)", color: "hsl(45,65%,65%)", border: "1px solid hsla(45,50%,28%,0.4)" }}>
                                      {i}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Теги */}
                              <div className="flex flex-wrap gap-2">
                                {city.tags.map(tag => (
                                  <span key={tag} className="text-xs px-2 py-0.5 rounded"
                                    style={{ background: "hsla(240,20%,12%,0.8)", color: "hsl(45,30%,50%)", border: "1px solid hsla(45,20%,25%,0.3)" }}>
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Примечание */}
                  <div className="mt-8 text-center">
                    <div className="gold-divider max-w-xs mx-auto mb-4" />
                    <p className="text-xs leading-relaxed" style={{ color: "hsl(45,25%,45%)" }}>
                      Подбор городов основан на нумерологической совместимости вибраций.<br />
                      Число города рассчитывается по энергетике его имени и исторической миссии.
                    </p>
                  </div>
                    </>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* МЕТОДИКА */}
        {activeSection === "method" && (
          <div className="section-enter max-w-2xl mx-auto">
            <h2 className="font-cormorant text-4xl font-light gold-text text-center mb-2">
              Методика расчёта
            </h2>
            <p className="text-center text-sm mb-8" style={{ color: "hsl(45,30%,55%)" }}>
              Нумерология Таро — система сакральных чисел
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Число жизненного пути",
                  icon: "⚡",
                  text: "Вычисляется путём сложения всех цифр даты рождения (день + месяц + год) с последующим сведением к однозначному числу. Это главное число в нумерологии, определяющее основную миссию и характер человека."
                },
                {
                  title: "Число судьбы",
                  icon: "☽",
                  text: "Показывает задачи, которые необходимо выполнить в этом воплощении. Анализируется в контексте внешних событий и испытаний жизни."
                },
                {
                  title: "Число души",
                  icon: "✿",
                  text: "Сумма числа дня и месяца рождения. Отражает истинные желания, мотивации и то, что действительно важно для человека на глубинном уровне."
                },
                {
                  title: "Число личности",
                  icon: "✦",
                  text: "Редуцированное число дня рождения. Показывает, как вас воспринимают окружающие и то впечатление, которое вы производите при знакомстве."
                },
                {
                  title: "Число зрелости",
                  icon: "✶",
                  text: "Сумма числа жизненного пути и числа судьбы. Проявляется во второй половине жизни как высшее предназначение, к которому человек приходит через опыт."
                },
                {
                  title: "Мастер-числа",
                  icon: "★",
                  text: "Числа 11, 22 и 33 не сводятся к однозначным. Они несут двойную энергию и указывают на особое предназначение. Обладатели мастер-чисел часто живут в крайностях."
                },
              ].map((item, i) => (
                <div key={i} className="mystic-card rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="font-cormorant text-xl gold-text">{item.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(45,30%,68%)" }}>{item.text}</p>
                </div>
              ))}
            </div>

            <div className="gold-divider my-8" />

            <div className="mystic-card corner-decoration rounded-2xl p-8 text-center">
              <div className="text-4xl mb-4">☽✦☾</div>
              <h3 className="font-cormorant text-3xl gold-text mb-2">О методике</h3>
              <div className="gold-divider max-w-xs mx-auto mb-4" />
              <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(45,30%,65%)" }}>
                Данный калькулятор основан на классической пифагорейской нумерологии в сочетании с системой Таро.
                Числа арканов соответствуют Старшим Арканам колоды Таро, что создаёт синергию двух древних систем познания.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(45,30%,55%)" }}>
                Нумерология — это язык вселенной, зашифрованный в числах.
                Каждое число несёт вибрацию, которая влияет на судьбу, характер и предназначение человека.
              </p>
              <div className="gold-divider max-w-xs mx-auto mt-6" />
              <p className="text-xs mt-4 tracking-widest uppercase" style={{ color: "hsl(45,30%,45%)" }}>
                Познай себя через числа
              </p>
            </div>
          </div>
        )}

      </main>

      {/* Футер */}
      <footer className="relative z-10 text-center pb-8">
        <div className="gold-divider max-w-xs mx-auto mb-4" />
        <p className="text-xs tracking-widest" style={{ color: "hsl(45,30%,35%)" }}>
          ☽ · Нумерология · Тайны Арканов · ☾
        </p>
      </footer>
    </div>
  );
}