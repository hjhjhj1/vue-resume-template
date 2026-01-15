<template>
  <div class="theme-switcher" :class="{ 'theme-switcher--transitioning': isTransitioning, 'theme-switcher-shrink': shrink }">
    <div class="dropdown">
      <button class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <i :class="currentThemeIcon" class="fa-solid theme-icon"></i>
        <span v-if="!shrink" class="theme-name">{{ currentThemeLabel }}</span>
        <i class="fa-solid fa-caret-down ms-1"></i>
      </button>
      <ul class="dropdown-menu">
        <li v-for="mode in themeModes" :key="mode.value">
          <button class="dropdown-item" :class="{ 'dropdown-item-active': currentMode === mode.value }" @click="handleSelectTheme(mode.value)">
            <i :class="mode.icon" class="fa-solid theme-option-icon"></i>
            <span class="theme-option-label">{{ mode.label }}</span>
            <i v-if="currentMode === mode.value" class="fa-solid fa-check theme-option-check"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import Dropdown from 'bootstrap/js/src/dropdown'

const theme = inject('theme')

const {
  currentMode,
  isTransitioning,
  setTheme,
  getThemeLabel,
  THEME_MODES
} = theme

const props = defineProps({
  shrink: Boolean
})

const themeModes = [
  {
    value: THEME_MODES.LIGHT,
    label: '浅色模式',
    icon: 'fa-sun'
  },
  {
    value: THEME_MODES.DARK,
    label: '深色模式',
    icon: 'fa-moon'
  },
  {
    value: THEME_MODES.AUTO,
    label: '跟随系统',
    icon: 'fa-circle-half-stroke'
  }
]

const currentThemeIcon = computed(() => {
  const iconMap = {
    [THEME_MODES.LIGHT]: 'fa-sun',
    [THEME_MODES.DARK]: 'fa-moon',
    [THEME_MODES.AUTO]: 'fa-circle-half-stroke'
  }
  return iconMap[currentMode.value] || 'fa-sun'
})

const currentThemeLabel = computed(() => {
  return getThemeLabel()
})

const handleSelectTheme = (mode) => {
  setTheme(mode)
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.theme-switcher {
  position: relative;
  transition: all 0.3s ease;

  &--transitioning {
    opacity: 0.7;
  }
}

button.dropdown-toggle {
  border-width: 0;
  background-color: transparent;
  padding: 10px 15px;
  border-radius: $default-border-radius;
  color: var(--theme-nav-text);
  opacity: 0.9;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 1;
  }

  &:after {
    display: none;
  }
}

.theme-icon {
  font-size: 20px;
  margin: 0 4px;
}

.theme-name {
  margin-left: 10px;
  font-size: 0.9rem;
  margin-right: 4px;
}

ul.dropdown-menu {
  background-color: lighten($nav-background, 5%);
  border-radius: $default-border-radius;
  padding: 0;
  border-color: darken($nav-background, 1%);
  overflow: hidden;
  min-width: 150px;
}

button.dropdown-item {
  padding: 10px 15px;
  color: var(--theme-nav-text);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  &:hover {
    background-color: var(--theme-primary);
  }

  &-active {
    background-color: rgba(var(--theme-primary), 0.2);
  }
}

.theme-option-icon {
  font-size: 18px;
  width: 24px;
}

.theme-option-label {
  flex: 1;
  font-size: 0.9rem;
}

.theme-option-check {
  font-size: 14px;
}

.theme-switcher-shrink {
  .theme-name {
    display: none;
  }

  .theme-icon {
    margin: 0;
  }

  ul.dropdown-menu {
    min-width: 40px;
  }

  .theme-option-label {
    display: none;
  }
}
</style>
