"use client";

// src/app/events/create/page.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
    "River & Lake",
    "Tree Plantation",
    "Community Clean",
    "Recycling Drive",
    "Urban Gardens",
    "Awareness Hub",
    "Wetland Guard",
    "Eco Lifestyle",
];

const EQUIPMENT = [
    "Heavy-duty rubber gloves",
    "Biodegradable waste bags",
    "Safe hydration refilling station",
    "Paramedic first aid responder",
    "Spades & Planting hoes",
    "Branded volunteer armbands",
];

const ZONES = [
    "Dhaka North - Tejgaon / Hatirjheel Zone",
    "Dhaka South - Old Dhaka Zone",
    "Savar / Ashulia Zone",
    "Narayanganj Zone",
];

const AGE_RANGES = ["All Community Members (Ages 14+)", "Adults (18+)", "Families with children"];

type FormState = {
    title: string;
    category: string;
    summary: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    assemblyPoint: string;
    zone: string;
    capacity: number;
    ageRange: string;
    equipment: string[];
    bringOnSite: string;
    targetAmount: string;
    targetUnit: string;
    ecoPoints: number;
    imageUrl: string;
};

const initial: FormState = {
    title: "",
    category: CATEGORIES[0],
    summary: "",
    description: "",
    date: "",
    startTime: "08:00",
    endTime: "12:30",
    assemblyPoint: "",
    zone: ZONES[0],
    capacity: 100,
    ageRange: AGE_RANGES[0],
    equipment: [EQUIPMENT[0], EQUIPMENT[1]],
    bringOnSite: "",
    targetAmount: "",
    targetUnit: "kg Plastic",
    ecoPoints: 150,
    imageUrl: "",
};

const inputCls =
    "w-full rounded-xl border border-[#D5DDD2] bg-white px-4 py-3 text-[15px] text-[#17251D] placeholder:text-[#68766B] focus:border-[#27834C] focus:outline-none focus:ring-[3px] focus:ring-[#A7E5A0]/40";
const labelCls = "mb-1.5 block text-[13px] font-semibold text-[#17251D]";

function Section({
    title,
    hint,
    badge,
    children,
}: {
    title: string;
    hint: string;
    badge?: string;
    children: React.ReactNode;
}) {
    return (
        <section className="rounded-2xl border border-[#E4E9E1] bg-white p-5 shadow-[0_2px_8px_-1px_rgba(18,61,44,0.05)] sm:p-6">
            <header className="mb-5 flex items-start justify-between gap-3">
                <div>
                    <h2 className="text-[19px] font-semibold tracking-tight text-[#17251D]">{title}</h2>
                    <p className="text-[13px] text-[#68766B]">{hint}</p>
                </div>
                {badge && (
                    <span className="rounded-full border border-[#C4EBC0] bg-[#E8F6E6] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#1E653B]">
                        {badge}
                    </span>
                )}
            </header>
            <div className="space-y-5">{children}</div>
        </section>
    );
}

