export interface Campaign {
  id: string;
  title: string;
  story: string;
  category: string;
  organizer: string;
  location: string;
  goalAmount: number;
  raisedAmount: number;
  donorCount: number;
  daysLeft: number;
  image: string;
  status: 'active' | 'completed' | 'urgent';
  trustLevel: 'verified' | 'reviewing' | 'pending';
  beneficiary: string;
  relationship: string;
  createdAt: string;
  updates: CampaignUpdate[];
}

export interface CampaignUpdate {
  id: string;
  date: string;
  title: string;
  content: string;
}

export const categories = [
  { id: 'all', label: 'All', icon: 'LayoutGrid' },
  { id: 'medical', label: 'Medical', icon: 'HeartPulse' },
  { id: 'education', label: 'Education', icon: 'GraduationCap' },
  { id: 'community', label: 'Community', icon: 'Users' },
  { id: 'emergency', label: 'Emergency', icon: 'Siren' },
  { id: 'business', label: 'Business', icon: 'Store' },
  { id: 'water', label: 'Water & Sanitation', icon: 'Droplets' },
];

export const campaigns: Campaign[] = [
  {
    id: 'help-adaeze-walk-again',
    title: 'Help Adaeze Walk Again After Spinal Surgery',
    story: 'Adaeze is a 27-year-old teacher from Enugu who suffered a spinal injury in a road accident. She needs urgent surgery and rehabilitation to walk again. Her family has exhausted their savings and is turning to the community for support. Every contribution, no matter how small, brings Adaeze one step closer to recovery and back to her students.',
    category: 'medical',
    organizer: 'Chidi Okafor',
    location: 'Enugu, Nigeria',
    goalAmount: 8500000,
    raisedAmount: 5950000,
    donorCount: 847,
    daysLeft: 23,
    image: 'https://images.pexels.com/photos/34185202/pexels-photo-34185202.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    status: 'urgent',
    trustLevel: 'verified',
    beneficiary: 'Adaeze Nwankwo',
    relationship: 'Sister',
    createdAt: '2026-08-15',
    updates: [
      { id: 'u1', date: '2026-09-10', title: 'First Surgery Successful', content: 'Adaeze\'s first surgery went well. She is recovering and starting physiotherapy next week. Thank you all for your support!' },
      { id: 'u2', date: '2026-09-18', title: 'Physiotherapy Progress', content: 'Adaeze has started physiotherapy and is making steady progress. She can now move her toes and is building strength every day.' },
    ],
  },
  {
    id: 'classrooms-for-rural-children',
    title: 'Building Classrooms for 200 Rural Children',
    story: 'In a remote village in Kebbi State, 200 children study under trees because there is no school building. We are raising funds to construct three classrooms, provide desks, and supply learning materials. Education is the foundation of every community, and these children deserve a safe place to learn.',
    category: 'education',
    organizer: 'Fatima Ibrahim',
    location: 'Kebbi, Nigeria',
    goalAmount: 12000000,
    raisedAmount: 4800000,
    donorCount: 312,
    daysLeft: 45,
    image: 'https://images.pexels.com/photos/12448839/pexels-photo-12448839.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    status: 'active',
    trustLevel: 'verified',
    beneficiary: 'Kebbi Community School',
    relationship: 'Community Member',
    createdAt: '2026-08-01',
    updates: [
      { id: 'u1', date: '2026-09-05', title: 'Foundation Laid', content: 'We have laid the foundation for the first classroom! Construction is progressing thanks to your generous donations.' },
    ],
  },
  {
    id: 'clean-water-for-gyada-village',
    title: 'Clean Water for 500 Families in Gyada Village',
    story: 'Gyada village has no access to clean water. Women and children walk 4 kilometers daily to fetch water from a contaminated stream. We are raising funds to drill a solar-powered borehole that will serve 500 families, reducing waterborne diseases and giving children time to attend school.',
    category: 'water',
    organizer: 'Yusuf Mohammed',
    location: 'Bauchi, Nigeria',
    goalAmount: 6500000,
    raisedAmount: 5200000,
    donorCount: 689,
    daysLeft: 12,
    image: 'https://images.pexels.com/photos/28101461/pexels-photo-28101461.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    status: 'urgent',
    trustLevel: 'verified',
    beneficiary: 'Gyada Village Community',
    relationship: 'Community Leader',
    createdAt: '2026-07-20',
    updates: [
      { id: 'u1', date: '2026-09-01', title: 'Site Survey Complete', content: 'The geological survey is complete and we have identified the best location for the borehole. Drilling begins next week!' },
      { id: 'u2', date: '2026-09-15', title: 'Drilling Has Started', content: 'The drilling team has arrived and work has begun. We are halfway to our goal — please keep sharing!' },
    ],
  },
  {
    id: 'mama-nkechis-market-stall',
    title: 'Help Mama Nkechi Rebuild Her Market Stall',
    story: 'Mama Nkechi has sold food at the Owerri market for 20 years. A fire destroyed her stall and her entire stock. She needs help to rebuild and restock so she can continue to support her family and send her children to school. A small loan is not enough — she needs community support.',
    category: 'business',
    organizer: 'Emeka Nwosu',
    location: 'Owerri, Nigeria',
    goalAmount: 1500000,
    raisedAmount: 920000,
    donorCount: 156,
    daysLeft: 18,
    image: 'https://images.pexels.com/photos/5934226/pexels-photo-5934226.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    status: 'active',
    trustLevel: 'verified',
    beneficiary: 'Nkechi Okoro',
    relationship: 'Neighbor',
    createdAt: '2026-08-28',
    updates: [],
  },
  {
    id: 'flood-relief-bayelsa',
    title: 'Emergency Flood Relief for Bayelsa Families',
    story: 'Severe flooding has displaced over 1,000 families in Bayelsa State. Homes are submerged, crops destroyed, and families are sheltering in temporary camps. We are raising funds to provide food, clean water, blankets, and medical supplies to the most affected families. Time is critical.',
    category: 'emergency',
    organizer: 'Bayelsa Relief Network',
    location: 'Bayelsa, Nigeria',
    goalAmount: 20000000,
    raisedAmount: 14300000,
    donorCount: 1247,
    daysLeft: 7,
    image: 'https://images.pexels.com/photos/33687330/pexels-photo-33687330.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    status: 'urgent',
    trustLevel: 'verified',
    beneficiary: 'Bayelsa Displaced Families',
    relationship: 'Relief Coordinator',
    createdAt: '2026-09-01',
    updates: [
      { id: 'u1', date: '2026-09-10', title: 'First Distribution Complete', content: 'We have distributed food and clean water to 500 families in three camps. Medical supplies are arriving tomorrow.' },
      { id: 'u2', date: '2026-09-16', title: 'Medical Team On Site', content: 'A volunteer medical team is now on-site providing care to flood victims. Your donations are saving lives every day.' },
    ],
  },
  {
    id: 'young-chiomas-heart-surgery',
    title: 'Young Chioma Needs Heart Surgery',
    story: 'Chioma is a 4-year-old girl born with a congenital heart defect. Her doctors say she needs surgery within 3 months or her condition will become life-threatening. Her parents are small-scale traders who cannot afford the cost. Let us come together to give Chioma a chance at life.',
    category: 'medical',
    organizer: 'Grace Adeyemi',
    location: 'Lagos, Nigeria',
    goalAmount: 15000000,
    raisedAmount: 8900000,
    donorCount: 534,
    daysLeft: 30,
    image: 'https://images.pexels.com/photos/30677591/pexels-photo-30677591.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    status: 'urgent',
    trustLevel: 'reviewing',
    beneficiary: 'Chioma Adeyemi',
    relationship: 'Mother',
    createdAt: '2026-08-22',
    updates: [
      { id: 'u1', date: '2026-09-12', title: 'Hospital Confirmed', content: 'The hospital has confirmed Chioma\'s surgery date for October 15th. We are 60% of the way there!' },
    ],
  },
];

export function formatNaira(amount: number): string {
  return '₦' + amount.toLocaleString('en-NG');
}

export function getProgressPercent(campaign: Campaign): number {
  return Math.min(100, Math.round((campaign.raisedAmount / campaign.goalAmount) * 100));
}
