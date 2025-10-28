import React from 'react';

// --- Helper Functions ---
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// --- Inlined UI Component Stubs (Styled with Tailwind to mimic Shadcn) ---
// NOTE: These are simplified versions for this self-contained demo.

// Lucide Icons as SVG components
const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const ArrowDown = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 5v14"></path><path d="m19 12-7 7-7-7"></path></svg>
);
const ArrowRight = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
);

// Button Component
type ButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'default' | 'outline';
  size?: 'lg' | 'default';
  children: React.ReactNode;
};
const Button: React.FC<ButtonProps> = ({ variant = 'default', size = 'default', className, children, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  const variantClasses = {
    default: 'bg-slate-900 text-slate-50 hover:bg-slate-900/90',
    outline: 'border border-slate-200 bg-transparent hover:bg-slate-100 hover:text-slate-900',
  };
  const sizeClasses = {
    default: 'h-10 px-4 py-2',
    lg: 'h-11 rounded-md px-8',
  };
  return (
    <a className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)} {...props}>
      {children}
    </a>
  );
};

// Card Components
const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <div className={cn("rounded-lg border bg-white text-slate-950 shadow-sm", className)}>{children}</div>
);
const CardHeader: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)}>{children}</div>
);
const CardTitle: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <h3 className={cn("text-xl font-semibold leading-none tracking-tight", className)}>{children}</h3>
);
const CardContent: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <div className={cn("p-6 pt-0 text-muted-foreground", className)}>{children}</div>
);

// Avatar Components
const Avatar: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}>{children}</div>
);
const AvatarImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => (
  <img className="aspect-square h-full w-full" {...props} />
);
const AvatarFallback: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <span className={cn("flex h-full w-full items-center justify-center rounded-full bg-slate-100", className)}>
    {children}
  </span>
);

// Badge Component
const Badge: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <div className={cn("inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-slate-100 text-slate-900", className)}>
    {children}
  </div>
);

// --- Calendly Widget ---
const CalendlyWidget = () => {
    React.useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    return (
        <div 
            className="calendly-inline-widget" 
            data-url="https://calendly.com/veroventures/chat" 
            style={{ minWidth: '320px', height: '700px' }}>
        </div>
    );
}

// --- Main Page Component ---
export default function App() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-16">
      <div className="flex flex-col gap-16">

        {/* Section 1: Hero */}
        <section className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <Avatar className="h-32 w-32">
            <AvatarImage src="/Yaniv-Talmor-Profile-Square.jpg" alt="Yaniv Talmor" />
            <AvatarFallback>YT</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold tracking-tight">Fractional CTO: From Idea to Successful Exit</h1>
            <p className="text-lg text-muted-foreground">
              I partner with early-stage companies to architect scalable, investor-ready AI technology. I build high-performing engineering teams and leverage MLOps to solve critical business problems, driving measurable growth and leading to commercial success.
            </p>
            <div className="flex gap-4 mt-4 justify-center md:justify-start">
              <Button size="lg" href="#booking">
                <ArrowDown className="mr-2 h-4 w-4" /> Book a Consultation
              </Button>
              <Button variant="outline" size="lg" href="https://www.linkedin.com/in/yanivtalmor" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4" /> View LinkedIn
              </Button>
            </div>
          </div>
        </section>

        {/* Section 2: Proven Results */}
        <section className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-center">Proven Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader><CardTitle>Successful AI-SaaS Exit</CardTitle></CardHeader>
              <CardContent>Led Dynamic Needs Analysis from concept to a successful strategic acquisition, architecting its core AI-powered SaaS platform and scaling the team.</CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Trusted by Enterprise</CardTitle></CardHeader>
              <CardContent>Delivered complex AI/ML and MLOps solutions for industry leaders, including BMO (banking), Asurion (insurance), and Electronic Arts (gaming).</CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Multi-Sector AI Automation</CardTitle></CardHeader>
              <CardContent>Created automation tools that fundamentally improved operations in FinTech, InsurTech, and LegalTech, delivering quantifiable improvements in efficiency.</CardContent>
            </Card>
          </div>
        </section>

        {/* Section 3: Core Expertise */}
        <section className="flex flex-col gap-4 items-center">
          <h2 className="text-3xl font-bold">Core Expertise</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge>Fractional CTO</Badge>
            <Badge>AI/ML</Badge>
            <Badge>MLOps</Badge>
            <Badge>Data Architecture</Badge>
            <Badge>Cloud Infrastructure</Badge>
            <Badge>Serverless Computing</Badge>
            <Badge>SaaS Platforms</Badge>
            <Badge>MVP to Exit</Badge>
          </div>
        </section>

        {/* Section 4: Vero Ventures */}
        <section>
            <Card className="text-center">
                <CardHeader>
                    <CardTitle>Need a Full Engineering Team?</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <p>In addition to Fractional CTO consulting, my company, Vero Ventures, provides software engineering teams for hire. We specialize in building and scaling MVPs for funded entrepreneurs who need dedicated development work.</p>
                    <Button variant="outline" href="https://veroventures.com/" target="_blank" rel="noopener noreferrer">
                        Explore Vero Ventures <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardContent>
            </Card>
        </section>
        
        {/* Section 5: Book a Consultation (Calendly) */}
        <section id="booking" className="flex flex-col gap-4 text-center">
          <h2 className="text-3xl font-bold">Book Your Consultation</h2>
          <p className="text-lg text-muted-foreground">Find a time below to discuss your technology goals, AI strategy, or next MVP.</p>
          <div className="rounded-lg overflow-hidden border">
             <CalendlyWidget />
          </div>
        </section>
        
      </div>
       {/* Section 6: Footer */}
       <footer className="text-center text-muted-foreground text-sm pt-16">
        <p>© 2024 Yaniv Talmor. All rights reserved. | <a href="https://www.linkedin.com/in/yanivtalmor" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">LinkedIn</a></p>
      </footer>
    </main>
  );
}
