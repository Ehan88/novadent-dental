export const CLINIC = {
  name: 'Novadent Dental Hospital',
  tagline: 'Your Smile, Our Passion',
  phone: '+91 90371 69369',
  phoneLink: 'tel:+919037169369',
  whatsappLink: 'https://wa.me/919037169369',
  address: 'Near GHSS Chandragiri, Melparamba, Kalnad, Kerala 671317',
  email: 'info@novadentdental.com',
  hours: 'Mon - Sat: 9:00 AM - 8:00 PM | Sun: 10:00 AM - 2:00 PM',
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3905.5!2d75.9!3d11.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDE1JzAwLjAiTiA3NcKwNTQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1',
};

export const SERVICES = [
  {
    id: 1,
    title: 'Dental Implants',
    description: 'Permanent tooth replacement with titanium implants that look and feel natural. Restore your smile with our advanced implant technology.',
    icon: 'SmilePlus',
    duration: '2-3 visits',
    price: 'From ₹25,000',
  },
  {
    id: 2,
    title: 'Teeth Whitening',
    description: 'Professional in-office whitening treatment that brightens your teeth up to 8 shades in a single session.',
    icon: 'Sparkles',
    duration: '1 hour',
    price: 'From ₹5,000',
  },
  {
    id: 3,
    title: 'Orthodontics',
    description: 'Straighten your teeth with traditional braces or invisible aligners. Customized treatment plans for every age.',
    icon: 'GraduationCap',
    duration: '12-24 months',
    price: 'From ₹35,000',
  },
  {
    id: 4,
    title: 'Root Canal',
    description: 'Painless root canal treatment using latest rotary instruments and digital technology for precise results.',
    icon: 'HeartPulse',
    duration: '1-2 visits',
    price: 'From ₹8,000',
  },
  {
    id: 5,
    title: 'Cosmetic Dentistry',
    description: 'Veneers, bonding, and smile makeovers to achieve the perfect smile you have always dreamed of.',
    icon: 'Gem',
    duration: '2-4 visits',
    price: 'From ₹10,000',
  },
  {
    id: 6,
    title: 'Pediatric Dentistry',
    description: 'Gentle dental care for children in a fun, comfortable environment. Making dental visits enjoyable for kids.',
    icon: 'Baby',
    duration: '30-45 min',
    price: 'From ₹1,500',
  },
  {
    id: 7,
    title: 'Dental Crowns',
    description: 'Custom-made porcelain crowns that restore damaged teeth to their original shape, size, and strength.',
    icon: 'Shield',
    duration: '2 visits',
    price: 'From ₹8,000',
  },
  {
    id: 8,
    title: 'Gum Treatment',
    description: 'Comprehensive periodontal care for gum disease, including deep cleaning, scaling, and surgical procedures.',
    icon: 'Activity',
    duration: '3-6 visits',
    price: 'From ₹3,000',
  },
];

