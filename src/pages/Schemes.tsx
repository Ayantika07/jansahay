import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, RefreshCw, AlertCircle, Inbox, Layers } from 'lucide-react';
import { SchemeCard } from '../components/SchemeCard';
import { useLanguage } from '../context/LanguageContext';
import { Scheme } from '../types';
import { api } from '../services/api';

export const Schemes: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const selectedCategory = searchParams.get('category') || 'All';
  const selectedState = searchParams.get('state') || 'All';
  const searchQuery = searchParams.get('search') || '';
  const selectedTargetGroup = searchParams.get('target') || 'All';

  useEffect(() => {
    fetchSchemes();
  }, [selectedCategory, selectedState, searchQuery, selectedTargetGroup]);

  const fetchSchemes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getSchemes({
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        state: selectedState !== 'All' ? selectedState : undefined,
        search: searchQuery || undefined
      });

      let results = data.schemes;

      if (selectedTargetGroup !== 'All') {
        results = results.filter(s =>
          s.eligibilityCriteria.targetGroup?.some(
            tg => tg.toLowerCase() === selectedTargetGroup.toLowerCase()
          )
        );
      }

      setSchemes(results);
    } catch (err: any) {
      setError('Unable to load schemes. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (cat: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  const handleTargetChange = (target: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (target === 'All') {
      newParams.delete('target');
    } else {
      newParams.set('target', target);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (!query) {
      newParams.delete('search');
    } else {
      newParams.set('search', query);
    }
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchParams({});
  };

  const categories = ['All', 'Agriculture', 'Education', 'Women & Child', 'Healthcare', 'Housing', 'Employment', 'Financial Inclusion', 'Social Security'];
  const targetGroups = ['All', 'Farmer', 'Student', 'Senior Citizen', 'Woman', 'Vendor', 'Artisan', 'BPL'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Official Database</span>
        <h1 className="text-3xl font-black text-slate-900 font-sans mt-1">
          Government Schemes Directory
        </h1>
        <p className="text-xs font-medium text-slate-600 mt-1">
          Explore all Central and State government welfare schemes with direct official application portal links.
        </p>
      </div>

      {/* Filter Bar Bento Card */}
      <div className="bg-white p-6 rounded-[2rem] border-2 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] space-y-6">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by scheme name, category, ministry, or keyword..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-900 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:bg-white transition-colors"
          />
        </div>

        {/* Categories Chips */}
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-sans">
            Categories
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border border-slate-900 ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Target Beneficiary Filter */}
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-sans">
            Target Beneficiary Group
          </label>
          <div className="flex flex-wrap gap-2">
            {targetGroups.map((group) => (
              <button
                key={group}
                onClick={() => handleTargetChange(group)}
                className={`px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border border-slate-900 ${
                  selectedTargetGroup === group
                    ? 'bg-slate-900 text-white shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Summary & Clear */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-slate-100 text-xs font-semibold text-slate-600">
          <span>
            Showing <strong>{schemes.length}</strong> government schemes
          </span>
          {(selectedCategory !== 'All' || selectedTargetGroup !== 'All' || searchQuery) && (
            <button
              onClick={clearAllFilters}
              className="text-indigo-600 hover:underline font-black uppercase text-[10px] tracking-wider"
            >
              Clear All Filters
            </button>
          )}
        </div>

      </div>

      {/* Results Container */}
      {isLoading ? (
        <div className="py-16 text-center space-y-4">
          <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-600">Loading government schemes...</p>
        </div>
      ) : error ? (
        <div className="p-8 bg-rose-50 border border-rose-200 rounded-2xl text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-rose-600 mx-auto" />
          <p className="text-sm font-bold text-rose-900">{error}</p>
          <button
            onClick={fetchSchemes}
            className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-lg"
          >
            Retry
          </button>
        </div>
      ) : schemes.length === 0 ? (
        <div className="py-16 bg-white rounded-2xl border border-slate-200 text-center space-y-4 p-8">
          <Inbox className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800 font-serif">No Matching Schemes Found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try adjusting your search criteria or clear selected filters to explore available welfare programs.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      )}

    </div>
  );
};
