import React, { useMemo, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileCheck2,
  Landmark,
  Mail,
  MapPin,
  Menu,
  Phone,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X
} from 'lucide-react';

const profile = {
  firm: 'Hemil Joshi & Associates',
  name: 'CA Hemil Joshi',
  role: 'Practicing Chartered Accountant based in Navsari since 2021, providing audit, GST, Income-tax, financial reporting and regulatory advisory services to clients across diverse sectors, while also serving as Vice Chairperson of ICAI – Navsari Branch (WIRC) and actively contributing to professional development, member engagement and branch administration.',
  city: 'Navsari',
  established: '2021',
  email: 'hemiljoshiandassociates@gmail.com',
  phones: ['9033112673', '8780171198'],
  address: 'A-101, Veer Bhadra Complex, Opp. Naranlala Society, Station Road, Navsari - 396445',
  googleMapLink: 'https://maps.app.goo.gl/ZMN11Q1o6ac67aCL6?g_st=ac',
  intro:
    'A bright, modern and premium advisory practice delivering audit, tax, GST, compliance, financial reporting and business advisory services with discipline, clarity and practical commercial understanding.',
  overview:
    'Practicing Chartered Accountant based in Navsari since 2021, delivering statutory audit, internal audit, GST compliance, income-tax support, financial reporting and regulatory advisory services to clients across diverse sectors.',
  leadership:
    'Vice Chairperson of ICAI – Navsari Branch (WIRC), actively involved in professional development programs, seminars, member engagement initiatives and branch administration.',
  partner: {
    name: 'Harsh Patel',
    designation: 'Managing Partner',
    detail:
      'Analytical and detail-oriented finance professional with CFA Level II, strong understanding of capital markets, financial statement analysis, portfolio management, quantitative methods and financial modelling, supported by high ethical standards.'
  },
  technicalExpert: {
    name: 'Dhruv Joshi',
    designation: 'Technical Expert – AI & Automation',
    title: 'AI/ML Engineer | GenAI & MLOps Specialist',
    website: 'https://dhruvjoshi.co',
    detail:
      'Dhruv Joshi is associated with Hemil Joshi & Associates as a technical collaborator for developing customized financial, compliance and AI-driven business tools. His technical expertise in AI/ML, Generative AI, LLM/RAG systems, automation, scalable APIs and MLOps complements the firm’s practical financial, taxation and compliance knowledge.',
    focus:
      'Together, the financial domain understanding of Hemil Joshi & Associates and Dhruv Joshi’s in-depth AI engineering capability enable the development of tailored tools for document processing, invoice automation, management dashboards, compliance workflows, data analytics and day-to-day operational efficiency.',
  }
};

const navItems = ['Services', 'Expertise', 'Industries', 'Engagements', 'AI Automation', 'Contact'];

const coreServices = [
  {
    title: 'Audit & Assurance',
    icon: ClipboardCheck,
    points: ['Statutory Audit', 'Internal Audit', 'Stock Audit & Verification', 'Financial Statements Preparation & Certification']
  },
  {
    title: 'Income Tax',
    icon: Scale,
    points: ['ITR Filing', 'Tax Planning', 'Litigation Support', 'Book Keeping', 'Form 145/146', 'Other Certifications']
  },
  {
    title: 'GST Advisory',
    icon: FileCheck2,
    points: ['GST Registration', 'GSTR-1 & GSTR-3B', 'GST Refund', 'GST Audit', 'Compliance Partner Support']
  },
  {
    title: 'Company Law & ROC',
    icon: Building2,
    points: ['Company Incorporation', 'ROC Filing', 'MCA Compliance Advisory', 'Practical Compliance Structuring']
  },
  {
    title: 'Project Finance',
    icon: Landmark,
    points: ['Business Loans', 'Housing Loans', 'OD/CC Loans', 'CMA & Project Finance Reports']
  },
  {
    title: 'Capital Market Solutions',
    icon: TrendingUp,
    points: ['Mutual Fund Investments', 'Portfolio Guidance', 'Wealth Growth', 'Technical Guidance From Experts']
  },
  {
    title: 'Import / Export',
    icon: BarChart3,
    points: ['IEC Registration', 'BRC Closure', 'FEMA-aligned Advisory', 'Expert Consultancy']
  },
  {
    title: 'Insurance, Trademark & Subsidy',
    icon: ShieldCheck,
    points: ['Life / Term / Health Insurance', 'Premise, Stock & Vehicle Insurance', 'Trademark Registration Support', 'Central & State Subsidies']
  },
  {
    title: 'Foreign Book Keeping',
    icon: BadgeCheck,
    points: ['Multi-currency Transaction Recording', 'International Accounting Standards Compliance', 'Foreign Exchange Tracking & Reconciliation', 'Cross-border Financial Documentation', 'Export/Import Record Maintenance', 'Multi-country Tax Compliance Support']
  }
];

