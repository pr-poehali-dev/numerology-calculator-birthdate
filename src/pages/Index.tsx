import { useState } from "react";
import { calculate, getArcane, ARCANES, type NumerologyResult } from "@/data/numerology";

type Section = "calculator" | "arcanes" | "analysis" | "results" | "method";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("calculator");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState<NumerologyResult | null>(null);
  const [error, setError] = useState("");
  const [selectedArcane, setSelectedArcane] = useState<number | null>(null);

  function handleCalculate() {
    const d = parseInt(day), m = parseInt(month), y = parseInt(year);
    if (!d || !m || !y || d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > 2025) {
      setError("Введите корректную дату рождения");
      return;
    }
    setError("");
    const res = calculate(d, m, y);
    setResult(res);
    setActiveSection("results");
  }

  const navItems: { id: Section; label: string }[] = [
    { id: "calculator", label: "Калькулятор" },
    { id: "arcanes", label: "Арканы" },
    { id: "analysis", label: "Анализ" },
    { id: "results", label: "Результаты" },
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

                {/* Кнопки */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={() => setActiveSection("analysis")}
                    className="mystic-btn flex-1 py-3 rounded-xl text-xs"
                  >
                    ✦ Анализ личности
                  </button>
                  <button
                    onClick={() => { setResult(null); setDay(""); setMonth(""); setYear(""); setActiveSection("calculator"); }}
                    className="flex-1 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold"
                    style={{
                      background: "hsla(240,20%,10%,0.8)",
                      border: "1px solid hsla(45,50%,30%,0.4)",
                      color: "hsl(45,60%,60%)"
                    }}
                  >
                    ↺ Новый расчёт
                  </button>
                </div>
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
