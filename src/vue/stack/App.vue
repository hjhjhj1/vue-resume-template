<template>
    <ThemeManager>
        <DataManager>
            <WindowObserver>
                <FeedbacksManager>
                    <LanguageManager>
                        <LocationManager>
                            <ModalManager>
                                <Resume/>
                            </ModalManager>
                        </LocationManager>
                    </LanguageManager>
                </FeedbacksManager>
            </WindowObserver>
        </DataManager>
    </ThemeManager>
</template>

<script setup>
import ThemeManager from "/src/vue/stack/ThemeManager.vue"
import DataManager from "/src/vue/stack/DataManager.vue"
import LanguageManager from "/src/vue/stack/LanguageManager.vue"
import FeedbacksManager from "/src/vue/stack/FeedbacksManager.vue"
import LocationManager from "/src/vue/stack/LocationManager.vue"
import ModalManager from "/src/vue/stack/ModalManager.vue"
import WindowObserver from "/src/vue/stack/WindowObserver.vue"
import Resume from "/src/vue/stack/Resume.vue"
</script>

<style lang="scss" scoped>
</style>