export const DOCTORS = [
  {
    id: 1,
    name: 'Dr. Arun Menon',
    specialty: 'Prosthodontist & Implantologist',
    qualification: 'BDS, MDS (Prosthodontics)',
    experience: '15+ years',
    bio: 'Dr. Arun Menon is a highly skilled prosthodontist specializing in dental implants and full-mouth rehabilitation. He has successfully placed over 3,000 implants and is known for his meticulous attention to detail and patient-centered approach.',
  },
  {
    id: 2,
    name: 'Dr. Priya Nair',
    specialty: 'Orthodontist',
    qualification: 'BDS, MDS (Orthodontics)',
    experience: '12+ years',
    bio: 'Dr. Priya Nair is an expert in modern orthodontic treatments including invisible aligners and self-ligating braces. She is passionate about creating beautiful smiles for patients of all ages.',
  },
  {
    id: 3,
    name: 'Dr. Rahul Krishnan',
    specialty: 'Endodontist',
    qualification: 'BDS, MDS (Endodontics)',
    experience: '10+ years',
    bio: 'Dr. Rahul Krishnan is a specialist in root canal treatments and endodontic procedures. He uses advanced rotary systems and microscope-assisted techniques for painless, precise treatments.',
  },
  {
    id: 4,
    name: 'Dr. Meera Sharma',
    specialty: 'Pediatric Dentist',
    qualification: 'BDS, MDS (Pedodontics)',
    experience: '8+ years',
    bio: 'Dr. Meera Sharma is dedicated to children\'s dental health. With a warm and friendly approach, she makes every dental visit a positive experience for young patients.',
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    rating: 5,
    text: 'Absolutely fantastic experience! Dr. Arun did my dental implant and the results are incredible. The entire team was professional and caring throughout the process.',
    treatment: 'Dental Implant',
  },
  {
    id: 2,
    name: 'Amina Begum',
    rating: 5,
    text: 'My daughter used to be terrified of dentists, but Dr. Meera changed that completely. Now she actually looks forward to her dental checkups! Highly recommend for kids.',
    treatment: 'Pediatric Care',
  },
  {
    id: 3,
    name: 'Suresh Nair',
    rating: 5,
    text: 'Got my teeth whitening done here and the results exceeded my expectations. The clinic is modern, clean, and the staff is incredibly friendly. Best dental clinic in Kalnad!',
    treatment: 'Teeth Whitening',
  },
  {
    id: 4,
    name: 'Fathima Rashid',
    rating: 5,
    text: 'Dr. Priya straightened my teeth with invisible aligners. The whole process was smooth and the outcome is perfect. I cannot stop smiling now!',
    treatment: 'Orthodontics',
  },
  {
    id: 5,
    name: 'Vinod Menon',
    rating: 5,
    text: 'Had a severe toothache and they fit me in the same day. Dr. Rahul did a root canal that was completely painless. Professional service from start to finish.',
    treatment: 'Root Canal',
  },
];

export const PACKAGES = [
  {
    id: 1,
    name: 'Basic Checkup',
    price: '₹500',
    features: ['Complete oral examination', 'X-rays', 'Professional cleaning', 'Treatment plan'],
    popular: false,
  },
  {
    id: 2,
    name: 'Smile Makeover',
    price: '₹45,000',
    features: ['Teeth whitening', 'Dental veneers', 'Smile design', 'Follow-up visits', 'Take-home kit'],
    popular: true,
  },
  {
    id: 3,
    name: 'Full Mouth Restoration',
    price: '₹1,50,000',
    features: ['Complete dental assessment', 'Implants or bridges', 'Crowns & veneers', 'Gum treatment', '1-year warranty', 'EMI options available'],
    popular: false,
  },
];

export const FAQS = [
  {
    question: 'How often should I visit the dentist?',
    answer: 'We recommend visiting the dentist every 6 months for a routine checkup and professional cleaning. Regular visits help prevent dental problems and catch issues early before they become more serious and costly to treat.',
  },
  {
    question: 'Is dental treatment painful?',
    answer: 'At Novadent Dental Hospital, we prioritize your comfort. We use advanced anesthetic techniques and sedation options to ensure your treatment is as pain-free as possible. Most patients report minimal discomfort during and after procedures.',
  },
  {
    question: 'How long do dental implants last?',
    answer: 'With proper care and maintenance, dental implants can last a lifetime. They are made from biocompatible titanium that fuses with your jawbone, creating a permanent foundation for replacement teeth. Regular brushing, flossing, and dental checkups will help ensure their longevity.',
  },
  {
    question: 'Do you offer EMI or payment plans?',
    answer: 'Yes, we offer flexible EMI options and payment plans to make dental treatment affordable for everyone. We accept all major credit/debit cards, UPI payments, and offer 0% EMI options through leading banks.',
  },
  {
    question: 'What age should my child first visit the dentist?',
    answer: 'We recommend bringing your child for their first dental visit by their first birthday or within 6 months of their first tooth erupting. Early visits help establish good oral hygiene habits and allow us to monitor your child\'s dental development.',
  },
  {
    question: 'How long does teeth whitening last?',
    answer: 'Professional teeth whitening results typically last 1-3 years, depending on your diet and oral hygiene habits. We provide a take-home maintenance kit and recommend avoiding staining foods and beverages to prolong your results.',
  },
];
