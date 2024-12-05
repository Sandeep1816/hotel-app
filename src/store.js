
import { create } from 'zustand';

const useStore = create((set) => ({
  selectedHotel: null,
  setSelectedHotel: (hotel) => set({ selectedHotel: hotel }),
}));

export default useStore;

