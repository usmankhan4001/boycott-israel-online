import { create } from 'zustand';
import {
  GeopoliticalZone,
  RawResource,
  ParentConglomerate,
  ComplicityEdge,
  ComplexityLevel
} from '../types';
import {
  GEOPOLITICAL_ZONES,
  RAW_RESOURCES,
  PARENT_CONGLOMERATES,
  COMPLICITY_EDGES
} from '../data/complicityData';
import { api } from '../lib/api';

interface ComplicityState {
  zones: GeopoliticalZone[];
  resources: RawResource[];
  conglomerates: ParentConglomerate[];
  edges: ComplicityEdge[];
  
  selectedZoneId: string | null;
  selectedZoneIds: string[]; // For multi-crisis cross-filtering
  selectedResourceId: string | null;
  selectedConglomerateId: string | null;
  complexityLevel: ComplexityLevel;
  searchQuery: string;
  isLoading: boolean;

  // Action methods
  setSelectedZoneId: (zoneId: string | null) => void;
  toggleZoneId: (zoneId: string) => void;
  clearZoneFilters: () => void;
  setSelectedResourceId: (resourceId: string | null) => void;
  setSelectedConglomerateId: (conglomerateId: string | null) => void;
  setComplexityLevel: (level: ComplexityLevel) => void;
  setSearchQuery: (query: string) => void;
  
  // Data sync & query helpers
  refreshData: () => Promise<void>;
  getEdgesForConglomerate: (conglomerateId: string) => ComplicityEdge[];
  getEdgesForZone: (zoneId: string) => ComplicityEdge[];
  getEdgesForResource: (resourceId: string) => ComplicityEdge[];
  getMultiCrisisOverlap: () => { conglomerate: ParentConglomerate; zones: GeopoliticalZone[] }[];
}

export const useComplicityStore = create<ComplicityState>((set, get) => ({
  zones: GEOPOLITICAL_ZONES,
  resources: RAW_RESOURCES,
  conglomerates: PARENT_CONGLOMERATES,
  edges: COMPLICITY_EDGES,
  
  selectedZoneId: null,
  selectedZoneIds: [],
  selectedResourceId: null,
  selectedConglomerateId: null,
  complexityLevel: 'beginner',
  searchQuery: '',
  isLoading: false,

  setSelectedZoneId: (zoneId) => set({ 
    selectedZoneId: zoneId,
    selectedZoneIds: zoneId ? [zoneId] : []
  }),

  toggleZoneId: (zoneId) => set((state) => {
    const exists = state.selectedZoneIds.includes(zoneId);
    const updated = exists 
      ? state.selectedZoneIds.filter(id => id !== zoneId)
      : [...state.selectedZoneIds, zoneId];
    return {
      selectedZoneIds: updated,
      selectedZoneId: updated.length === 1 ? updated[0] : null
    };
  }),

  clearZoneFilters: () => set({ selectedZoneId: null, selectedZoneIds: [] }),

  setSelectedResourceId: (resourceId) => set({ selectedResourceId: resourceId }),

  setSelectedConglomerateId: (conglomerateId) => set({ selectedConglomerateId: conglomerateId }),

  setComplexityLevel: (level) => {
    set({ complexityLevel: level });
    try {
      localStorage.setItem('takweyat_complexity_level', level);
    } catch {}
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  refreshData: async () => {
    try {
      set({ isLoading: true });
      // Fetch concurrently with graceful fallback
      const [zonesRes, resRes, congRes, edgesRes] = await Promise.allSettled([
        api.zones?.list ? api.zones.list() : Promise.reject('No api.zones'),
        api.resources?.list ? api.resources.list() : Promise.reject('No api.resources'),
        api.conglomerates?.list ? api.conglomerates.list() : Promise.reject('No api.conglomerates'),
        api.complicityEdges?.list ? api.complicityEdges.list() : Promise.reject('No api.complicityEdges')
      ]);

      set({
        zones: zonesRes.status === 'fulfilled' && zonesRes.value?.zones?.length ? zonesRes.value.zones : GEOPOLITICAL_ZONES,
        resources: resRes.status === 'fulfilled' && resRes.value?.resources?.length ? resRes.value.resources : RAW_RESOURCES,
        conglomerates: congRes.status === 'fulfilled' && congRes.value?.conglomerates?.length ? congRes.value.conglomerates : PARENT_CONGLOMERATES,
        edges: edgesRes.status === 'fulfilled' && edgesRes.value?.edges?.length ? edgesRes.value.edges : COMPLICITY_EDGES,
        isLoading: false
      });
    } catch {
      set({
        zones: GEOPOLITICAL_ZONES,
        resources: RAW_RESOURCES,
        conglomerates: PARENT_CONGLOMERATES,
        edges: COMPLICITY_EDGES,
        isLoading: false
      });
    }
  },

  getEdgesForConglomerate: (conglomerateId) => {
    return get().edges.filter(e => e.conglomerateId === conglomerateId);
  },

  getEdgesForZone: (zoneId) => {
    return get().edges.filter(e => e.geopoliticalZoneId === zoneId);
  },

  getEdgesForResource: (resourceId) => {
    return get().edges.filter(e => e.resourceId === resourceId);
  },

  getMultiCrisisOverlap: () => {
    const { conglomerates, edges, zones } = get();
    const results: { conglomerate: ParentConglomerate; zones: GeopoliticalZone[] }[] = [];

    conglomerates.forEach(cong => {
      const congEdges = edges.filter(e => e.conglomerateId === cong.id);
      const zoneIds = Array.from(new Set(congEdges.map(e => e.geopoliticalZoneId).filter(Boolean))) as string[];
      if (zoneIds.length > 1) {
        const matchedZones = zones.filter(z => zoneIds.includes(z.id));
        results.push({
          conglomerate: cong,
          zones: matchedZones
        });
      }
    });

    return results;
  }
}));
