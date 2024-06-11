# html-element-on-off-switch
An OnOffSwitch HTMLElement Component (with iOS style)

![on off switch](http://tudormoldovan.eu/git-assets/onoff.png)


Custom on/off switch UI component that extends HTMLElement. Stores the value in the local storage if the attribute data-store-id is specified.

Usage:

HTML:

&lt;on-off-switch data-store-id="onoff-32" data-value="on" class="switch"></on-off-switch&gt;

JS:
- no js needed to init

Listen to the change event to get component data-value changes:

<code>
document.querySelector('.switch').addEventListener('change', function (e){
  console.log('changed value to: ', e.detail.value)
})
</code>


You can change the value programatically by updating the HTML attribute value of the component, like this:

<code>
document.querySelector('button').addEventListener('click', function (e){
  document.querySelector('.switch').dataset.value = 'off'
})
</code>
