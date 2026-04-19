import React from "react";

// --- Utilities ---
const cn = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(" ");

// --- Theme ---
function useTheme(): [string, () => void] {
    const [theme, setTheme] = React.useState<string>(() => {
        const saved = localStorage.getItem("theme");
        if (saved) return saved;
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    });

    React.useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));
    return [theme, toggle];
}

// --- Icons ---
const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const ArrowDown = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M12 5v14" />
        <path d="m19 12-7 7-7-7" />
    </svg>
);

const ArrowRight = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
    </svg>
);

const SunIcon = () => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
);

const MoonIcon = () => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);

// --- Theme Toggle ---
const ThemeToggle: React.FC<{ theme: string; toggle: () => void }> = ({
    theme,
    toggle,
}) => (
    <button
        onClick={toggle}
        aria-label="Toggle theme"
        className="fixed top-5 right-5 z-50 w-9 h-9 flex items-center justify-center backdrop-blur-md rounded-sm text-muted-foreground hover:text-foreground hover:border-accent transition-colors duration-300"
    >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
);

// --- Section Header ---
interface SectionHeaderProps {
    title?: string;
    className?: string;
}
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, className }) => (
    <div className={cn(className)}>
        {title && (
            <h2 className="font-sans font-semibold text-4xl md:text-5xl tracking-[-0.02em] text-foreground">
                {title}
            </h2>
        )}
    </div>
);

// --- Button ---
type ButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: "default" | "outline";
    size?: "lg" | "default";
    children: React.ReactNode;
};
const Button: React.FC<ButtonProps> = ({
    variant = "default",
    size = "default",
    className,
    children,
    ...props
}) => {
    const base =
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm font-sans font-medium uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline-none";
    const variants = {
        default:
            "bg-foreground text-background border border-foreground hover:bg-accent hover:border-accent hover:text-background",
        outline:
            "bg-transparent text-foreground border border-border hover:border-accent hover:text-accent",
    };
    const sizes = {
        default: "h-10 px-5 text-[11px]",
        lg: "h-12 px-7 text-[12px]",
    };
    return (
        <a
            className={cn(base, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </a>
    );
};

// --- Card ---
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className,
}) => (
    <div
        className={cn(
            "bg-card border border-border rounded-sm relative",
            className,
        )}
    >
        {children}
    </div>
);

// --- Calendly Widget ---
const CalendlyWidget = () => {
    React.useEffect(() => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            const existingScript = document.querySelector(
                'script[src="https://assets.calendly.com/assets/external/widget.js"]',
            );
            if (existingScript) document.body.removeChild(existingScript);
        };
    }, []);

    return (
        <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/veroventures/chat"
            style={{ minWidth: "320px", height: "700px" }}
        />
    );
};

