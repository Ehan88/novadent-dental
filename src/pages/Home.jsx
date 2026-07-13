import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  Monitor,
  DollarSign,
  Clock,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles,
  Smile,
  Heart,
  Shield,
} from 'lucide-react';
import { CLINIC, SERVICES, DOCTORS, TESTIMONIALS, PACKAGES, FAQS } from '../utils/constants';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import DoctorCard from '../components/DoctorCard';
import TestimonialCard from '../components/TestimonialCard';
import PackageCard from '../components/PackageCard';
import FAQ from '../components/FAQ';
import AnimatedCounter from '../components/AnimatedCounter';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

const features = [
  {
    icon: Users,
    title: 'Experienced Team',
    description: 'Our team of qualified dental specialists brings over 50 years of combined experience to deliver exceptional care.',
  },
  {
    icon: Monitor,
    title: 'Modern Technology',
    description: 'State-of-the-art equipment including digital X-rays, 3D CT scans, and laser dentistry for precise, comfortable treatments.',
  },
  {
    icon: DollarSign,
    title: 'Affordable Care',
    description: 'Premium dental treatments at competitive prices with flexible EMI options. Quality care should be accessible to everyone.',
  },
  {
    icon: Clock,
    title: 'Emergency Service',
    description: 'Same-day emergency dental care available. We understand dental emergencies do not wait, and neither do we.',
  },
];

const galleryItems = [
  { title: 'Implant Transformation', gradient: 'from-sky-400 to-blue-600' },
  { title: 'Smile Makeover', gradient: 'from-teal-400 to-emerald-600' },
  { title: 'Orthodontic Results', gradient: 'from-violet-400 to-purple-600' },
  { title: 'Teeth Whitening', gradient: 'from-amber-400 to-orange-600' },
];

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-500 via-blue-500 to-blue-600">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-white/10"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Smile size={80} />
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-white/10"
          animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles size={60} />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-1/4 text-white/10"
          animate={{ y: [0, -25, 0], rotate: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Heart size={70} />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-1/3 text-white/10"
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Shield size={90} />
        </motion.div>
        <motion.div
          className="absolute top-1/3 left-1/2 text-white/5"
          animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Smile size={200} />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="space-y-6"
        >
          <motion.p
            variants={fadeUp}
            className="text-white/80 text-lg md:text-xl font-medium tracking-wide uppercase"
          >
            Welcome to {CLINIC.name}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight"
          >
            Your Smile,{' '}
            <span className="text-accent">Our Passion</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Experience world-class dental care with advanced technology and a
            compassionate team dedicated to giving you the confident, healthy
            smile you deserve.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Book Appointment
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300"
            >
              Our Services
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface dark:from-surface-dark to-transparent" />
    </section>
  );
}

function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-white dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="Why Choose Us"
            description="We are committed to providing exceptional dental care with a personal touch"
          />
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="glass-card rounded-2xl p-8 text-center group cursor-default"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedServicesSection() {
  return (
    <section className="py-20 bg-surface dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="Our Services"
            description="Comprehensive dental treatments tailored to your needs"
          />
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {SERVICES.slice(0, 4).map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 0.1}>
              <ServiceCard service={service} />
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-primary font-semibold text-lg hover:gap-4 transition-all duration-300"
            >
              View All Services <ArrowRight size={20} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function DoctorsSection() {
  return (
    <section className="py-20 bg-white dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="Meet Our Doctors"
            description="Skilled professionals dedicated to your dental health"
          />
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
          {DOCTORS.slice(0, 2).map((doctor, i) => (
            <ScrollReveal key={doctor.id} delay={i * 0.15}>
              <DoctorCard doctor={doctor} />
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <div className="text-center mt-12">
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 text-primary font-semibold text-lg hover:gap-4 transition-all duration-300"
            >
              Meet Our Team <ArrowRight size={20} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="py-20 bg-surface dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="Before & After"
            description="See the incredible transformations we achieve for our patients"
          />
        </ScrollReveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {galleryItems.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                    {item.title}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white/90 text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    {item.title}
                  </span>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-20 bg-white dark:bg-surface-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="Patient Testimonials"
            description="Hear what our patients have to say about their experience"
          />
        </ScrollReveal>
        <div className="mt-12 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
          {TESTIMONIALS.map((testimonial, i) => (
            <div key={testimonial.id} className="min-w-[300px] snap-center lg:min-w-0">
              <ScrollReveal delay={i * 0.1}>
                <TestimonialCard testimonial={testimonial} />
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PackagesSection() {
  return (
    <section className="py-20 bg-surface dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="Treatment Packages"
            description="Affordable packages designed to give you the best value"
          />
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {PACKAGES.map((pkg, i) => (
            <ScrollReveal key={pkg.id} delay={i * 0.1}>
              <PackageCard pkg={pkg} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AppointmentCTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-sky-500 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <Smile className="absolute -top-10 -right-10 w-64 h-64 text-white" />
        <Heart className="absolute -bottom-10 -left-10 w-48 h-48 text-white" />
      </div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready for Your Best Smile?
          </h2>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Schedule your appointment today and take the first step towards a
            healthier, more confident smile. Our friendly team is ready to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={CLINIC.phoneLink}
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl"
            >
              <Phone size={20} />
              Call {CLINIC.phone}
            </a>
            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300"
            >
              Book Now <ArrowRight size={20} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <section className="py-20 bg-white dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="Find Us"
            description="Conveniently located to serve you better"
          />
        </ScrollReveal>
        <ScrollReveal>
          <div className="mt-12 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800">
            <iframe
              src={CLINIC.mapEmbed}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Clinic Location"
              className="w-full"
            />
          </div>
          <div className="flex items-center gap-3 justify-center mt-6 text-gray-600 dark:text-gray-400">
            <MapPin size={20} className="text-primary" />
            <span>{CLINIC.address}</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="py-20 bg-surface dark:bg-surface-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="Frequently Asked Questions"
            description="Find answers to common questions about our dental services"
          />
        </ScrollReveal>
        <div className="mt-12">
          <FAQ faqs={FAQS} />
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { label: 'Patients Served', value: 5000 },
    { label: 'Implants Placed', value: 3000 },
    { label: 'Years Experience', value: 15 },
    { label: 'Happy Smiles', value: 4500 },
  ];

  return (
    <section className="py-16 bg-surface dark:bg-surface-dark border-y border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  <AnimatedCounter target={stat.value} />+
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <HeroSection />
      <StatsSection />
      <WhyChooseUsSection />
      <FeaturedServicesSection />
      <DoctorsSection />
      <GallerySection />
      <TestimonialsSection />
      <PackagesSection />
      <AppointmentCTASection />
      <MapSection />
      <FAQSection />
    </motion.div>
  );
}
