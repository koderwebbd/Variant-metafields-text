class VariantSelects extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
  }

  onVariantChange() {
    this.updateOptions();
    this.updateMasterId();
    //adding by KoderWeb
    this.metafield_text();

    if (!this.currentVariant) {
    } else {
      this.updateVariantInput();
    }


  }

  updateOptions() {
    this.options = Array.from(this.querySelectorAll('select'), (select) => select.value);
  }

  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options.map((option, index) => {
        return this.options[index] === option;
      }).includes(false);
    });
  }

  

  updateVariantInput() {
    const productForms = document.querySelectorAll(`#product-form-${this.dataset.section}, #product-form-installment-${this.dataset.section}`);
    productForms.forEach((productForm) => {
      const input = productForm.querySelector('input[name="id"]');
      input.value = this.currentVariant.id;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }


  getVariantData() {
    this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  }

  //adding by KoderWeb
  metafield_text(){
    let currentVariantID = this.currentVariant.id;

    const variantText = document.querySelectorAll('[data-variant-text-id]');
    variantText.forEach(function(variant) {
      variant.style.display = 'none';
      if(variant.dataset.variantTextId == currentVariantID){
        variant.style.display = 'block'
      }
    });


  }
}
customElements.define('variant-selects', VariantSelects);