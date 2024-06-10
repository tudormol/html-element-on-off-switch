
class OnOffSwitch extends HTMLElement {

  connectedCallback () {

    var t = this

    if (t.dataset.value === '' || ['on', 'off'].indexOf(t.dataset.value) === -1) {
      console.error('The attribute data-value needs to be "on" / "off", but is:', t.dataset.value)
    }

    // if no data-store-id key, don't use storage
    var stored = t.dataset.storeId ? localStorage.getItem(t.dataset.storeId) : t.dataset.value
    
    var value = (stored !== null) ? stored : t.dataset.value

    // need to do this not to fire change for assigning same value
    if (t.dataset.value !== value) {
      t.dataset.value = value
    }

    t._updateUI()
  
    t.addEventListener('click', t._toggle)
  }


  attributeChangedCallback (name, oldValue, newValue) {

    var t = this

    t.dispatchEvent(
      new CustomEvent("change", {
        bubbles: true,
        detail: { value: t.dataset.value }
      })
    )
    
    // check of oldValue is needed otherwise this fires at 
    // component init and always sets the storage to true
    if (oldValue !== null && t.dataset.storeId) {
      localStorage.setItem(t.dataset.storeId, t.dataset.value)
    }

    t._updateUI()
    
  }

  static get observedAttributes() {
    return ['data-value']
  }

  _toggle () {

    var t = this

    t.dataset.value = (t.dataset.value === 'on') ? 'off' : 'on'
    
    if (t.dataset.storeId) {
      localStorage.setItem(t.dataset.storeId, t.dataset.value)
    }

    t._updateUI()
  }


  _updateUI () {

    var t   = this
    var val = t.dataset.value

    t.classList.remove('on')
    t.classList.remove('off')
    
    if (['on', 'off'].indexOf(val) !== -1) {
      t.classList.add(val)
    }

  }

}

customElements.define('on-off-switch', OnOffSwitch)