const advisoryStrengths = [
  'Internal Control & Risk Assessment',
  'Management Reporting Support',
  'Execution-focused Client Service',
  'Coordinated Multidisciplinary Execution',
  'Regulatory Awareness & Ethical Discipline',
  'Analytical Advisory with Practical Business Insights'
];

const industries = [
  'Manufacturing & Trading',
  'Real Estate & Infrastructure',
  'Financial Services',
  'Insurance & Capital Markets',
  'NGOs & Non-Profit Organisations',
  'Hospitality & Service Industry'
];

const engagements = [
  'Internal Auditor – Beacon Group of Companies and Haardik Nayak Financial Distribution Pvt. Ltd.',
  'Statutory Auditor for multiple SMEs and partnership firms.',
  'GST consultant and compliance partner for businesses across sectors.'
];

const why = [
  'Personalised attention tailored to business requirements',
  'Clear, responsive and transparent communication',
  'Strong focus on timelines and regulatory compliance',
  'Analytical approach supported by practical insights',
  'Proactive advisory mindset to optimise tax and compliance costs',
  'Reliable execution with professional discipline'
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } }
};

function scrollTo(id) {
  const targetId = id.toLowerCase().replace(/\s+/g, '-');
  document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Header() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerBg = useTransform(scrollY, [0, 80], ['rgba(255, 255, 255, 0.96)', 'rgba(255, 255, 255, 0.98)']);

  return (
    <motion.header className="site-header" style={{ background: headerBg }}>
      <button className="brand" onClick={() => scrollTo('home')} aria-label="Go to home">
        <img src="/ca-logo.png" alt="CA India Logo" />
        <span>
          <strong>{profile.firm}</strong>
          <small>Chartered Accountants</small>
        </span>
      </button>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <button key={item} onClick={() => scrollTo(item)}>{item}</button>
        ))}
      </nav>

      <a className="nav-cta" href={`mailto:${profile.email}`}>Schedule Discussion</a>

      <button className="menu-btn" onClick={() => setOpen(true)} aria-label="Open menu">
        <Menu size={24} />
      </button>

      {open && (
        <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="mobile-panel">
            <button className="close-btn" onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
            {navItems.map((item) => (
              <button key={item} onClick={() => { setOpen(false); scrollTo(item); }}>{item}</button>
            ))}
            <a href={`tel:${profile.phones[0]}`}>Call: {profile.phones[0]}</a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <div className="hero-mesh" />
      <div className="digital-grid" />

      <motion.div className="hero-copy" initial="hidden" animate="visible" variants={fadeUp}>
        <span className="eyebrow light"><Sparkles size={16} /> Assurance • Tax • Business Advisory</span>
        <h1>Premium financial governance for growth-focused organisations.</h1>
        <p>{profile.intro}</p>
        <div className="hero-actions">
          <button className="primary-btn" onClick={() => scrollTo('contact')}>Start a Conversation <ArrowRight size={18} /></button>
          <button className="ghost-btn" onClick={() => scrollTo('services')}>Explore Services</button>
        </div>
        <div className="trust-strip" aria-label="Practice highlights">
          <span><strong>{profile.established}</strong> Practice Since</span>
          <span><strong>ICAI</strong> Navsari WIRC</span>
          <span><strong>8+</strong> Service Verticals</span>
        </div>
      </motion.div>

      <div className="hero-top">
        <motion.div className="hero-card" initial={{ opacity: 0, scale: 0.92, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}>
          <div className="card-glow" />
        <div className="profile-shell">
          <div className="profile-halo" />
          <img className="profile-img" src="/hemil-joshi-profile.jpg" alt="CA Hemil Joshi" />
        </div>

        <div className="hemil-credential-logo">
          <img src="/ca-logo.png" alt="CA India Logo" />
          <span>Chartered Accountant</span>
        </div>
          <div className="hero-card-footer">
            <h2>{profile.name}</h2>
            <p>{profile.role}</p>
          </div>
        </motion.div>

        <motion.div className="partner-card-hero" initial={{ opacity: 0, scale: 0.92, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25 }}>
          <div className="partner-profile-shell">
            <div className="profile-halo" />
            <img className="partner-profile-img" src="/harsh.jpeg" alt="Harsh Patel" />
          </div>
          <div className="partner-info">
          <div className="partner-credential-logo">
              <img src="/ca-logo.png" alt="CA India Logo" />
              <span>{profile.partner.designation}</span>
            </div>

            <h3>{profile.partner.name}</h3>
            <p>{profile.partner.detail}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, children }) {
  return (
    <motion.div className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </motion.div>
  );
}

function Services() {
  return (
    <section id="services" className="section services-section">
      <SectionTitle eyebrow="Service Architecture" title="Integrated professional services under one advisory umbrella.">
        Designed for businesses requiring reliable compliance execution, financial reporting discipline and practical commercial advice.
      </SectionTitle>
      <div className="service-grid">
        {coreServices.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.article
              className="service-card"
              key={service.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
            >
              <div className="service-icon"><Icon /></div>
              <h3>{service.title}</h3>
              <ul>
                {service.points.map((point) => <li key={point}><CheckCircle2 size={15} />{point}</li>)}
              </ul>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <section id="expertise" className="section split-section">
      <motion.div className="narrative-panel" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
        <span className="eyebrow dark"><BadgeCheck size={16} /> Professional Overview</span>
        <h2>Technical discipline, commercial clarity and regulatory confidence.</h2>
        <p>{profile.overview}</p>
        <p>{profile.leadership}</p>
      </motion.div>
      <div className="strength-grid">
        {advisoryStrengths.map((item, index) => (
          <motion.div
            className="strength-card"
            key={item}
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
          >
            <ChevronRight size={18} />
            <span>{item}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TeamAndIndustries() {
  return (
    <section id="industries" className="section industries-section">
      <SectionTitle eyebrow="Leadership & Sectors" title="A premium practice supported by finance, markets and execution capability.">
        The practice serves clients across manufacturing, trading, real estate, financial services, NGOs and service industries.
      </SectionTitle>
      <div className="industry-cloud">
        {industries.map((industry, index) => (
          <motion.span
            key={industry}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
          >
            {industry}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

function Engagements() {
  return (
    <section id="engagements" className="section proof-section">
      <div className="proof-card">
        <SectionTitle eyebrow="Representative Engagements" title="Execution credentials with practical advisory depth." />
        <div className="timeline">
          {engagements.map((item, index) => (
            <motion.div
              className="timeline-item"
              key={item}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="why-card">
        <h3>Why clients work with us</h3>
        {why.map((item) => <p key={item}><CheckCircle2 size={16} />{item}</p>)}
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState('');
  const serviceOptions = useMemo(() => coreServices.map((x) => x.title), []);

  async function handleSubmit(event) {
    event.preventDefault();

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();

      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error("Server error. Please check Vercel Function logs.");
      }

      if (!response.ok) {
        throw new Error(data.message || "Unable to send enquiry.");
      }

      setStatus(data.message || "Thank you. Your enquiry has been sent successfully.");
      formElement.reset();
    } catch (error) {
      setStatus(error.message || "Unable to send enquiry. Please contact us directly by email.");
    }
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="contact-copy">
        <span className="eyebrow light"><Mail size={16} /> Let’s Connect</span>
        <h2>Discuss audit, tax, GST and advisory requirements with confidence.</h2>
        <p>I welcome the opportunity to discuss how our services can support your organisation in achieving financial and regulatory excellence.</p>
        <div className="contact-lines">
          <a href={`tel:${profile.phones[0]}`}><Phone size={18} /> {profile.phones.join(' / ')}</a>
          <a href={`mailto:${profile.email}`}><Mail size={18} /> {profile.email}</a>
          <span><a
              className="location location-link"
              href={profile.googleMapLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin size={16} />
              {profile.address}
            </a></span>
        </div>
        <img className="masthead" src="/firm-masthead.jpg" alt="Hemil Joshi & Associates masthead" />
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Name <input name="name" required placeholder="Your name" /></label>
        <label>Email <input name="email" required type="email" placeholder="you@example.com" /></label>
        <label>Phone <input name="phone" placeholder="Mobile number" /></label>
        <label>Service
          <select name="service" defaultValue="Audit & Assurance">
            {serviceOptions.map((service) => <option key={service}>{service}</option>)}
          </select>
        </label>
        <label className="full">Message <textarea name="message" required rows="5" placeholder="Briefly describe your requirement" /></label>
        <button className="primary-btn full" type="submit">Send Enquiry <ArrowRight size={18} /></button>
        {status && <p className="form-status">{status}</p>}
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div>
        <strong>{profile.firm}</strong>
        <p>Chartered Accountants | Assurance, Tax & Business Advisory</p>
      </div>
      <p>© {new Date().getFullYear()} {profile.firm}. All rights reserved.</p>
    </footer>
  );
}

export default function App() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <Expertise />
      <TeamAndIndustries />
      <TechnicalExpertSection />
      <Engagements />
      <Contact />
      <Footer />
    </main>
  );
}

function SeoContentSection() {
  return (
    <section className="seo-section">
      <div className="section-kicker">Local Chartered Accountant Firm</div>

      <h2>
        CA in Navsari, Gujarat for Audit, GST, Income Tax and Business Advisory
      </h2>

      <p>
        Hemil Joshi & Associates is a Chartered Accountant firm based in Navsari,
        Gujarat, serving businesses, professionals, SMEs, partnership firms,
        companies, NGOs and service organisations with audit, taxation,
        compliance and advisory support.
      </p>

      <p>
        The firm provides professional services in statutory audit, internal
        audit, GST registration and returns, GST refund, income tax return filing,
        income tax planning, litigation support, financial statement preparation,
        certification, ROC compliance, project finance consulting, government
        subsidy assistance and trademark registration support.
      </p>

      <div className="seo-keyword-grid">
        <span>CA in Navsari</span>
        <span>Chartered Accountant in Navsari</span>
        <span>CA in Gujarat</span>
        <span>CA near me</span>
        <span>GST Consultant in Navsari</span>
        <span>Income Tax Consultant in Navsari</span>
        <span>Audit Firm in Gujarat</span>
        <span>Hemil Joshi & Associates</span>
      </div>
    </section>
  );
}

function TechnicalExpertSection() {
  return (
    <section className="technical-expert-section" id="ai-automation">
      <div className="tech-bg-orb tech-orb-one" />
      <div className="tech-bg-orb tech-orb-two" />

      <div className="tech-section-header">
        <div className="section-kicker">AI Automation</div>
        <h2>Technology Collaboration</h2>
        <p>
          Hemil Joshi & Associates partners with technical expert Dhruv Joshi to deliver AI-driven tools and automation for audit, GST, income tax and compliance workflows.
        </p>
      </div>

      <div className="tech-collab-card">
        <div className="tech-left-panel">
          <div className="tech-mini-label">Technical Expert</div>

          <div className="tech-avatar-shell">
            <div className="tech-avatar-glow" />
            <div className="tech-avatar-text">
              <img src="/Dhruv-website-photo.jpeg" alt="Dhruv Joshi" />
            </div>
          </div>

          <h3>{profile.technicalExpert.name}</h3>
          <span>{profile.technicalExpert.designation}</span>
          <p>{profile.technicalExpert.title}</p>

          <a
            href={profile.technicalExpert.website}
            target="_blank"
            rel="noopener noreferrer"
            className="tech-website-link"
          >
            Visit Technical Profile →
          </a>
        </div>

        <div className="tech-right-panel">
          <div className="tech-content-block">
            <h4>Role in Digital & AI-Based Projects</h4>
            <p>{profile.technicalExpert.detail}</p>
          </div>

          <div className="tech-content-block">
            <h4>Combined Value Proposition</h4>
            <p>{profile.technicalExpert.focus}</p>
          </div>

          <div className="tech-capability-grid">
            <div>
              <strong>Financial Tools</strong>
              <span>Custom MIS, dashboards, reconciliations and reporting workflows.</span>
            </div>

            <div>
              <strong>Document AI</strong>
              <span>Invoice reading, PDF extraction, document review and data structuring.</span>
            </div>

            <div>
              <strong>Compliance Automation</strong>
              <span>GST, income-tax, ROC and internal compliance tracking systems.</span>
            </div>

            <div>
              <strong>AI Assistants</strong>
              <span>Firm-specific assistants for finance, operations and internal knowledge.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="tech-process-strip">
        <div>
          <span>01</span>
          <p>Understand business process</p>
        </div>
        <div>
          <span>02</span>
          <p>Map finance and compliance pain-points</p>
        </div>
        <div>
          <span>03</span>
          <p>Design AI-enabled workflow</p>
        </div>
        <div>
          <span>04</span>
          <p>Deploy practical tool for daily use</p>
        </div>
      </div>
    </section>
  );
}