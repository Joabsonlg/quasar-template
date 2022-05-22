<template>
  <q-page style="margin-top: -60px">
    <section class="heroSection bg-primary">
      <div class="heroSection__content container q-mb-xl">
        <div class="row full-width q-mb-xl">
          <div class="col-12 col-md-6 vertical-middle self-center">
            <h2 class="text-h3 text-white text-weight-medium fredoka">System Name!</h2>
            <h4 class="text-h5 text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
            <q-btn
              class="text-black"
              unelevated
              color="white"
              label="Start now"
              icon="bolt"
              @click="goToSection('features')"
            />
          </div>
          <div class="col-0 col-md-6">
            <img
              :style="($q.screen.md || $q.screen.lg || $q.screen.xl) ? 'width: 600px; max-width: fit-content;' : 'width: 100%; max-width: 100%;'"
              class="responsive" src="src/assets/hero1.svg">
          </div>
        </div>
      </div>
      <div class="waves">
        <svg class="waves__svg" preserveAspectRatio="none" shape-rendering="auto" viewBox="0 24 150 28"
             xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
          </defs>
          <g class="parallax">
            <use fill="rgba(255,255,255,0.7)" x="48" xlink:href="#gentle-wave" y="0"></use>
            <use fill="rgba(255,255,255,0.5)" x="48" xlink:href="#gentle-wave" y="3"></use>
            <use fill="rgba(255,255,255,0.3)" x="48" xlink:href="#gentle-wave" y="5"></use>
            <use fill="rgba(255,255,255,1)" x="48" xlink:href="#gentle-wave" y="7"></use>
          </g>
        </svg>
      </div>
    </section>
    <section class="features q-py-xl">
      <div class="container">
        <div class="row q-col-gutter-lg q-py-xl">
          <div class="col-12 col-md-4">
            <hover v-slot="{hoverIsActive}">
              <q-card :class="{ 'shadow-6 cursor-pointer': hoverIsActive }">
                <q-card-section class="text-center">
                  <q-avatar size="70px" class="bg-primary text-white" icon="bolt"></q-avatar>
                  <h5 class="text-h4 q-my-md">Feature 1</h5>
                  <p class="text-gray text-subtitle1 text-justify">Descrição da feature 1.Descrição da feature
                    1.Descrição da feature 1.Descrição da feature 1.Descrição da feature 1.</p>
                </q-card-section>
              </q-card>
            </hover>
          </div>
          <div class="col-12 col-md-4">
            <hover v-slot="{hoverIsActive}">
              <q-card :class="{ 'shadow-6 cursor-pointer': hoverIsActive }">
                <q-card-section class="text-center">
                  <q-avatar size="70px" class="bg-primary text-white" icon="bolt"></q-avatar>
                  <h5 class="text-h4 q-my-md">Feature 2</h5>
                  <p class="text-gray text-subtitle1 text-justify">Descrição da feature 2.Descrição da feature
                    2.Descrição da feature 2.Descrição da feature 2.Descrição da feature 2.</p>
                </q-card-section>
              </q-card>
            </hover>
          </div>
          <div class="col-12 col-md-4">
            <hover v-slot="{hoverIsActive}">
              <q-card :class="{ 'shadow-6 cursor-pointer': hoverIsActive }">
                <q-card-section class="text-center">
                  <q-avatar size="70px" class="bg-primary text-white" icon="bolt"></q-avatar>
                  <h5 class="text-h4 q-my-md">Feature 3</h5>
                  <p class="text-gray text-subtitle1 text-justify">Descrição da feature 3.Descrição da feature
                    3.Descrição da feature 3.Descrição da feature 3.Descrição da feature 3.</p>
                </q-card-section>
              </q-card>
            </hover>
          </div>
        </div>
      </div>
    </section>
    <section class="about q-mb-xl q-py-xl">
      <div class="container">
        <div class="row">
          <div class="col-0 col-md-6">
            <img
              :style="($q.screen.md || $q.screen.lg || $q.screen.xl) ? 'width: 600px; max-width: fit-content;' : 'width: 100%; max-width: 100%;'"
              class="responsive" src="src/assets/about.svg">
          </div>
          <div class="col-12 col-md-6 self-center text-right">
            <h2 class="text-h3 text-weight-thin fredoka">About us</h2>
            <p class="text-subtitle1 text-justify">
              Pellentesque at arcu sit amet enim vehicula aliquet fermentum pretium diam. Etiam et enim sed eros aliquam
              imperdiet quis non urna. Sed quis ipsum augue. Quisque cursus maximus fringilla. Morbi aliquet blandit
              augue a cursus.<br/>
              Nulla egestas orci ut lorem aliquet, at dapibus ligula tristique. Curabitur eu posuere ex. Morbi consequat
              dui vel nibh bibendum ullamcorper. Ut rhoncus ipsum mi, a venenatis velit sodales at. Phasellus sit amet
              dignissim diam.</p>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import {goToSection} from "src/support/helpers/scroll";
import Hover from "src/modules/common/components/HoverComponent.vue";

const features = [
  {
    icon: "fas fa-check",
    label: "Feature 1"
  },
  {
    icon: "fas fa-check",
    label: "Feature 2"
  },
  {
    icon: "fas fa-check",
    label: "Feature 3"
  }
];
</script>

<style scoped>
.heroSection {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  position: relative;
  overflow: hidden;
}

.waves {
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
}

.heroSection__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  z-index: 1;
}

.heroSection__title {
  color: #fff;
  font-weight: bold;
  text-align: center;
}
</style>
