# stixjs
:exclamation: This is a work in progress

StixJS is a simple user interface library / mini-framework inspired by Vuejs syntax

## Example
```js
    const stix = new Stix(document.getElementById('app'), {
        data: {
            someProp: 'somePropValue'
        },
        template: `
            <div> {{ someProp }} </div>
        `,
        onMounted: function () {
            console.log('View and model binded');
            setTimeout(() => {
                this.data.someProp = 'new prop value';
            }, 1000)
        }
    })
```