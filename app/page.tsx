"use client";
import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";
import {
  AIT_LATITUDE,
  AIT_LONGITUDE,
  MANUAL_TIMES,
} from "./prayerTimes";

export default function Home() {
  const coordinates = new Coordinates(AIT_LATITUDE, AIT_LONGITUDE);
  const params = CalculationMethod.MuslimWorldLeague();
  const prayerTimes = new PrayerTimes(coordinates, new Date(), params);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const fajrTime = MANUAL_TIMES.fajr;
  const sunriseTime = formatTime(prayerTimes.sunrise);
  const dhuhrTime = MANUAL_TIMES.dhuhr;
  const asrTime = MANUAL_TIMES.asr;
  const maghribTime = formatTime(prayerTimes.maghrib);
  const ishaTime = MANUAL_TIMES.isha;
  const now = new Date();

const today = new Date();

const createTime = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);

  const date = new Date(today);
  date.setHours(hours, minutes, 0, 0);

  return date;
};

const prayers = [
  { name: "Fajr", time: createTime(MANUAL_TIMES.fajr) },
  { name: "Dhuhr", time: createTime(MANUAL_TIMES.dhuhr) },
  { name: "Asr", time: createTime(MANUAL_TIMES.asr) },
  { name: "Maghrib", time: prayerTimes.maghrib },
  { name: "Isha", time: createTime(MANUAL_TIMES.isha) },
];

const nextPrayer =
  prayers.find((prayer) => prayer.time > now) ?? prayers[0];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <header className="text-center">
          <div className="text-5xl">🕌</div>

          <h1 className="mt-4 text-3xl font-bold">
            AIT Masjid
          </h1>

          <p className="mt-2 text-lg text-slate-600">
            Salah Timings
          </p>

          <p className="mt-4 text-sm text-slate-500">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </header>

<section className="mt-8 rounded-2xl bg-white p-6 text-center shadow-sm">
  <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
    Next Prayer
  </p>

  <h2 className="mt-2 text-3xl font-bold">
    {nextPrayer.name}
  </h2>

  <p className="mt-2 text-2xl font-semibold text-emerald-700">
    {formatTime(nextPrayer.time)}
  </p>
</section>

        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            Today's Prayer Times
          </h2>

          <div className="mt-4 divide-y divide-slate-100">
            <div className="flex items-center justify-between py-4">
              <span className="text-slate-700">Fajr</span>
              <span className="font-semibold text-slate-900">
                {fajrTime}
              </span>
            </div>

            <div className="flex items-center justify-between py-4">
              <span className="text-slate-700">Dhuhr</span>
              <span className="font-semibold text-slate-900">
                {dhuhrTime}
              </span>
            </div>

            <div className="flex items-center justify-between py-4">
              <span className="text-slate-700">Asr</span>
              <span className="font-semibold text-slate-900">
                {asrTime}
              </span>
            </div>

            <div className="flex items-center justify-between py-4">
              <span className="text-slate-700">Maghrib</span>
              <span className="font-semibold text-slate-900">
                {maghribTime}
              </span>
            </div>

            <div className="flex items-center justify-between py-4">
              <span className="text-slate-700">Isha</span>
              <span className="font-semibold text-slate-900">
                {ishaTime}
              </span>
            </div>
          </div>
        </section>
        <div className="mt-4 grid grid-cols-2 gap-4">
  <div className="rounded-xl bg-slate-50 p-4 text-center">
    <p className="text-sm text-slate-500">Sunrise</p>
    <p className="mt-2 text-lg font-semibold text-slate-900">
      {sunriseTime}
    </p>
  </div>

  <div className="rounded-xl bg-slate-50 p-4 text-center">
    <p className="text-sm text-slate-500">Sunset</p>
    <p className="mt-2 text-lg font-semibold text-slate-900">
      {formatTime(prayerTimes.maghrib)}
    </p>
  </div>
</div>
        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
  <h2 className="text-xl font-bold">
    Friday Prayer
  </h2>

  <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 p-4">
    <span className="text-slate-700">Jumu'ah</span>

    <span className="text-xl font-semibold text-slate-900">
      {MANUAL_TIMES.jumuah}
    </span>
  </div>
</section>

        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            Ramadan
          </h2>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-slate-50 p-4 text-center">
              <p className="text-sm text-slate-500">
                Suhoor Ends
              </p>
              <p className="mt-2 text-xl font-semibold">
  {formatTime(prayerTimes.fajr)}
</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 text-center">
              <p className="text-sm text-slate-500">
                Iftar
              </p>
              <p className="mt-2 text-xl font-semibold">
                {maghribTime}
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-10 text-center text-sm text-slate-500">
          AIT Masjid · Asian Institute of Technology
        </footer>
      </div>
    </main>
  );
}