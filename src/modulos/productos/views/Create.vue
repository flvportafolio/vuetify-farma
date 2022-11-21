<script lang="ts">
import { defineComponent } from 'vue';
import { createProduct, getCreateReferences } from "@/services/productApi";
import showNotify, { TypeNotification } from '@/utils/notifications';
import InterfaceLoader from '@/components/InterfaceLoader.vue';
import InputWrapper from '@/components/InputWrapper.vue';

export default defineComponent({
  name: 'Create',
  components: {
    InterfaceLoader,
    InputWrapper,
  },
  created() {
    this.getReferences();
  },
  data() {
    return {
      interfaceIsReady: false,
      isDisabledSaveButton: false,
      nombre: '',
      codigo_barra: '',
      stockMinimo: 1,
      empresaSelected: null as any,
      listaEmpresas: [],
      foto: '',
      descripcion: '',
      esMedicamento: false,
      temperatura: 30,
      selectedRadio: false as any,
      optionsRadio: [
        { text: 'Estupefaciente', value: 'E' },
        { text: 'Psicotropico', value: 'P' },
        { text: 'No', value: false },
      ],
      registroSanitario: '',
      presentacionSelected: null as any,
      listaPresentaciones: [],
      clasificacionesSelected: [],
      listaClasificaciones: [],
      //extras
      isFocusedInputStockMinimo: false,
      isFocusedInputTemperatura: false,
    };
  },
  methods: {
    goToIndex() {
      if (this.$route.name !== 'producto-index') {
        this.$router.push({ name: 'producto-index' });
      }
    },
    clearFieldsMedicamento() {
      if (this.esMedicamento === false) {
        this.temperatura = 0;
        this.selectedRadio = false;
        this.registroSanitario = '';
        this.presentacionSelected = null;
        this.clasificacionesSelected = [];
      }
    },
    async saveForm() {
      this.isDisabledSaveButton = true;
      const payload = {
        es_medicamento: this.esMedicamento,
        nombre: this.nombre,
        codigo_barra: this.codigo_barra,
        stock_minimo: this.stockMinimo,
        empresa_id: this.empresaSelected?.id ?? null,
        foto: this.foto,
        descripcion: this.descripcion,
        temperatura_conservacion: this.temperatura,
        es_estupefaciente: this.selectedRadio === 'E',
        es_psicotropico: this.selectedRadio === 'P',
        registro_sanitario: this.registroSanitario,
        presentacion_id: this.presentacionSelected?.id ?? null,
        clasificaciones: this.clasificacionesSelected,
      };
      try {
        const response = await createProduct(payload);
        showNotify('Registro exitoso!', response.data.message, TypeNotification.Ok);
        this.goToIndex();
      } catch (error: any) {
        Object.entries(error.response.data.validations).forEach(([, value]: any) => {
          value.forEach((el: string) => {
            showNotify('Error de validación', el, TypeNotification.Warn);
          });
        });
        this.isDisabledSaveButton = false;
      }
    },
    async getReferences() {
      try {
        const response = await getCreateReferences();
        this.listaEmpresas = response.data.empresas;
        this.listaPresentaciones = response.data.presentaciones;
        this.listaClasificaciones = response.data.clasificaciones;
        this.interfaceIsReady = true;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
<template>
  <div>
    <v-row class="mb-0">
      <v-col cols="12">
        <h4 class="text-h5">Crear nuevo producto</h4>
      </v-col>
    </v-row>
    <v-card>
      <v-row class="ma-0">
        <v-col cols="9">
          <v-btn
            rounded="pill"
            color="secondary"
            class="mr-2"
            @click="goToIndex"
          >Atrás</v-btn>
          <v-btn
            rounded="pill"
            color="success"
            class="mr-2"
            :disabled="isDisabledSaveButton"
            @click="saveForm"
          >Guardar</v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <div v-if="interfaceIsReady">
        <v-row class="mx-0 mt-7">
          <v-col cols="6">
            <v-row>
              <v-col cols="4" class="text-right pr-0">
                Nombre: <span class="text-error">*</span>
              </v-col>
              <v-col cols="8">
                <v-text-field v-model="nombre" density="compact" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4" class="text-right pr-0">
                Código de Barra:
              </v-col>
              <v-col cols="8">
                <v-text-field v-model="codigo_barra" density="compact" />
              </v-col>
            </v-row>
            <v-row class="mb-5">
              <v-col cols="4" class="text-right pr-0">
                Stock Mínimo: <span class="text-error">*</span>
              </v-col>
              <v-col cols="8">
                <InputWrapper :is-focused="isFocusedInputStockMinimo">
                  <CurrencyInput
                    class="text-center v-field__input"
                    v-model="stockMinimo"
                    currencyDisplay="hidden"
                    :options="{
                      currency: 'USD',
                      currencyDisplay: 'hidden',
                      precision: 0,
                      autoSign: false,
                    }"
                    @focus="isFocusedInputStockMinimo = true" @blur="isFocusedInputStockMinimo = false"
                  />
                </InputWrapper>
              </v-col>
            </v-row>
            <v-row class="mb-3">
              <v-col cols="4" class="text-right pr-0">
                Empresa Fabricante: <span class="text-error">*</span>
              </v-col>
              <v-col cols="8">
                <multiselect
                  label="nombre"
                  track-by="id"
                  v-model="empresaSelected"
                  :options="listaEmpresas"
                  placeholder="Seleccionar"
                  selectLabel=""
                  selectedLabel=""
                  deselectLabel="X"
                >
                  <template #noResult>
                    No se encontraron elementos para esa busqueda.
                  </template>
                  <template #noOptions>No hay empresas registradas</template>
                </multiselect>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4" class="text-right pr-0">
                URL Foto:
              </v-col>
              <v-col cols="8">
                <v-text-field v-model="foto" density="compact" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4" class="text-right pr-0">
                Descripción:
              </v-col>
              <v-col cols="8">
                <v-textarea
                  v-model="descripcion"
                  rows="3"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <fieldset class="border px-2 py-2" :disabled="!esMedicamento">
              <legend class="px-2">
                <input
                  v-model="esMedicamento"
                  @change="clearFieldsMedicamento"
                  type="checkbox"
                  id="es_medicamento"
                >
                <label class="text-h6" for="es_medicamento">
                  Medicamento
                </label>              
              </legend>
              <v-row>
                <v-col cols="5" class="text-right pr-0">
                  Temperatura de Conservación:
                </v-col>
                <v-col cols="4">
                  <InputWrapper :is-focused="isFocusedInputTemperatura">
                    <CurrencyInput
                      class="text-center v-field__input"
                      v-model="temperatura"
                      currencyDisplay="hidden"
                      :options="{
                        currency: 'USD',
                        currencyDisplay: 'hidden',
                        precision: 0,
                        valueRange: {
                          min: -20,
                          max: 40
                        }
                      }"
                      @focus="isFocusedInputTemperatura = true" @blur="isFocusedInputTemperatura = false"
                    />
                    <template #appendInner>
                      °C
                    </template>
                  </InputWrapper>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="5" class="text-right pr-0">
                  Es controlado: <span class="text-error">*</span>
                </v-col>
                <v-col cols="7">
                  <v-radio-group inline density="compact" v-model="selectedRadio">
                    <v-radio
                      v-for="(option, index) in optionsRadio"
                      :key="index"
                      :label="option.text"
                      :value="option.value"
                      name="radio-options"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="5" class="text-right pr-0">
                  Registro sanitario: <span class="text-error">*</span>
                </v-col>
                <v-col cols="7">
                  <v-text-field v-model="registroSanitario" density="compact" />
                </v-col>
              </v-row>
              <v-row class="mb-7">
                <v-col cols="5" class="text-right pr-0">
                  Presentación: <span class="text-error">*</span>
                </v-col>
                <v-col cols="7">
                  <multiselect
                    label="nombre"
                    track-by="id"
                    v-model="presentacionSelected"
                    :options="listaPresentaciones"
                    placeholder="Seleccionar"
                    selectLabel=""
                    selectedLabel=""
                    deselectLabel="X"
                  >
                    <template #noResult>
                      No se encontraron elementos para esa busqueda.
                    </template>
                    <template #noOptions>No hay presentaciones registradas</template>
                  </multiselect>
                </v-col>
              </v-row>
              <v-row class="mb-3">
                <v-col cols="12">
                  Clasificaciones para el medicamento <span class="text-error">*</span>
                </v-col>
                <v-col cols="12" class="pt-0">
                  <multiselect
                    v-model="clasificacionesSelected"
                    :options="listaClasificaciones"
                    :multiple="true"
                    track-by="id"
                    label="nombre"
                    placeholder="Seleccionar"
                    selectLabel=""
                    selectedLabel=""
                    deselectLabel="X"
                  >
                    <template #noResult>
                      No se encontraron elementos para esa busqueda.
                    </template>
                    <template #noOptions>No hay clasificaciones registradas</template>
                  </multiselect>
                </v-col>
              </v-row>
            </fieldset>
          </v-col>
        </v-row>
      </div>
      <InterfaceLoader v-else/>
    </v-card>
  </div>
</template>