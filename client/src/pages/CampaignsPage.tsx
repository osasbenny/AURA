import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, LayoutGrid, HeartPulse, GraduationCap, Users, Siren, Store, Droplets, type LucideIcon } from 'lucide-react';
import { CampaignCard } from '@/components/CampaignCard';
import { campaigns, categories } from '@/data/campaigns';

const iconMap: Record<string, LucideIcon> = {
  LayoutGrid, HeartPulse, GraduationCap, Users, Siren, Store, Droplets,
};

export function CampaignsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('urgent');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...campaigns];
    if (search) {
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(search.toLowerCase()) ||
          c.location.toLowerCase().includes(search.toLowerCase()) ||
          c.organizer.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (activeCategory !== 'all') {
      result = result.filter((c) => c.category === activeCategory);
    }
    if (sortBy === 'urgent') {
      result.sort((a, b) => a.daysLeft - b.daysLeft);
    } else if (sortBy === 'progress') {
      result.sort((a, b) => b.raisedAmount / b.goalAmount - a.raisedAmount / a.goalAmount);
    } else if (sortBy === 'donors') {
      result.sort((a, b) => b.donorCount - a.donorCount);
    }
    return result;
  }, [search, activeCategory, sortBy]);

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-clay-primary mb-4 text-balance">
            Browse Campaigns
          </h1>
          <p className="text-lg text-clay-secondary max-w-2xl mx-auto text-pretty">
            Find a cause you care about. Every campaign is AI-verified and every naira goes directly to the beneficiary.
          </p>
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-clay-muted" />
            <input
              type="text"
              placeholder="Search by title, location, or organizer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="clay-input pl-12"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="clay-input cursor-pointer w-auto"
            >
              <option value="urgent">Most Urgent</option>
              <option value="progress">Most Funded</option>
              <option value="donors">Most Donors</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="clay-btn sm:hidden"
              aria-label="Filters"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category pills */}
        <div className={`flex flex-wrap gap-2 mb-8 ${showFilters ? 'block' : 'hidden sm:flex'}`}>
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || LayoutGrid;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-clay-sm text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'clay-btn-primary'
                    : 'clay-sm text-clay-secondary hover:text-clay-primary'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <p className="text-sm text-clay-secondary mb-6">
          Showing {filtered.length} campaign{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          <div className="clay p-12 text-center">
            <X className="w-12 h-12 text-clay-muted mx-auto mb-4" />
            <h3 className="text-xl font-bold text-clay-primary mb-2">No campaigns found</h3>
            <p className="text-clay-secondary">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