export default function CreateEventPage() {
    const router = useRouter();
    const [form, setForm] = useState<FormState>(initial);
    const [submitting, setSubmitting] = useState<"draft" | "publish" | null>(null);
    const [error, setError] = useState("");

    const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
        setForm((f) => ({ ...f, [key]: value }));

    const toggleEquipment = (item: string) =>
        set(
            "equipment",
            form.equipment.includes(item)
                ? form.equipment.filter((e) => e !== item)
                : [...form.equipment, item]
        );

    async function submit(status: "draft" | "published") {
        setError("");
        if (status === "published" && (!form.title || !form.date || !form.assemblyPoint)) {
            setError("Add a title, date and assembly point before publishing.");
            return;
        }
        setSubmitting(status === "draft" ? "draft" : "publish");
        try {
            console.log(form);

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/new-event`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // credentials: "include",
                body: JSON.stringify({
                    ...form,
                    targetAmount: Number(form.targetAmount) || 0,
                    status,
                }),
            });
            if (!res.ok) throw new Error("Could not save the event. Try again.");
            router.push("/upcoming-events");
        } catch (e) {
            setError(e instanceof Error ? e.message : "Something went wrong.");
        } finally {
            setSubmitting(null);
        }
    }

    const prettyDate = form.date
        ? new Date(form.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
        : "Pick a date";

    return (
        <main className="min-h-dvh bg-[#F5F3E9] pb-16">
            <div className="mx-auto w-full max-w-[1280px] px-5 py-8 lg:px-12">
                <h1 className="text-[30px] font-bold leading-9 tracking-tight text-[#17251D] sm:text-[40px] sm:leading-[48px]">
                    Launch a Community Environmental Initiative
                </h1>
                <p className="mt-2 max-w-2xl text-[15px] text-[#68766B]">
                    Mobilize local changemakers across Bangladesh. Set up your field campaign, define
                    ecological targets, and coordinate verified grassroots action.
                </p>

                <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
                    {/* LEFT: form */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            submit("published");
                        }}
                        className="space-y-6"
                    >
                        {/* A */}
                        <Section
                            title="Section A: Basic Campaign Information"
                            hint="Identify your ecological mission and reach prospective local volunteers."
                            badge="Required"
                        >
                            <div>
                                <div className="flex justify-between">
                                    <label className={labelCls} htmlFor="title">
                                        Campaign Title *
                                    </label>
                                    <span className="text-xs text-[#68766B]">{form.title.length} / 90 chars</span>
                                </div>
                                <input
                                    id="title"
                                    maxLength={90}
                                    value={form.title}
                                    onChange={(e) => set("title", e.target.value)}
                                    placeholder="Clean Hatirjheel Lake: Plastic Extraction & Water Revival"
                                    className={inputCls}
                                />
                            </div>

                            <div>
                                <span className={labelCls}>Ecological Action Category *</span>
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                    {CATEGORIES.map((c) => {
                                        const active = form.category === c;
                                        return (
                                            <button
                                                key={c}
                                                type="button"
                                                onClick={() => set("category", c)}
                                                className={`rounded-xl border px-3 py-2.5 text-[13px] font-medium transition ${active
                                                        ? "border-[#123D2C] bg-[#123D2C] text-white"
                                                        : "border-[#E4E9E1] bg-[#E8F6E6]/60 text-[#17251D] hover:border-[#27834C]"
                                                    }`}
                                            >
                                                {c}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <label className={labelCls} htmlFor="summary">
                                    Editorial Hook / Quick Summary
                                </label>
                                <input
                                    id="summary"
                                    value={form.summary}
                                    onChange={(e) => set("summary", e.target.value)}
                                    placeholder="Join 100+ Dhaka volunteers along the western promenade"
                                    className={inputCls}
                                />
                            </div>

                            <div>
                                <label className={labelCls} htmlFor="description">
                                    Detailed Campaign Scope & Briefing
                                </label>
                                <textarea
                                    id="description"
                                    rows={5}
                                    value={form.description}
                                    onChange={(e) => set("description", e.target.value)}
                                    placeholder="Describe the work, what gets collected, and how it will be handled."
                                    className={inputCls}
                                />
                                <p className="mt-1 text-xs text-[#68766B]">Markdown supported</p>
                            </div>
                        </Section>

                        {/* B */}
                        <Section
                            title="Section B: Date, Time & Gathering Logistics"
                            hint="Accurate field coordinates prevent lost volunteers and ensure safety alignment."
                        >
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div>
                                    <label className={labelCls} htmlFor="date">
                                        Campaign Date *
                                    </label>
                                    <input
                                        id="date"
                                        type="date"
                                        value={form.date}
                                        onChange={(e) => set("date", e.target.value)}
                                        className={inputCls}
                                    />
                                </div>
                                <div>
                                    <label className={labelCls} htmlFor="start">
                                        Start Time *
                                    </label>
                                    <input
                                        id="start"
                                        type="time"
                                        value={form.startTime}
                                        onChange={(e) => set("startTime", e.target.value)}
                                        className={inputCls}
                                    />
                                </div>
                                <div>
                                    <label className={labelCls} htmlFor="end">
                                        End Time *
                                    </label>
                                    <input
                                        id="end"
                                        type="time"
                                        value={form.endTime}
                                        onChange={(e) => set("endTime", e.target.value)}
                                        className={inputCls}
                                    />
                                </div>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className={labelCls} htmlFor="assembly">
                                        Specific Assembly Point *
                                    </label>
                                    <input
                                        id="assembly"
                                        value={form.assemblyPoint}
                                        onChange={(e) => set("assemblyPoint", e.target.value)}
                                        placeholder="Hatirjheel Amphitheatre North Gate"
                                        className={inputCls}
                                    />
                                </div>
                                <div>
                                    <label className={labelCls} htmlFor="zone">
                                        Metropolitan Zone / Thana *
                                    </label>
                                    <select
                                        id="zone"
                                        value={form.zone}
                                        onChange={(e) => set("zone", e.target.value)}
                                        className={inputCls}
                                    >
                                        {ZONES.map((z) => (
                                            <option key={z}>{z}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </Section>

                        {/* C */}
                        <Section
                            title="Section C: Volunteer Capacity & Field Safety"
                            hint="Set healthy attendance ceilings and set safety expectations."
                        >
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className={labelCls} htmlFor="capacity">
                                        Maximum Volunteer Headcount *
                                    </label>
                                    <input
                                        id="capacity"
                                        type="number"
                                        min={1}
                                        value={form.capacity}
                                        onChange={(e) => set("capacity", Number(e.target.value))}
                                        className={inputCls}
                                    />
                                </div>
                                <div>
                                    <label className={labelCls} htmlFor="age">
                                        Volunteer Criteria / Age Range
                                    </label>
                                    <select
                                        id="age"
                                        value={form.ageRange}
                                        onChange={(e) => set("ageRange", e.target.value)}
                                        className={inputCls}
                                    >
                                        {AGE_RANGES.map((a) => (
                                            <option key={a}>{a}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <fieldset>
                                <legend className={labelCls}>Field Equipment Provided by Organizers</legend>
                                <div className="grid gap-2 sm:grid-cols-3">
                                    {EQUIPMENT.map((item) => (
                                        <label
                                            key={item}
                                            className="flex cursor-pointer items-center gap-2.5 rounded-xl bg-[#E8F6E6]/60 px-3 py-2.5 text-[13px] text-[#17251D]"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={form.equipment.includes(item)}
                                                onChange={() => toggleEquipment(item)}
                                                className="h-5 w-5 accent-[#123D2C]"
                                            />
                                            {item}
                                        </label>
                                    ))}
                                </div>
                            </fieldset>

                            <div>
                                <label className={labelCls} htmlFor="bring">
                                    Volunteers Must Bring On-Site
                                </label>
                                <input
                                    id="bring"
                                    value={form.bringOnSite}
                                    onChange={(e) => set("bringOnSite", e.target.value)}
                                    placeholder="Refillable water bottle, cap/hat, closed-toe footwear"
                                    className={inputCls}
                                />
                            </div>
                        </Section>

                        {/* D */}
                        <Section
                            title="Section D: Ecological Impact Goal & Gamification"
                            hint="Quantified targets trigger verified badges in volunteer profile passports."
                        >
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className={labelCls} htmlFor="target">
                                        Quantified Ecological Target
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            id="target"
                                            type="number"
                                            min={0}
                                            value={form.targetAmount}
                                            onChange={(e) => set("targetAmount", e.target.value)}
                                            placeholder="400"
                                            className={inputCls}
                                        />
                                        <input
                                            aria-label="Target unit"
                                            value={form.targetUnit}
                                            onChange={(e) => set("targetUnit", e.target.value)}
                                            className={inputCls}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className={labelCls} htmlFor="points">
                                        Eco-Points Per Volunteer
                                    </label>
                                    <input
                                        id="points"
                                        type="number"
                                        min={0}
                                        value={form.ecoPoints}
                                        onChange={(e) => set("ecoPoints", Number(e.target.value))}
                                        className={inputCls}
                                    />
                                </div>
                            </div>
                        </Section>

                        {/* E */}
                        <Section
                            title="Section E: Campaign Imagery"
                            hint="High-impact photographs boost participation rates significantly."
                            badge="16:9"
                        >
                            <div>
                                <label className={labelCls} htmlFor="image">
                                    Cover image URL
                                </label>
                                <input
                                    id="image"
                                    type="url"
                                    value={form.imageUrl}
                                    onChange={(e) => set("imageUrl", e.target.value)}
                                    placeholder="https://..."
                                    className={inputCls}
                                />
                            </div>
                            {form.imageUrl && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={form.imageUrl}
                                    alt="Selected cover"
                                    className="aspect-video w-full rounded-2xl object-cover"
                                />
                            )}
                        </Section>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E4E9E1] bg-white p-4">
                            <p className="text-sm text-[#68766B]">
                                {error ? <span className="text-[#ba1a1a]">{error}</span> : "Review all sections before publishing."}
                            </p>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    disabled={submitting !== null}
                                    onClick={() => submit("draft")}
                                    className="rounded-xl border-[1.5px] border-[#123D2C] px-5 py-2.5 text-sm font-semibold text-[#123D2C] transition hover:bg-[#123D2C]/6 disabled:opacity-60"
                                >
                                    {submitting === "draft" ? "Saving..." : "Save as draft"}
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting !== null}
                                    className="rounded-xl bg-[#123D2C] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1C533D] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#A7E5A0] disabled:opacity-60"
                                >
                                    {submitting === "publish" ? "Publishing..." : "Publish event"}
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* RIGHT: live preview */}
                    <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
                        <div className="rounded-2xl border border-[#E4E9E1] bg-white p-4">
                            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[#68766B]">
                                Live card preview
                            </p>
                            <div className="overflow-hidden rounded-2xl border border-[#E4E9E1]">
                                <div className="relative aspect-[16/10] bg-[#E8F6E6]">
                                    {form.imageUrl && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={form.imageUrl} alt="" className="h-full w-full object-cover" />
                                    )}
                                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#123D2C]">
                                        {form.category}
                                    </span>
                                </div>
                                <div className="space-y-2 p-4">
                                    <p className="text-xs text-[#68766B]">
                                        {prettyDate} · +{form.ecoPoints} pts
                                    </p>
                                    <h3 className="text-lg font-semibold leading-snug text-[#17251D]">
                                        {form.title || "Your campaign title"}
                                    </h3>
                                    <p className="text-[13px] text-[#68766B]">
                                        {form.assemblyPoint || "Assembly point"}
                                    </p>
                                    <div className="rounded-lg bg-[#E8F6E6] px-3 py-2 text-[13px] text-[#1E653B]">
                                        Target: {form.targetAmount || "0"} {form.targetUnit}
                                    </div>
                                    <div>
                                        <div className="mb-1 flex justify-between text-xs text-[#68766B]">
                                            <span>Volunteers enrolled</span>
                                            <span>0 / {form.capacity}</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-[#E8EEE5]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-[#E4E9E1] bg-white p-5">
                            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[#68766B]">
                                Field safety & charter
                            </p>
                            <ul className="space-y-3 text-[13px] text-[#17251D]">
                                <li>
                                    <strong>Zero single-use plastic policy:</strong> no throwaway polypropylene
                                    glasses at the site.
                                </li>
                                <li>
                                    <strong>Photo verification:</strong> record before and after imagery to validate
                                    Eco-Point payouts.
                                </li>
                                <li>
                                    <strong>Waste protocol:</strong> deliver bagged collections to the designated
                                    city corporation point.
                                </li>
                            </ul>
                            <div className="mt-4 rounded-xl bg-[#123D2C] p-4 text-white">
                                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#A7E5A0]">
                                    Central hotline
                                </p>
                                <p className="text-xl font-bold">+880 (2) 988-3411</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}