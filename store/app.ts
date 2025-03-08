import { defineStore } from 'pinia'
import type { AppState } from '~/types/AppState'

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    isDropdownOpen: false,
  }),
  actions: {
    setDropdownOpen(isOpen: boolean): void {
      this.isDropdownOpen = isOpen
    },
  },
})