// --- Logo Cloud ---
const LogoCloud = () => {
    const logos = [
        {
            name: "Google",
            url: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
        },
        {
            name: "Electronic Arts (EA)",
            url: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Electronic-Arts-Logo.svg",
        },
        {
            name: "Shell",
            url: "https://upload.wikimedia.org/wikipedia/en/e/e8/Shell_logo.svg",
        },
        {
            name: "Best Buy",
            url: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Best_Buy_Logo.svg",
        },
        {
            name: "BMO",
            url: "https://upload.wikimedia.org/wikipedia/commons/0/03/BMO_Logo.svg",
        },
        {
            name: "lululemon",
            url: "https://upload.wikimedia.org/wikipedia/commons/2/22/Lululemon_Athletica_logo.svg",
        },
        {
            name: "Intuit",
            url: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Intuit_Logo.svg",
        },
    ];

    return (
        <section className="flex flex-col gap-8">
            <SectionHeader />
            <p className="font-sans font-light text-2xl md:text-3xl text-muted-foreground text-center">
                Trusted by Industry Leaders and Innovators
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
                {logos.map((logo) => (
                    <img
                        key={logo.name}
                        title={logo.name}
                        alt={logo.name}
                        src={logo.url}
                        className="h-7 md:h-9 w-auto filter grayscale opacity-55 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                        onError={(
                            e: React.SyntheticEvent<HTMLImageElement>,
                        ) => {
                            (e.target as HTMLImageElement).style.display =
                                "none";
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

// --- Main App ---
export default function App() {
    const [theme, toggleTheme] = useTheme();

    return (
        <>
            <ThemeToggle theme={theme} toggle={toggleTheme} />

            <main className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32">
                <div className="flex flex-col gap-24 md:gap-32">
                    {/* Hero */}
                    <section className="relative">
                        {/* Radial bronze wash */}
                        <div
                            aria-hidden
                            className="absolute inset-0 -z-10 blur-3xl opacity-100"
                            style={{
                                background:
                                    "radial-gradient(ellipse 60% 50% at 80% 20%, hsl(32 45% 48% / 0.14), transparent 60%)",
                            }}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-center">
                            {/* Copy */}
                            <div className="flex flex-col gap-6 text-center md:text-left order-2 md:order-1">
                                <p className="font-sans font-semibold text-[13px] uppercase tracking-[0.2em] text-accent">
                                    Yaniv Talmor
                                </p>
                                <h1 className="font-sans font-semibold text-4xl md:text-6xl tracking-[-0.03em] leading-[1.02] text-balance">
                                    From Idea to Successful{" "}
                                    <span
                                        className="font-bold bg-clip-text text-transparent"
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(to right, hsl(32 45% 48%), hsl(38 75% 70%), hsl(32 45% 48%))",
                                        }}
                                    >
                                        Exit
                                    </span>
                                </h1>
                                <p className="font-sans text-lg text-muted-foreground leading-[1.65] max-w-2xl">
                                    As your Fractional CTO, I work directly with
                                    your team to turn an idea into a product
                                    that's built to grow, raise funding, and
                                    sell. I make the right technical calls
                                    early, help you hire well, and ship AI that
                                    actually works in the real world.
                                </p>
                                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                    <Button size="lg" href="#booking">
                                        <ArrowDown className="mr-2.5 h-3.5 w-3.5" />{" "}
                                        Book a Consultation
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        href="https://www.linkedin.com/in/yanivtalmor"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Linkedin className="mr-2.5 h-3.5 w-3.5" />{" "}
                                        View LinkedIn
                                    </Button>
                                </div>
                            </div>

                            {/* Portrait */}
                            <div className="flex flex-col items-center gap-2 order-1 md:order-2">
                                <div className="h-64 w-64 md:h-80 md:w-80 rounded-full overflow-hidden border border-border">
                                    <img
                                        src="/Yaniv-Talmor-Profile-Square.jpg"
                                        alt="Yaniv Talmor"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Proven Results */}
                    <section className="flex flex-col gap-10">
                        <SectionHeader title="Proven Results" />
                        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                            {[
                                {
                                    title: "Successful AI-SaaS Exit",
                                    body: "From the ground up, I architected the core AI platform and scaled the team at Dynamic Needs Analysis, leading directly to a successful strategic acquisition.",
                                    icon: (
                                        <svg
                                            width="22"
                                            height="22"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <line
                                                x1="12"
                                                y1="1"
                                                x2="12"
                                                y2="23"
                                            />
                                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                        </svg>
                                    ),
                                },
                                {
                                    title: "Trusted by Enterprise",
                                    body: "My AI/ML and MLOps solutions have been trusted to solve complex challenges for industry leaders like BMO, Asurion, and Electronic Arts.",
                                    icon: (
                                        <svg
                                            width="22"
                                            height="22"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        </svg>
                                    ),
                                },
                                {
                                    title: "Multi-Sector AI Automation",
                                    body: "I've built automation tools that drove down operational costs and delivered quantifiable efficiency in FinTech, InsurTech, and LegalTech—proving my ability to apply AI to new domains.",
                                    icon: (
                                        <svg
                                            width="22"
                                            height="22"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                        </svg>
                                    ),
                                },
                            ].map((card) => (
                                <div
                                    key={card.title}
                                    className="p-8 flex flex-col gap-4"
                                >
                                    <div className="text-accent">
                                        {card.icon}
                                    </div>
                                    <h3 className="font-sans font-semibold text-xl tracking-[-0.01em]">
                                        {card.title}
                                    </h3>
                                    <p className="font-sans text-[15px] leading-[1.7] text-muted-foreground">
                                        {card.body}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Logo Cloud */}
                    <LogoCloud />

                    {/* Core Expertise */}
                    <section className="flex flex-col gap-10">
                        <SectionHeader title="Core Expertise" />
                        <div className="flex flex-wrap gap-2.5">
                            {[
                                "Fractional CTO",
                                "AI/ML",
                                "MLOps",
                                "Data Architecture",
                                "Cloud Infrastructure",
                                "Serverless Computing",
                                "SaaS Platforms",
                                "MVP to Exit",
                            ].map((skill) => (
                                <div
                                    key={skill}
                                    className="font-mono text-[11px] uppercase tracking-[0.12em] border border-border bg-transparent px-3 py-1.5 rounded-sm text-foreground hover:border-accent transition-colors duration-500"
                                >
                                    <span className="text-emerald mr-1.5">
                                        ●
                                    </span>
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Vero Ventures */}
                    <section className="flex flex-col gap-10">
                        <SectionHeader />
                        <Card className="p-10 md:p-14">
                            {/* Bronze corner mark */}
                            <div className="absolute top-0 left-0 w-6 h-[1px] bg-accent" />
                            <div className="absolute top-0 left-0 w-[1px] h-6 bg-accent" />

                            <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 md:gap-14">
                                <div className="flex flex-col gap-3">
                                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                                        Vero Ventures
                                    </span>
                                    <h3 className="font-sans font-semibold text-2xl tracking-[-0.01em]">
                                        What If You Need{" "}
                                        <span className="font-bold text-accent">
                                            More Than a CTO?
                                        </span>
                                    </h3>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <p className="font-sans text-[15px] leading-[1.7] text-muted-foreground">
                                        Often, fractional CTO leadership
                                        uncovers the need for a dedicated build
                                        team. My company, Vero Ventures,
                                        provides elite software engineering
                                        talent to build and scale your MVP,
                                        ensuring my strategic vision is executed
                                        with precision.
                                    </p>
                                    <div>
                                        <Button
                                            variant="outline"
                                            href="https://veroventures.com/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Explore Vero Ventures{" "}
                                            <ArrowRight className="ml-2.5 h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </section>

                    {/* Booking */}
                    <section id="booking" className="flex flex-col gap-10">
                        <SectionHeader title="Let's Build Your Vision." />
                        <p className="font-sans text-lg text-muted-foreground">
                            Find a time below to discuss your technology goals,
                            AI strategy, or next MVP.
                        </p>
                        <div className="rounded-sm border border-border bg-card overflow-hidden">
                            <CalendlyWidget />
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <footer className="mt-24 pt-8 border-t border-border">
                    <div className="flex flex-col md:flex-row md:justify-between gap-3 items-center md:items-start">
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                            © 2024 Yaniv Talmor. All rights reserved.
                        </p>
                        <a
                            href="https://www.linkedin.com/in/yanivtalmor"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors duration-300"
                        >
                            LinkedIn →
                        </a>
                    </div>
                </footer>
            </main>
        </>
    );
}
